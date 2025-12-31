import React, { useState } from 'react';
import { validateImageFile, processImageFile } from '../../utils/imageUtils';

const ImageUpload = ({ value, onChange, onCropRequest }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Clear previous error
        setError('');

        // Validate file
        const validation = validateImageFile(file);
        if (!validation.isValid) {
            setError(validation.error);
            return;
        }

        setIsUploading(true);

        try {
            // Process file to data URL
            const result = await processImageFile(file);

            if (result.success && result.data) {
                // Request cropping
                onCropRequest(result.data);
            } else {
                setError(result.error || 'Failed to process image');
            }
        } catch (error) {
            setError('Failed to upload image');
            console.error('Image upload error:', error);
        } finally {
            setIsUploading(false);
            // Clear the input
            e.target.value = '';
        }
    };

    const handleRemove = () => {
        onChange(null);
        setError('');
    };

    return (
        <div className="image-upload-section">
            <label className="form-label">Profile Photo</label>
            <div className="image-upload-container">
                {value ? (
                    <div className="image-preview">
                        <img
                            src={value}
                            alt="Profile"
                            className="uploaded-image"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="remove-image-btn"
                            title="Remove image"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className="image-upload-placeholder">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="image-input"
                            id="profile-image"
                            disabled={isUploading}
                        />
                        <label htmlFor="profile-image" className="image-upload-label">
                            <div className="upload-icon">
                                {isUploading ? '⏳' : '📷'}
                            </div>
                            <div className="upload-text">
                                <span>
                                    {isUploading ? 'Processing...' : 'Click to upload photo'}
                                </span>
                                <small>JPG, PNG, WebP up to 5MB</small>
                            </div>
                        </label>
                    </div>
                )}
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default ImageUpload;