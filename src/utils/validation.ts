import { BiodataData } from '../types';
import { VALIDATION_PATTERNS } from './constants';

export interface ValidationError {
  field: keyof BiodataData;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Field-specific validators
const validators = {
  name: (value: string): string | null => {
    if (!value.trim()) return 'Name is required';
    if (value.length < 2) return 'Name must be at least 2 characters';
    if (value.length > 50) return 'Name must be less than 50 characters';
    if (!VALIDATION_PATTERNS.NAME.test(value)) return 'Name can only contain letters and spaces';
    return null;
  },

  email: (value: string): string | null => {
    if (!value.trim()) return null; // Email is optional
    if (!VALIDATION_PATTERNS.EMAIL.test(value)) return 'Please enter a valid email address';
    return null;
  },

  phone: (value: string): string | null => {
    if (!value.trim()) return 'Phone number is required';
    if (!VALIDATION_PATTERNS.PHONE.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  dateOfBirth: (value: string): string | null => {
    if (!value.trim()) return 'Date of birth is required';
    const date = new Date(value);
    const now = new Date();
    const age = now.getFullYear() - date.getFullYear();
    
    if (isNaN(date.getTime())) return 'Please enter a valid date';
    if (date > now) return 'Date of birth cannot be in the future';
    if (age < 18) return 'Age must be at least 18 years';
    if (age > 100) return 'Please enter a valid date of birth';
    
    return null;
  },

  education: (value: string): string | null => {
    if (!value.trim()) return 'Education is required';
    if (value.length < 2) return 'Education must be at least 2 characters';
    return null;
  },

  occupation: (value: string): string | null => {
    if (!value.trim()) return 'Occupation is required';
    if (value.length < 2) return 'Occupation must be at least 2 characters';
    return null;
  },

  address: (value: string): string | null => {
    if (!value.trim()) return 'Address is required';
    if (value.length < 10) return 'Please enter a complete address';
    return null;
  }
};

// Validate individual field
export const validateField = (field: keyof BiodataData, value: string): string | null => {
  const validator = validators[field as keyof typeof validators];
  return validator ? validator(value) : null;
};

// Validate entire form
export const validateForm = (data: Partial<BiodataData>): ValidationResult => {
  const errors: ValidationError[] = [];
  
  // Required fields validation
  const requiredFields: (keyof BiodataData)[] = ['name', 'dateOfBirth', 'education', 'occupation', 'address', 'phone'];
  
  requiredFields.forEach(field => {
    const value = data[field] || '';
    const error = validateField(field, value);
    if (error) {
      errors.push({ field, message: error });
    }
  });

  // Optional fields validation (only if they have values)
  const optionalFields: (keyof BiodataData)[] = ['email'];
  
  optionalFields.forEach(field => {
    const value = data[field] || '';
    if (value) {
      const error = validateField(field, value);
      if (error) {
        errors.push({ field, message: error });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Get user-friendly field names
export const getFieldDisplayName = (field: keyof BiodataData): string => {
  const displayNames: Record<keyof BiodataData, string> = {
    name: 'Full Name',
    dateOfBirth: 'Date of Birth',
    timeOfBirth: 'Time of Birth',
    placeOfBirth: 'Place of Birth',
    height: 'Height',
    weight: 'Weight',
    complexion: 'Complexion',
    bloodGroup: 'Blood Group',
    fatherName: 'Father\'s Name',
    fatherOccupation: 'Father\'s Occupation',
    motherName: 'Mother\'s Name',
    motherOccupation: 'Mother\'s Occupation',
    siblings: 'Siblings',
    familyType: 'Family Type',
    education: 'Education',
    occupation: 'Occupation',
    income: 'Annual Income',
    workLocation: 'Work Location',
    address: 'Address',
    phone: 'Phone Number',
    email: 'Email',
    partnerAge: 'Preferred Age Range',
    partnerHeight: 'Preferred Height',
    partnerEducation: 'Preferred Education',
    partnerOccupation: 'Preferred Occupation',
    hobbies: 'Hobbies & Interests',
    additionalInfo: 'Additional Information',
    profileImage: 'Profile Image'
  };

  return displayNames[field] || field;
};