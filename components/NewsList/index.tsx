
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { NewsListProps } from "./types";
import Image from "next/image";
import Link from "next/link";
const NewsList = ({ list = [] }: NewsListProps) => {
 
  return (
    <div className="grid grid-cols-3 gap-4 p-8" >
      {list.map((news) => (
       <Card  key={news.id} className="p-8" >
        <Link href={`/detail/${news.id}`}>
        <CardHeader><Image src={news.fields.thumbnail} alt={news.webTitle} width={400} height={240} className="object-cover"/></CardHeader>
     
       <CardTitle>{news.webTitle}</CardTitle> 
        <CardDescription>{news.fields.trailText}</CardDescription>
        <CardFooter>{news.webPublicationDate}</CardFooter>
        {news.sectionName}
        </Link>
          </Card>
      ))}
    </div>
  );
};

export default NewsList;
