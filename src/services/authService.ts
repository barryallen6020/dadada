
import { toast } from "sonner";

// API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.deskhive.app";

// Types for user data
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

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  token: string;
  refreshToken: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}

// Helper function to handle API errors
const handleError = (error: any) => {
  console.error("API Error:", error);
  const message = error.response?.data?.message || "An unexpected error occurred";
  toast.error(message);
  return { success: false, message };
};

// Authentication service functions
export const authService = {
  // User signup
  async signup(userData: UserSignupData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }
      
      return { success: true, data };
    } catch (error) {
      return handleError(error);
    }
  },
  
  // User signup with organization
  async signupWithOrg(userData: UserSignupOrgData) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/signup-org`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up with organization");
      }
      
      return { success: true, data };
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Check if email exists
  async checkEmailExists(email: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/email-exists/${email}`, {
        method: "GET",
      });
      
      const data = await response.json();
      return { success: true, exists: data.exists };
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Verify user account
  async verifyUser(email: string, isVerified: boolean) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/verify-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, isVerified }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to verify user");
      }
      
      return { success: true, data };
    } catch (error) {
      return handleError(error);
    }
  },
  
  // User login
  async login(loginData: UserLoginData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      
      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");
      
      return { success: true, user: data.user };
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Refresh token
  async refreshToken(refreshTokenData: RefreshTokenData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(refreshTokenData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to refresh token");
      }
      
      // Update tokens in localStorage
      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      
      return { success: true, token: data.token, refreshToken: data.refreshToken };
    } catch (error) {
      // If refresh fails, logout
      authService.logout();
      return handleError(error);
    }
  },
  
  // User logout
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    
    // Redirect to login page
    window.location.href = "/login";
  },
  
  // Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem("isLoggedIn") === "true" && !!localStorage.getItem("accessToken");
  },
  
  // Get current user data
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
  
  // Forgot password
  async forgotPassword(email: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/forgot-password/${email}`, {
        method: "POST",
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to process forgot password request");
      }
      
      return { success: true, message: "Password reset email sent" };
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Reset password
  async resetPassword(password: string, resetToken: string, email: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, resetToken, email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }
      
      return { success: true, message: "Password has been reset" };
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Change password
  async changePassword(oldPassword: string, newPassword: string) {
    try {
      const token = localStorage.getItem("accessToken");
      
      if (!token) {
        throw new Error("You must be logged in to change password");
      }
      
      const response = await fetch(`${API_BASE_URL}/user/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }
      
      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      return handleError(error);
    }
  }
};

export default authService;
