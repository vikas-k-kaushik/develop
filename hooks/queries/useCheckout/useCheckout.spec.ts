import { renderHook } from '@testing-library/react-hooks'

import { useCheckout } from './useCheckout'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCheckout', () => {
  it('should return cart details when user provides valid cartId', async () => {
    const cartId = '137a94b6402be000013718d80000678b'
    const { result, waitFor } = renderHook(() => useCheckout({ cartId }), {
      wrapper: createQueryClientWrapper(),
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toStrictEqual(orderMock.checkout)
  })
  it('should return checkout details when user provides valid checkoutId', async () => {
    const checkoutId = '137a979305c65d00010800230000678b'
    const { result, waitFor } = renderHook(() => useCheckout({ checkoutId }), {
      wrapper: createQueryClientWrapper(),
    })
    await waitFor(() => result.current.isSuccess)
    expect(result.current.data).toStrictEqual(orderMock.checkout)
  })
})
