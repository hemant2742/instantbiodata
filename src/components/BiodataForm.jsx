import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BiodataPreview from './BiodataPreview';
import PDFGenerator from './PDFGenerator';
import ImageCropper from './ImageCropper';

const BiodataForm = ({ onSubmit, selectedTemplate }) => {
    const navigate = useNavigate();

    // Load saved data from localStorage on component mount
    const loadSavedData = () => {
        try {
            const saved = localStorage.getItem('biodataFormData');
            return saved ? JSON.parse(saved) : {
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
            };
        } catch (error) {
            console.error('Error loading saved data:', error);
            return {
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
            };
        }
    };

    const [formData, setFormData] = useState(loadSavedData);
    const [showCropper, setShowCropper] = useState(false);
    const [tempImage, setTempImage] = useState(null);

    // Save to localStorage whenever form data changes
    useEffect(() => {
        const saveTimer = setTimeout(() => {
            try {
                localStorage.setItem('biodataFormData', JSON.stringify(formData));
                // Show save indicator briefly
                const indicator = document.getElementById('auto-save-indicator');
                if (indicator) {
                    indicator.classList.add('show');
                    setTimeout(() => {
                        indicator.classList.remove('show');
                    }, 2000);
                }
            } catch (error) {
                console.error('Error saving form data:', error);
                // Show error indicator
                const indicator = document.getElementById('auto-save-indicator');
                if (indicator) {
                    indicator.classList.add('show', 'error');
                    indicator.textContent = 'Save failed';
                    setTimeout(() => {
                        indicator.classList.remove('show', 'error');
                        indicator.textContent = 'Auto-saved ✓';
                    }, 3000);
                }
            }
        }, 1000); // Debounce saves by 1 second

        return () => clearTimeout(saveTimer);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                setTempImage(event.target.result);
                setShowCropper(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = (croppedImage) => {
        setFormData(prev => ({
            ...prev,
            profileImage: croppedImage
        }));
        setShowCropper(false);
        setTempImage(null);
    };

    const handleCropCancel = () => {
        setShowCropper(false);
        setTempImage(null);
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            profileImage: null
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // Don't navigate to preview, stay on form
    };

    const clearForm = () => {
        const emptyData = {
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
        };
        setFormData(emptyData);
        localStorage.removeItem('biodataFormData');
    };

    return (
        <>
            <div id="auto-save-indicator" className="auto-save-indicator">
                Auto-saved ✓
            </div>

            <div className="form-with-preview">
                <div className="form-container">
                    {selectedTemplate && (
                        <div className="selected-template-info">
                            <span className="template-label">Selected Template:</span>
                            <span className="template-name">{selectedTemplate.name}</span>
                        </div>
                    )}

                    <div className="form-actions">
                        <button type="button" onClick={clearForm} className="btn btn-secondary">
                            🗑️ Clear Form
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <section className="form-section">
                            <h2 className="section-title">Personal Information</h2>

                            {/* Profile Image Upload */}
                            <div className="image-upload-section">
                                <label className="form-label">Profile Photo</label>
                                <div className="image-upload-container">
                                    {formData.profileImage ? (
                                        <div className="image-preview">
                                            <img
                                                src={formData.profileImage}
                                                alt="Profile"
                                                className="uploaded-image"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="remove-image-btn"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="image-upload-placeholder">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="image-input"
                                                id="profile-image"
                                            />
                                            <label htmlFor="profile-image" className="image-upload-label">
                                                <div className="upload-icon">📷</div>
                                                <div className="upload-text">
                                                    <span>Click to upload photo</span>
                                                    <small>JPG, PNG up to 5MB</small>
                                                </div>
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Date of Birth *</label>
                                    <input
                                        type="date"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Time of Birth</label>
                                    <input
                                        type="time"
                                        name="timeOfBirth"
                                        value={formData.timeOfBirth}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Place of Birth</label>
                                    <input
                                        type="text"
                                        name="placeOfBirth"
                                        value={formData.placeOfBirth}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Height</label>
                                    <input
                                        type="text"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="e.g., 5'6&quot;"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Weight</label>
                                    <input
                                        type="text"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder="e.g., 65 kg"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Complexion</label>
                                    <select
                                        name="complexion"
                                        value={formData.complexion}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Select</option>
                                        <option value="Fair">Fair</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Dark">Dark</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Blood Group</label>
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Select</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Family Information */}
                        <section className="form-section">
                            <h2 className="section-title">Family Information</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Father's Name</label>
                                    <input
                                        type="text"
                                        name="fatherName"
                                        value={formData.fatherName}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Father's Occupation</label>
                                    <input
                                        type="text"
                                        name="fatherOccupation"
                                        value={formData.fatherOccupation}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Mother's Name</label>
                                    <input
                                        type="text"
                                        name="motherName"
                                        value={formData.motherName}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Mother's Occupation</label>
                                    <input
                                        type="text"
                                        name="motherOccupation"
                                        value={formData.motherOccupation}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Siblings</label>
                                    <input
                                        type="text"
                                        name="siblings"
                                        value={formData.siblings}
                                        onChange={handleChange}
                                        placeholder="e.g., 1 Brother, 1 Sister"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Family Type</label>
                                    <select
                                        name="familyType"
                                        value={formData.familyType}
                                        onChange={handleChange}
                                        className="form-select"
                                    >
                                        <option value="">Select</option>
                                        <option value="Nuclear">Nuclear</option>
                                        <option value="Joint">Joint</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Educational & Professional */}
                        <section className="form-section">
                            <h2 className="section-title">Educational & Professional</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Education *</label>
                                    <input
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Occupation *</label>
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Annual Income</label>
                                    <input
                                        type="text"
                                        name="income"
                                        value={formData.income}
                                        onChange={handleChange}
                                        placeholder="e.g., 5-10 LPA"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Work Location</label>
                                    <input
                                        type="text"
                                        name="workLocation"
                                        value={formData.workLocation}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Contact Information */}
                        <section className="form-section">
                            <h2 className="section-title">Contact Information</h2>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label className="form-label">Address *</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="form-textarea"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Partner Preferences */}
                        <section className="form-section">
                            <h2 className="section-title">Partner Preferences</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Preferred Age Range</label>
                                    <input
                                        type="text"
                                        name="partnerAge"
                                        value={formData.partnerAge}
                                        onChange={handleChange}
                                        placeholder="e.g., 25-30 years"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Preferred Height</label>
                                    <input
                                        type="text"
                                        name="partnerHeight"
                                        value={formData.partnerHeight}
                                        onChange={handleChange}
                                        placeholder="e.g., 5'4&quot; - 5'8&quot;"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Preferred Education</label>
                                    <input
                                        type="text"
                                        name="partnerEducation"
                                        value={formData.partnerEducation}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Preferred Occupation</label>
                                    <input
                                        type="text"
                                        name="partnerOccupation"
                                        value={formData.partnerOccupation}
                                        onChange={handleChange}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Additional Information */}
                        <section className="form-section">
                            <h2 className="section-title">Additional Information</h2>
                            <div className="form-grid">
                                <div className="form-group full-width">
                                    <label className="form-label">Hobbies & Interests</label>
                                    <textarea
                                        name="hobbies"
                                        value={formData.hobbies}
                                        onChange={handleChange}
                                        className="form-textarea"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label className="form-label">Additional Information</label>
                                    <textarea
                                        name="additionalInfo"
                                        value={formData.additionalInfo}
                                        onChange={handleChange}
                                        className="form-textarea"
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="btn-center">
                            <PDFGenerator data={formData} />
                        </div>
                    </form>
                </div>

                <div className="preview-sidebar">
                    <div className="preview-header">
                        <h3>Live Preview</h3>
                        <small>Updates as you type</small>
                    </div>
                    <div className="preview-content">
                        <BiodataPreview
                            data={formData}
                            template={selectedTemplate}
                            isLivePreview={true}
                        />
                    </div>
                </div>

                {/* Image Cropper Modal */}
                {showCropper && tempImage && (
                    <ImageCropper
                        src={tempImage}
                        onCropComplete={handleCropComplete}
                        onCancel={handleCropCancel}
                    />
                )}
            </div>
        </>
    );
};

export default BiodataForm;