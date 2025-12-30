import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BiodataForm = ({ onSubmit, selectedTemplate }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
        additionalInfo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        navigate('/preview');
    };

    return (
        <div className="form-container">
            {selectedTemplate && (
                <div className="selected-template-info">
                    <span className="template-label">Selected Template:</span>
                    <span className="template-name">{selectedTemplate.name}</span>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <section className="form-section">
                    <h2 className="section-title">Personal Information</h2>
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
                    <button type="submit" className="btn btn-primary">
                        🎨 Create My Biodata
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BiodataForm;