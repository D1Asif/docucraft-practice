import Link from 'next/link'
import React from 'react'

export default function SearchResults({ searchTerm, searchResults, onClose }) {
    return (
        <div
            className="absolute left-0 top-12 z-[999] w-full rounded-md bg-white p-4 shadow"
        >
            {searchResults.length > 0 ? <>
                <p className="!text-lg">
                    Showing results for &nbsp;
                    <span className="font-semibold">{searchTerm}:</span>
                </p>
                <ul role="list" className="divide-y divide-gray-100 [&>*]:py-2">
                    {
                        searchResults.map((result) => (
                            <li className="" key={result.id}>
                                <Link className="transition-all hover:text-emerald-600" href={`/docs/${result.id}`}
                                onClick={onClose}
                                >
                                    {result.title}
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </> : (
                <p className="!text-lg">
                    No results found for {" "}
                    <span className="font-semibold">{searchTerm}.</span>
                </p>
            )}
        </div>
    )
}
