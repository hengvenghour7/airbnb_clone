import Image from "next/image";
import NewButton from "@/components/NewButton";
import Navbar from '@/components/Navbar'
import Feature from "@/components/Feature";


const allcatalogue:string[] = ['Popular Home in Sydney', 'Available next month in Adelaide', 'Available in Surf Coast Shire this weekend']
export default function Home() {
  return (
    <div>
      {
        allcatalogue.map((catalogue, index) => (
          <Feature key={`catalogue_${index}`} catalogue={catalogue} />
        ))
      }
    </div>
  );
}
