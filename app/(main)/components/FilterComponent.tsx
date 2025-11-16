import { Button, Dialog, Divider, IconButton, Slide, Tab, Tabs, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, useState } from "react";
import { styled } from '@mui/material/styles';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';
import WifiIcon from '@mui/icons-material/Wifi';
import TvIcon from '@mui/icons-material/Tv';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import KitchenIcon from '@mui/icons-material/Kitchen';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import { Dry, Iron, Pool, LocalParking, EvStation,  Add, Remove, DisplaySettings } from '@mui/icons-material';

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
    icon?: ReactElement
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
    img: '/images/navbar/free_parking.png'
  },
  {
    display: 'Washing Machine',
    img: '/images/navbar/washing_machine.png'
  },
  {
    display: 'Allows Pets',
    img: '/images/navbar/allows_pets.png'
  },
  {
    display: 'Self CheckIn',
    img: '/images/navbar/free_parking.png'
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
            icon: <WifiIcon sx={{ mr: 1 }} />
          },
          {
            display: 'Air Conditioning',
            icon: <AcUnitIcon sx={{ mr: 1 }} />
          },
          {
            display: 'TV',
            icon:  <TvIcon sx={{ mr: 1 }} />
          },
          {
            display: 'Kitchen',
            icon: <KitchenIcon sx={{ mr: 1 }} />
          },
          {
            display: 'Hot tub',
            icon: <KitchenIcon sx={{ mr: 1 }} />
          },
          {
            display: 'Dryer',
            icon: <KitchenIcon sx={{ mr: 1 }} />
          },
        ],
      },
      essentials: {
        display: 'Essential',
        items: [
          {
            display: 'Washing Machine',
            icon: <LocalLaundryServiceIcon sx={{ mr: 1 }} />
          },
          {
            display: 'Heating',
          },
          {
            display: 'Dedicated Workspace',
          },
          {
            display: 'Hair Dryer',
            icon: <Dry sx={{ mr: 1 }} />,
          },
          {
            display: 'Iron',
            icon: <Iron sx={{ mr: 1 }} />,
          },
        ],
      },
      features: {
        display: 'Feature',
        items: [
          {
            display: 'Pool',
            icon: <Pool sx={{ mr: 1 }} />,
          },
          {
            display: 'Free Parking',
            icon: <LocalParking sx={{ mr: 1 }} />,
          },
          {
            display: 'EV charger',
            icon: <EvStation sx={{ mr: 1 }} />,
          },
          {
            display: 'King Bed',
            icon: <EvStation sx={{ mr: 1 }} />,
          },
          {
            display: 'Gym',
            icon: <EvStation sx={{ mr: 1 }} />,
          },
          {
            display: 'BBQ grill',
            icon: <EvStation sx={{ mr: 1 }} />,
          },
          {
            display: 'Breakfast',
            icon: <EvStation sx={{ mr: 1 }} />,
          },
          {
            display: 'Indoor fireplace',
            icon: <EvStation sx={{ mr: 1 }} />,
          },
          {
            display: 'Smoking allowed',
            icon: <EvStation sx={{ mr: 1 }} />,
          },
        ],
      },
      location: {
        display: 'Location',
        items: [
          {
            display: 'Beachfront',
            icon: <Pool sx={{ mr: 1 }} />,
          },
          {
            display: 'Waterfront',
            icon: <LocalParking sx={{ mr: 1 }} />,
          },
        ]
      },
      safety: {
        display: 'Safety',
        items: [
          {
            display: 'Smoke alarm',
            icon: <Pool sx={{ mr: 1 }} />,
          },
          {
            display: 'Carbon monoxide alarm',
            icon: <LocalParking sx={{ mr: 1 }} />,
          },
        ]
      }
    };
    const bookingOptions = [
      {
        fieldname: 'Instant Book',
        icon: <LocalParking sx={{ mr: 1 }} />,
      },
      {
        fieldname: 'Self check-in',
        icon: <LocalParking sx={{ mr: 1 }} />,
      },
      {
        fieldname: 'Allowed pets',
        icon: <LocalParking sx={{ mr: 1 }} />,
      },
    ]
    const [selected, setSelected] = useState<String[]>([]);

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
              >
              <div className="p-6">

                    Filters
                    <Divider />
                    <div className="flex gap-3">
                        {
                            reccomendations.map((item, index) => (
                                <div key={index}>
                                  <img src={item.img} alt="" />
                                  <p className="text-sm text-center my-3">
                                    {item.display}
                                  </p>
                                </div>
                            ))
                        }
                    </div>
                    <Divider className="!my-3" />
                    <h3>Type of Places</h3>
                    <Tabs value={value} onChange={(e:React.SyntheticEvent, newValue:number) => setValue(newValue)}>
                      {
                        typeTabs.map((tab, index) => (
                          <Tab key={index} label={tab} />
                        ))
                      }
                    </Tabs>
                    <Slider
                      getAriaLabel={() => 'Minimum distance shift'}
                      value={value2}
                      onChange={handleChange2}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      disableSwap
                    />
                    <Divider className="!my-3" />
                    <h3 className="mb-3">Rooms and Beds</h3>
                    {
                      roomOptions.map((option, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <h3 className="text-sm">{option.display}</h3>
                          <div className="flex gap-3 items-center">
                            <IconButton onClick={() => handleOptionChange(true, index)}>
                                <Add />
                            </IconButton>
                            <h3 className="text-sm">{option.amount === 0 ? 'Any' : String(option.amount).concat('+')}</h3>
                            <IconButton onClick={() => handleOptionChange(false, index)}>
                                <Remove />
                            </IconButton>
                          </div>
                        </div>
                      ))
                    }
                    <Divider className="!my-3" />
                    <h3>Amenities</h3>
                    {
                      Object.entries(amenities).map(([key, value], index) => (
                        <div key={`amenities_${index}`}>
                          <h3 className="my-3">{value.display}</h3>
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
                                  <ToggleButton value="wifi" sx={{ borderRadius: 5, paddingX: 2 }}>
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
                    <Divider className="!my-3" />
                    <h3 className="mb-3">Booking Options</h3>
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
                                
                                <ToggleButton value="wifi" sx={{ borderRadius: 5, paddingX: 2 }}>
                                  {
                                    option.icon !== undefined ? option.icon : <WifiIcon sx={{ mr: 1 }} />
                                  }
                                  <p className="text-xs">{option.fieldname}</p>
                                </ToggleButton>
                          </ToggleButtonGroup>
                        ))
                      }
                    </div>
              </div>
            </Dialog>
        </div>
    )
}