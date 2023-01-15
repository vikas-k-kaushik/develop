import React, { useState } from 'react'

import { useRouter } from 'next/router'

import { DetailsStep, MultiShippingStep } from '@/components/checkout'
import { CheckoutUITemplate } from '@/components/page-templates'
import { useAuthContext } from '@/context'
import {
  useCustomerContactsQueries,
  useDeleteCheckoutCouponMutation,
  useMultiShipCheckoutQueries,
  useUpdateMultiShipCheckoutPersonalInfoMutation,
  useUpdateCheckoutCouponMutation,
  MultiShipPersonalInfo,
  useCreateCheckoutDestinationMutations,
  useCheckoutShippingMethodsQuery,
  useCreateCheckoutShippingMethodMutation,
} from '@/hooks'
import { userGetters } from '@/lib/getters'
import type { PersonalDetails } from '@/lib/types'

import type {
  CustomerContact,
  Checkout,
  CheckoutGroupRates,
  CrShippingRate,
  Maybe,
} from '@/lib/gql/types'

interface MultiShipCheckoutProps {
  checkout: Checkout
  isMultiShipEnabled: boolean
}

interface MultiShipCheckoutShippingMethod {
  shippingMethodCode: string
  shippingMethodGroup: CheckoutGroupRates
}

const MultiShipCheckoutTemplate = (props: MultiShipCheckoutProps) => {
  const { checkout: initialCheckout, isMultiShipEnabled } = props

  const router = useRouter()
  const checkoutId = router?.query?.checkoutId
  // States
  const [promoError, setPromoError] = useState<string>('')

  // Hooks
  const { data: checkout } = useMultiShipCheckoutQueries({
    checkoutId: checkoutId as string,
    isMultiship: isMultiShipEnabled,
    initialCheckout,
  })
  const { data: shippingMethods } = useCheckoutShippingMethodsQuery(
    checkoutId as string,
    checkout?.groupings && (checkout?.groupings[0]?.destinationId as string)
  )

  const updateMultiShipCheckoutPersonalInfo = useUpdateMultiShipCheckoutPersonalInfoMutation()
  const createCheckoutDestination = useCreateCheckoutDestinationMutations()
  const createCheckoutShippingMethod = useCreateCheckoutShippingMethodMutation()
  const updateCheckoutCoupon = useUpdateCheckoutCouponMutation()
  const deleteCheckoutCoupon = useDeleteCheckoutCouponMutation()

  const updateCheckoutPersonalInfo = async (formData: PersonalDetails) => {
    const { email } = formData
    const personalInfo: MultiShipPersonalInfo = {
      checkout: checkout as Checkout,
      email: email as string,
    }
    await updateMultiShipCheckoutPersonalInfo.mutateAsync(personalInfo)
  }

  const { isAuthenticated, user } = useAuthContext()
  const { data: savedUserAddressData } = useCustomerContactsQueries(user?.id as number)

  const userShippingAddress = userGetters?.getUserShippingAddress(
    savedUserAddressData?.items as CustomerContact[]
  )

  const getShippingRateFromMethodGroupByMethodCode = async (
    shippingMethodCode: string,
    shippingMethodGroup: CheckoutGroupRates
  ) =>
    shippingMethodGroup?.shippingRates?.find(
      (shippingRate: Maybe<CrShippingRate>) =>
        shippingRate?.shippingMethodCode === shippingMethodCode
    )
  const updateCheckoutShippingMethod = async (params: MultiShipCheckoutShippingMethod) => {
    const { shippingMethodGroup, shippingMethodCode } = params
    const shippingRate = await getShippingRateFromMethodGroupByMethodCode(
      shippingMethodCode,
      shippingMethodGroup
    )

    await createCheckoutShippingMethod.mutateAsync({
      checkoutId: checkout?.id as string,
      checkoutGroupShippingMethodInput: [
        {
          groupingId: shippingMethodGroup?.groupingId as string,
          shippingRate,
        },
      ],
    })
  }

  const handleApplyCouponCode = async (couponCode: string) => {
    try {
      setPromoError('')
      const response = await updateCheckoutCoupon.mutateAsync({
        checkoutId: checkoutId as string,
        couponCode,
      })
      if (response?.invalidCoupons?.length) {
        setPromoError(response?.invalidCoupons[0]?.reason)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleRemoveCouponCode = async (couponCode: string) => {
    try {
      await deleteCheckoutCoupon.mutateAsync({
        checkoutId: checkoutId as string,
        couponCode,
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <CheckoutUITemplate
        checkout={checkout as Checkout}
        handleApplyCouponCode={handleApplyCouponCode}
        handleRemoveCouponCode={handleRemoveCouponCode}
        promoError={promoError}
      >
        <DetailsStep
          checkout={checkout as Checkout}
          updateCheckoutPersonalInfo={updateCheckoutPersonalInfo}
        />
        <MultiShippingStep
          key={checkout?.groupings?.map((group) => group?.id).join('')}
          checkout={checkout as Checkout}
          userSavedShippingAddress={userShippingAddress}
          isAuthenticated={isAuthenticated}
          shippingMethods={shippingMethods}
          createCheckoutDestination={createCheckoutDestination}
          onUpdateCheckoutShippingMethod={updateCheckoutShippingMethod}
        />
        {/* @to-do Use below steps for future development */}
        {/* <PaymentStep checkout={checkout} {...paymentStepParams} />
              <ReviewStep checkout={checkout as Checkout} onBackButtonClick={handleBack} /> */}
      </CheckoutUITemplate>
    </>
  )
}

export default MultiShipCheckoutTemplate