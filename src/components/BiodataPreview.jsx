import React from 'react';
import { Link } from 'react-router-dom';
import PDFGenerator from './PDFGenerator';

const BiodataPreview = ({ data, template }) => {
    return (
        <div>
            <div className="preview-header">
                <Link to="/form" className="btn btn-secondary">
                    ← Back to Edit
                </Link>
                <PDFGenerator data={data} />
            </div>

            <div id="biodata-content" className={`preview-container traditional-biodata ${template ? template.id + '-template' : ''}`}>
                {/* Decorative Header */}
                <div className="biodata-header traditional-header">
                    <div className="decorative-border-top"></div>
                    <h1 className="biodata-title traditional-title">Bio-data / बायो डेटा</h1>
                    <div className="decorative-divider"></div>
                    <div className="photo-placeholder traditional-photo">
                        Photo
                    </div>
                    <h2 className="biodata-name traditional-name">{data.name}</h2>
                </div>

                <div className="biodata-content traditional-content">
                    {/* Personal Information */}
                    <div className="info-section traditional-section">
                        <h3 className="info-title traditional-section-title">PERSONAL DETAILS</h3>
                        <div className="info-grid">
                            <div className="info-row">
                                <span className="info-label">Name :</span>
                                <span className="info-value">{data.name}</span>
                            </div>
                            {data.dateOfBirth && (
                                <div className="info-row">
                                    <span className="info-label">Date of Birth :</span>
                                    <span className="info-value">{new Date(data.dateOfBirth).toLocaleDateString()}</span>
                                </div>
                            )}
                            {data.timeOfBirth && (
                                <div className="info-row">
                                    <span className="info-label">Time of Birth :</span>
                                    <span className="info-value">{data.timeOfBirth}</span>
                                </div>
                            )}
                            {data.placeOfBirth && (
                                <div className="info-row">
                                    <span className="info-label">Place of Birth :</span>
                                    <span className="info-value">{data.placeOfBirth}</span>
                                </div>
                            )}
                            {data.height && (
                                <div className="info-row">
                                    <span className="info-label">Height :</span>
                                    <span className="info-value">{data.height}</span>
                                </div>
                            )}
                            {data.weight && (
                                <div className="info-row">
                                    <span className="info-label">Weight :</span>
                                    <span className="info-value">{data.weight}</span>
                                </div>
                            )}
                            {data.complexion && (
                                <div className="info-row">
                                    <span className="info-label">Complexion :</span>
                                    <span className="info-value">{data.complexion}</span>
                                </div>
                            )}
                            {data.bloodGroup && (
                                <div className="info-row">
                                    <span className="info-label">Blood Group :</span>
                                    <span className="info-value">{data.bloodGroup}</span>
                                </div>
                            )}
                            <div className="info-row">
                                <span className="info-label">Education :</span>
                                <span className="info-value">{data.education}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Occupation :</span>
                                <span className="info-value">{data.occupation}</span>
                            </div>
                            {data.income && (
                                <div className="info-row">
                                    <span className="info-label">Income :</span>
                                    <span className="info-value">{data.income}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Family Information */}
                    <div className="info-section traditional-section">
                        <h3 className="info-title traditional-section-title">FAMILY DETAILS</h3>
                        <div className="info-grid">
                            {data.fatherName && (
                                <div className="info-row">
                                    <span className="info-label">Father's Name :</span>
                                    <span className="info-value">{data.fatherName}</span>
                                </div>
                            )}
                            {data.fatherOccupation && (
                                <div className="info-row">
                                    <span className="info-label">Father's Occupation :</span>
                                    <span className="info-value">{data.fatherOccupation}</span>
                                </div>
                            )}
                            {data.motherName && (
                                <div className="info-row">
                                    <span className="info-label">Mother's Name :</span>
                                    <span className="info-value">{data.motherName}</span>
                                </div>
                            )}
                            {data.motherOccupation && (
                                <div className="info-row">
                                    <span className="info-label">Mother's Occupation :</span>
                                    <span className="info-value">{data.motherOccupation}</span>
                                </div>
                            )}
                            {data.siblings && (
                                <div className="info-row">
                                    <span className="info-label">Siblings :</span>
                                    <span className="info-value">{data.siblings}</span>
                                </div>
                            )}
                            {data.familyType && (
                                <div className="info-row">
                                    <span className="info-label">Family Type :</span>
                                    <span className="info-value">{data.familyType}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="info-section traditional-section">
                        <h3 className="info-title traditional-section-title">CONTACT INFORMATION</h3>
                        <div className="info-grid">
                            <div className="info-row">
                                <span className="info-label">Address :</span>
                                <span className="info-value">{data.address}</span>
                            </div>
                            <div className="info-row">
                                <span className="info-label">Phone :</span>
                                <span className="info-value">{data.phone}</span>
                            </div>
                            {data.email && (
                                <div className="info-row">
                                    <span className="info-label">Email ID :</span>
                                    <span className="info-value">{data.email}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Partner Preferences */}
                    {(data.partnerAge || data.partnerHeight || data.partnerEducation || data.partnerOccupation) && (
                        <div className="info-section traditional-section">
                            <h3 className="info-title traditional-section-title">PARTNER PREFERENCES</h3>
                            <div className="info-grid">
                                {data.partnerAge && (
                                    <div className="info-row">
                                        <span className="info-label">Age :</span>
                                        <span className="info-value">{data.partnerAge}</span>
                                    </div>
                                )}
                                {data.partnerHeight && (
                                    <div className="info-row">
                                        <span className="info-label">Height :</span>
                                        <span className="info-value">{data.partnerHeight}</span>
                                    </div>
                                )}
                                {data.partnerEducation && (
                                    <div className="info-row">
                                        <span className="info-label">Education :</span>
                                        <span className="info-value">{data.partnerEducation}</span>
                                    </div>
                                )}
                                {data.partnerOccupation && (
                                    <div className="info-row">
                                        <span className="info-label">Occupation :</span>
                                        <span className="info-value">{data.partnerOccupation}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Additional Information */}
                    {(data.hobbies || data.additionalInfo) && (
                        <div className="info-section traditional-section">
                            <h3 className="info-title traditional-section-title">ADDITIONAL INFORMATION</h3>
                            <div className="info-grid">
                                {data.hobbies && (
                                    <div className="info-row full-width">
                                        <span className="info-label">Hobbies & Interests :</span>
                                        <span className="info-value">{data.hobbies}</span>
                                    </div>
                                )}
                                {data.additionalInfo && (
                                    <div className="info-row full-width">
                                        <span className="info-label">Additional Information :</span>
                                        <span className="info-value">{data.additionalInfo}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="biodata-footer">
                    <div className="decorative-border-bottom"></div>
                    <div className="footer-text">instantbiodata.com</div>
                </div>
            </div>
        </div>
    );
};

export default BiodataPreview;