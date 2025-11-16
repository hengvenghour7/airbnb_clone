import { Button, Dialog, Divider, Slide, Tab, Tabs } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, useState } from "react";
import { styled } from '@mui/material/styles';
import Slider, { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
    });
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
                                  <h3>

                                    {item.display}
                                  </h3>
                                </div>
                            ))
                        }
                    </div>
                    <Divider />
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
                    <Divider />
                    <h3>Rooms and Beds</h3>
                    {
                      roomOptions.map((option, index) => (
                        <div key={index} className="flex justify-between">
                          <h3>{option.display}</h3>
                          <div className="flex gap-3">
                            <Button onClick={() => handleOptionChange(true, index)}>Add</Button>
                            <h3>{option.amount === 0 ? 'Any' : String(option.amount).concat('+')}</h3>
                            <Button onClick={() => handleOptionChange(false, index)}>Minus</Button>
                          </div>
                        </div>
                      ))
                    }
                    <Divider />
                    <h3>Amenities</h3>
              </div>
            </Dialog>
        </div>
    )
}