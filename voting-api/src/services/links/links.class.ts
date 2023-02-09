// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Link, LinkData, LinkPatch, LinkQuery } from './links.schema'

export type { Link, LinkData, LinkPatch, LinkQuery }

export interface LinkParams extends MongoDBAdapterParams<LinkQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class LinkService<ServiceParams extends Params = LinkParams> extends MongoDBService<
  Link,
  LinkData,
  ServiceParams,
  LinkPatch
> {
  async upvote({ _id }: { _id: string }) {
    const link = await this.get(_id)

    return this.patch(_id, { votes: link.votes + 1 })
  }

  async downvote({ _id }: { _id: string }) {
    const link = await this.get(_id)

    return this.patch(_id, { votes: link.votes - 1 })
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('links'))
  }
}
