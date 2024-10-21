import Image from "next/image";
import SearchCompanies from "./dashboard/components/SearchCompanies";
import Landing from "./landing/Landing";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
      <main>
        <div> 
        <Landing/>
        <Footer/> 
        </div>
      </main>
  );
}
