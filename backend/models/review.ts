import {
  createSchema,
  ExtractDoc,
  ExtractProps,
  Type,
  typedModel,
} from 'ts-mongoose'

export const ReviewSchema = createSchema(
  {
    name: Type.string({
      required: true,
    }),
    rating: Type.string({
      required: true,
    }),
    comment: Type.string({}),
  },
  {
    timestamps: true,
  },
)

export const ReviewModel = typedModel('Review', ReviewSchema)
export type ReviewDoc = ExtractDoc<typeof ReviewSchema>
export type ReviewProps = ExtractProps<typeof ReviewSchema>
