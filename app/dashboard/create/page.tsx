'use client'

import { Button, TextField } from "@mui/material";
import { useState } from "react";
// import UploadButton from "../components/UploadButton";
import { newServiceType, uploadImageDataType } from "@/app/lib/databaseType";
import { CldUploadWidget } from 'next-cloudinary';

let optionNum = 1;
type uploadedImageType = {
    filename: string,
    fileURL: string,
}
export default function Create () {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [allInputField, setAllInputField] = useState(
        [
            {
                fieldName: 'service type',
                value: '',
                required: true,
            },
            {
                fieldName: 'accomodation type',
                value: '',
                required: true,
            },
            {
                fieldName: 'place name',
                value: '',
                required: true,
            },
            {
                fieldName: 'location',
                value: '',
                required: true,
            },
            {
                fieldName: 'price',
                value: '',
                required: true,
            },
            {
                fieldName: 'services',
                value: '',
                required: false,
            },
            {
                fieldName: 'sub description',
                value: '',
                required: true,
            },
            {
                fieldName: 'description',
                value: '',
                required: true,
            }
        ]
    )
    const [allServicesInput, setAllServicesInput] = useState([
        {
            option: 'service 1',
            value: ''
        }
    ])
    const [uploadedImages, setuploadedImages] = useState<uploadedImageType[]>([]);
    const addService = () => {
        optionNum++;
        setAllServicesInput((prev) => [
        ...prev, 
        { option: `service ${optionNum}`, value: '' }
        ]);
    }
    const handleUploadImage = (filename:string, fileURL: string) => {
        setuploadedImages(prev => [...prev, {filename, fileURL}]);
    }
    const handleInputChange = (index:number, newValue: string) => {
        setAllInputField(prev => prev.map((field, i) => {
            return i === index ? {...field, value: newValue}: field;
        }))
    }
    const handleServiceInput = (index:number, newValue: string) => {
        setAllServicesInput(prev => prev.map((field, i) => {
            return i === index ? {...field, value: newValue}: field;
        }))
    }
    const removeService = () => {
        setAllServicesInput(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    }
    const onCreateHost = async () => {
        const createForm: newServiceType = {
            serviceType: allInputField[0].value,
            hostname: localStorage.getItem('username') || '',
            accomodation: allInputField[1].value,
            placename: allInputField[2].value,
            placeLocation: allInputField[3].value,
            price: Number(allInputField[4].value),
            isFavorite: false,
            services: allServicesInput.map(item => item.value),
            subDescription: allInputField[6].value,
            description: allInputField[7].value
        }
        const uploadImageform: uploadImageDataType = {
            username: createForm.hostname,
            email: '',
            placename: createForm.placename,
            imagelinks: uploadedImages.length > 0 ? uploadedImages.map(item => item.fileURL) : [],
            servicetype: '',
        }
        console.log('services', createForm);
        
        const res = await fetch('/api/createplace', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createForm),
        })
        const uploadRes = await fetch('/api/uploadimages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(uploadImageform),
        })
        console.log('upload res', uploadRes);
        
    }
    return (
        <div className="h-screen overflow-scroll w-full flex justify-center">
            <div className="flex flex-col gap-3 m-3 mt-12 w-[60%]">
                <h3 className="text-blue-600">Create your Services</h3>
                {
                    allInputField.map((item, index) => (
                        item.fieldName !== 'services' ? <TextField key={index} onChange={(e) => handleInputChange(index, e.target.value)} label={item.fieldName} /> :
                        <div key={`option_box_${index}`} className="flex flex-col gap-3">
                            <h3 className="text-blue-600">Provided services</h3>
                            {
                                allServicesInput.map((item, index) => (
                                    <TextField onChange={(e) => handleServiceInput(index, e.target.value)} key={`option_${index}`} label={item.option} />
                                ))
                            }
                            <div className="flex gap-3">
                                <Button onClick={addService} variant="contained" color="info">Add</Button>
                                <Button onClick={removeService} variant="contained" color="error">Remove</Button>
                            </div>
                        </div>
                    ))
                }
                <CldUploadWidget uploadPreset="unsigned_preset" onSuccess={(result) => {
                    if (typeof result.info === 'object' && result.info.secure_url) {
                        handleUploadImage(result.info.original_filename, result.info.secure_url);
                        console.log('Upload result:', result);
                    }
                }}>
                {({ open }) => {
                    return (
                    <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow"
                    onClick={() => open()}>
                        Upload an Image
                    </button>
                    );
                }}
                </CldUploadWidget>
                {
                    uploadedImages.length > 0 && 
                    <div>
                        {
                            uploadedImages.map((item, index) => (
                                <p className="text-xs px-2 my-2" key={index}>{item.filename}</p>
                            ))
                        }
                    </div> 
                }
                <Button variant="contained" onClick={onCreateHost}>Create</Button>
                <b className="pb-12"/>
            </div>
        </div>
    )
}