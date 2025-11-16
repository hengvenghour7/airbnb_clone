'use client'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format, compareAsc } from "date-fns";
import { Button, Fade, Box, Popper, Popover, Typography, DialogTitle, DialogContent, Dialog, DialogContentText, DialogActions, Slide, ListItemButton, ListItem, List, Divider, Drawer, IconButton } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState, useEffect, useRef } from "react";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Styles from './componentStyle/navbarStyle.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { TransitionProps } from '@mui/material/transitions';
import SearchIcon from '@mui/icons-material/Search';
import Filter from './FilterComponent';


type navBarProps = {
    className?: string; 
}
type navBarChildType = {
    name: String,
    isOpen: boolean,
    value: Date
}
type navBarOptionType = {
    name: String,
    isOpen: boolean,
    child?: navBarChildType[];
}
type navBarOptionArray = navBarOptionType[];
let isAuth = false;
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
    const [navbarCenterOptions, setNavbarCenterOptions] = useState<navBarOptionArray>(
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
                        value: new Date()
                    },
                    {
                        name: 'CheckOut',
                        isOpen: false,
                        value: new Date()
                    },
                ]
            },
            {
                name: 'Add Guest',
                isOpen: false,
                child: [],
            }
        ]
    )
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [memberPopOpen, setMemberPopOpen] = useState(false);
    const [memberAnchor, setmemberAnchor] = useState<null | HTMLElement>(null);

  const handleCalenderClick = (event: React.MouseEvent<HTMLElement>, index: number, childIndex: number) => {
    setAnchorEl(event.currentTarget);
    setNavbarCenterOptions(prev => {
    return prev.map((option, i) => {
      // Only update the clicked parent option
        if (i !== index) return option;

        // Update the correct child array immutably
        return {
            ...option,
            child: option.child?.map((item, j) => ({
            ...item,
            isOpen: j === childIndex ? !item.isOpen : false, // open only the clicked one
            })),
        };
        });
    });    
  };
  const handlePickDate = (newValue: Date | null, index:number, childIndex: number) => {
    setNavbarCenterOptions(prev => {
    return prev.map((option, i) => {
        if (i !== index) return option;

        // Update the correct child array immutably
        return {
            ...option,
            child: option.child?.map((item, j) => ({
            ...item,
            value: j === childIndex ? newValue !== null ? newValue : new Date() : item.value, // open only the clicked one
            })),
        };
        });
    }); 
  }
  const handleClose = () => {
    setMemberPopOpen(false);
  };
  const handleClickOpen = () => {
    setMemberPopOpen(true);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (drawerState: boolean) => {
    setIsDrawerOpen(drawerState);
  }
  const list = () => (
    <Box
      role="presentation"
      onClick={() => toggleDrawer(false)}
      onKeyDown={() => toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
            <ListItemButton>
              <Link href={'/loginSignUp'}>
                <Button>Login/SignUp</Button>
              </Link>
            </ListItemButton>
          </ListItem>
        <ListItem disablePadding>
            <ListItemButton>
              <Link href={isAuth ? '/dashboard/account' : '/loginSignUp/login'}>
                <Button>Account Dashboard</Button>
              </Link>
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  const canBeOpen = open && Boolean(anchorEl);
  
  const id = canBeOpen ? 'transition-popper' : undefined;
    useEffect(() => {
        isAuth = localStorage.getItem('isAuth') === 'true';
    }, []);
    return (
        <div className={clsx('shadow-md bg-white', className)}>
            <div className='flex justify-between px-12 py-12 items-center'>
                <Link href={'/'} className='text-2xl font-bold text-red-600'>
                    clonebnb
                </Link>
                <div className='flex gap-3 items-center'>
                    <div className={clsx('hidden md:flex justify-between border-1 rounded-full bg-white shadow-md', Styles.centerButtonContainer)}>
                        {navbarCenterOptions.map((option, index) => (
                            option.name.toLowerCase() === 'any weeks' ? 
                                option.child !== undefined && option.child.map((child, childIndex) => (
                                        <div key={`any_week_${index}_${childIndex}`}>
                                            <button className='cursor-pointer text-sm' aria-describedby={`any_week_${index}_${childIndex}`} type="button" onClick={(e) => handleCalenderClick(e, index, childIndex)}>
                                                { child.name }
                                                <p className='text-gray-500'>{format(navbarCenterOptions[index].child !== undefined ? navbarCenterOptions[index].child[childIndex].value : '', 'MMM dd')}</p>
                                            </button>
                                            <Popper className={Styles.calendarPopUp} id={`any_week_${index}_${childIndex}`} open={navbarCenterOptions[index].child !== undefined ? navbarCenterOptions[index].child[childIndex].isOpen : false} anchorEl={anchorEl} transition sx={{ zIndex: 40 }}>
                                                {({ TransitionProps }) => (
                                                <Fade {...TransitionProps} timeout={350}>
                                                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                            <DateCalendar value={navbarCenterOptions[index].child !== undefined ? navbarCenterOptions[index].child[childIndex].value : new Date()} onChange={(newDateVal) => handlePickDate(newDateVal, index, childIndex)} />
                                                        </LocalizationProvider>
                                                    </Box>
                                                </Fade>
                                                )}
                                            </Popper>
                                        </div>
                                ))
                            : option.name.toLowerCase() === 'add guest' ? 
                            <div className='flex gap-3' key={`center_option_${index}`}>
                                <button className='cursor-pointer text-sm' aria-describedby={id}  type="button">
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
                                <Link href={'/search'}>
                                    <IconButton className='!bg-red-500' >
                                        <SearchIcon className='!fill-amber-50'/>
                                    </IconButton >
                                </Link>
                            </div> :
                            <div className='flex' key={`center_option_${index}`}>
                                <button className='cursor-pointer text-sm' aria-describedby={id}  type="button">
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
                    {/* search icon for mobile */}
                    <div className='inline-block md:hidden'>
                        <Link href={'/search'}>
                            <IconButton className='!bg-red-500' >
                                <SearchIcon className='!fill-amber-50'/>
                            </IconButton >
                        </Link>
                    </div>
                    <Filter></Filter>
                </div>
                <div>
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
                    {
                        <React.Fragment>
                        <Button onClick={() => toggleDrawer(true)}>
                            <MenuIcon/>
                        </Button>
                        <Drawer
                            anchor={'right'}
                            open={isDrawerOpen}
                            onClose={() => toggleDrawer(false)}
                        >
                            {list()}
                        </Drawer>
                        </React.Fragment>}
                </div>
            </div>
            
        </div>
        );
}