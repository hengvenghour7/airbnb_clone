import Image from "next/image";
import NewButton from "@/components/NewButton";
import Navbar from '@/components/Navbar'
import Feature from "@/components/Feature";
import { fetchRevenue } from "@/app/lib/data"

const allcatalogue:string[] = ['Popular Home in Sydney', 'Available next month in Adelaide', 'Available in Surf Coast Shire this weekend']
export default async function Home() {
  const Revenue = await fetchRevenue();
  console.log(Revenue[0].customer);
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
          <Feature key={`catalogue_${index}`} catalogue={catalogue} revenueCust={nn} />
        ))
      }
    </div>
  );
}
