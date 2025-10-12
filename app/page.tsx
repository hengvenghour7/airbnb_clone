import Image from "next/image";
import NewButton from "@/components/NewButton";
import Navbar from '@/components/Navbar'
import Feature from "@/components/Feature";
import { fetchRevenue } from "@/app/lib/data"
import { fetchServices } from "./lib/databaseHelper";

const allcatalogue:string[] = ['Popular Home in Sydney', 'Available next month in Adelaide', 'Available in Surf Coast Shire this weekend']
export default async function Home() {
  const Revenue = await fetchRevenue();
  const homeServices = await fetchServices('home');
  console.log(homeServices[0].placename);
  const nn = await Revenue[0].customer;
  // if (!Revenue || Revenue.length === 0) {
  //   return <p className="mt-4 text-gray-400">No data available.</p>;
  // }
  const revenueClick = () => {
    console.log(Revenue[0].customer);
    
  }
  return (
    <div>
      {/* <div onClick={ revenueClick }>{ Revenue[0].customer }</div> */}
      {
        allcatalogue.map((catalogue, index) => (
          <Feature key={`catalogue_${index}`} catalogue={catalogue} revenueCust={homeServices} />
        ))
      }
    </div>
  );
}
