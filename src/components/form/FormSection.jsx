import React, { useState } from 'react';
import DraggableField from './DraggableField';
import FieldEditor from './FieldEditor';
import { mergeWithDefaultFields, reorderFields } from '../../utils/fieldManager';

const FormSection = ({ section, formData, onChange, errors = {}, onFieldsUpdate }) => {
    const [showFieldEditor, setShowFieldEditor] = useState(false);
    const [draggedField, setDraggedField] = useState(null);
    const [fields, setFields] = useState(() => mergeWithDefaultFields(section.fields));

    const handleFieldsChange = () => {
        const updatedFields = mergeWithDefaultFields(section.fields);
        setFields(updatedFields);
        if (onFieldsUpdate) {
            onFieldsUpdate(section.id, updatedFields);
        }
    };

    const handleDragStart = (e, fieldId) => {
        setDraggedField(fieldId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setDraggedField(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetFieldId) => {
        e.preventDefault();

        if (!draggedField || draggedField === targetFieldId) return;

        const newFields = [...fields];
        const draggedIndex = newFields.findIndex(f => f.id === draggedField);
        const targetIndex = newFields.findIndex(f => f.id === targetFieldId);

        if (draggedIndex === -1 || targetIndex === -1) return;

        // Remove dragged field and insert at target position
        const [draggedFieldObj] = newFields.splice(draggedIndex, 1);
        newFields.splice(targetIndex, 0, draggedFieldObj);

        // Update order
        const fieldIds = newFields.map(f => f.id);
        reorderFields(section.id, fieldIds);

        setFields(newFields);
        setDraggedField(null);

        if (onFieldsUpdate) {
            onFieldsUpdate(section.id, updatedFields);
        }
    };

    const handleFieldRemove = (fieldId) => {
        const updatedFields = fields.filter(f => f.id !== fieldId);
        setFields(updatedFields);

        if (onFieldsUpdate) {
            onFieldsUpdate(section.id, updatedFields);
        }
    };

    const handleFieldEdit = (updatedField) => {
        const updatedFields = fields.map(f =>
            f.id === updatedField.id ? updatedField : f
        );
        setFields(updatedFields);

        if (onFieldsUpdate) {
            onFieldsUpdate(section.id, updatedFields);
        }
    };

    return (
        <section className="form-section">
            <div className="section-header">
                <h2 className="section-title">{section.title}</h2>
                <button
                    type="button"
                    onClick={() => setShowFieldEditor(true)}
                    className="btn btn-secondary btn-sm add-field-btn"
                    title="Add custom field"
                >
                    ➕ Add Field
                </button>
            </div>

            <div className="form-grid">
                {fields.map((field) => (
                    <DraggableField
                        key={field.id}
                        field={field}
                        value={formData[field.name]}
                        onChange={onChange}
                        error={errors[field.name]}
                        onRemove={handleFieldRemove}
                        onEdit={handleFieldEdit}
                        isDragging={draggedField === field.id}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    />
                ))}
            </div>

            <FieldEditor
                sectionId={section.id}
                onFieldsChange={handleFieldsChange}
                isOpen={showFieldEditor}
                onClose={() => setShowFieldEditor(false)}
            />
        </section>
    );
};

export default FormSection;