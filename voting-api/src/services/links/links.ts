// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  linkDataValidator,
  linkPatchValidator,
  linkQueryValidator,
  linkResolver,
  linkExternalResolver,
  linkDataResolver,
  linkPatchResolver,
  linkQueryResolver
} from './links.schema'

import type { Application } from '../../declarations'
import { LinkService, getOptions } from './links.class'
import { linkPath, linkMethods } from './links.shared'

export * from './links.class'
export * from './links.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const link = (app: Application) => {
  // Register our service on the Feathers application
  app.use(linkPath, new LinkService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: linkMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(linkPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(linkExternalResolver), schemaHooks.resolveResult(linkResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(linkQueryValidator), schemaHooks.resolveQuery(linkQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(linkDataValidator), schemaHooks.resolveData(linkDataResolver)],
      patch: [schemaHooks.validateData(linkPatchValidator), schemaHooks.resolveData(linkPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [linkPath]: LinkService
  }
}
