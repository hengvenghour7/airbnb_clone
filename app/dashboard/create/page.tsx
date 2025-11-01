'use client'

import { Alert, Box, Button, Fade, FormControl, InputLabel, MenuItem, Popper, Select, Snackbar, SnackbarOrigin, TextField } from "@mui/material";
import { useState } from "react";
// import UploadButton from "../components/UploadButton";
import { newServiceType, uploadImageDataType } from "@/app/lib/databaseType";
import { CldUploadWidget } from 'next-cloudinary';
import { LocalizationProvider, DateCalendar, DateTimePicker } from "@mui/x-date-pickers";
import { format, compareAsc } from "date-fns";  
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Console, log } from "console";

let optionNum = 1;
type uploadedImageType = {
    filename: string,
    fileURL: string,
}
interface State extends SnackbarOrigin {
  open: boolean;
}
type InputKey =
  | 'serviceType'
  | 'accomodationType'
  | 'placeName'
  | 'location'
  | 'startDate'
  | 'endDate'
  | 'price'
  | 'services'
  | 'subDescription'
  | 'Description';
export default function Create () {
        const [state, setState] = useState<State>({
                open: false,
                vertical: 'top',
                horizontal: 'right',
            });
        const { vertical, horizontal, open } = state;
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [allInputField, setAllInputField] = useState(
        {
            serviceType: {
                fieldName: 'service type',
                value: '',
                required: true,
            },
            accomodationType: {
                fieldName: 'Accomodation type',
                value: '',
                required: true,
            },
            placeName: {
                fieldName: 'Place name',
                value: '',
                required: true,
            },
            location: {
                fieldName: 'Location',
                value: '',
                required: true,
            },
            startDate: {
                fieldName: 'Start Date',
                value: new Date(),
                required: true,
            },
            endDate: {
                fieldName: 'End Date',
                value: new Date(),
                required: true,
            },
            price: {
                fieldName: 'Price',
                value: '',
                required: true,
            },
            services: {
                fieldName: 'services',
                value: '',
                required: true,
            },
            subDescription: {
                fieldName: 'sub decription',
                value: '',
                required: true,
            },
            Description: {
                fieldName: 'description',
                value: '',
                required: true,
            },
        }
    )
    const accomodationType = [
        {
            display: 'Home',
            value: 'homes'
        },
        {
            display: 'Experience',
            value: 'experiences'
        },
        {
            display: 'Service',
            value: 'services'
        }
    ]
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
    const handleInputChange = (key: InputKey, newValue: string | null | Date) => {
        setAllInputField(prev => (
            {
                ...prev,
                [key]: {
                    ...prev[key],
                    value: newValue
                }
            }
        ))
    }
    const handleServiceInput = (index:number, newValue: string) => {
        setAllServicesInput(prev => prev.map((field, i) => {
            return i === index ? {...field, value: newValue}: field;
        }))
    }
    const handleDateChange = (key: string , newValue: Date | null) => {
        
    }
    const removeService = () => {
        setAllServicesInput(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
    }
    const onCreateHost = async () => {
        setState({...state, open: true});
        const createForm: newServiceType = {
            serviceType: allInputField.serviceType.value,
            hostname: localStorage.getItem('username') || '',
            accomodation: allInputField.accomodationType.value,
            placename: allInputField.placeName.value,
            placeLocation: allInputField.location.value,
            price: Number(allInputField.price.value),
            isFavorite: false,
            services: allServicesInput.map(item => item.value),
            subDescription: allInputField.subDescription.value,
            description: allInputField.Description.value,
            startDate: allInputField.startDate.value,
            endDate: allInputField.endDate.value
        }
        console.log("fform", allInputField.serviceType.value);
        
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
        setState({...state, open: false});
    }
     const handleClose = () => {
        setState({...state, open: false});
    }
    return (
        <div className="h-screen overflow-scroll w-full flex justify-center">
            <div className="flex flex-col gap-3 m-3 mt-12 w-[60%]">
                <h3 className="text-blue-600">Create your Services</h3>
                {
                    Object.entries(allInputField).map(([key, value], index) => (
                        value.fieldName === 'services' ? 
                        <div key={`option_box_${index}`} className="flex flex-col gap-3">
                            <h3 className="text-blue-600">Provided services</h3>
                            {
                                allServicesInput.map((item, index2) => (
                                    <TextField onChange={(e) => handleServiceInput(index2, e.target.value)} key={`option_${index2}`} label={item.option} />
                                ))
                            }
                            <div className="flex gap-3">
                                <Button onClick={addService} variant="contained" color="info">Add</Button>
                                <Button onClick={removeService} variant="contained" color="error">Remove</Button>
                            </div>
                        </div> : value.fieldName === 'Start Date' || value.fieldName === 'End Date' ? 
                        <div key={index}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                    value={value.value instanceof Date ? value.value : new Date()}
                                    label={value.fieldName}
                                    onChange={(newDate) => handleInputChange(key as InputKey, newDate)}
                                    format="MMM dd yyyy"
                                    />
                                </LocalizationProvider>
                        </div>
                        : value.fieldName === 'service type' ? 
                        <FormControl key={index}>
                            <InputLabel id="demo-simple-select-autowidth-label">Service Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value.value}
                            label="Service Type"
                            onChange={(e) => {handleInputChange(key as InputKey, e.target.value);
                            }}
                        >
                            {
                                accomodationType.map(item => (
                                    <MenuItem value={item.value}>{item.display}</MenuItem>
                                ))
                            }
                        </Select>
                        </FormControl>
                         :
                        <FormControl key={index}>
                            <TextField label={value.fieldName} onChange={(e) => handleInputChange(key as InputKey, e.target.value)} />
                        </FormControl>
                        
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
                <Button variant="contained" 
                onClick={onCreateHost}
                >Create</Button>
                <b className="pb-12"/>
            </div>
            <Snackbar
                anchorOrigin={{ horizontal, vertical }}
                open={open}
                onClose={handleClose}
                // message="I love snacks"
                // key={vertical + horizontal}
            >
                <Alert
                severity="info"
                variant="filled"
                sx={{ width: '100%' }}
                >
                    Creating...
                </Alert>
            </Snackbar>
        </div>
    )
}