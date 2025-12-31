import React, { useState, useEffect } from 'react';

const AutoSaveIndicator = ({ isVisible, isError, message }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, isError ? 3000 : 2000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, isError]);

    if (!show) return null;

    return (
        <div className={`auto-save-indicator ${show ? 'show' : ''} ${isError ? 'error' : ''}`}>
            {message || (isError ? 'Save failed' : 'Auto-saved ✓')}
        </div>
    );
};

export default AutoSaveIndicator;