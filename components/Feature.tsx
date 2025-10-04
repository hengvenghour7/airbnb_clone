'use client'
import LocationCard from "./LocationCard"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Feature () {
    // const allFeature = ['bunning', 'shopping', 'trading', 'bali', 'banana'];
    const allFeature = [
        {
            name: 'Opera House',
            imageSrc: '/images/tourImg1.jpg',
            content: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
        },
        {
            name: 'Darling Habour',
            imageSrc: '/images/tourImg2.jpg',
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
        {
            name: 'Darling Habour',
            imageSrc: '/images/tourImg2.jpg',
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
        {
            name: 'Darling Habour',
            imageSrc: '/images/tourImg2.jpg',
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
        {
            name: 'Darling Habour',
            imageSrc: '/images/tourImg2.jpg',
            content: 'Opening to the azure vistas of the sea, The Darling Harbour is a pedestrian and a recreational quarter filled with exhibitions, museums, entertainment venues, shops and restaurants.'
        },
    ];
    return (
        <div className="my-6 mx-6">
            <h3 className="px-3 font-bold text-2xl pb-6">Popular Home in Sydney</h3>
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                    allFeature.map((feature, index) => (
                        <SwiperSlide>
                            <LocationCard name={feature.name} imageSrc={feature.imageSrc} content={feature.content}  key={`locationcard_${index}`}/>
                        </SwiperSlide>
                    ))
                    }
            </Swiper>
        </div>
        
    )
}