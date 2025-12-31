import React, { useState } from 'react';
import FormField from './FormField';
import { removeCustomField, updateField } from '../../utils/fieldManager';

const DraggableField = ({
    field,
    value,
    onChange,
    error,
    onRemove,
    onEdit,
    isDragging,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editConfig, setEditConfig] = useState({
        label: field.label,
        placeholder: field.placeholder || '',
        required: field.required || false
    });

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        const updatedField = updateField(field.id, editConfig);
        if (updatedField) {
            onEdit(updatedField);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditConfig({
            label: field.label,
            placeholder: field.placeholder || '',
            required: field.required || false
        });
        setIsEditing(false);
    };

    const handleRemove = () => {
        if (window.confirm(`Are you sure you want to remove "${field.label}"?`)) {
            removeCustomField(field.id);
            onRemove(field.id);
        }
    };

    if (isEditing) {
        return (
            <div className="field-edit-mode">
                <div className="edit-form">
                    <div className="form-group">
                        <label>Field Label</label>
                        <input
                            type="text"
                            value={editConfig.label}
                            onChange={(e) => setEditConfig(prev => ({ ...prev, label: e.target.value }))}
                            className="form-input"
                        />
                    </div>

                    {field.type !== 'select' && (
                        <div className="form-group">
                            <label>Placeholder</label>
                            <input
                                type="text"
                                value={editConfig.placeholder}
                                onChange={(e) => setEditConfig(prev => ({ ...prev, placeholder: e.target.value }))}
                                className="form-input"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={editConfig.required}
                                onChange={(e) => setEditConfig(prev => ({ ...prev, required: e.target.checked }))}
                            />
                            Required field
                        </label>
                    </div>

                    <div className="edit-actions">
                        <button onClick={handleCancelEdit} className="btn btn-secondary btn-sm">
                            Cancel
                        </button>
                        <button onClick={handleSaveEdit} className="btn btn-primary btn-sm">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`draggable-field ${isDragging ? 'dragging' : ''}`}
            draggable={field.isCustom}
            onDragStart={(e) => onDragStart(e, field.id)}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, field.id)}
        >
            <div className="field-wrapper">
                <FormField
                    field={field}
                    value={value}
                    onChange={onChange}
                    error={error}
                />

                {field.isCustom && (
                    <div className="field-controls">
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="field-control-btn edit-btn"
                            title="Edit field"
                        >
                            ✏️
                        </button>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="field-control-btn remove-btn"
                            title="Remove field"
                        >
                            🗑️
                        </button>
                        <div className="drag-handle" title="Drag to reorder">
                            ⋮⋮
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DraggableField;