import Joi from 'joi';

export function signupValidation(value: any) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().min(6).max(30).required(),
  });
  return schema.validate(value);
}

export function loginValidation(value: any) {
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().min(6).max(30).required(),
  });
  return schema.validate(value);
}
