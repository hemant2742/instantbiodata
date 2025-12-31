// Type definitions for the biodata application

export interface BiodataData {
  // Personal Information
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  height: string;
  weight: string;
  complexion: string;
  bloodGroup: string;
  
  // Family Information
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  siblings: string;
  familyType: string;
  
  // Educational & Professional
  education: string;
  occupation: string;
  income: string;
  workLocation: string;
  
  // Contact Information
  address: string;
  phone: string;
  email: string;
  
  // Partner Preferences
  partnerAge: string;
  partnerHeight: string;
  partnerEducation: string;
  partnerOccupation: string;
  
  // Additional Information
  hobbies: string;
  additionalInfo: string;
  profileImage: string | null;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  popular: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface FormField {
  name: keyof BiodataData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'time' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  fullWidth?: boolean;
}

export interface PDFOptions {
  scale: number;
  format: 'a4' | 'letter';
  orientation: 'portrait' | 'landscape';
  quality: number;
  filename?: string;
}