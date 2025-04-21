// API configuration
export const API_BASE_URL = 'https://api.deskhive.ng';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth',
    REFRESH_TOKEN: '/auth/refresh',
  },
  // User endpoints
  USER: {
    SIGNUP: '/user/signup',
    SIGNUP_ORG: '/user/signup-org',
    EMAIL_EXISTS: '/user/email-exists',
    VERIFY_USER: '/user/verify-user',
    SIGNUP_EMPLOYEE: '/user/signup/employee',
    GET_ALL: '/user',
    GET_BY_ID: '/user',
    FORGOT_PASSWORD: '/user/forgot-password',
    RESET_PASSWORD: '/user/reset-password',
    CHANGE_PASSWORD: '/user/change-password',
  },
};
