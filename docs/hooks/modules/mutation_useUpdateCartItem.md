[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUpdateCartItem

# Module: mutation_useUpdateCartItem

## Table of contents

### Functions

- [useUpdateCartItemMutation](mutation_useUpdateCartItem.md#useupdatecartitemmutation)

## Functions

### useUpdateCartItemMutation

▸ **useUpdateCartItemMutation**(): `Object`

[Mutation hook] useUpdateCartItemMutation uses the graphQL mutation

<b>updateCurrentCartItem(cartItemId: String!, cartItemInput: CartItemInput): CartItem</b>

Description : Updates the 'fulfillmentMethod(Shipping/Pickup in store)' and 'fulfillmentLocationCode' based on selected option on cart page

Parameters passed to function updateCartItem(props: UpdateCartItemParams) => expects object of type 'UpdateCartItemParams' containing cartItemId and cartItemInput

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`Object`

'response?.updateCurrentCartItem' which contains the updated fulfillmentMethod and fulfillmentLocationCode

| Name             | Type                                                                  |
| :--------------- | :-------------------------------------------------------------------- |
| `updateCartItem` | `UseMutationResult`<`any`, `unknown`, `UpdateCartItemParams`, `any`\> |

#### Defined in

[mutations/useCartMutations/useUpdateCartItem/useUpdateCartItemMutation.ts:47](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/mutations/useCartMutations/useUpdateCartItem/useUpdateCartItemMutation.ts#L47)