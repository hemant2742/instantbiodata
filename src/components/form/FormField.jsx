import React from 'react';

const FormField = ({ field, value, onChange, error }) => {
    const { name, label, type, required, placeholder, options, fullWidth } = field;

    const handleChange = (e) => {
        onChange(name, e.target.value);
    };

    const renderInput = () => {
        switch (type) {
            case 'textarea':
                return (
                    <textarea
                        name={name}
                        value={value || ''}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className={`form-textarea ${error ? 'error' : ''}`}
                        rows={3}
                    />
                );

            case 'select':
                return (
                    <select
                        name={name}
                        value={value || ''}
                        onChange={handleChange}
                        className={`form-select ${error ? 'error' : ''}`}
                    >
                        {options?.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            default:
                return (
                    <input
                        type={type}
                        name={name}
                        value={value || ''}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                        className={`form-input ${error ? 'error' : ''}`}
                    />
                );
        }
    };

    return (
        <div className={`form-group ${fullWidth ? 'full-width' : ''}`}>
            <label className={`form-label ${required ? 'required' : ''}`}>
                {label}
                {required && ' *'}
            </label>
            {renderInput()}
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default FormField;