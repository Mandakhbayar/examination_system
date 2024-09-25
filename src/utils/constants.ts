export const Constants = {
  ACCEPTED_IMAGE_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/svg+xml',
  ],
  DEFAULT_IMAGE: "/static/images/default.png",
  EMAIL_REGEX: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
  PHONE_NUMBER_REGEX: "^\\d{8}$",
  PASSWORD_REGEX: "^.{8,}$",
  ACCESS_TOKEN_KEY: "ACCESS_TOKEN_KEY",
  SECRET_KEY: "KEY",
  EXAM_DEFAULT_TIME: 600
};
