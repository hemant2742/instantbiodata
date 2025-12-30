import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ src, onCropComplete, onCancel }) => {
    const [crop, setCrop] = useState({
        unit: '%',
        width: 80,
        height: 90,
        x: 10,
        y: 5
    });
    const [completedCrop, setCompletedCrop] = useState(null);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);

    const onImageLoad = (e) => {
        imgRef.current = e.currentTarget;
    };

    const getCroppedImg = () => {
        if (!completedCrop || !imgRef.current) return;

        const canvas = canvasRef.current;
        const image = imgRef.current;
        const ctx = canvas.getContext('2d');

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = completedCrop.width * scaleX;
        canvas.height = completedCrop.height * scaleY;

        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            canvas.width,
            canvas.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) return;
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            }, 'image/jpeg', 0.9);
        });
    };

    const handleCropComplete = async () => {
        const croppedImage = await getCroppedImg();
        if (croppedImage) {
            onCropComplete(croppedImage);
        }
    };

    return (
        <div className="image-cropper-modal">
            <div className="cropper-overlay">
                <div className="cropper-container">
                    <h3>Crop Your Photo</h3>
                    <div className="crop-area">
                        <ReactCrop
                            crop={crop}
                            onChange={(newCrop) => setCrop(newCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={3 / 4} // Portrait aspect ratio
                            minWidth={100}
                            minHeight={120}
                        >
                            <img
                                ref={imgRef}
                                src={src}
                                onLoad={onImageLoad}
                                alt="Crop preview"
                                style={{ maxWidth: '100%', maxHeight: '400px' }}
                            />
                        </ReactCrop>
                    </div>
                    <div className="cropper-actions">
                        <button
                            onClick={onCancel}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleCropComplete}
                            className="btn btn-primary"
                        >
                            Crop & Use
                        </button>
                    </div>
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;