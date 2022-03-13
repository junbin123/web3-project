import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import { transactionSchema } from './transactionSchema'
import { userSchema } from './userSchema'
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([transactionSchema, userSchema]),
})
