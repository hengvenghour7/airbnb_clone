'use client'
import { Box, Button, Divider, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const allTabs = ['Popular', 'Costal', 'Islands', 'Lakes', 'Outdoor', 'Things to do'];
const allTabsPanel = [
    {
        tab: 'Popular',
        contents: [
            {
                title: 'London',
                description: 'Serviced apartment rentals'
            },
            {
                title: 'Sydney',
                description: 'Apartment rentals'
            },
            {
                title: 'Fremantle',
                description: 'Apartment rentals'
            },
            {
                title: 'North Stradbrok Island',
                description: 'Holiday rentals'
            },
            {
                title: 'Lakes Entrance',
                description: 'Holiday rentals'
            },
            {
                title: 'Maroochydore',
                description: 'Apartment rentals'
            },
            {
                title: 'Bondi Beach',
                description: 'Pet-friendly rentals'
            },
            {
                title: 'Perth',
                description: 'Pet-friendly rentals'
            },
            {
                title: 'Sorrento',
                description: 'Villa rentals'
            },
            {
                title: 'Southbank',
                description: 'Serviced apartment rentals'
            },
            {
                title: 'Athens',
                description: 'Apartment rentals'
            },
            {
                title: 'Robe',
                description: 'Holiday rentals'
            },
            {
                title: 'Margaret River',
                description: 'Villa rentals'
            },
            {
                title: 'Broadbeach',
                description: 'Pet-friendly rentals'
            },
            {
                title: 'Vincentia',
                description: 'House rentals'
            },
            {
                title: 'Port Fairy',
                description: 'Apartment rentals'
            },
            {
                title: 'Phillip Island',
                description: 'Apartment rentals'
            },
            {
                title: 'Wollongong City Council',
                description: 'Pet-friendly rentals'
            },
            {
                title: 'Christchurch',
                description: 'House rentals'
            },
            {
                title: 'Kuta',
                description: 'Apartment rentals'
            },
            {
                title: 'Bowral',
                description: 'Cabin rentals'
            },
            {
                title: 'Dunsborough',
                description: 'Holiday rentals'
            },
            {
                title: 'Blue Mountains',
                description: 'Serviced apartment rentals'
            },
            {
                title: 'Coffs Harbour',
                description: 'Pet-friendly rentals'
            },
            {
                title: 'Bangkok',
                description: 'Apartment rentals'
            },
        ]
    },
    {
        tab: 'Costal',
        contents: [
            {
                title: 'Palm Cov Beach',
                description: 'Holidays rental'
            },
            {
                title: 'Faro',
                description: 'Holidays rental'
            },
            {
                title: 'Balagan Beach',
                description: 'Pet friendly rental'
            },
        ]
    },
    {
        tab: 'Islands',
        contents: [
            {
                title: 'London',
                description: 'Holidays rental'
            },
            {
                title: 'Canberra',
                description: 'Holidays rental'
            },
            {
                title: 'Margarette River',
                description: 'Pet friendly rental'
            },
        ]
    },
    {
        tab: 'Lakes',
        contents: [
            {
                title: 'Cleveland',
                description: 'Villa rental'
            },
            {
                title: 'St. Catharines',
                description: 'Apratment rental'
            },
            {
                title: 'Oklahoma City',
                description: 'Monthly rental'
            },
            {
                title: 'Moltrasio',
                description: 'Apartment rental'
            },
            {
                title: 'Plano',
                description: 'Monthly rental'
            },
        ]
    },
    {
        tab: 'Outdoors',
        contents: [
            {
                title: 'Kaima',
                description: 'Holidays rental'
            },
            {
                title: 'Geelong',
                description: 'Cabin rental'
            },
            {
                title: 'Arrowtown',
                description: 'Holiday rentals'
            },
            {
                title: 'Brunswick',
                description: 'Holiday rentals'
            },
            {
                title: 'Peninsula Hot Springs',
                description: 'House rentals'
            },
            {
                title: 'Airlie Beach',
                description: 'Apartment rentals'
            },
            {
                title: 'Annecy',
                description: 'Holiday rentals'
            },
            {
                title: 'Frankton',
                description: 'Holiday rental'
            },
            {
                title: 'Walpole',
                description: 'House rental'
            },
            {
                title: 'Pretoria',
                description: 'Pet-friendly rentals'
            },
            {
                title: 'San Remo',
                description: 'House rentals'
            },
        ]
    },
    {
        tab: 'Thins to do',
        contents: [
            {
                title: 'Honshu ',
                description: 'Things to do'
            },
            {
                title: 'Appennine Mountains',
                description: 'Tours'
            },
            {
                title: 'Tokyo',
                description: 'Nature and outdoors'
            },
            {
                title: 'Tama River',
                description: 'Food and drink'
            },
            {
                title: 'Seoul',
                description: 'Food and drink'
            },
            {
                title: 'Tokyo Bay',
                description: 'Entertainment'
            },
            {
                title: 'Seine',
                description: 'Tours'
            },
            {
                title: 'Paris',
                description: 'Things to do'
            },
            {
                title: 'Rome',
                description: 'Sports activites'
            },
            {
                title: 'Puebla',
                description: 'Tours'
            },
            {
                title: 'Ho Chi Minh City',
                description: 'Sightseeing'
            },
            {
                title: 'Hanoi',
                description: 'Food and drink'
            },
            {
                title: 'Mexico City',
                description: 'Food and drink'
            },
            {
                title: 'Ubud',
                description: 'Nature and outdoors'
            },
            {
                title: 'Shibuya',
                description: 'Food and drink'
            },
            {
                title: 'Kyoto',
                description: 'Nature and outdoors'
            },
            {
                title: 'Bangkok',
                description: 'Entertainment'
            },
            {
                title: 'Chao Phraya River',
                description: 'Nature and outdoors'
            },
            {
                title: 'Florence',
                description: 'Food and drink'
            },
            {
                title: 'Sydney',
                description: 'Art and culture'
            },
            {
                title: 'Osaka',
                description: 'Things to do'
            },
            {
                title: 'Hoi An',
                description: 'Tours'
            },
            {
                title: 'Jong-gu',
                description: 'Things to do'
            },
            {
                title: 'Sydney Harbour',
                description: 'Food and drink'
            },
            {
                title: 'Kuta',
                description: 'Food and drink'
            },
            {
                title: 'Kamo River',
                description: 'Things to do'
            },
            {
                title: 'Great Britain',
                description: 'Art and culture'
            },
            {
                title: 'Tegallalang',
                description: 'Nature and outdoors'
            },
        ]
    },
    
];
const footerFeatures = [
    {
        title: 'Support',
        elements: [
            {
                name: 'Help Center',
                link: ''
            },
            {
                name: 'Air Cover',
                link: ''
            },
            {
                name: 'Anti-discrimination',
                link: ''
            },
            {
                name: 'Disability Support',
                link: ''
            },
        ]
    },
    {
        title: 'Hosting',
        elements: [
            {
                name: 'Help Center',
                link: ''
            },
            {
                name: 'Air Cover',
                link: ''
            },
            {
                name: 'Anti-discrimination',
                link: ''
            },
            {
                name: 'Disability Support',
                link: ''
            },
        ]
    },
    {
        title: 'Clonebnb',
        elements: [
            {
                name: 'Help Center',
                link: ''
            },
            {
                name: 'Air Cover',
                link: ''
            },
            {
                name: 'Anti-discrimination',
                link: ''
            },
            {
                name: 'Disability Support',
                link: ''
            },
        ]
    },
];
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function Footer () {
    const [value, setValue] = useState(0);
    const [isExpand, setIsExpand] = useState(false);
    const [sliceAmount, setSliceAmount] = useState(7);
    useEffect(() => {
        const handleSize = () => {
                const innerWidth = window.innerWidth;
                if (window.innerWidth > 1280) setSliceAmount(17)
                else if (window.innerWidth > 768) setSliceAmount(11)
                else setSliceAmount(7)
            }
            window.addEventListener('resize', handleSize);
            handleSize();
    },[]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
    return (
        <div className="px-3 md:px-24 pb-24 pt-12 mt-12 shadow-md bg-gray-100">
            <h3 className="text-xl font-medium mb-4">Inspiration for future gateway</h3>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                {
                    allTabs.map((item, index) => (
                        <Tab label={item} key={`tab_${index}`} {...a11yProps(index)} />
                    ))
                }
            </Tabs>
            </Box>
            {
                allTabsPanel.map((panel, index) => (
                    <CustomTabPanel key={`tab_panel_${index}`} value={value} index={index}>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

                            {
                                (isExpand ? panel.contents : panel.contents.slice(0,sliceAmount)).map((content, index) => (       
                                    <Link key={`content_${index}`} href={`/${content.title.replaceAll(' ', '-')}/stay/${content.description.replaceAll(' ','-')}`}>
                                        <div className="hover:cursor-pointer text-left">
                                            <h3 className="text-sm">{content.title}</h3>
                                            <p className="text-sm text-gray-500 hover:text-black">{content.description}</p>
                                        </div>
                                    </Link>     
                                ))
                            }
                            {
                                panel.contents.length > 17 && 
                                <button className="hover:cursor-pointer hover:underline text-left text-sm mb-auto" onClick={() => {
                                    setIsExpand(!isExpand);
                                }}> {!isExpand ? <div>Show more <ArrowDropDownIcon/></div> : <div>Show less <ArrowDropUpIcon/></div> }</button>
                            }
                        </div>
                    </CustomTabPanel>
                ))
            }
            <div className="grid grid-cols-1 md:grid-cols-3 my-0 md:my-12">
                {
                    footerFeatures.map((feature, index) => (
                        <div key={`feature_${index}`} className="flex flex-col gap-3 w-full mb-6 pb-6 border-b md:pb-0 md:mb-0 md:border-0 border-gray-300">
                            <h3 className="font-semibold">{feature.title}</h3>
                            {
                                feature.elements.map((ele, index) => (
                                    <Link key={`link_${index}`} href={ele.link} className="hover:underline">
                                        <p>{ele.name}</p>
                                    </Link>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <Divider className="hidden md:block" />
            <div className="mt-3"> 
                <p>© 2025 Clonebnb, Inc.·PrivacyTerms</p>
            </div>
        </div>
    )
}