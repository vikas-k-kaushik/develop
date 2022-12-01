[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useCreateOrder

# Module: mutation_useCreateOrder

## Table of contents

### Functions

- [useCreateOrderMutation](mutation_useCreateOrder.md#usecreateordermutation)

## Functions

### useCreateOrderMutation

▸ **useCreateOrderMutation**(): `UseMutationResult`<`any`, `unknown`, `Order`, `unknown`\>

[Mutation hook] useCreateOrderMutation uses the graphQL mutation

<b>createOrderAction(orderId: String!, orderActionInput: OrderActionInput): Order</b>

Description : Creates a new order after clicking 'Confirm & Pay' button on Review step of checkout page

Parameters passed to function createOrder(checkout: Order) => expects object of type 'Order'

On success, calls invalidateQueries on checkoutKeys and fetches the updated result

#### Returns

`UseMutationResult`<`any`, `unknown`, `Order`, `unknown`\>

'response?.createOrderAction' which contains Order number, payment status, product items with totals, shipping and billing details, fulfillment methods.

#### Defined in

[mutations/useCreateOrderMutations/useCreateOrderMutation.tsx:47](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/mutations/useCreateOrderMutations/useCreateOrderMutation.tsx#L47)