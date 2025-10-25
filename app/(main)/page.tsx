import Image from "next/image";
import Feature from "@/app/(main)/components/Feature";
import { fetchServices } from "../lib/databaseHelper";

const allcatalogue:string[] = ['Popular Home in Sydney', 'Available next month in Adelaide', 'Available in Surf Coast Shire this weekend']
export default async function Home() {
  const homeServices = await fetchServices('home');
  // if (!Revenue || Revenue.length === 0) {
  //   return <p className="mt-4 text-gray-400">No data available.</p>;
  // }
  return (
    <div>
      {/* <div onClick={ revenueClick }>{ Revenue[0].customer }</div> */}
      {
        allcatalogue.map((catalogue, index) => (
          <Feature key={`catalogue_${index}`} catalogue={catalogue} />
        ))
      }
    </div>
  );
}
