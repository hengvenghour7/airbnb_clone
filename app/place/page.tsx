import { Card, Typography, CardContent, Button, CardActions, Divider  } from "@mui/material";

export default function Place() {
    return (
        <div className='my-6 mx-16'>
            <h3 className='pb-6 text-2xl'>Opera House</h3>
            <div className='grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden'>
                {
                    [1,2,3,4,5].map((res, index) => (
                        <img key={index} className='first:col-span-2 first:row-span-2' src="./images/tourImg1.jpg" alt="" />
                    ))
                }
            </div>
            <div className='mt-6 grid grid-cols-3 gap-12'>
                <div className="col-span-2">
                    <h3 className='pb-6 text-2xl'>Room in Surry Hills, Australia</h3>
                    <Divider />
                </div>
                <div>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Word of the Day
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                            <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
            </div>
        </div>
    )
}