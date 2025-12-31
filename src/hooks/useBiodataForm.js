import { useState, useEffect, useCallback } from 'react';
import { biodataStorage } from '../utils/storage';
import { validateForm, validateField } from '../utils/validation';

const useBiodataForm = (initialData = null) => {
    const [formData, setFormData] = useState(() => {
        return initialData || biodataStorage.loadFormData();
    });

    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [autoSaveStatus, setAutoSaveStatus] = useState({
        isVisible: false,
        isError: false,
        message: ''
    });

    // Debounced auto-save
    useEffect(() => {
        if (!isDirty) return;

        const saveTimer = setTimeout(() => {
            const success = biodataStorage.saveFormData(formData);

            setAutoSaveStatus({
                isVisible: true,
                isError: !success,
                message: success ? 'Auto-saved ✓' : 'Save failed'
            });

            // Hide indicator after delay
            setTimeout(() => {
                setAutoSaveStatus(prev => ({ ...prev, isVisible: false }));
            }, success ? 2000 : 3000);
        }, 1000);

        return () => clearTimeout(saveTimer);
    }, [formData, isDirty]);

    // Validate form whenever data changes
    useEffect(() => {
        const validation = validateForm(formData);
        setIsValid(validation.isValid);

        // Convert errors array to object for easier lookup
        const errorMap = {};
        validation.errors.forEach(error => {
            errorMap[error.field] = error.message;
        });
        setErrors(errorMap);
    }, [formData]);

    const updateField = useCallback((fieldName, value) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: value
        }));
        setIsDirty(true);

        // Clear field error when user starts typing
        if (errors[fieldName]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    }, [errors]);

    const validateSingleField = useCallback((fieldName, value) => {
        const error = validateField(fieldName, value);
        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));
        return !error;
    }, []);

    const clearForm = useCallback(() => {
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
        setErrors({});
        setIsDirty(false);
        biodataStorage.clearFormData();
    }, []);

    const resetForm = useCallback(() => {
        const savedData = biodataStorage.loadFormData();
        setFormData(savedData);
        setErrors({});
        setIsDirty(false);
    }, []);

    const submitForm = useCallback(() => {
        const validation = validateForm(formData);

        if (validation.isValid) {
            // Save final data
            biodataStorage.saveFormData(formData);
            return { success: true, data: formData };
        } else {
            // Set all validation errors
            const errorMap = {};
            validation.errors.forEach(error => {
                errorMap[error.field] = error.message;
            });
            setErrors(errorMap);
            return { success: false, errors: validation.errors };
        }
    }, [formData]);

    return {
        formData,
        errors,
        isValid,
        isDirty,
        autoSaveStatus,
        updateField,
        validateSingleField,
        clearForm,
        resetForm,
        submitForm
    };
};

export default useBiodataForm;