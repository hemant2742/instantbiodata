import { FormField, FormSection } from '../types';

export interface CustomField extends FormField {
  id: string;
  isCustom: boolean;
  order: number;
}

export interface CustomSection extends Omit<FormSection, 'fields'> {
  fields: CustomField[];
  isCustom: boolean;
  order: number;
}

// Field templates for quick addition
export const FIELD_TEMPLATES: Omit<CustomField, 'id' | 'order'>[] = [
  {
    name: 'customText' as any,
    label: 'Custom Text Field',
    type: 'text',
    isCustom: true,
    placeholder: 'Enter custom information'
  },
  {
    name: 'customSelect' as any,
    label: 'Custom Selection',
    type: 'select',
    isCustom: true,
    options: ['Option 1', 'Option 2', 'Option 3']
  },
  {
    name: 'customTextarea' as any,
    label: 'Custom Long Text',
    type: 'textarea',
    isCustom: true,
    fullWidth: true,
    placeholder: 'Enter detailed information'
  },
  {
    name: 'customDate' as any,
    label: 'Custom Date',
    type: 'date',
    isCustom: true
  },
  {
    name: 'customEmail' as any,
    label: 'Custom Email',
    type: 'email',
    isCustom: true
  },
  {
    name: 'customPhone' as any,
    label: 'Custom Phone',
    type: 'tel',
    isCustom: true
  }
];

class FieldManager {
  private static instance: FieldManager;
  private customFields: Map<string, CustomField> = new Map();
  private fieldOrder: Map<string, number> = new Map();

  static getInstance(): FieldManager {
    if (!FieldManager.instance) {
      FieldManager.instance = new FieldManager();
    }
    return FieldManager.instance;
  }

  // Generate unique field ID
  private generateFieldId(): string {
    return `custom_field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Add a new custom field
  addCustomField(
    sectionId: string, 
    template: Omit<CustomField, 'id' | 'order'>, 
    position?: number
  ): CustomField {
    const fieldId = this.generateFieldId();
    const order = position ?? this.getNextOrder(sectionId);
    
    const customField: CustomField = {
      ...template,
      id: fieldId,
      name: fieldId as any, // Use ID as name for custom fields
      order,
      isCustom: true
    };

    this.customFields.set(fieldId, customField);
    this.fieldOrder.set(fieldId, order);
    
    return customField;
  }

  // Remove a custom field
  removeCustomField(fieldId: string): boolean {
    const removed = this.customFields.delete(fieldId);
    this.fieldOrder.delete(fieldId);
    return removed;
  }

  // Update field properties
  updateField(fieldId: string, updates: Partial<CustomField>): CustomField | null {
    const field = this.customFields.get(fieldId);
    if (!field) return null;

    const updatedField = { ...field, ...updates };
    this.customFields.set(fieldId, updatedField);
    
    return updatedField;
  }

  // Reorder fields within a section
  reorderFields(sectionId: string, fieldIds: string[]): void {
    fieldIds.forEach((fieldId, index) => {
      const field = this.customFields.get(fieldId);
      if (field) {
        field.order = index;
        this.fieldOrder.set(fieldId, index);
      }
    });
  }

  // Get all custom fields for a section
  getCustomFields(sectionId: string): CustomField[] {
    return Array.from(this.customFields.values())
      .filter(field => field.id.includes(sectionId) || !field.id.includes('_section_'))
      .sort((a, b) => a.order - b.order);
  }

  // Get next order number for a section
  private getNextOrder(sectionId: string): number {
    const sectionFields = this.getCustomFields(sectionId);
    return sectionFields.length > 0 
      ? Math.max(...sectionFields.map(f => f.order)) + 1 
      : 0;
  }

  // Merge custom fields with default fields
  mergeWithDefaultFields(defaultFields: FormField[]): CustomField[] {
    const defaultCustomFields: CustomField[] = defaultFields.map((field, index) => ({
      ...field,
      id: `default_${field.name}`,
      isCustom: false,
      order: index
    }));

    const customFields = Array.from(this.customFields.values());
    
    return [...defaultCustomFields, ...customFields]
      .sort((a, b) => a.order - b.order);
  }

  // Export configuration
  exportConfiguration(): any {
    return {
      customFields: Array.from(this.customFields.entries()),
      fieldOrder: Array.from(this.fieldOrder.entries())
    };
  }

  // Import configuration
  importConfiguration(config: any): void {
    this.customFields.clear();
    this.fieldOrder.clear();

    if (config.customFields) {
      config.customFields.forEach(([id, field]: [string, CustomField]) => {
        this.customFields.set(id, field);
      });
    }

    if (config.fieldOrder) {
      config.fieldOrder.forEach(([id, order]: [string, number]) => {
        this.fieldOrder.set(id, order);
      });
    }
  }

  // Clear all custom fields
  clearCustomFields(): void {
    this.customFields.clear();
    this.fieldOrder.clear();
  }
}

export const fieldManager = FieldManager.getInstance();

// Utility functions
export const addCustomField = (
  sectionId: string, 
  template: Omit<CustomField, 'id' | 'order'>, 
  position?: number
): CustomField => {
  return fieldManager.addCustomField(sectionId, template, position);
};

export const removeCustomField = (fieldId: string): boolean => {
  return fieldManager.removeCustomField(fieldId);
};

export const updateField = (fieldId: string, updates: Partial<CustomField>): CustomField | null => {
  return fieldManager.updateField(fieldId, updates);
};

export const reorderFields = (sectionId: string, fieldIds: string[]): void => {
  fieldManager.reorderFields(sectionId, fieldIds);
};

export const getCustomFields = (sectionId: string): CustomField[] => {
  return fieldManager.getCustomFields(sectionId);
};

export const mergeWithDefaultFields = (defaultFields: FormField[]): CustomField[] => {
  return fieldManager.mergeWithDefaultFields(defaultFields);
};