import React, { useState } from 'react';

const SimpleFormSection = ({ title, defaultFields = [], formData, onChange, errors = {} }) => {
    // Start with default fields - no complex storage logic for now
    const [fields, setFields] = useState(defaultFields);

    const addField = () => {
        const newField = {
            id: `custom_${Date.now()}`,
            name: `custom_${Date.now()}`,
            label: 'New Field',
            type: 'text',
            required: false,
            isCustom: true
        };
        setFields(prev => [...prev, newField]);
    };

    const removeField = (fieldId) => {
        setFields(prev => prev.filter(f => f.id !== fieldId));
        // Also remove the data for this field
        const fieldToRemove = fields.find(f => f.id === fieldId);
        if (fieldToRemove && onChange) {
            onChange(fieldToRemove.name, '');
        }
    };

    const updateFieldLabel = (fieldId, newLabel) => {
        setFields(prev => prev.map(f =>
            f.id === fieldId ? { ...f, label: newLabel } : f
        ));
    };

    const moveField = (fieldId, direction) => {
        setFields(prev => {
            const index = prev.findIndex(f => f.id === fieldId);
            if (index === -1) return prev;

            const newIndex = direction === 'up' ? index - 1 : index + 1;
            if (newIndex < 0 || newIndex >= prev.length) return prev;

            const newFields = [...prev];
            [newFields[index], newFields[newIndex]] = [newFields[newIndex], newFields[index]];
            return newFields;
        });
    };

    const renderField = (field, index) => {
        const value = formData[field.name] || '';

        return (
            <div key={field.id} className="simple-field-row">
                <div className="field-controls">
                    <button
                        type="button"
                        onClick={() => moveField(field.id, 'up')}
                        disabled={index === 0}
                        className="control-btn"
                        title="Move up"
                    >
                        ▲
                    </button>
                    <button
                        type="button"
                        onClick={() => moveField(field.id, 'down')}
                        disabled={index === fields.length - 1}
                        className="control-btn"
                        title="Move down"
                    >
                        ▼
                    </button>
                    {!field.required && (
                        <button
                            type="button"
                            onClick={() => removeField(field.id)}
                            className="control-btn delete-btn"
                            title="Delete field"
                        >
                            🗑️
                        </button>
                    )}
                </div>

                <div className="field-content">
                    <div className="field-label-container">
                        <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateFieldLabel(field.id, e.target.value)}
                            className="field-label-input"
                            placeholder="Field Label"
                        />
                        {field.required && <span className="required-star">*</span>}
                    </div>

                    <div className="field-input-container">
                        {field.type === 'select' ? (
                            <select
                                value={value}
                                onChange={(e) => onChange(field.name, e.target.value)}
                                className="form-select"
                            >
                                <option value="">Select</option>
                                {field.options?.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        ) : field.type === 'textarea' ? (
                            <textarea
                                value={value}
                                onChange={(e) => onChange(field.name, e.target.value)}
                                className="form-textarea"
                                rows={3}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                        ) : (
                            <input
                                type={field.type}
                                value={value}
                                onChange={(e) => onChange(field.name, e.target.value)}
                                className="form-input"
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required={field.required}
                            />
                        )}
                        {errors[field.name] && (
                            <span className="field-error">{errors[field.name]}</span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="simple-form-section">
            <div className="section-header">
                <h2 className="section-title">{title}</h2>
                <button
                    type="button"
                    onClick={addField}
                    className="add-field-btn"
                    title="Add new field"
                >
                    + Add Field
                </button>
            </div>

            <div className="fields-container">
                {fields && fields.length > 0 ? (
                    fields.map((field, index) => renderField(field, index))
                ) : (
                    <div className="no-fields-message">
                        No fields available. Click "Add Field" to get started.
                    </div>
                )}
            </div>
        </section>
    );
};

export default SimpleFormSection;