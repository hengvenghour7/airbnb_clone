'use client'
import LocationCard from "./LocationCard"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect, Suspense } from "react";
import { serviceDataType } from "@/app/lib/databaseType";
import { Content } from "next/font/google";
import { Button } from "@mui/material";
import LoadingCard from "./LoadingCard";

type FeatureType = {
    name: string,
    imageSrc: string,
    price: number,
    content: string,
    isFavorite: boolean,
}


export default function Feature ({catalogue, revenueCust}: {catalogue:string, revenueCust?:serviceDataType[]}) {
    // const allFeature = ['bunning', 'shopping', 'trading', 'bali', 'banana'];
    const [PreviewAmount, setPreViewAmount] = useState(2);    
    const [isLoading, setIsloading] = useState(true);
    // This code runs only once, after the component mounts
    const [responseFeature, setResponseFeature] = useState<FeatureType[]>([])
    useEffect(() => {
        const fetchData = async () => {
            await fetch('/api/getallservices')
            .then(res => res.json())
            .then(res => setResponseFeature(
                res.data.map((item: { placename: any; price: any; description: any; imagelinks: string[]}) => {
                return {
                    name: item.placename,
                    imageSrc: item.imagelinks.length > 0 ? item.imagelinks[0] : './images/tourImg1.jpg',
                    price: item.price,
                    Content: item.description,
                    isFavourite: false,
                }
            })
            ))
            .then(() => setIsloading(false));
        };
        fetchData();
        const handleSize = () => {
            const innerWidth = window.innerWidth;
            if (window.innerWidth > 1280) setPreViewAmount(5)
            else if (window.innerWidth > 768) setPreViewAmount(3)
            else setPreViewAmount(2)
        }
        window.addEventListener('resize', handleSize);
        handleSize();
    }, []); // empty dependency array = run once on mount

    const allFeature = [
        {
            name: 'Opera House',
            imageSrc: './images/tourImg1.jpg',
            price: 200,
            content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
            isFavorite: true,
        },
        {
            name: 'Darling Habour',
            imageSrc: './images/tourImg2.jpg',
            price: 350,
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
        {
            name: 'Hyde park',
            imageSrc: './images/tourImg3.jpg',
            price: 400,
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
        {
            name: 'Darling Habour',
            imageSrc: './images/tourImg2.jpg',
            price: 380,
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
        {
            name: 'Darling Habour',
            imageSrc: './images/tourImg2.jpg',
            price: 330,
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.',
            isFavorite: true
        },
        {
            name: 'Darling Habour',
            imageSrc: './images/tourImg2.jpg',
            price: 330,
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.',
            isFavorite: true
        },
        {
            name: 'Darling Habour',
            imageSrc: './images/tourImg2.jpg',
            price: 330,
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
        {
            name: 'Darling Habour',
            imageSrc: './images/tourImg2.jpg',
            price: 330,
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
    ];
    const [allDisplayFeature, setAllDisplayFeature] = useState(
        [...responseFeature, ...allFeature]
    )
    useEffect(() => {
        setAllDisplayFeature([...responseFeature, ...allFeature])
    }, [responseFeature])
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
                            isLoading ? [1,2,3,4].map(() => (
                            <SwiperSlide>
                                <LoadingCard/>
                            </SwiperSlide>)) :
                        allDisplayFeature.map((feature, index) => (
                            <SwiperSlide>
                                <LocationCard 
                                name={feature.name} 
                                imageSrc={feature.imageSrc} 
                                price={feature.price}
                                content={feature.content}  
                                isFavorite= {feature.isFavorite !== undefined ? feature.isFavorite : false}
                                key={`locationcard_${index}`}
                                />
                            </SwiperSlide>
                        ))
                        }
            </Swiper>
        </div>
        
    )
}