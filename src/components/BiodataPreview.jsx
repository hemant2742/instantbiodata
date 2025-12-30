import React from 'react';

const BiodataPreview = ({ data, template, isLivePreview = false }) => {
    return (
        <div>
            <div id="biodata-content" className={`preview-container traditional-biodata ${template ? template.id + '-template' : ''} ${isLivePreview ? 'live-preview' : ''}`}>
                {/* Watermark for live preview */}
                {isLivePreview && (
                    <div className="watermark">PREVIEW</div>
                )}

                {/* Decorative Border and Corners */}
                <div className="decorative-corners">
                    <div className="corner top-left"></div>
                    <div className="corner top-right"></div>
                    <div className="corner bottom-left"></div>
                    <div className="corner bottom-right"></div>
                </div>

                {/* Decorative Side Elements */}
                <div className="decorative-sides">
                    <div className="side-decoration left-side"></div>
                    <div className="side-decoration right-side"></div>
                </div>

                {/* Header with Ganesh Symbol */}
                <div className="biodata-header traditional-header">
                    <div className="ganesh-symbol">🕉</div>
                    <h2 className="biodata-name traditional-name">{data.name || 'Your Name'}</h2>
                </div>

                <div className="biodata-main-content">
                    {/* Personal Details Section with Photo on Right */}
                    <div className="personal-details-with-photo">
                        <div className="personal-details-content">
                            <div className="info-section traditional-section">
                                <h3 className="info-title traditional-section-title">PERSONAL DETAILS</h3>
                                <div className="info-list">
                                    <div className="info-row">
                                        <span className="info-label">Name :</span>
                                        <span className="info-value">{data.name || ''}</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="info-label">Gender :</span>
                                        <span className="info-value">Male</span>
                                    </div>
                                    {data.dateOfBirth && (
                                        <div className="info-row">
                                            <span className="info-label">Date Of Birth :</span>
                                            <span className="info-value">{new Date(data.dateOfBirth).toLocaleDateString('en-GB')}</span>
                                        </div>
                                    )}
                                    {data.placeOfBirth && (
                                        <div className="info-row">
                                            <span className="info-label">Place Of Birth :</span>
                                            <span className="info-value">{data.placeOfBirth}</span>
                                        </div>
                                    )}
                                    {data.timeOfBirth && (
                                        <div className="info-row">
                                            <span className="info-label">Time Of Birth :</span>
                                            <span className="info-value">{data.timeOfBirth}</span>
                                        </div>
                                    )}
                                    <div className="info-row">
                                        <span className="info-label">Rashi :</span>
                                        <span className="info-value">Kumbha (Aquarius)</span>
                                    </div>
                                    {data.education && (
                                        <div className="info-row">
                                            <span className="info-label">Highest Education :</span>
                                            <span className="info-value">{data.education}</span>
                                        </div>
                                    )}
                                    {data.occupation && (
                                        <div className="info-row">
                                            <span className="info-label">College Name :</span>
                                            <span className="info-value">{data.workLocation || 'Not specified'}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Photo on Right of Personal Details Only */}
                        <div className="biodata-photo-section">
                            <div className="photo-frame">
                                {data.profileImage ? (
                                    <img
                                        src={data.profileImage}
                                        alt="Profile"
                                        className="profile-photo"
                                    />
                                ) : (
                                    <div className="photo-placeholder">
                                        Photo
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Full Width Sections */}
                    <div className="full-width-sections">
                        {/* Family Information */}
                        {(data.fatherName || data.motherName || data.siblings) && (
                            <div className="info-section traditional-section">
                                <h3 className="info-title traditional-section-title">FAMILY DETAILS</h3>
                                <div className="info-list">
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
                                </div>
                            </div>
                        )}

                        {/* Contact Information */}
                        <div className="info-section traditional-section">
                            <h3 className="info-title traditional-section-title">CONTACT INFORMATION</h3>
                            <div className="info-list">
                                {data.address && (
                                    <div className="info-row">
                                        <span className="info-label">Address :</span>
                                        <span className="info-value">{data.address}</span>
                                    </div>
                                )}
                                {data.phone && (
                                    <div className="info-row">
                                        <span className="info-label">Phone :</span>
                                        <span className="info-value">{data.phone}</span>
                                    </div>
                                )}
                                {data.email && (
                                    <div className="info-row">
                                        <span className="info-label">Email :</span>
                                        <span className="info-value">{data.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="biodata-footer">
                    <div className="footer-decoration"></div>
                    <div className="footer-text">instantbiodata.com</div>
                </div>
            </div>
        </div>
    );
};

export default BiodataPreview;