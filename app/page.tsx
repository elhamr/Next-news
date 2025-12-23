
import NewsList from "@/components/NewsList";

export default async function Home() {
  const response = await fetch(`${process.env.BASE_GUARDIAN_URL}/search?show-fields=thumbnail%2CtrailText&api-key=${process.env.API_KEY}`);
 const data=await response.json();
const list =data.response.results;

  return (
    <main className="min-h-screen">

     
      
      <NewsList list={list}/>

    </main>
   
  );
}
