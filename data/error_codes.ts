export enum ErrorCode {
  API_AUTH_HEADER_EMPTY = "authorization header is empty",
  API_AUTH_HEADER_CREDENTIALS_ARE_INCORRECT = "authorization header credentials are incorrect",
  API_AUTH_EMAIL_ALREADY_IN_USE = "email already in use",
  API_AUTH_EMAIL_UNKNOWN = "email is unknown",
  API_AUTH_USERNAME_ALREADY_IN_USE = "username already in use",
  API_AUTH_USERNAME_UNKNOWN = "username is unknown",
  API_AUTH_PASSWORD_IS_INCORRECT = "password is incorrect",
  API_USER_USERNAME_IS_NOT_SET = "'username' is not set",
  API_USER_USERNAME_IS_UNKNOWN = "can't find user using provided 'username'",
}
