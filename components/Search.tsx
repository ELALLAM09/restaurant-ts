"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

const Search = ({
  search,
  numberTable,
}: {
  search: string;
  numberTable: string;
}) => {
  const [text, setText] = useState(search);
  const router = useRouter();
  const query = useDebounce(text, 300);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      router.push(`/?id=${numberTable}`);
    } else {
      router.push(`/?id=${numberTable}&search=${text}`);
    }
  }, [numberTable, query, text, router]);

  return (
    <Card className="text-center ">
      <CardHeader>
        <CardTitle className="font-mono text-4xl italic tracking-tighter">
          Discover the best restaurants
        </CardTitle>
        <CardDescription className="font-mono text-sm italic">
          Explore top-rated dining spots, hidden gems, and local favorites.
        </CardDescription>
      </CardHeader>
      <CardContent className="container mx-auto ">
        <label className="relative mx-auto block max-w-[400px]">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              className="h-5 w-5 text-slate-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block  w-full rounded border border-slate-300 bg-white py-2 pl-9 pr-3 placeholder:italic placeholder:text-slate-400  focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 "
            placeholder="Search for favorate food..."
            type="text"
            name="search"
          />
        </label>
      </CardContent>
    </Card>
  );
};

export default Search;
