import { body } from "express-validator";
export const User = {
  create: [
    body("username")
      .not()
      .isEmpty()
      .withMessage("name is Required")
      .isString()
      .withMessage("name must be a string")
      .isLength({ min: 2, max: 20 })
      .withMessage("name size must be between 2 and 30 characters")
      .trim(),
      body("email")
      .not()
      .isEmpty()
      .withMessage("email is required")
      .isString()
      .withMessage("email mus be a string")
      .isEmail()
      .withMessage("please enter a valid email")
      .trim(),
      body("password")
      .not()
      .isEmpty()
      .withMessage("password is required")
      .isString()
      .withMessage("password mus be a string")
      .isLength({ min: 8 })
      .withMessage("password must be at least 8 characters ")
      .trim(),
  ],
  signin:[
    body("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isString()
    .withMessage("email mus be a string")
    .isEmail()
    .withMessage("please enter a valid email")
    .trim(),
    body("password")
    .not()
    .isEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password mus be a string")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters ")
    .trim(),
  ]
};
