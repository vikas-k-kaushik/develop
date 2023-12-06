/**
 * @module useUpdateOrderPersonalInfo
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { CheckoutUpdateMode } from '@/lib/constants'
import { makeGraphQLClient } from '@/lib/gql/client'
import { setPersonalInfo } from '@/lib/gql/mutations'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrOrderInput } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface PersonalInfo {
  checkout: any
  email: string
}

const client = makeGraphQLClient(
  `${process.env.NEXT_PUBLIC_URL ? process.env.NEXT_PUBLIC_URL : ''}/api/checkout/update-order`
)

const updatePersonalInfo = async ({ checkout, email, payments }: any) => {
  // const client = makeGraphQLClient()

  const personalInfo = {
    orderId: checkout?.id as string,
    updateMode: CheckoutUpdateMode.APPLY_TO_ORIGINAL,
    orderInput: {
      // amountAvailableForRefund: checkout.amountAvailableForRefund,
      // amountRefunded: checkout.amountRefunded,
      // amountRemainingForPayment: checkout.amountRemainingForPayment,
      // totalCollected: checkout.totalCollected,
      // continuityOrderOrdinal: checkout.continuityOrderOrdinal,
      ...checkout,
      ...(email && { email: email as string }),
      ...(payments && { payments: payments as string }),
    },
  }
  const response = await client.request({
    document: setPersonalInfo,
    variables: personalInfo,
  })

  return response?.checkout
}

/**
 * [Mutation hook] useUpdateOrderPersonalInfo uses the graphQL mutation
 *
 * <b>updateOrder(orderId: String!,updateMode: String, version: String, orderInput: OrderInput): Order</b>
 *
 * Description : Updates user personal info at checkout
 *
 * Parameters passed to function updatePersonalInfo({ checkout, email }: PersonalInfo) => expects object of type ' PersonalInfo' containing  checkout and email
 *
 * On success, calls invalidateQueries on checkoutKeys and fetches the updated result.
 *
 * @returns 'response?.checkout', which contains updated checkout information
 */

export const useUpdateOrderPersonalInfo = () => {
  const queryClient = useQueryClient()

  return {
    updateOrderPersonalInfo: useMutation({
      mutationFn: updatePersonalInfo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
      },
    }),
  }
}
