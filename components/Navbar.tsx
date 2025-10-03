'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { format, compareAsc } from "date-fns";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Slider, Fade, Box, Popper } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState, useEffect } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

type navBarProps = {
    className?: string; 
}

export default function Navbar ({className}: navBarProps) {
    const navbarCenterOptions = ['Home nearby', 'Any Weeks', '3 Guest'];
    const [dateVal, setDateVal] = useState<Date | null>(new Date('2022-04-13'));
    const [Volume, setVolume] = useState<number>(20);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
    useEffect(() => {
        if (dateVal !== null) {
            console.log('new date val' + format(dateVal, 'MM/dd/yyyy')+ 'new vol' + Volume);
        }
    }, [dateVal, Volume]);
    return (
        <div>
            <div className='flex justify-between m-6'>
                <div className='text-2xl text-red-600'>
                    clonebnb
                </div>
                <div className='flex justify-between gap-6'>
                    <div className='hover:bg-gray-300 p-3 pl-4 rounded-l-full'>
                        <button aria-describedby={id} type="button" onClick={handleClick}>
                            Toggle Popper
                        </button>
                        <Popper id={id} open={open} anchorEl={anchorEl} transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                The content of the Popper.
                                </Box>
                            </Fade>
                            )}
                        </Popper>
                    </div>
                    <div>
                        <button aria-describedby={id} type="button" onClick={handleClick}>
                            CheckIn
                        </button>
                        <Popper id={id} open={open} anchorEl={anchorEl} transition>
                            {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                                <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateCalendar value={dateVal} onChange={(newDateVal) => setDateVal(newDateVal)} />
                                    </LocalizationProvider>
                                </Box>
                            </Fade>
                            )}
                        </Popper>
                    </div>
                    <div>
                        CheckOut
                    </div>
                    <div>
                        3 Guest
                    </div>
                </div>
                <div>
                    Become a Host
                </div>
            </div>
            
        </div>
        );
}