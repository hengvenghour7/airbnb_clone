'use client'
import LocationCard from "./LocationCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState, useEffect } from "react";
import { serviceDataType } from "@/app/lib/databaseType";

export default function Feature ({catalogue, revenueCust}: {catalogue:string, revenueCust:serviceDataType[]}) {
    // const allFeature = ['bunning', 'shopping', 'trading', 'bali', 'banana'];
    const [PreviewAmount, setPreViewAmount] = useState(2);    
    // This code runs only once, after the component mounts
    useEffect(() => {
        const handleSize = () => {
            const innerWidth = window.innerWidth;
            if (window.innerWidth > 1280) setPreViewAmount(5)
            else if (window.innerWidth > 768) setPreViewAmount(3)
            else setPreViewAmount(2)
        }
        // handleSize();
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
    return (
        <div className="my-6 mx-3 md:mx-24">
            <h3 className="px-3 font-bold text-2xl pb-6">{catalogue}</h3>
            <Swiper
                spaceBetween={20}
                slidesPerView={PreviewAmount}
                >
                    {
                    allFeature.map((feature, index) => (
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