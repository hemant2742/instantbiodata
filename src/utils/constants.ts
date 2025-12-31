import { FormSection, Template } from '../types';

// Form configuration
export const FORM_SECTIONS: FormSection[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
      { name: 'timeOfBirth', label: 'Time of Birth', type: 'time' },
      { name: 'placeOfBirth', label: 'Place of Birth', type: 'text' },
      { name: 'height', label: 'Height', type: 'text', placeholder: 'e.g., 5\'6"' },
      { name: 'weight', label: 'Weight', type: 'text', placeholder: 'e.g., 65 kg' },
      { 
        name: 'complexion', 
        label: 'Complexion', 
        type: 'select',
        options: ['', 'Fair', 'Medium', 'Dark']
      },
      { 
        name: 'bloodGroup', 
        label: 'Blood Group', 
        type: 'select',
        options: ['', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
      }
    ]
  },
  {
    id: 'family',
    title: 'Family Information',
    fields: [
      { name: 'fatherName', label: 'Father\'s Name', type: 'text' },
      { name: 'fatherOccupation', label: 'Father\'s Occupation', type: 'text' },
      { name: 'motherName', label: 'Mother\'s Name', type: 'text' },
      { name: 'motherOccupation', label: 'Mother\'s Occupation', type: 'text' },
      { name: 'siblings', label: 'Siblings', type: 'text', placeholder: 'e.g., 1 Brother, 1 Sister' },
      { 
        name: 'familyType', 
        label: 'Family Type', 
        type: 'select',
        options: ['', 'Nuclear', 'Joint']
      }
    ]
  },
  {
    id: 'education',
    title: 'Educational & Professional',
    fields: [
      { name: 'education', label: 'Education', type: 'text', required: true },
      { name: 'occupation', label: 'Occupation', type: 'text', required: true },
      { name: 'income', label: 'Annual Income', type: 'text', placeholder: 'e.g., 5-10 LPA' },
      { name: 'workLocation', label: 'Work Location', type: 'text' }
    ]
  },
  {
    id: 'contact',
    title: 'Contact Information',
    fields: [
      { name: 'address', label: 'Address', type: 'textarea', required: true, fullWidth: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email', type: 'email' }
    ]
  },
  {
    id: 'partner',
    title: 'Partner Preferences',
    fields: [
      { name: 'partnerAge', label: 'Preferred Age Range', type: 'text', placeholder: 'e.g., 25-30 years' },
      { name: 'partnerHeight', label: 'Preferred Height', type: 'text', placeholder: 'e.g., 5\'4" - 5\'8"' },
      { name: 'partnerEducation', label: 'Preferred Education', type: 'text' },
      { name: 'partnerOccupation', label: 'Preferred Occupation', type: 'text' }
    ]
  },
  {
    id: 'additional',
    title: 'Additional Information',
    fields: [
      { name: 'hobbies', label: 'Hobbies & Interests', type: 'textarea', fullWidth: true },
      { name: 'additionalInfo', label: 'Additional Information', type: 'textarea', fullWidth: true }
    ]
  }
];

// Template configurations
export const TEMPLATES: Template[] = [
  {
    id: 'classic',
    name: 'Classic Golden',
    description: 'Traditional design with golden borders and elegant decorative elements',
    preview: 'classic-preview',
    popular: true,
    colors: {
      primary: '#d4af37',
      secondary: '#8b4513',
      accent: '#ff6b35',
      background: '#fff8dc'
    }
  },
  {
    id: 'modern',
    name: 'Pink Floral',
    description: 'Beautiful pink theme with floral decorative borders',
    preview: 'modern-preview',
    popular: true,
    colors: {
      primary: '#e91e63',
      secondary: '#ad1457',
      accent: '#f06292',
      background: '#fce4ec'
    }
  },
  {
    id: 'floral',
    name: 'Purple Elegant',
    description: 'Sophisticated purple design with ornate decorative patterns',
    preview: 'floral-preview',
    popular: false,
    colors: {
      primary: '#9c27b0',
      secondary: '#6a1b9a',
      accent: '#ba68c8',
      background: '#f3e5f5'
    }
  },
  {
    id: 'royal',
    name: 'Orange Traditional',
    description: 'Vibrant orange theme with traditional Indian motifs',
    preview: 'royal-preview',
    popular: true,
    colors: {
      primary: '#ff9800',
      secondary: '#f57c00',
      accent: '#ffb74d',
      background: '#fff3e0'
    }
  },
  {
    id: 'simple',
    name: 'Blue Classic',
    description: 'Clean blue design with simple elegant borders',
    preview: 'simple-preview',
    popular: false,
    colors: {
      primary: '#2196f3',
      secondary: '#1976d2',
      accent: '#64b5f6',
      background: '#e3f2fd'
    }
  },
  {
    id: 'artistic',
    name: 'Green Nature',
    description: 'Fresh green theme with natural decorative elements',
    preview: 'artistic-preview',
    popular: false,
    colors: {
      primary: '#4caf50',
      secondary: '#388e3c',
      accent: '#81c784',
      background: '#e8f5e8'
    }
  }
];

// PDF generation constants
export const PDF_CONFIG = {
  DEFAULT_SCALE: 2, // Reduced for A4 to avoid memory issues
  MAX_SCALE: 4,
  DEFAULT_QUALITY: 1.0, // Maximum quality
  TIMEOUT: 30000, // Increased timeout
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_FORMATS: ['image/jpeg', 'image/png', 'image/webp']
};

// Local storage keys
export const STORAGE_KEYS = {
  BIODATA_FORM: 'biodataFormData',
  SELECTED_TEMPLATE: 'selectedTemplate',
  USER_PREFERENCES: 'userPreferences'
};

// Validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  NAME: /^[a-zA-Z\s]{2,50}$/
};