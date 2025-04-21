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
    console.log('Attempting login with:', { email });
    
    // Use the real API
    console.log('Making API request to:', `${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`);
    
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Login API Response Status:', response.status, response.statusText);
    
    // If the response is 401, create a custom error response
    if (response.status === 401) {
      console.error('Authentication failed: Invalid credentials');
      return {
        success: false,
        message: 'Invalid email or password. Please try again.',
        error: 'Unauthorized'
      };
    }
    
    // Try to get the response as text first to debug
    const responseText = await response.text();
    console.log('Raw API response:', responseText);
    
    // Parse the response text as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log('Parsed API response data:', responseData);
    } catch (e) {
      console.error('Failed to parse response as JSON:', e);
      return {
        success: false,
        message: 'Invalid response from server',
        error: 'Parse Error'
      };
    }
    
    // Create a success response with the data
    const result: ApiResponse<AuthResponse> = {
      success: true,
      data: responseData,
      message: 'Login successful'
    };
    
    if (result.success && result.data) {
      console.log('Login successful, storing user data');
      
      // Check if the response has the expected structure
      if (result.data.accessToken && result.data.user) {
        setAuthTokens(result.data.accessToken, result.data.refreshToken || '');
        setCurrentUser(result.data.user);
        console.log('User data stored in localStorage:', localStorage.getItem('user'));
      } else {
        console.error('API response missing expected fields:', result.data);
        // Try to adapt to the API response structure
        if (responseData.token) {
          // If the API returns a token field instead of accessToken
          setAuthTokens(responseData.token, responseData.refreshToken || '');
          // If the API returns user data in a different field
          const userData = responseData.user || responseData.userData || responseData.data;
          if (userData) {
            setCurrentUser(userData);
            // Update the result.data to match what our app expects
            result.data = {
              user: userData,
              accessToken: responseData.token,
              refreshToken: responseData.refreshToken || ''
            };
          }
        }
      }
    } else {
      console.error('Login failed with API response:', result);
    }

    return result;
  } catch (error) {
    console.error('Login error:', error);
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
  resetToken: string,
  email: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USER.RESET_PASSWORD}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, resetToken, email }),
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
