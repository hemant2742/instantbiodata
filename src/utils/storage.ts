import { BiodataData, Template } from '../types';
import { STORAGE_KEYS } from './constants';

// Generic storage utility
class StorageManager {
  private isAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  set<T>(key: string, value: T): boolean {
    if (!this.isAvailable()) return false;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  get<T>(key: string, defaultValue: T): T {
    if (!this.isAvailable()) return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  remove(key: string): boolean {
    if (!this.isAvailable()) return false;
    
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  clear(): boolean {
    if (!this.isAvailable()) return false;
    
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }
}

const storage = new StorageManager();

// Biodata-specific storage functions
export const biodataStorage = {
  saveFormData: (data: Partial<BiodataData>): boolean => {
    return storage.set(STORAGE_KEYS.BIODATA_FORM, data);
  },

  loadFormData: (): Partial<BiodataData> => {
    return storage.get(STORAGE_KEYS.BIODATA_FORM, {
      name: '',
      dateOfBirth: '',
      timeOfBirth: '',
      placeOfBirth: '',
      height: '',
      weight: '',
      complexion: '',
      bloodGroup: '',
      fatherName: '',
      fatherOccupation: '',
      motherName: '',
      motherOccupation: '',
      siblings: '',
      familyType: '',
      education: '',
      occupation: '',
      income: '',
      workLocation: '',
      address: '',
      phone: '',
      email: '',
      partnerAge: '',
      partnerHeight: '',
      partnerEducation: '',
      partnerOccupation: '',
      hobbies: '',
      additionalInfo: '',
      profileImage: null
    });
  },

  clearFormData: (): boolean => {
    return storage.remove(STORAGE_KEYS.BIODATA_FORM);
  },

  saveSelectedTemplate: (template: Template): boolean => {
    return storage.set(STORAGE_KEYS.SELECTED_TEMPLATE, template);
  },

  loadSelectedTemplate: (): Template | null => {
    return storage.get(STORAGE_KEYS.SELECTED_TEMPLATE, null);
  },

  clearSelectedTemplate: (): boolean => {
    return storage.remove(STORAGE_KEYS.SELECTED_TEMPLATE);
  }
};

export default storage;