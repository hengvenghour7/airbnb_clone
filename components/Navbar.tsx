'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, compareAsc } from "date-fns";
import { Button, Fade, Box, Popper, Popover, Typography, DialogTitle, DialogContent, Dialog, DialogContentText, DialogActions, Slide } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState, useEffect, useRef } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Styles from './componentStyle/navbarStyle.module.css';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';


type navBarProps = {
    className?: string; 
}
type navBarChildType = {
    name: String,
    isOpen: boolean,
}
type navBarOptionType = {
    name: String,
    isOpen: boolean,
    child?: navBarChildType[];
}
type navBarOptionArray = navBarOptionType[];
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
export default function Navbar ({className}: navBarProps) {
    // 'Home nearby', 'Any Weeks', '3 Guest'
    const [navbarCenterOptions] = useState<navBarOptionArray>(
        [
            {
                name: 'Home nearby',
                isOpen: false,
                child: []
            },
            {
                name: 'Any Weeks',
                isOpen: false,
                child: [
                    {
                        name: 'CheckIn',
                        isOpen: false,
                    },
                    {
                        name: 'CheckOut',
                        isOpen: false,
                    },
                ]
            },
            {
                name: '3 Guest',
                isOpen: false,
                child: [],
            }
        ]
    )
    const [dateVal, setDateVal] = useState<Date | null>(new Date('2022-04-13'));
    const [Volume, setVolume] = useState<number>(20);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [memberPopOpen, setMemberPopOpen] = useState(false);
    const [memberAnchor, setmemberAnchor] = useState<null | HTMLElement>(null);

  const handleCalenderClick = (event: React.MouseEvent<HTMLElement>, child: navBarChildType) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
    child.isOpen = !child.isOpen;
    // navbarCenterOptions[1].child !== undefined && (navbarCenterOptions[1].child[childIndex].isOpen = !navbarCenterOptions[1].child[childIndex]?.isOpen);
  };
  const handleClose = () => {
    setMemberPopOpen(false);
  };
  const handleClickOpen = () => {
    setMemberPopOpen(true);
  };
  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? 'transition-popper' : undefined;
    useEffect(() => {
        if (dateVal !== null) {
            console.log('new date val' + format(dateVal, 'MM/dd/yyyy')+ 'new vol' + Volume);
        }
    }, [dateVal, Volume]);
    return (
        <div className={clsx('shadow-md bg-white', className)}>
            <div className='flex justify-between px-12 py-12 items-center'>
                <Link href={'/'} className='text-2xl font-bold text-red-600'>
                    clonebnb
                </Link>
                <div className={clsx('flex justify-between border-1 rounded-full bg-white shadow-md', Styles.centerButtonContainer)}>
                    {navbarCenterOptions.map((option, index) => (
                        option.name.toLowerCase() === 'any weeks' ? 
                            option.child !== undefined && option.child.map((child, childIndex) => (
                                    <div key={`any_week_${index}_${childIndex}`}>
                                        <button aria-describedby={`any_week_${index}_${childIndex}`} type="button" onClick={(e) => handleCalenderClick(e, child)}>
                                            { child.name }
                                        </button>
                                        <Popper className={Styles.calendarPopUp} id={`any_week_${index}_${childIndex}`} open={child.isOpen} anchorEl={anchorEl} transition>
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
                            ))
                        : <div key={`center_option_${index}`}>
                            <button aria-describedby={id}  type="button" onClick={e => handleCalenderClick(e, option)}>
                                {option.name}
                            </button>
                            <Popper id={id} open={option.isOpen} anchorEl={anchorEl} transition>
                                {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                    The content of the Popper.
                                    </Box>
                                </Fade>
                                )}
                            </Popper>
                        </div>
                        
                    ))}
                </div>
                 <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Become a Member
                    </Button>
                    <Dialog
                        open={memberPopOpen}
                        slots={{
                        transition: Transition,
                        }}
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle>{"What do you like to host?"}</DialogTitle>
                        <DialogContent>
                        {/* <DialogContentText id="alert-dialog-slide-description">
                            What do you like to host?
                        </DialogContentText> */}
                        </DialogContent>
                        <DialogActions>
                        <Link href='/loginSignUp' onClick={handleClose}>Home</Link>
                        <Link href='/loginSignUp' onClick={handleClose}>Experience</Link>
                        <Link href='/loginSignUp' onClick={handleClose}>Service</Link>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </div>
            
        </div>
        );
}