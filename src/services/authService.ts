
// Fix the checkEmailExists function to return the correct type
export const checkEmailExists = async (email: string) => {
  try {
    // This would be a real API call in a production application
    // For now, we'll just simulate a response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate some validation logic
    if (!email.includes('@')) {
      return { 
        success: false, 
        exists: false
      };
    }
    
    // Check if the email exists in our "database"
    // For demo purposes, we'll pretend these emails exist
    const existingEmails = [
      'john@example.com',
      'jane@example.com',
      'admin@deskhive.app',
      'manager@deskhive.app'
    ];
    
    const exists = existingEmails.includes(email.toLowerCase());
    
    return { 
      success: true, 
      exists 
    };
    
  } catch (error) {
    return { 
      success: false, 
      exists: false
    };
  }
};
