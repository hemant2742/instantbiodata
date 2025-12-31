import React, { useState } from 'react';
import { FIELD_TEMPLATES, addCustomField, removeCustomField, updateField } from '../../utils/fieldManager';

const FieldEditor = ({ sectionId, onFieldsChange, isOpen, onClose }) => {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [fieldConfig, setFieldConfig] = useState({
        label: '',
        placeholder: '',
        required: false,
        options: []
    });

    const handleAddField = () => {
        if (!selectedTemplate) return;

        const newField = addCustomField(sectionId, {
            ...selectedTemplate,
            ...fieldConfig,
            options: selectedTemplate.type === 'select' ? fieldConfig.options : undefined
        });

        onFieldsChange();
        handleClose();
    };

    const handleClose = () => {
        setSelectedTemplate(null);
        setFieldConfig({
            label: '',
            placeholder: '',
            required: false,
            options: []
        });
        onClose();
    };

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setFieldConfig({
            label: template.label,
            placeholder: template.placeholder || '',
            required: false,
            options: template.options || []
        });
    };

    const handleOptionsChange = (optionsText) => {
        const options = optionsText.split('\n').filter(opt => opt.trim());
        setFieldConfig(prev => ({ ...prev, options }));
    };

    if (!isOpen) return null;

    return (
        <div className="field-editor-modal">
            <div className="field-editor-overlay">
                <div className="field-editor-container">
                    <div className="field-editor-header">
                        <h3>Add Custom Field</h3>
                        <button onClick={handleClose} className="close-btn">✕</button>
                    </div>

                    <div className="field-editor-content">
                        {!selectedTemplate ? (
                            <div className="template-selection">
                                <h4>Choose Field Type</h4>
                                <div className="template-grid">
                                    {FIELD_TEMPLATES.map((template, index) => (
                                        <div
                                            key={index}
                                            className="template-card"
                                            onClick={() => handleTemplateSelect(template)}
                                        >
                                            <div className="template-icon">
                                                {template.type === 'text' && '📝'}
                                                {template.type === 'select' && '📋'}
                                                {template.type === 'textarea' && '📄'}
                                                {template.type === 'date' && '📅'}
                                                {template.type === 'email' && '📧'}
                                                {template.type === 'tel' && '📞'}
                                            </div>
                                            <div className="template-name">{template.label}</div>
                                            <div className="template-type">{template.type}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="field-configuration">
                                <button
                                    onClick={() => setSelectedTemplate(null)}
                                    className="back-btn"
                                >
                                    ← Back to Templates
                                </button>

                                <h4>Configure {selectedTemplate.label}</h4>

                                <div className="config-form">
                                    <div className="form-group">
                                        <label>Field Label *</label>
                                        <input
                                            type="text"
                                            value={fieldConfig.label}
                                            onChange={(e) => setFieldConfig(prev => ({ ...prev, label: e.target.value }))}
                                            placeholder="Enter field label"
                                            className="form-input"
                                        />
                                    </div>

                                    {selectedTemplate.type !== 'select' && (
                                        <div className="form-group">
                                            <label>Placeholder Text</label>
                                            <input
                                                type="text"
                                                value={fieldConfig.placeholder}
                                                onChange={(e) => setFieldConfig(prev => ({ ...prev, placeholder: e.target.value }))}
                                                placeholder="Enter placeholder text"
                                                className="form-input"
                                            />
                                        </div>
                                    )}

                                    {selectedTemplate.type === 'select' && (
                                        <div className="form-group">
                                            <label>Options (one per line) *</label>
                                            <textarea
                                                value={fieldConfig.options.join('\n')}
                                                onChange={(e) => handleOptionsChange(e.target.value)}
                                                placeholder="Option 1&#10;Option 2&#10;Option 3"
                                                className="form-textarea"
                                                rows={4}
                                            />
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={fieldConfig.required}
                                                onChange={(e) => setFieldConfig(prev => ({ ...prev, required: e.target.checked }))}
                                            />
                                            Required field
                                        </label>
                                    </div>
                                </div>

                                <div className="field-editor-actions">
                                    <button onClick={handleClose} className="btn btn-secondary">
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddField}
                                        className="btn btn-primary"
                                        disabled={!fieldConfig.label || (selectedTemplate.type === 'select' && fieldConfig.options.length === 0)}
                                    >
                                        Add Field
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FieldEditor;