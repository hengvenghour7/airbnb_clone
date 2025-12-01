import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Dialog, Divider,
  FormControlLabel, FormGroup, IconButton, Slide, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, useState } from "react";
import { styled } from '@mui/material/styles';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import WifiIcon from '@mui/icons-material/Wifi';
import TvIcon from '@mui/icons-material/Tv';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import { Dry, Iron, Pool, LocalParking, EvStation,  Add, Remove, DisplaySettings, House, Home, Cottage, LocationCity , Apartment  } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { features, title } from "process";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
type AmenitiesItemType = {
  display: string,
  items: {
    display:string,
    icon?: ReactElement,
    value?: string
  }[]
}
type AmenitiesType = {
  popular: AmenitiesItemType,
  essentials: AmenitiesItemType,
  features: AmenitiesItemType,
  location: AmenitiesItemType,
  safety: AmenitiesItemType,
}
const reccomendations = [
  {
    display: 'Free Parking',
    img: '/images/navbar/free_parking_icon.png'
  },
  {
    display: 'Washing Machine',
    img: '/images/navbar/washing_machine_icon_2.png'
  },
  {
    display: 'Allows Pets',
    img: '/images/navbar/allows_pets_icon.png'
  },
  {
    display: 'Self CheckIn',
    img: '/images/navbar/key_icon.png'
  },
  
];
function valuetext(value: number) {
  return `${value}°C`;
}
const typeTabs = ['Any type', 'Room', 'Entire Home'];
const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#3a8589',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
    ...theme.applyStyles('dark', {
      color: '#bfbfbf',
      opacity: undefined,
    }),
  },
}));
const minDistance = 10;

