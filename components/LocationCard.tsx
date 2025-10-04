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
    content: string,
}

export default function LocationCard ({name, imageSrc, content} : LocationCardType) {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
            component="img"
            height="140"
            image={imageSrc}
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {content}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            Share
            </Button>
        </CardActions>
        </Card>
    )
}