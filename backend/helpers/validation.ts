import Joi from 'joi'

export function signupValidation(value: Record<string, string | number>) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    password: Joi.string().min(6).max(30).required(),
  })
  return schema.validate(value, { allowUnknown: true })
}

export function loginValidation(value: Record<string, string | number>) {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    password: Joi.string().min(6).max(30).required(),
  })
  return schema.validate(value, { allowUnknown: true })
}
export function profileValidation(
  value: Record<string, string | number | undefined | null>,
) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    password: Joi.string().min(6).max(30),
  })
  return schema.validate(value, { allowUnknown: true })
}
