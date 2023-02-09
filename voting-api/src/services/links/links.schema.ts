// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const linkSchema = Type.Object(
  {
    _id: Type.String({ objectid: true }),
    link: Type.String({
      format: 'uri'
    }),
    title: Type.String({
      minLength: 5,
      maxLength: 100
    }),
    description: Type.String({
      maxLength: 500
    }),
    votes: Type.Integer()
  },
  { $id: 'Link', additionalProperties: false }
)
export type Link = Static<typeof linkSchema>
export const linkValidator = getValidator(linkSchema, dataValidator)
export const linkResolver = resolve<Link, HookContext>({})

export const linkExternalResolver = resolve<Link, HookContext>({})

// Schema for creating new entries
export const linkDataSchema = Type.Pick(linkSchema, ['link', 'title', 'description'], {
  $id: 'LinkData'
})
export type LinkData = Static<typeof linkDataSchema>
export const linkDataValidator = getValidator(linkDataSchema, dataValidator)
export const linkDataResolver = resolve<Link, HookContext>({
  votes: async () => 0
})

// Schema for updating existing entries
export const linkPatchSchema = Type.Partial(linkSchema, {
  $id: 'LinkPatch'
})
export type LinkPatch = Static<typeof linkPatchSchema>
export const linkPatchValidator = getValidator(linkPatchSchema, dataValidator)
export const linkPatchResolver = resolve<Link, HookContext>({})

// Schema for allowed query properties
export const linkQueryProperties = Type.Pick(linkSchema, ['link', 'votes', 'title', 'description'])
export const linkQuerySchema = Type.Intersect(
  [
    querySyntax(linkQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type LinkQuery = Static<typeof linkQuerySchema>
export const linkQueryValidator = getValidator(linkQuerySchema, queryValidator)
export const linkQueryResolver = resolve<LinkQuery, HookContext>({})
