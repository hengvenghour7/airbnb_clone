import Image from "next/image";
import NewButton from "@/components/NewButton";
import Navbar from '@/components/Navbar'
import Feature from "@/components/Feature";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Feature/>
    </div>
  );
}
