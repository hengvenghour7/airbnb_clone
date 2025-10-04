import { Card, Box, CardActions, CardContent, Button, Typography, CardMedia, CardActionArea } from "@mui/material";


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
type LocationCardType = {
    name: string,
    imageSrc: string,
    price: number,
    content: string,
}

export default function LocationCard ({name, imageSrc, price, content} : LocationCardType) {
    return (
        <div>
            <Card>
            <CardActionArea>
                <CardMedia
                component="img"
                height="140"
                image={imageSrc}
                alt="green iguana"
                />
                <CardContent>
                <Typography gutterBottom component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`$ ${price} AUD for 2 Nights`}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </div>
    )
}