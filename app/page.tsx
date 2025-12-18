import Navbar from "@/components/Navbar";
import NewsList from "@/components/NewsList";
import SearchBar from "@/components/SearchBar";
import { console } from "inspector";

export default async function Home() {
  const response = await fetch(`${process.env.BASE_GUARDIAN_URL}/search?show-fields=thumbnail%2CtrailText&api-key=${process.env.API_KEY}`);
 const data=await response.json();
 console.log(data);
const list =data.response.results;
console.log(list);
  return (
    <main className="min-h-screen">

      <Navbar />

      <section className="flex justify-center mt-24">
        <SearchBar />
      </section>
      
      <NewsList list={list}/>

    </main>
   
  );
}
