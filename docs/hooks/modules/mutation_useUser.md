[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUser

# Module: mutation_useUser

## Table of contents

### Functions

- [useUserMutations](mutation_useUser.md#useusermutations)

## Functions

### useUserMutations

▸ **useUserMutations**(): `Object`

[Mutation hook] useUserMutations uses the graphQL mutation

<b>createCustomerAuthTicket(customerUserAuthInfoInput: CustomerUserAuthInfoInput): CustomerAuthTicket</b>

Description : Logs user in account by creating auth ticket

Parameters passed to function loginUser(customerAccountAndAuthInfoInput: CustomerAccountAndAuthInfoInput) => expects object of type ' CustomerAccountAndAuthInfoInput' containing password and username

On success, calls invalidateQueries on loginKeys and fetches the updated result.

#### Returns

`Object`

'response?.account', which contains information related to logged in user account

| Name          | Type                                                                             |
| :------------ | :------------------------------------------------------------------------------- |
| `data`        | `any`                                                                            |
| `error`       | `unknown`                                                                        |
| `isError`     | `boolean`                                                                        |
| `isLoading`   | `boolean`                                                                        |
| `isSuccess`   | `boolean`                                                                        |
| `mutate`      | `UseMutateFunction`<`any`, `unknown`, `CustomerUserAuthInfoInput`, `void`\>      |
| `mutateAsync` | `UseMutateAsyncFunction`<`any`, `unknown`, `CustomerUserAuthInfoInput`, `void`\> |

#### Defined in

[mutations/useUserMutations/useUserMutations.ts:34](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/mutations/useUserMutations/useUserMutations.ts#L34)