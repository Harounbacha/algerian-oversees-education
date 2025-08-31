// Input validation utilities
export class ValidationService {
  // Email validation
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password validation
  static isValidPassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Name validation
  static isValidName(name: string): boolean {
    return name.trim().length >= 2 && name.trim().length <= 50;
  }

  // Phone validation
  static isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // URL validation
  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // File validation
  static isValidFile(file: File, maxSize: number = 10 * 1024 * 1024): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
    }
    
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      errors.push('File type not supported. Please use PDF, image, or Word documents.');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Sanitize input
  static sanitizeInput(input: string): string {
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove JavaScript protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers
  }

  // Validate form data
  static validateFormData(data: Record<string, any>, rules: Record<string, any>): { isValid: boolean; errors: Record<string, string[]> } {
    const errors: Record<string, string[]> = {};
    let isValid = true;

    for (const [field, rule] of Object.entries(rules)) {
      const value = data[field];
      const fieldErrors: string[] = [];

      if (rule.required && (!value || value.trim() === '')) {
        fieldErrors.push(`${rule.label || field} is required`);
        isValid = false;
      }

      if (value && rule.type === 'email' && !this.isValidEmail(value)) {
        fieldErrors.push('Please enter a valid email address');
        isValid = false;
      }

      if (value && rule.type === 'password') {
        const passwordValidation = this.isValidPassword(value);
        if (!passwordValidation.isValid) {
          fieldErrors.push(...passwordValidation.errors);
          isValid = false;
        }
      }

      if (value && rule.minLength && value.length < rule.minLength) {
        fieldErrors.push(`${rule.label || field} must be at least ${rule.minLength} characters`);
        isValid = false;
      }

      if (value && rule.maxLength && value.length > rule.maxLength) {
        fieldErrors.push(`${rule.label || field} must be less than ${rule.maxLength} characters`);
        isValid = false;
      }

      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
      }
    }

    return { isValid, errors };
  }
}

// Common validation rules
export const validationRules = {
  login: {
    email: { required: true, type: 'email', label: 'Email' },
    password: { required: true, type: 'password', label: 'Password' }
  },
  
  register: {
    full_name: { required: true, minLength: 2, maxLength: 50, label: 'Full Name' },
    email: { required: true, type: 'email', label: 'Email' },
    password: { required: true, type: 'password', label: 'Password' },
    confirm_password: { required: true, label: 'Confirm Password' },
    education_level: { required: true, label: 'Education Level' },
    field_of_study: { required: true, label: 'Field of Study' },
    location: { required: true, label: 'Location' }
  },
  
  profile: {
    full_name: { required: true, minLength: 2, maxLength: 50, label: 'Full Name' },
    email: { required: true, type: 'email', label: 'Email' },
    phone: { required: false, type: 'phone', label: 'Phone' },
    location: { required: false, maxLength: 100, label: 'Location' },
    bio: { required: false, maxLength: 500, label: 'Bio' }
  }
};
