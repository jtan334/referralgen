import Image from "next/image";
import SearchCompanies from "./components/SearchCompanies";
import Landing from "./landing/Landing"

export default function Home() {
  return (
      <main>
        <div className= 'bg-[#CBC9AD]'>
        <h1 className= 'bg-[#CBC9AD] text-5xl text-center font-sans font-bold text-[#212922]'>Referralgen</h1>
        <Landing/>
        <SearchCompanies/>
        </div>
      </main>
  );
}
