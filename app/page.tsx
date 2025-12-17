import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="min-h-screen">

      <Navbar />

      <section className="flex justify-center mt-24">
        <SearchBar />
      </section>
      
    </main>
   
  );
}
