
export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: string;
  };
  message?: string;
  token?: string;
  refreshToken?: string;
}

export interface UserSignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserSignupOrgData extends UserSignupData {
  orgName: string;
  orgDomain: string;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}
