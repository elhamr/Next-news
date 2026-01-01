
import  DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export type NewsDetailProps = {
  news: {
    id: string;
    webTitle: string;
    fields: {
      thumbnail: string;
      trailText: string;
      body: string;
    };
    sectionName: string;
    webPublicationDate: string;
  };
};

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
  <div className="p-10">
     <Link href={`/`} >
            <ArrowLeft className="h-5 w-5" />
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
    
    return result.response.results.map((item: any ) => ({
      newsId: [item.id] 
    }));
    
  } catch (error) {
    console.error("Error fetching news IDs:", error);
    return []; 
  }
}
    