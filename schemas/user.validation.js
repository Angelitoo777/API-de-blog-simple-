import { z } from 'zod'

const validationUser = z.object({
  username: z.string({
    required_error: 'Username must be a string',
    invalid_type_error: 'The username is invalid because it is not a string.'
  }).min(3, {
    required_error: 'The username must have a minimum of 3 characters.'
  }).max(20, {
    invalid_type_error: 'The username is invalid because it exceeds the maximum of 20 characters.'
  }),
  email: z.string({
    required_error: 'Email must be a string',
    invalid_type_error: 'The email is invalid because it is not a string.'
  }).email({
    invalid_type_error: 'The email is invalid'
  }),
  password: z.string({
    required_error: 'Password must be a string',
    invalid_type_error: 'The Password is invalid because it is not a string.'
  }).min(6, {
    required_error: 'The password must have a minimum of 6 characters.'
  })
})

export function validateUser (data) {
  const validate = validationUser.safeParse(data)

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

export function validatePickUser (data) {
  return validationUser.pick({
    username: true,
    password: true
  }).safeParse(data)
}
