import { Context } from '../@types/helpers'
import { isAdmin } from '../helpers/isAdmin'
import { withUserContainer } from './withUserContainer'
import _ from 'lodash'

//use when only checking if user is admin
export const withAdminContainer =
  <Type, ArgsType>(
    resolver: (_parent: void, args: ArgsType, ctx: Context) => Type,
    errorMessage: string | undefined = undefined
  ) =>
  async (_parent: void, args: ArgsType, ctx: Context) => {
    const { req } = ctx

    if (!isAdmin(req)) {
      throw new Error(errorMessage || 'User is not an admin')
    }

    return resolver(_parent, args, ctx)
  }

export const withAdminUserContainer =
  <Type, ArgsType>(
    resolver: (_parent: void, args: ArgsType, ctx: Context) => Type,
    errorMessage?: string
  ) =>
  async (_parent: void, args: ArgsType, ctx: Context) => {
    return withUserContainer(withAdminContainer(resolver, errorMessage))(
      _parent,
      args,
      ctx
    )
  }
