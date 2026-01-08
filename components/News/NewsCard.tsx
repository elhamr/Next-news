"use client";
import { News, NewsDetailProps } from '@/app/type'
import React from 'react'
import { Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, } from '../ui/card'
import Image from "next/image";
import Link from "next/link";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import type { AppDispatch } from '@/app/store'
import { RootState } from '@/app/store'
import { useDispatch,useSelector } from "react-redux";
import { addToBookmarks, removeFromBookmarks } from "@/app/store/bookmarksSlice";


const NewsCard :React.FC<NewsDetailProps>= ({news}) => {
     const dispatch = useDispatch<AppDispatch>()
  const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks)
   const isBookmarks = bookmarks.some(bm=> bm.id === news.id)
     
  const handleBookmarksClick =(news:News)=> (e: React.MouseEvent) => {
    e.preventDefault()
    if (isBookmarks) {
      dispatch(removeFromBookmarks(news))
    } else {
      dispatch(addToBookmarks(news))
    }
  }
  
  return (
    <div><Card key={news.id} className="overflow-hidden">
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
                <div className='flex'>
              <CardTitle className="text-base line-clamp-2">
                {news.webTitle}
                
              </CardTitle>
        <div
          onClick={handleBookmarksClick(news)} className='text-xl'
        >
          {isBookmarks ? <IoBookmark/> :  <IoBookmarkOutline/>}
        </div>
        </div>
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
        </Card></div>
  )
}

export default NewsCard