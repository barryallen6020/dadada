
import { UserSignupData, UserSignupOrgData, AuthResponse, ForgotPasswordResponse } from "@/types/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.deskhive.app";

// Helper function to handle API errors
const handleError = (error: any) => {
  console.error("API Error:", error);
  const message = error.response?.data?.message || "An unexpected error occurred";
  return { success: false, message };
};

export const authService = {
  async signup(userData: UserSignupData): Promise<AuthResponse> {
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
      
      return { success: true, ...data };
    } catch (error) {
      return handleError(error);
    }
  },
  
  async signupWithOrg(userData: UserSignupOrgData): Promise<AuthResponse> {
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
      
      return { success: true, ...data };
    } catch (error) {
      return handleError(error);
    }
  },
  
  async checkEmailExists(email: string): Promise<{ success: boolean; exists: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/email-exists/${email}`);
      const data = await response.json();
      return { success: true, exists: data.exists };
    } catch (error) {
      return handleError(error);
    }
  },
  
  async verifyUser(email: string, isVerified: boolean): Promise<AuthResponse> {
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
      
      return { success: true, ...data };
    } catch (error) {
      return handleError(error);
    }
  },
  
  async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
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
      
      return { 
        success: true, 
        user: data.user, 
        token: data.token, 
        refreshToken: data.refreshToken 
      };
    } catch (error) {
      return handleError(error);
    }
  },
  
  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
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
  
  async resetPassword(password: string, resetToken: string, email: string): Promise<AuthResponse> {
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
  
  async changePassword(oldPassword: string, newPassword: string): Promise<AuthResponse> {
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
  },

  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    
    window.location.href = "/login";
  },
  
  isAuthenticated() {
    return localStorage.getItem("isLoggedIn") === "true" && !!localStorage.getItem("accessToken");
  },
  
  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }
};

export default authService;
