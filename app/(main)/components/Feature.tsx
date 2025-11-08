'use client'
import LocationCard from "./LocationCard"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import LoadingCard from "./LoadingCard";

type FeatureType = {
    name: string,
    imageSrc: string,
    price: number,
    content: string,
    isFavorite: boolean,
    startDate: Date | null,
    endDate: Date | null
}


export default function Feature ({catalogue, allFeatures, isLoading}: {catalogue:string, allFeatures: FeatureType[], isLoading:boolean}) {
    const [PreviewAmount, setPreViewAmount] = useState(2);    
    useEffect(() => {
        const handleSize = () => {
            const innerWidth = window.innerWidth;
            if (window.innerWidth > 1280) setPreViewAmount(5)
            else if (window.innerWidth > 768) setPreViewAmount(3)
            else setPreViewAmount(2)
        }
        window.addEventListener('resize', handleSize);
        handleSize();
    }, []); // empty dependency array = run once on mount
    const [swiper, setSwiper] = useState<any>(null);
    return (
        <div className="my-6 mx-3 md:mx-24">
            <div className="flex justify-between mb-4">
                <h3 className="px-3 font-bold text-2xl pb-6">{catalogue}</h3>
                <div className="flex">
                    <Button color="info" onClick={() => swiper.slidePrev()}>slide Prev</Button>
                    <Button color="info" onClick={() => swiper.slideNext()}>slide next</Button>
                </div>
            </div>
            <Swiper
                spaceBetween={20}
                slidesPerView={PreviewAmount}
                onSwiper={(instance) => setSwiper(instance)}
                >
                        {
                            isLoading ? [1,2,3,4,5,6,7,8].map(() => (
                            <SwiperSlide>
                                <LoadingCard/>
                            </SwiperSlide>)) :
                        allFeatures.map((feature, index) => (
                            <SwiperSlide>
                                <LocationCard 
                                name={feature.name} 
                                imageSrc={feature.imageSrc} 
                                price={feature.price}
                                content={feature.content}  
                                isFavorite= {feature.isFavorite !== undefined ? feature.isFavorite : false}
                                startDate= {feature.startDate}
                                endDate= {feature.endDate}
                                key={`locationcard_${index}`}
                                />
                            </SwiperSlide>
                        ))
                        }
            </Swiper>
        </div>
        
    )
}