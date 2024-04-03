"use client";

import Image from "next/image";
import SearchResults from "./SearchResults";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function Search({docs}) {
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const doSearch = useDebounce((term) => {
        const result = docs.filter(doc => doc.title.toLowerCase().includes(term.toLowerCase()));
        setSearchResults(result);
    }, 500);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);

        doSearch(e.target.value);
    }

    const onClose = (e) => {
        e.preventDefault();
        router.push(e.target.href)
        setSearchTerm("");
    }

    return (
        <div className="relative hidden lg:block lg:max-w-md lg:flex-auto">
            <button
                type="button"
                className="focus:[&amp;:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
            >
                <Image src="/search.svg" alt="search" height={50} width={50} className="h-5 w-5" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 focus:border-none focus:outline-none"
                    value={searchTerm}
                    onChange={handleChange}
                />
            </button>
            {/* <!-- result card --> */}
            {searchTerm && searchTerm.trim() && <SearchResults searchTerm={searchTerm} searchResults={searchResults} onClose={onClose} />}
        </div>
    )
}
