import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export type NewsListProps = {
  list: {
    id: string;
    webTitle: string;
    fields: {
      thumbnail: string;
      trailText: string;
    };
    sectionName: string;
    webPublicationDate: string;
    description:string;
  }[];
};
const NewsList = ({ list = [] }: NewsListProps) => {
  if (!list.length) {
    return <p className="text-center mt-10">No news found</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {list.map((news) => (
        <Card key={news.id} className="overflow-hidden">
          <Link href={`/detail/${news.id}`}>
            <CardHeader className="p-0">
              {news.fields?.thumbnail && (
                <Image
                  src={news.fields.thumbnail}
                  alt={news.webTitle}
                  width={400}
                  height={240}
                  className="object-cover w-full "
                />
              )}
            </CardHeader>

            <div className="p-4 space-y-2">
              <CardTitle className="text-base line-clamp-2">
                {news.webTitle}
              </CardTitle>

              <CardDescription
                className="text-sm line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: news.fields?.trailText || "",
                }}
              />

              <CardFooter className="flex justify-between text-xs text-muted-foreground p-0">
                <span>{news.sectionName}</span>
                <span>
                  {new Date(
                    news.webPublicationDate
                  ).toLocaleDateString()}
                </span>
              </CardFooter>
            </div>
          </Link>
        </Card>
      ))}
    </div>

  );
};

export default NewsList;


// import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
// import { NewsListProps } from "./types";
// import Image from "next/image";
// import Link from "next/link";
// const NewsList = ({ list = [] }: NewsListProps) => {
 
//   return (
//     <div className="grid grid-cols-3 gap-4 p-8" >
//       {list.map((news) => (
//        <Card  key={news.id} className="p-8" >
//         <Link href={`/detail/${news.id}`}>
//         <CardHeader><Image src={news.fields.thumbnail} alt={news.webTitle} width={400} height={240} className="object-cover"/></CardHeader>
     
//        <CardTitle>{news.webTitle}</CardTitle> 
//         <CardDescription>{news.fields.trailText}</CardDescription>
//         <CardFooter>{news.webPublicationDate}</CardFooter>
//         {news.sectionName}
//         </Link>
//           </Card>
//       ))}
//     </div>
//   );
// };

// export default NewsList;
