'use client'

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

export default function UploadButton() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    
    return (
        <CldUploadWidget uploadPreset="unsigned_preset" onSuccess={(result) => {
            if (typeof result.info === 'object' && result.info.secure_url) {
                console.log('Upload result:', result);
                // result.info.secure_url has the uploaded image URL
                setImageSrc(result.info.secure_url);
            }
        }}>
        {({ open }) => {
            return (
            <button onClick={() => open()}>
                Upload an Image
            </button>
            );
        }}
        </CldUploadWidget>
    )
}
