'use client'
import { useEffect, useState } from "react"
import LoadingCard from "../components/LoadingCard";
import GoogleMap from "../components/GoogleMap";
import FeatureCard from "../components/FeatureCard";
// import GoogleMap from "../components/GoogleMap";

type FeatureType = {
    name: string,
    imageSrc: string[],
    price: number,
    content: string,
    isFavorite: boolean,
    startDate: Date | null,
    endDate: Date | null,
    coordinate: number[] | null
}
type serviceResponseType = { placename: any;
     price: any,
     description: any,
     imagelinks: string[], 
     startdate: Date, 
     enddate: Date, 
     coordinate: number[]
    }
export default function Search () {
    const [isLoading, setIsloading] = useState(true);
    const [responseFeature, setResponseFeature] = useState<FeatureType[]>([])
    const [allMarker, setAllMarker] = useState<{price:number, coordinate: number[]}[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            await fetch('/api/getallservices')
            .then(res => res.json())
            .then(res => {
                setAllMarker(res.data.filter((item: serviceResponseType)  => item.coordinate !== null).map((item: serviceResponseType) => (
                    {
                        price: item.price,
                        coordinate: item.coordinate
                    }
                )))
                setResponseFeature(
                res.data.map((item: serviceResponseType) => {
                return {
                    name: item.placename,
                    imageSrc: item.imagelinks.length > 0 ? item.imagelinks : ['./images/tourImg1.jpg'],
                    price: item.price,
                    content: item.description,
                    isFavorite: false,
                    startDate: item.startdate,
                    endDate: item.enddate,
                    coordinate: item.coordinate
                    }
                })
                )
            })
            .then(() => setIsloading(false))
        };
        fetchData();
    }, [])
    useEffect(() => {
        console.log('fdsaf', allMarker);
        
    }, [allMarker])
    return  <div className="mx-4 grid grid-cols-1 md:grid-cols-2">
                <div className="mr-3 pt-4 grid grid-cols-3 gap-3 md:h-[calc(100vh-172px)] md:overflow-scroll order-2 md:order-2">
                    {
                        isLoading ? [1,2,3,4,5,6,7,8].map((feature, index) => (
                            <LoadingCard key={`loading_${index}`}/>
                        )) : responseFeature.map((feature, index) => (
                            <FeatureCard 
                                name={feature.name} 
                                allImageSrc={feature.imageSrc} 
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
                <div className="pt-4 aspect-square md:aspect-auto order-1 md:order-2">
                    <GoogleMap allMarkers={allMarker}></GoogleMap>
                </div>
        </div>
}