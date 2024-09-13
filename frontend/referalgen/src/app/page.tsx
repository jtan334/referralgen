import Image from "next/image";
import SearchCompanies from "./components/SearchCompanies";
import Landing from "./landing/Landing"

export default function Home() {
  return (
      <main>
        <div>
        <Landing/>
        <SearchCompanies/>
        </div>
      </main>
  );
}
