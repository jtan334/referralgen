import Image from "next/image";
import SearchCompanies from "./components/SearchCompanies";
import Landing from "./landing/Landing";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Home() {
  return (
      <main>
        <div> 
        <Header/>  
        <Landing/>
        <SearchCompanies/>
        <Footer/> 
        </div>
      </main>
  );
}
