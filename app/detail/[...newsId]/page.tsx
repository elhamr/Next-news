
import  DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { Card, CardHeader } from "@/components/ui/card";

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
    <div className="">
      <Card className="">
     <CardHeader> <h1 className="">{news?.webTitle}</h1></CardHeader>
     <div className="">
       <Image src={news.fields.thumbnail} alt={news.webTitle} width={800} height={400} className="object-cover"/>
      </div>
      <p className="">
        <span className="">{news?.sectionName}</span>
        <span className="" suppressHydrationWarning>
          {new Date(news?.webPublicationDate).toLocaleDateString()}
        </span>
      </p>
      
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
      </Card>
    </div>
  );
}

export const generateStaticParams = async () => {
  try {

    console.log("BASE_GUARDIAN_URL:", process.env.BASE_GUARDIAN_URL);
    console.log("API_KEY:", process.env.API_KEY);

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
    