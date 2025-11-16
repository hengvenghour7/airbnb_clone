'use client'

import Image from "next/image";
import Feature from "@/app/(main)/components/Feature";
import { useEffect, useState } from "react";

const allcatalogue:string[] = ['Popular Home in Sydney', 'Available next month in Adelaide', 'Available in Surf Coast Shire this weekend'];
type FeatureType = {
    name: string,
    imageSrc: string,
    price: number,
    content: string,
    isFavorite: boolean,
    startDate: Date | null,
    endDate: Date | null,
    coordinate: number[],
}
type CatelogueFeatureType = {
  all: {
    title: string,
    features: FeatureType[]
  }
  melbourne?: {
    title: string,
    features: FeatureType[]
  }
  adelaide?: {
    title: string,
    features: FeatureType[]
  }
  sydney?: {
    title: string,
    features: FeatureType[]
  }
}
type serviceResponseType = { 
      id: number;
      placename: string;
      price: string,
      description: string,
      imagelinks: string[], 
      startdate: Date, 
      enddate: Date, 
      coordinate: number[]
}
export default function AllFeatureCatalogue() {
  const MELBOURNE_RADIUS_KM = 10;
  const MELBOURNE_CBD = { lat: -37.8136, lng: 144.9631 };
  const ADELAIDE_RADIUS_KM = 10;
  const ADELAIDE_CBD = { lat: -34.9285, lng: 138.6007 };
  const SYDNEY_RADIUS_KM = 12;
  const SYDNEY_CBD = { lat: -33.8688, lng: 151.2093 };
  const distanceInKm = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // Earth radius (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
  const [isLoading, setIsloading] = useState(true);
  const [responseFeature, setResponseFeature] = useState<FeatureType[]>([])
  const [catalogueFeature, setcatalogueFeature] = useState<CatelogueFeatureType>({
    all: {
      title: 'All Availability',
      features: [],
    },
    melbourne: {
      title: 'Available in Melbourne',
      features: [],
    },
    adelaide: {
      title: 'Available in Adelaide',
      features: [],
    },
    sydney: {
      title: 'Available in Sydney',
      features: [],
    }
  });
  useEffect (() => {
    const fetchData = async () => {
              await fetch('/api/getallservices')
              .then(res => res.json())
              .then(res => {
                const allAvailableLocation:FeatureType[] = res.data.map((item: serviceResponseType) => {
                  return {
                    id: item.id,
                    name: item.placename,
                    imageSrc: item.imagelinks.length > 0 ? item.imagelinks[0] : ['./images/tourImg1.jpg'],
                    price: item.price,
                    content: item.description,
                    isFavorite: false,
                    startDate: item.startdate,
                    endDate: item.enddate,
                    coordinate: item.coordinate
                  }
                })
                const locationWithCoordinate = allAvailableLocation.filter((item: FeatureType)  => item.coordinate !== null);
                const availableInMelbourne  = locationWithCoordinate.filter((loc:FeatureType) => {
                    const d = distanceInKm(
                      loc.coordinate[0],
                      loc.coordinate[1],
                      MELBOURNE_CBD.lat,
                      MELBOURNE_CBD.lng
                    );
                    return d <= MELBOURNE_RADIUS_KM;
                  });
                const availableInAdelaide  = locationWithCoordinate.filter((loc:FeatureType) => {
                    const d = distanceInKm(
                      loc.coordinate[0],
                      loc.coordinate[1],
                      ADELAIDE_CBD.lat,
                      ADELAIDE_CBD.lng
                    );
                    return d <= ADELAIDE_RADIUS_KM;
                });
                const availableInSydney  = locationWithCoordinate.filter((loc:FeatureType) => {
                    const d = distanceInKm(
                      loc.coordinate[0],
                      loc.coordinate[1],
                      SYDNEY_CBD.lat,
                      SYDNEY_CBD.lng
                    );
                    return d <= SYDNEY_RADIUS_KM;
                });
                setcatalogueFeature(prev => (
                  {
                    ...prev,
                    all: {
                      title: 'All Availability',
                      features: allAvailableLocation,
                    },
                    melbourne: {
                      title: 'Available in Melbourne',
                      features: availableInMelbourne
                    },
                    adelaide: {
                      title: 'Available in Adelaide',
                      features: availableInAdelaide
                    },
                    sydney: {
                      title: 'Available in Sydney',
                      features: availableInSydney,
                    }
                  }
                ))                  
              })
              .then(() => setIsloading(false));
          };
    fetchData();
  }, [])
  return (
    <div>
      {
        Object.entries(catalogueFeature).map(([key,value], index) => (
          <Feature key={`catalogue_${index}`} catalogue={value.title} allFeatures={value.features} isLoading={isLoading} />
        ))
      }
    </div>
  );
}
