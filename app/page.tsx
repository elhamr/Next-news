import NewsList from "@/components/NewsList";

export default async function Home() {
  const BASE_URL = process.env.BASE_GUARDIAN_URL;
  const API_KEY = process.env.API_KEY;

  if (!BASE_URL || !API_KEY) {
    console.error("Missing environment variables!");
    return <main className="min-h-screen">Environment variables not set</main>;
  }

  try {
    const response = await fetch(
      
       `${BASE_URL}/search?show-fields=thumbnail,trailText&api-key=${API_KEY}`
      , { cache: "no-store" }
    );
    const data = await response.json();

    //response and results
    const list = data?.response?.results ?? [];

    // //empty
    // console.log(list);

    // // 
    // console.log("BASE_URL:", BASE_URL);
    // console.log("API_KEY:", API_KEY);
    // console.log("DATA:", data);
    // console.log("RESULTS:", data?.response?.results);


    return (
      <main className="min-h-screen">
        <NewsList list={list} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return <main className="min-h-screen">Failed to fetch news</main>;
  }
}



// last code

// import NewsList from "@/components/NewsList";

// export default async function Home() {
//   const response = await fetch(`${process.env.BASE_GUARDIAN_URL}/search?show-fields=thumbnail%2CtrailText&api-key=${process.env.API_KEY}`);
//   const data=await response.json();
//   const list =data.response.results;

//   return (
//     <main className="min-h-screen">
//       <NewsList list={list}/>

//     </main>
   
//   );
// }

