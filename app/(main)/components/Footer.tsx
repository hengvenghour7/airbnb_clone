'use client'
import { Box, Divider, Tab, Tabs } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

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
            {
                title: 'Mudgee',
                description: 'Holiday rental'
            },
            {
                title: 'Hervey Bay',
                description: 'Pet-friendly rental'
            },
            {
                title: 'Albury',
                description: 'Holiday rental'
            },
            {
                title: 'Chrischurch',
                description: 'Holiday rental'
            },
            {
                title: 'Port Fairy',
                description: 'Villa rentals'
            },
            {
                title: 'Adelaide',
                description: 'House rental'
            },
            {
                title: 'Brisbane',
                description: 'Cabin rental'
            },
            {
                title: 'Culburra Beach',
                description: 'Holiday rental'
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
                title: 'Apennine Mountains',
                description: 'Sport Activities'
            },
            {
                title: 'Margarette River',
                description: 'Pet friendly rental'
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
]
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
    return (
        <div className="px-24 pb-24 pt-12 bg-gray-100">
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
                        <div className="grid grid-cols-6 gap-3">

                            {
                                panel.contents.map((content, index) => (            
                                    <div key={`content_${index}`}>
                                        <h3 className="text-sm">{content.title}</h3>
                                        <p className="text-sm text-gray-400">{content.description}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </CustomTabPanel>
                ))
            }
            <div className="flex justify-between my-12">
                {
                    footerFeatures.map((feature, index) => (
                        <div key={`feature_${index}`} className="flex flex-col gap-3">
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
            <Divider />
            <div className="mt-3"> 
                <p>© 2025 Clonebnb, Inc.·PrivacyTerms</p>
            </div>
        </div>
    )
}