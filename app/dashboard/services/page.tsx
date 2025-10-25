'use client'
import LocationCard from "@/app/(main)/components/LocationCard";
import { useEffect, useState } from "react"
import LoadingCard from "@/app/(main)/components/LoadingCard";

type FeatureType = {
    name: string,
    imageSrc: string,
    price: number,
    content: string,
    isFavorite: boolean,
}
export default function Services () {
    const [responseFeature, setResponseFeature] = useState<FeatureType[]>([])
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const hostname = localStorage.getItem('username');
        const fetchData = async () => {
            await fetch(`/api/getallservices?servicetype=other&hostname=${hostname}`)
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
            .then(() => setIsLoading(false));            
        };
        fetchData();
    }, []);
    return (
        <div className="m-4 w-full">
            <h3 className="text-blue-600 mb-4">Your services</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    isLoading ? [1,2,3,4].map((item, index) => (
                        <LoadingCard key={index}/>
                    )) :
                    responseFeature.map((feature, index) => (
                        <LocationCard 
                        name={feature.name} 
                        imageSrc={feature.imageSrc} 
                        price={feature.price}
                        content={feature.content}  
                        isFavorite= {feature.isFavorite !== undefined ? feature.isFavorite : false}
                        key={`locationcard_${index}`}
                        />
                    ))
    }
            </div>
        </div>
    )
}