'use client'

import { Button, TextField } from "@mui/material";
import { useState } from "react";
import UploadButton from "../components/UploadButton";

export default function Create () {
    const [allInputField, setAllInputField] = useState(
        [
            {
                fieldName: 'service type',
                required: true,
            },
            {
                fieldName: 'host name',
                required: true,
            },
            {
                fieldName: 'accomodation',
                required: true,
            },
            {
                fieldName: 'place name',
                required: true,
            },
            {
                fieldName: 'location',
                required: true,
            },
            {
                fieldName: 'sub description',
                required: true,
            }
        ]
    )
    return (
        <div className="flex flex-col gap-3 m-3">
            <h3>Create your Services</h3>
            {
                allInputField.map((item, index) => (
                    <TextField key={index} label={item.fieldName} />
                ))
            }
            <UploadButton/>
            <Button variant="contained">Create</Button>
        </div>
    )
}