export default function Filter () {
    const [roomOptions, setRoomOptions] = useState([
      {
        display: 'Bedroom',
        amount: 0,
      },
      {
        display: 'Bed',
        amount: 0,
      },
      {
        display: 'Bathroom',
        amount: 0,
      },
    ]);
    const amenities:AmenitiesType = {
      popular: {
        display: 'Popular',
        items: [
          {
            display: 'Wifi',
            icon: <WifiIcon sx={{ mr: 1 }} />,
            value: "wifi",
          },
          {
            display: 'Air Conditioning',
            icon: <AcUnitIcon sx={{ mr: 1 }} />,
            value: "air_conditioning",
          },
          {
            display: 'TV',
            icon:  <TvIcon sx={{ mr: 1 }} />,
            value: "tv"
          },
          {
            display: 'Kitchen',
            icon: <KitchenIcon sx={{ mr: 1 }} />,
            value: "kitchen"
          },
          {
            display: 'Hot tub',
            icon: <KitchenIcon sx={{ mr: 1 }} />,
            value: "hot_tub"
          },
          {
            display: 'Dryer',
            icon: <KitchenIcon sx={{ mr: 1 }} />,
            value: "dryer"
          },
        ],
      },
      essentials: {
        display: 'Essential',
        items: [
          {
            display: 'Washing Machine',
            icon: <LocalLaundryServiceIcon sx={{ mr: 1 }} />,
            value: "washing_machine"
          },
          {
            display: 'Heating',
            value: "heating"
          },
          {
            display: 'Dedicated Workspace',
            value: "dedicated workspace"
          },
          {
            display: 'Hair Dryer',
            icon: <Dry sx={{ mr: 1 }} />,
            value: "hair dryer"
          },
          {
            display: 'Iron',
            icon: <Iron sx={{ mr: 1 }} />,
            value: "iron"
          },
        ],
      },
      features: {
        display: 'Feature',
        items: [
          {
            display: 'Pool',
            icon: <Pool sx={{ mr: 1 }} />,
            value: "pool"
          },
          {
            display: 'Free Parking',
            icon: <LocalParking sx={{ mr: 1 }} />,
            value: 'free_parking'
          },
          {
            display: 'EV charger',
            icon: <EvStation sx={{ mr: 1 }} />,
            value: 'ev charger'
          },
          {
            display: 'King Bed',
            icon: <EvStation sx={{ mr: 1 }} />,
            value: 'king bed'
          },
          {
            display: 'Gym',
            icon: <EvStation sx={{ mr: 1 }} />,
            value: 'gym'
          },
          {
            display: 'BBQ grill',
            icon: <EvStation sx={{ mr: 1 }} />,
            value: 'BBQ_grill'
          },
          {
            display: 'Breakfast',
            icon: <EvStation sx={{ mr: 1 }} />,
            value: 'breakfast'
          },
          {
            display: 'Indoor fireplace',
            icon: <EvStation sx={{ mr: 1 }} />,
            value: 'indoor_fireplace'
          },
          {
            display: 'Smoking allowed',
            icon: <EvStation sx={{ mr: 1 }} />,
            value: 'smoking allowed'
          },
        ],
      },
      location: {
        display: 'Location',
        items: [
          {
            display: 'Beachfront',
            icon: <Pool sx={{ mr: 1 }} />,
            value: 'beachfront'
          },
          {
            display: 'Waterfront',
            icon: <LocalParking sx={{ mr: 1 }} />,
            value: 'waterfront'
          },
        ]
      },
      safety: {
        display: 'Safety',
        items: [
          {
            display: 'Smoke alarm',
            icon: <Pool sx={{ mr: 1 }} />,
            value: 'smoke_alarm'
          },
          {
            display: 'Carbon monoxide alarm',
            icon: <LocalParking sx={{ mr: 1 }} />,
            value: 'carbon_monoxide_alarm'
          },
        ]
      }
    };
    const amenitiesFirstItem = Object.entries(amenities)[0][1];
    const bookingOptions = [
      {
        fieldname: 'Instant Book',
        icon: <LocalParking sx={{ mr: 1 }} />,
        value: 'instant_book'
      },
      {
        fieldname: 'Self check-in',
        icon: <LocalParking sx={{ mr: 1 }} />,
        value: 'self_check-in'
      },
      {
        fieldname: 'Allowed pets',
        icon: <LocalParking sx={{ mr: 1 }} />,
        value: 'allowed_pets'
      },
    ];
    const propertyType = [
      {
        displayText: 'House',
        value: 'house',
        icon: <Home sx={{ mr: 1 }} />
      },
      {
        displayText: 'Apartment',
        value: 'apartment',
        icon: <Apartment sx={{ mr: 1 }} />
      },
      {
        displayText: 'Guest House',
        value: 'guest_house',
        icon: <Cottage sx={{ mr: 1 }} />
      },
      {
        displayText: 'Hotel',
        value: 'hotel',
        icon: <LocationCity sx={{ mr: 1 }} />
      },
    ]
    const accessibilityFeatures = [
      {
        title: 'Guest entrance and parking',
        options: ['Step-free access', 'Disabled parking spot', 'Guest entrance wider than 81cm'],
      },
      {
        title: 'Bedroom',
        options: ['Step-free bedroom access', 'Bedroom wider than 81cm', 'Toilet grab rail', 'Shower grab rail', 'Step-free shower',
          'Shower or bath chair'
        ],
      },
      {
        title: 'Adaptive Equipment',
        options: ['Ceiling and mobile hoist']
      }
    ]
    const hostLanguages = ['Chinese(Simplified)', 'Chinese(Traditional', 'English', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Portuguese', 'Russian',
      'Spanish', 'Arabic', 'Catalan', 'Crotian', 'Czech', 'Danish', 'Dutch', 'Finnish', 'Greek', 'Hebrew', 'Hindi'
    ]
    const [selected, setSelected] = useState<String[]>([]);
    const [isShowMore, setIsShowMore] = useState(false);
    const handleAmenitiesChange = (event: React.MouseEvent<HTMLElement>, newSelected: string[]) => {
      setSelected(newSelected);
    };
    const handleOptionChange = (isAdd: boolean, optionIndex: number) => {      
      setRoomOptions(prev => (
        prev.map((option, index) => (
          index !== optionIndex ? option : {
            ...option, amount: isAdd ? option.amount + 1 : 
            option.amount > 0 ? option.amount - 1 : option.amount
          }
        ))
      ))
    }
    const handleChange2 = (event: Event, newValue: number[], activeThumb: number) => {
      if (newValue[1] - newValue[0] < minDistance) {
        if (activeThumb === 0) {
          const clamped = Math.min(newValue[0], 100 - minDistance);
          setValue2([clamped, clamped + minDistance]);
        } else {
          const clamped = Math.max(newValue[1], minDistance);
          setValue2([clamped - minDistance, clamped]);
        }
      } else {
        setValue2(newValue);
      }
    };
     const [value2, setValue2] = useState<number[]>([20, 37]);
    const [value, setValue] = useState(0);
    interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
      const { children, ...other } = props;
      return (
        <SliderThumb {...other}>
          {children}
          <span className="airbnb-bar" />
          <span className="airbnb-bar" />
          <span className="airbnb-bar" />
        </SliderThumb>
      );
    }
    return (
        <div>
            <Button onClick={() => setIsFilterOpen(true)}>Filter</Button>
            <Dialog open={isFilterOpen} slots={{
              transition: Transition,
              }}
              onClose={() => setIsFilterOpen(false)}
              className="filter-container"
              >
              <div>
                  <p className="text-center font-semibold my-3">Filters</p>
                  <Divider />
              </div>
              <div className="p-6 overflow-y-auto">

                    <div>
                      <h3 className="font-semibold mb-3">Recommended for you</h3>
                      <div className="flex gap-3">
                        {
                            reccomendations.map((item, index) => (
                                <div key={index}>
                                  <button className="hover:cursor-pointer border rounded-lg border-gray-300 hover:border-black">
                                    <img src={item.img} alt="" className="grayscale brightness-50" />
                                  </button>
                                  <p className="text-sm text-center my-3">
                                    {item.display}
                                  </p>
                                </div>
                            ))
                        }
                      </div>
                    </div>
                    <Divider className="!my-3" />
                    <h3 className="font-semibold">Type of Places</h3>
                    <Tabs value={value} onChange={(e:React.SyntheticEvent, newValue:number) => setValue(newValue)}>
                      {
                        typeTabs.map((tab, index) => (
                          <Tab key={index} label={tab} />
                        ))
                      }
                    </Tabs>
                    <Divider className="!my-3" />
                    <h3 className="font-semibold">Price Range</h3>
                    <p>Trip price, includes all fees</p>
                    <Slider
                      getAriaLabel={() => 'Minimum distance shift'}
                      value={value2}
                      onChange={handleChange2}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      disableSwap
                    />
                    <Divider className="!my-3" />
                    <h3 className="mb-3 font-semibold">Rooms and Beds</h3>
                    {
                      roomOptions.map((option, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <h3 className="text-sm">{option.display}</h3>
                          <div className="flex gap-3 items-center">
                            <IconButton disabled={option.amount <= 0} onClick={() => handleOptionChange(false, index)}>
                                <Remove />
                            </IconButton>
                            <h3 className="text-sm w-6 text-center">{option.amount === 0 ? 'Any' : String(option.amount).concat('+')}</h3>
                            <IconButton onClick={() => handleOptionChange(true, index)}>
                                <Add />
                            </IconButton>
                          </div>
                        </div>
                      ))
                    }
                    <Divider className="!my-3" />
                    <h3 className="font-semibold">Amenities</h3>
                    <div>
                          <h3 className="my-3 font-semibold">{amenitiesFirstItem.display}</h3>
                          <div className="flex gap-3 flex-wrap">
                            {
                              amenitiesFirstItem.items.map((item, index) => (
                                <ToggleButtonGroup
                                  key={index}
                                  value={selected}
                                  onChange={handleAmenitiesChange}
                                  aria-label="amenities"
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1.5
                                  }}
                                >
                                  <ToggleButton value={item.value !== undefined ? item.value : "wifi"} sx={{ borderRadius: 5, paddingX: 2 }}>
                                    {
                                      item.icon !== undefined ? item.icon : <WifiIcon sx={{ mr: 1 }} />
                                    }
                                    <p className="text-xs">{item.display}</p>
                                  </ToggleButton>
                                </ToggleButtonGroup>
                              ))
                            }
                          </div>
                        </div>
                          <Accordion className="filter-accordian">
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                              onClick={() => {setIsShowMore(!isShowMore)}}
                            >
                              <p className="underline">{!isShowMore ? 'Show more' : 'Show less'}</p>
                            </AccordionSummary>
                            <AccordionDetails>
                    {
                      Object.entries(amenities).slice(1).map(([key, value], index) => (
                        <div key={`amenities_${index}`}>
                          <h3 className="my-3 font-semibold">{value.display}</h3>
                              <div className="flex gap-3 flex-wrap">
                                {
                                  value.items.map((item, index) => (
                                    <ToggleButtonGroup
                                      key={index}
                                      value={selected}
                                      onChange={handleAmenitiesChange}
                                      aria-label="amenities"
                                      sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 1.5
                                      }}
                                    >
                                      <ToggleButton value={item.value !== undefined ? item.value : "wifi"} sx={{ borderRadius: 5, paddingX: 2 }}>
                                        {
                                          item.icon !== undefined ? item.icon : <WifiIcon sx={{ mr: 1 }} />
                                        }
                                        <p className="text-xs">{item.display}</p>
                                      </ToggleButton>
                                    </ToggleButtonGroup>
                                  ))
                                }
                              </div>
                          
                        </div>
                      ))
                    }
                            </AccordionDetails>
                          </Accordion>
                    <Divider className="!my-3" />
                    <h3 className="mb-3 font-semibold">Booking Options</h3>
                    <div className="flex flex-wrap gap-3">

                     {
                        bookingOptions.map((option, index) => (
                        <ToggleButtonGroup
                                key={index}
                                value={selected}
                                onChange={handleAmenitiesChange}
                                aria-label="amenities"
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1.5
                                }}
                              >
                                
                                <ToggleButton value={option.value !== undefined ? option.value : "wifi"} sx={{ borderRadius: 5, paddingX: 2 }}>
                                  {
                                    option.icon !== undefined ? option.icon : <WifiIcon sx={{ mr: 1 }} />
                                  }
                                  <p className="text-xs">{option.fieldname}</p>
                                </ToggleButton>
                          </ToggleButtonGroup>
                        ))
                      }
                    </div>
                    <Divider className="!my-3" />
                    <div>
                      <h3 className="font-semibold my-3">Standout stays</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="border rounded-md text-center p-3 border-gray-300 hover:cursor-pointer">
                          <p className="font-semibold">Guest Favorite</p>
                          <p>The loved home on Airbnb</p>
                        </button>
                        <button className="border rounded-md text-center p-3 border-gray-300 hover:cursor-pointer">
                          <p className="font-semibold">Luxe</p>
                          <p>Lovely home with elevated design</p>
                        </button>
                      </div>
                    </div>
                    <Divider className="!my-3" />
                    <Accordion className="filter-accordian">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <p className="font-semibold">Property Type</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="flex flex-wrap gap-3">
                          {
                            propertyType.map((item, index) => (
                              <ToggleButtonGroup
                                    key={index}
                                    value={selected}
                                    onChange={handleAmenitiesChange}
                                    aria-label="amenities"
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 1.5
                                    }}
                                  >
                                    <ToggleButton value={item.value !== undefined ? item.value : "wifi"} sx={{ borderRadius: 5, paddingX: 2 }}>
                                      {
                                        item.icon !== undefined ? item.icon : <WifiIcon sx={{ mr: 1 }} />
                                      }
                                      <p className="text-xs">{item.displayText}</p>
                                    </ToggleButton>
                                  </ToggleButtonGroup>
                            ))
                          }
                        </div>
                      </AccordionDetails>
                    </Accordion>
                    <Divider className="!my-3" />
                    <Accordion className="filter-accordian">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <p className="font-semibold">Accessibility Features</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        {
                          accessibilityFeatures.map((res, index) => (
                            <div key={`accessibility_${index}`}>
                              <p className="font-semibold my-3">{res.title}</p>
                              {
                                res.options.map((value, index) => (
                                    <FormGroup key={index}>
                                      <FormControlLabel control={<Checkbox defaultChecked= {false} />} label={value} />
                                    </FormGroup>
                                ))
                              }
                            </div>
                          ))
                        }
                      </AccordionDetails>
                    </Accordion>
                    <Divider className="!my-3" />
                    <Accordion className="filter-accordian">
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <p className="font-semibold">Host Language</p>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className="grid grid-cols-2">
                          {
                            hostLanguages.map((res, index) => (
                                <FormGroup key={index}>
                                  <FormControlLabel control={<Checkbox defaultChecked= {false} />} label={res} />
                                </FormGroup>
                            ))
                          }
                        </div>
                      </AccordionDetails>
                    </Accordion>
              </div>
              <div>
                <Divider />
                <div className="flex justify-between p-6">
                  <Button sx={{color: "black"}}>Clear All</Button>
                  <Button variant="contained" sx={{backgroundColor :"black", borderRadius: "16px"}}>Show 1000+ places</Button>
                </div>
              </div>
            </Dialog>
        </div>
    )
}