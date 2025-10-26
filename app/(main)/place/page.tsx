'use client'
import { Card, Typography, CardContent, Button, CardActions, Divider  } from "@mui/material";
import ImageWithFallback from "../components/ImageWithFallback";
import { useEffect, useState } from "react";
import { responseServiceType } from "@/app/lib/databaseType";
import LoadingCard from "../components/LoadingCard";

export default function Place({allImageSrc}: {allImageSrc?: string[]}) {
    const [locationDetail, setLocationDetail] = useState<responseServiceType>({} as responseServiceType)
    const [isLoading, setIsloading] = useState(true);
    useEffect (() => {
        const params = new URLSearchParams(window.location.search);
        const placeName = params.get('placename') || '';
        const fetchData = async () => {
            await fetch(`/api/getservice?placename=${placeName}`)
            .then(res => res.json())
            .then((res) => setLocationDetail(res.data[0]))
            .then(() => setIsloading(false))
            .then(() => console.log(locationDetail.placename)
            )
        }
        fetchData();
    }, [])
    return (
        <div className='my-6 mx-16'>
            {
                isLoading ? <LoadingCard/> :
                <div>
                    <h3 className='pb-6 text-2xl'>{locationDetail.placename}</h3>
                    <div className='grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden'>
                        {
                            locationDetail.imagelinks.map((item, index) => (
                                <ImageWithFallback key={index} className='first:col-span-2 first:row-span-2 h-[600px] not-first:h-52 first:h-full' src={item} alt="" />
                            ))
                        }
                    </div>
                    <div className='mt-6 grid grid-cols-3 gap-12'>
                        <div className="col-span-2">
                            <h3 className='pb-6 text-2xl'>{locationDetail.description}</h3>
                            <Divider />
                        </div>
                        <div>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent className="flex flex-col gap-3">
                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                        {locationDetail.price} AUD total
                                    </Typography>
                                    <div className="flex flex-col border-1 rounded-2xl">
                                        <div className="flex justify-around border-b-1">
                                            <div className="text-left w-full border-r-1 p-3">
                                                <p className="font-bold">CheckIn</p>
                                                <p>12/12/24</p>
                                            </div>
                                            <div className="text-left w-full p-3">
                                                <p className="font-bold">CheckOut</p>
                                                <p>12/12/24</p>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            Guest
                                        </div>
                                    </div>
                                    <Button className="w-full" variant="contained" color="error" size="small">Reserve</Button>
                                    <div className="flex justify-between">
                                        <Typography variant="body2">2 nights x ${locationDetail.price} AUD</Typography>
                                        <Typography variant="body2">${Number(locationDetail.price) * 2} AUD</Typography>
                                    </div>
                                    <div className="flex justify-between">
                                        <Typography variant="body2">clonebnb service fee</Typography>
                                        <Typography variant="body2">$31.06 AUD</Typography>
                                    </div>
                                    <Divider />
                                    <div className="flex justify-between">
                                        <Typography variant="body2">Total</Typography>
                                        <Typography variant="body2">$231.06 AUD</Typography>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}