import { renderHook } from '@testing-library/react-hooks'

import { useCreateCheckoutMutation } from './useCreateCheckoutMutation'
import { checkoutMock } from '@/__mocks__/stories/checkoutMock'
import { createQueryClientWrapper } from '@/__test__/utils/renderWithQueryClient'

describe('[hooks] useCreateCheckoutMutation', () => {
  it('should return checkout details when user provides valid cartId', async () => {
    renderHook(
      async () => {
        const cartId = '147542c811037d000104fe140000678b'
        const createCheckout = useCreateCheckoutMutation()
        const response = await createCheckout.mutateAsync(cartId)
        expect(response).toStrictEqual(checkoutMock.checkout)
      },
      {
        wrapper: createQueryClientWrapper(),
      }
    )
  })
})
