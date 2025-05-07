import { API_BASE_URL, API_ENDPOINTS } from '@/config/api';

// Types
export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  isVerified?: boolean;
  orgId?: string;
  orgName?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  console.log('API Response Status:', response.status, response.statusText);
  
  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
      console.log('API Error Response:', errorData);
    } catch (e) {
      console.log('Failed to parse error response as JSON');
    }
    
    return {
      success: false,
      message: errorData.message || `Error ${response.status}: ${response.statusText}`,
      error: errorData.error || response.statusText,
    };
  }

  let data: any = {};
  try {
    data = await response.json();
    console.log('API Success Response:', data);
  } catch (e) {
    console.log('Failed to parse success response as JSON');
  }
  
  return {
    success: true,
    data: data as T,
    message: data.message || 'Operation successful',
  };
};

// Auth token management
export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

export const setAuthTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearAuthTokens = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};

// User management
export const setCurrentUser = (user: User): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

// Auth API calls
export const login = async (email: string, password: string): Promise<ApiResponse<AuthResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseData = await response.json();
    
    if (response.ok) {
      const { user, accessToken, refreshToken } = responseData.data;
      
      // Store tokens and user data
      setAuthTokens(accessToken, refreshToken);
      setCurrentUser(user);

      return {
        success: true,
        data: {
          user,
          accessToken,
          refreshToken
        },
        message: responseData.message || 'Login successful'
      };
    } else {
      return {
        success: false,
        message: responseData.message || 'Login failed',
        error: responseData.error || 'Unknown error'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Login failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const refreshToken = async (): Promise<ApiResponse<AuthResponse>> => {
  try {
    const refreshToken = getRefreshToken();
    
    if (!refreshToken) {
      return {
        success: false,
        message: 'No refresh token available',
        error: 'Authentication required',
      };
    }

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await handleResponse<AuthResponse>(response);

    if (result.success && result.data) {
      setAuthTokens(result.data.accessToken, result.data.refreshToken);
    }

    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Token refresh failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const logout = (): void => {
  clearAuthTokens();
  window.location.href = '/login';
};

// User API calls
export const signUp = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.SIGNUP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    return await handleResponse<User>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Sign up failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const signUpWithOrg = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  orgName: string,
  orgDomain: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.SIGNUP_ORG}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, password, orgName, orgDomain }),
    });

    return await handleResponse<User>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Organization sign up failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const checkEmailExists = async (email: string): Promise<ApiResponse<{ exists: boolean }>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.EMAIL_EXISTS}/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await handleResponse<{ exists: boolean }>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Email check failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const verifyUser = async (email: string, isVerified: boolean): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.VERIFY_USER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, isVerified }),
    });

    return await handleResponse<User>(response);
  } catch (error) {
    return {
      success: false,
      message: 'User verification failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const createHubManager = async (
  firstName: string,
  lastName: string,
  email: string
): Promise<ApiResponse<User>> => {
  try {
    const token = getAccessToken();

    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
        error: 'No access token available',
      };
    }

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.SIGNUP_EMPLOYEE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName, email }),
    });

    return await handleResponse<User>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Hub manager creation failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  try {
    const token = getAccessToken();

    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
        error: 'No access token available',
      };
    }

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.GET_ALL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await handleResponse<User[]>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const getUserById = async (id: string): Promise<ApiResponse<User>> => {
  try {
    const token = getAccessToken();

    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
        error: 'No access token available',
      };
    }

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.GET_BY_ID}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    return await handleResponse<User>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch user',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const forgotPassword = async (email: string): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.FORGOT_PASSWORD}/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await handleResponse<null>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Password reset request failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const resetPassword = async (
  password: string,
  resetToken: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.RESET_PASSWORD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, resetToken }),
    });

    return await handleResponse<null>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Password reset failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<ApiResponse<null>> => {
  try {
    const token = getAccessToken();

    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
        error: 'No access token available',
      };
    }

    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.CHANGE_PASSWORD}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    return await handleResponse<null>(response);
  } catch (error) {
    return {
      success: false,
      message: 'Password change failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};
