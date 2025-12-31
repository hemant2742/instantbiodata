import React from 'react';

const BiodataPreview = ({ data, template, isLivePreview = false }) => {
    const biodataContent = (
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
                                {data.name && (
                                    <div className="info-row">
                                        <span className="info-label">Name :</span>
                                        <span className="info-value">{data.name}</span>
                                    </div>
                                )}
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
                                {data.maritalStatus && (
                                    <div className="info-row">
                                        <span className="info-label">Marital Status :</span>
                                        <span className="info-value">{data.maritalStatus}</span>
                                    </div>
                                )}
                                {data.religion && (
                                    <div className="info-row">
                                        <span className="info-label">Religion :</span>
                                        <span className="info-value">{data.religion}</span>
                                    </div>
                                )}
                                {data.caste && (
                                    <div className="info-row">
                                        <span className="info-label">Caste :</span>
                                        <span className="info-value">{data.caste}</span>
                                    </div>
                                )}
                                {data.education && (
                                    <div className="info-row">
                                        <span className="info-label">Education :</span>
                                        <span className="info-value">{data.education}</span>
                                    </div>
                                )}
                                {data.occupation && (
                                    <div className="info-row">
                                        <span className="info-label">Occupation :</span>
                                        <span className="info-value">{data.occupation}</span>
                                    </div>
                                )}
                                {data.income && (
                                    <div className="info-row">
                                        <span className="info-label">Annual Income :</span>
                                        <span className="info-value">{data.income}</span>
                                    </div>
                                )}
                                {data.workLocation && (
                                    <div className="info-row">
                                        <span className="info-label">Work Location :</span>
                                        <span className="info-value">{data.workLocation}</span>
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
                    {(data.fatherName || data.motherName || data.siblings || data.familyType) && (
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
                                {data.familyType && (
                                    <div className="info-row">
                                        <span className="info-label">Family Type :</span>
                                        <span className="info-value">{data.familyType}</span>
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

                    {/* Partner Preferences */}
                    {(data.partnerAge || data.partnerHeight || data.partnerEducation || data.partnerOccupation) && (
                        <div className="info-section traditional-section">
                            <h3 className="info-title traditional-section-title">PARTNER PREFERENCES</h3>
                            <div className="info-list">
                                {data.partnerAge && (
                                    <div className="info-row">
                                        <span className="info-label">Preferred Age :</span>
                                        <span className="info-value">{data.partnerAge}</span>
                                    </div>
                                )}
                                {data.partnerHeight && (
                                    <div className="info-row">
                                        <span className="info-label">Preferred Height :</span>
                                        <span className="info-value">{data.partnerHeight}</span>
                                    </div>
                                )}
                                {data.partnerEducation && (
                                    <div className="info-row">
                                        <span className="info-label">Preferred Education :</span>
                                        <span className="info-value">{data.partnerEducation}</span>
                                    </div>
                                )}
                                {data.partnerOccupation && (
                                    <div className="info-row">
                                        <span className="info-label">Preferred Occupation :</span>
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
                            <div className="info-list">
                                {data.hobbies && (
                                    <div className="info-row">
                                        <span className="info-label">Hobbies & Interests :</span>
                                        <span className="info-value">{data.hobbies}</span>
                                    </div>
                                )}
                                {data.additionalInfo && (
                                    <div className="info-row">
                                        <span className="info-label">Additional Information :</span>
                                        <span className="info-value">{data.additionalInfo}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="biodata-footer">
                <div className="footer-decoration"></div>
                <div className="footer-text">instantbiodata.com</div>
            </div>
        </div>
    );

    // For live preview, return without wrapper div
    if (isLivePreview) {
        return biodataContent;
    }

    // For regular preview, return with wrapper div
    return (
        <div>
            {biodataContent}
        </div>
    );
};

export default BiodataPreview;