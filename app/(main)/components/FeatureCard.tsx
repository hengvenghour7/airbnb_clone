import { Card, Box, CardActions, CardContent, Button, Typography, CardMedia, CardActionArea } from "@mui/material";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';
import { format, compareAsc } from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
// import required modules
import { Navigation, Pagination } from 'swiper/modules';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);
type LocationCardType = {
    name: string,
    allImageSrc: string[],
    price: number,
    content: string,
    isFavorite: boolean,
    startDate: Date | null,
    endDate: Date | null,
    classname?: string
}

export default function FeatureCard ({name, allImageSrc, price, content, isFavorite, startDate, endDate, classname} : LocationCardType) {   
    return (
        <div className={`featureCard ${classname}`}>
            <Link href={`/place?placename=${name}`}>
                <Card className="relative">
                        <Swiper
                            pagination={{ clickable: true }}
                            navigation
                            modules={[Pagination, Navigation]}
                            className="mySwiper"
                        >
                            {
                                allImageSrc.map((image) => (
                                    <SwiperSlide>
                                        <CardMedia
                                        className="aspect-square"
                                        component="img"
                                        image={image}
                                        alt="green iguana"
                                        >     
                                        </CardMedia>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <CardContent>
                        <Typography gutterBottom component="div">
                            {name}
                        </Typography>
                        <Typography gutterBottom component="div">
                            { format(startDate !== null && startDate !== undefined ? startDate : new Date(), 'dd MMM')} - { format(endDate !== null && endDate !== undefined ? endDate : new Date(), 'dd MMM')}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {`$ ${price} AUD for 2 Nights`}
                        </Typography>
                        </CardContent>
                    <div className="absolute flex top-0 w-full p-2 z-10">
                        {
                            isFavorite && <Button style={{ borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }} sx={{ textTransform: 'none' }} variant="contained" color="inherit" size="small">Guest favorite</Button>     
                        }
                        <IconButton className="!ml-auto" aria-label="add to favorites" onClick={(e) => {
                            e.preventDefault(); // prevents Link navigation
            e.stopPropagation();
            console.log('ii', e);
            
                        }}>
                            <FavoriteIcon className="stroke-white" />
                        </IconButton>
                    </div>
                </Card>
            </Link>
        </div>
    )
}