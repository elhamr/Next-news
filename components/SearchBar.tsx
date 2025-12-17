"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  return (
    <div className="flex w-full max-w-xl gap-2">
      <Input placeholder="Search News ...."/>
      <Button>Search</Button>
    </div>
  )
}

export default SearchBar
