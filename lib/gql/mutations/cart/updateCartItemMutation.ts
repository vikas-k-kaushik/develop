import { cartItemDetails } from '../../fragments/cart'

const updateCartItemMutation = /* GraphQL */ `
  ${cartItemDetails}

  mutation updateCurrentCartItem($cartItemId: String!, $cartItemInput: CartItemInput) {
    updateCurrentCartItem(cartItemId: $cartItemId, cartItemInput: $cartItemInput) {
      ...cartItemDetails
    }
  }
`
export default updateCartItemMutation
