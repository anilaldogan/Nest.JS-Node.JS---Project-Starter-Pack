export enum HttpMessage {
  SYSTEM_INTERNAL_SERVER_ERROR = 'Internal server error',

  USER_ALREADY_EXISTS = 'User already exists',
  USER_INVALID_USERNAME_PASSWORD = 'Invalid username or password',
  USER_LOGGED_IN = 'User successfully logged in',
  USER_INVALID_TOKEN = 'Invalid token',
  USER_NOT_FOUND = 'User not found',
  USER_NOT_ACTIVE = 'User not active',

  VEHICLE_NOT_FOUND = 'Vehicle not found',
  VEHICLE_PLATE_ALREADY_EXISTS = 'Vehicle plate already exists',
  VEHICLE_NOT_ASSIGNED = 'Vehicle not assigned to user',
  VEHICLE_ASSIGNED = 'Vehicle assigned to user',
}
