
import  DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { News } from "@/app/type";

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ newsId: string[] }>;
})  { const { newsId } = await params;
  const id = newsId.join("/");
  
  const response = await fetch(
    `${process.env.BASE_GUARDIAN_URL}/${id}?api-key=${process.env.API_KEY}&show-fields=thumbnail%2CtrailText%2Cbody`
    ,{ cache: "force-cache" }
  );
  const result = await response.json();
  const news = result.response?.content;
  const cleanContent = DOMPurify.sanitize(news?.fields?.body);
  return (
  <>
  <div className=" p-10">
     <Link href={`/`} >
     <Button className="mb-4 px-6 py-3" variant="secondary">
                   ← Back to news
                 </Button>
       </Link>
       </div>
    <div className="flex justify-center items-center mt-8">
         
      <Card className="lg:w-3/5">
     <CardHeader> <h1 className="text-3xl font-bold">{news?.webTitle}</h1></CardHeader>
     <div className="">
       <Image src={news.fields.thumbnail} alt={news.webTitle} width={800} height={400} className="w-full  lg: object-cover rounded-2xl"/>
      </div>
      <div
        className="m-8"
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
      <p className="flex justify-between m-5 ">
        <span className="">{news?.sectionName}</span>
        <span className="" suppressHydrationWarning>
          {new Date(news?.webPublicationDate).toLocaleDateString()}
        </span>
      </p>
      
      
      </Card>
    </div></>
  );
}

export const generateStaticParams = async () => {
  try {

    const response = await fetch(`${process.env.BASE_GUARDIAN_URL}/search?api-key=${process.env.API_KEY}&page-size=20`);
    const result = await response.json();

    if (!result.response?.results) {
      return [];
    }
    
    return result.response.results.map((item: News ) => ({
      newsId: [item.id] 
    }));
    
  } catch (error) {
    console.error("Error fetching news IDs:", error);
    return []; 
  }
}
    