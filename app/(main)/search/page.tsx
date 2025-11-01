'use client'
import { useEffect, useState } from "react"
import LoadingCard from "../components/LoadingCard";
import LocationCard from "../components/LocationCard";
import GoogleMap from "../components/GoogleMap";
// import GoogleMap from "../components/GoogleMap";

type FeatureType = {
    name: string,
    imageSrc: string,
    price: number,
    content: string,
    isFavorite: boolean,
    startDate: Date | null,
    endDate: Date | null
}
export default function Search () {
    const [isLoading, setIsloading] = useState(true);
    const [responseFeature, setResponseFeature] = useState<FeatureType[]>([])
    useEffect(() => {
        const fetchData = async () => {
            await fetch('/api/getallservices')
            .then(res => res.json())
            .then(res => setResponseFeature(
                res.data.map((item: { placename: any; price: any; description: any; imagelinks: string[], startdate: Date, enddate: Date}) => {
                return {
                    name: item.placename,
                    imageSrc: item.imagelinks.length > 0 ? item.imagelinks[0] : './images/tourImg1.jpg',
                    price: item.price,
                    content: item.description,
                    isFavorite: false,
                    startDate: item.startdate,
                    endDate: item.enddate
                }
            })
            ))
            .then(() => setIsloading(false))
            .then(() =>  console.log(responseFeature.length)
            )
        };
        fetchData();
    }, [])
    useEffect(() => {
        console.log('rrrr', responseFeature);
    }, [responseFeature])
    return  <div className="mx-4 grid grid-cols-2">
                <div className="mr-3 pt-4 grid grid-cols-3 gap-3 h-[calc(100vh-172px)] overflow-scroll">
                    {
                        isLoading ? [1,2,3,4,5,6,7,8].map((feature, index) => (
                            <LoadingCard key={`loading_${index}`}/>
                        )) : responseFeature.map((feature, index) => (
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
                        ))
                    }
                </div>
                <div className="pt-4">
                    <GoogleMap></GoogleMap>
                </div>
        </div>
}