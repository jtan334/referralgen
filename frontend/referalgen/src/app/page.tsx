import Image from "next/image";
import SearchCompanies from "./components/SearchCompanies";

export default function Home() {
  return (
      <main>
        <h1 className= 'bg-blue-600 transition-opacity ease-in duration-700 opacity-100 hover:opacity-0 font-bold'>Referalgen</h1>
        <SearchCompanies/>
      </main>
  );
}
