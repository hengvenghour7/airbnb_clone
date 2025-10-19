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
                    <h3 className='pb-6 text-2xl'>Room near Opera House, Australia</h3>
                    <Divider />
                </div>
                <div>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent className="flex flex-col gap-3">
                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                $231.06 AUD total
                            </Typography>
                            <div className="flex flex-col border-1 rounded-2xl">
                                <div className="flex justify-around border-b-1">
                                    <div className="text-left w-full border-r-1 p-3">
                                        <p className="font-bold">CheckIn</p>
                                        <p>12/12/24</p>
                                    </div>
                                    <div className="text-left w-full p-3">
                                        <p className="font-bold">CheckOut</p>
                                        <p>12/12/24</p>
                                    </div>
                                </div>
                                <div className="p-3">
                                    Guest
                                </div>
                            </div>
                            <Button className="w-full" variant="contained" color="error" size="small">Reserve</Button>
                            <div className="flex justify-between">
                                <Typography variant="body2">2 nights x $100.00 AUD</Typography>
                                <Typography variant="body2">$200.00 AUD</Typography>
                            </div>
                            <div className="flex justify-between">
                                <Typography variant="body2">clonebnb service fee</Typography>
                                <Typography variant="body2">$31.06 AUD</Typography>
                            </div>
                            <Divider />
                            <div className="flex justify-between">
                                <Typography variant="body2">Total</Typography>
                                <Typography variant="body2">$231.06 AUD</Typography>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}