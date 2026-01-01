import NewsList from "@/components/NewsList";
import NewsPagination from "@/components/paginationNews";

export default async function Home(
  {
  searchParams,
}: {
  searchParams?: Promise<{
    page?: string
    pageSize?: string
  }>
}
) {
  const BASE_URL = process.env.BASE_GUARDIAN_URL;
  const API_KEY = process.env.API_KEY;
  
  const params = await searchParams;
  const currentPage = parseInt(params?.page || '1');
  const pageSize = parseInt(params?.pageSize || '9');

  if (!BASE_URL || !API_KEY) {
    console.error("Missing environment variables!");
    return <main className="min-h-screen">Environment variables not set</main>;
  }

  try {
    const response = await fetch(
       `${BASE_URL}/search?show-fields=thumbnail,trailText&api-key=${API_KEY}&page-size=${pageSize}&page=${currentPage}`
     
      , { cache: "no-store" }
    );
    const data = await response.json();

    const list = data?.response?.results ?? [];
    
    
    const totalResults = data?.response?.total || 0;
    
    const totalPages = Math.ceil(totalResults / pageSize);

    

    return (
      <main className="min-h-screen">
        <NewsList list={list} />
          
      <NewsPagination
            currentPage={currentPage}
            totalPages={totalPages}
           
         />
      </main>

    );
  } catch (error) {
    console.error("Error fetching news:", error);
    return <main className="min-h-screen">Failed to fetch news</main>;
  }
}

