import { type SchemaTypeDefinition } from 'sanity'
import { galleryImage } from './galleryImage'

export const schemaTypes = [galleryImage]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}