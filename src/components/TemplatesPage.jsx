import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TemplatesPage = ({ onSelectTemplate }) => {
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const templates = [
        {
            id: 'classic',
            name: 'Classic Golden',
            description: 'Traditional design with golden borders and elegant decorative elements',
            preview: 'classic-preview',
            popular: true,
            colors: {
                primary: '#d4af37',
                secondary: '#8b4513',
                accent: '#ff6b35',
                background: '#fff8dc'
            }
        },
        {
            id: 'modern',
            name: 'Pink Floral',
            description: 'Beautiful pink theme with floral decorative borders',
            preview: 'modern-preview',
            popular: true,
            colors: {
                primary: '#e91e63',
                secondary: '#ad1457',
                accent: '#f06292',
                background: '#fce4ec'
            }
        },
        {
            id: 'floral',
            name: 'Purple Elegant',
            description: 'Sophisticated purple design with ornate decorative patterns',
            preview: 'floral-preview',
            popular: false,
            colors: {
                primary: '#9c27b0',
                secondary: '#6a1b9a',
                accent: '#ba68c8',
                background: '#f3e5f5'
            }
        },
        {
            id: 'royal',
            name: 'Orange Traditional',
            description: 'Vibrant orange theme with traditional Indian motifs',
            preview: 'royal-preview',
            popular: true,
            colors: {
                primary: '#ff9800',
                secondary: '#f57c00',
                accent: '#ffb74d',
                background: '#fff3e0'
            }
        },
        {
            id: 'simple',
            name: 'Blue Classic',
            description: 'Clean blue design with simple elegant borders',
            preview: 'simple-preview',
            popular: false,
            colors: {
                primary: '#2196f3',
                secondary: '#1976d2',
                accent: '#64b5f6',
                background: '#e3f2fd'
            }
        },
        {
            id: 'artistic',
            name: 'Green Nature',
            description: 'Fresh green theme with natural decorative elements',
            preview: 'artistic-preview',
            popular: false,
            colors: {
                primary: '#4caf50',
                secondary: '#388e3c',
                accent: '#81c784',
                background: '#e8f5e8'
            }
        }
    ];

    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template);
        onSelectTemplate(template);
        navigate('/form');
    };

    return (
        <div className="templates-page">
            <div className="templates-header">
                <h1>Choose Your Perfect Biodata Template</h1>
                <p>Select from our collection of beautiful, professionally designed marriage biodata templates</p>
            </div>

            <div className="templates-grid">
                {templates.map((template) => (
                    <div key={template.id} className="template-card">
                        {template.popular && <div className="popular-badge">Popular</div>}

                        <div
                            className={`template-preview ${template.preview}`}
                            style={{
                                '--template-primary': template.colors.primary,
                                '--template-secondary': template.colors.secondary,
                                '--template-accent': template.colors.accent,
                                '--template-background': template.colors.background,
                                backgroundColor: template.colors.background
                            }}
                        >
                            {/* Decorative corners */}
                            <div className="preview-decorative-corners">
                                <div className="corner top-left"></div>
                                <div className="corner top-right"></div>
                                <div className="corner bottom-left"></div>
                                <div className="corner bottom-right"></div>
                            </div>

                            {/* Header with photo and name */}
                            <div className="preview-header">
                                <div className="preview-photo-section">
                                    <div
                                        className="preview-photo"
                                        style={{ borderColor: template.colors.primary }}
                                    >
                                        <div className="photo-placeholder-icon">👤</div>
                                    </div>
                                    <div className="preview-name" style={{ color: template.colors.primary }}>
                                        Sample Name
                                    </div>
                                </div>
                            </div>

                            {/* Content sections */}
                            <div className="preview-content">
                                <div className="preview-section">
                                    <div
                                        className="preview-section-header"
                                        style={{
                                            backgroundColor: template.colors.primary,
                                            color: 'white'
                                        }}
                                    >
                                        Personal Details
                                    </div>
                                    <div className="preview-details">
                                        <div className="preview-detail-row">
                                            <span className="detail-label">Name :</span>
                                            <span className="detail-value">Sample Name</span>
                                        </div>
                                        <div className="preview-detail-row">
                                            <span className="detail-label">Date of Birth :</span>
                                            <span className="detail-value">01-01-1995</span>
                                        </div>
                                        <div className="preview-detail-row">
                                            <span className="detail-label">Height :</span>
                                            <span className="detail-value">5'6"</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="preview-section">
                                    <div
                                        className="preview-section-header"
                                        style={{
                                            backgroundColor: template.colors.primary,
                                            color: 'white'
                                        }}
                                    >
                                        Family Details
                                    </div>
                                    <div className="preview-details">
                                        <div className="preview-detail-row">
                                            <span className="detail-label">Father's Name :</span>
                                            <span className="detail-value">Sample Father</span>
                                        </div>
                                        <div className="preview-detail-row">
                                            <span className="detail-label">Mother's Name :</span>
                                            <span className="detail-value">Sample Mother</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="preview-section">
                                    <div
                                        className="preview-section-header"
                                        style={{
                                            backgroundColor: template.colors.primary,
                                            color: 'white'
                                        }}
                                    >
                                        Contact Details
                                    </div>
                                    <div className="preview-details">
                                        <div className="preview-detail-row">
                                            <span className="detail-label">Contact Number :</span>
                                            <span className="detail-value">+91-XXXXXXXXXX</span>
                                        </div>
                                        <div className="preview-detail-row">
                                            <span className="detail-label">Email ID :</span>
                                            <span className="detail-value">sample@email.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="preview-footer">
                                <div className="footer-decoration" style={{ backgroundColor: template.colors.accent }}></div>
                                <div className="footer-text">instantbiodata.com</div>
                            </div>
                        </div>

                        <div className="template-info">
                            <h3>{template.name}</h3>
                            <p>{template.description}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleSelectTemplate(template)}
                            >
                                Use This Template
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplatesPage;