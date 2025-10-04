import { Card, Box, CardActions, CardContent, Button, Typography, CardMedia, CardActionArea } from "@mui/material";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);
type LocationCardType = {
    name: string,
    imageSrc: string,
    price: number,
    content: string,
    isFavorite: boolean,
}

export default function LocationCard ({name, imageSrc, price, content, isFavorite} : LocationCardType) {
    return (
        <div>
            <Card className="relative">
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
                <div className="absolute flex top-0 w-full p-2">
                    {
                        isFavorite && <Button style={{ borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }} sx={{ textTransform: 'none' }} variant="contained" color="inherit" size="small">Guest favorite</Button>     
                    }
                    <IconButton className="!ml-auto" aria-label="add to favorites">
                        <FavoriteIcon className="stroke-white" />
                    </IconButton>
                </div>
            </Card>
        </div>
    )
}