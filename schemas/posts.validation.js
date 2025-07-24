import { z } from 'zod'

const validationPost = z.object({
  title: z.string({
    required_error: 'Title must be a string',
    invalid_type_error: 'The title is invalid because it is not a string.'
  }).min(3, {
    message: 'Minimum 3 characters for the title'
  }).max(58, {
    message: 'Maximum 58 characters for the title'
  }),
  content: z.string({
    required_error: 'Content must be a string',
    invalid_type_error: 'The content is invalid because it is not a string.'
  }).min(10, {
    message: 'Minimum 10 characters for the content'
  }).max(255, {
    message: 'Maximum 255 characters for the content'
  })
})

export function validatePost (data) {
  const validate = validationPost.safeParse(data)

  if (validate.success) {
    return { success: true, data: validate.data }
  } else {
    const errors = validate.error.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message
    }))
    return { success: false, errors }
  }
}

export function validatePickPost (data) {
  const validate = validationPost.pick({
    title: true,
    content: true
  }).safeParse(data)

  if (validate.success) {
    return { success: true, data: validate.data }
  } else {
    const errors = validate.error.issues.map(issue => ({
      path: issue.path.join('.'),
      message: issue.message
    }))
    return { success: false, errors }
  }
}
