
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
  // Organization endpoints
  ORGANIZATION: {
    CREATE: '/organization/create',
    GET_ALL: '/organization',
    GET_USERS: '/organization/users',
    ADD_MEMBER: '/organization/member/create',
    UPDATE: '/organization/update',
    UPDATE_SETTINGS: '/organization/update-settings',
    UPDATE_MEMBER: '/organization/member/update',
    GET_MY_ORG: '/organization/myorg',
  },
  // Invitation endpoints
  INVITATION: {
    CREATE: '/invitation/create',
    GET_ALL: '/invitation',
    ACCEPT: '/invitation/accept',
    DISABLE: '/invitation',
  },
  // Workspace endpoints
  WORKSPACE: {
    CREATE: '/workspace/create',
    GET_ALL: '/workspace',
    UPDATE: '/workspace/update',
    DELETE: '/workspace/delete',
    GET_BY_ORG: '/workspace/organization',
  },
};
