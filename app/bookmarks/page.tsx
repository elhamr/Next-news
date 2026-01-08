'use client'

import { useSelector } from 'react-redux'
import Link from 'next/link'
import { RootState } from '../store'
import { Button} from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import NewsCard from '@/components/News/NewsCard'

export default function Bookmarks() {
  const bookmarks = useSelector((state: RootState) => state.bookmarks.bookmarks)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/">
            <Button className="mb-4 px-6 py-3" variant="secondary">
              ← Back to news
            </Button>
          </Link>
          
          <Card className="text-center" >
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              bookmarks News
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {bookmarks.length} saved {bookmarks.length === 1 ? 'News' : 'news'}
            </p>
          </Card>
        </div>

        {bookmarks.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-6">
               You dont save any news yet.
            </div>
            <Link href="/">
              <Button className="px-6 py-3">
                Discover news
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarks.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}