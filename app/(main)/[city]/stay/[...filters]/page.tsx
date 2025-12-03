'use client'
// app/[city]/stays/[...filters]/page.js
import ImageWithFallBack from '@/app/(main)/components/ImageWithFallback'
import { Button, FormControl, TextField } from '@mui/material';
import { use } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useParams } from 'next/navigation';

type params = {
    city: string,
    filters: string[]
}

export default function Page() {
    const params = useParams();
  const { city, filters } = params as params ;
  return (
    <div>
        <div className='grid grid-cols-4 p-6'>
            <div className='relative'>
                <div className='absolute top-[50%] left-[30%] translate-y-[-50%] w-[350px] z-10 bg-white border p-6 rounded-2xl' >
                    <h3 className='text-2xl font-semibold mb-4'>{`Apartment Holiday rental in ${city}`}</h3>
                    <p className='mb-4'>Find and book unique apartment on clonebnb</p>
                    <FormControl className="w-full">
                        <TextField defaultValue={filters.join(", ")} label='Location' />
                    </FormControl>
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
                    <Button variant='contained' color='error' sx={{width:'100%', marginTop: '16px'}}>
                        <p className='mr-3'>Search</p>
                        <SearchIcon className='!fill-amber-50'/>
                    </Button>
                </div>
            </div>
            <ImageWithFallBack className='w-full col-span-3 aspect-3/2 rounded-2xl overflow-hidden' src='/images/resort_1.jpg' alt=''></ImageWithFallBack>
        </div>
    </div>
  );
}
