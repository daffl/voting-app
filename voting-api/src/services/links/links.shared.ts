// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Link, LinkData, LinkPatch, LinkQuery, LinkService } from './links.class'

export type { Link, LinkData, LinkPatch, LinkQuery }

export type LinkClientService = Pick<LinkService<Params<LinkQuery>>, (typeof linkMethods)[number]>

export const linkPath = 'links'

export const linkMethods = ['find', 'get', 'create', 'patch', 'remove', 'upvote', 'downvote'] as const

export const linkClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(linkPath, connection.service(linkPath), {
    methods: linkMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [linkPath]: LinkClientService
  }
}
