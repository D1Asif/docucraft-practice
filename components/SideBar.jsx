"use client";

import { getDocsByAuthorName, getDocsByCategoryName, getDocsByTagName } from '@/utils/doc-util';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function SideBar({ docs }) {
    const pathName = usePathname();

    const [rootNodes, setRootNodes] = useState([]);
    const [nonRootNodes, setNonRootNodes] = useState({});

    useEffect(() => {
        let matchedDocs = docs;

        if (pathName.includes("/authors")) {
            const author = pathName.split("/")[2];
            matchedDocs = getDocsByAuthorName(docs, author);
        } else if (pathName.includes("/tags")) {
            const tag = pathName.split("/")[2];
            matchedDocs = getDocsByTagName(docs, tag);
        } else if (pathName.includes("/categories")) {
            const category = pathName.split("/")[2];
            matchedDocs = getDocsByCategoryName(docs, category);
        }

        const roots = matchedDocs.filter((doc) => doc.parent === null);
        const nonRoots = Object.groupBy(matchedDocs.filter((doc) => doc.parent !== null), ({parent}) => parent);

        const nonRootKeys = Reflect.ownKeys(nonRoots);
        nonRootKeys.forEach(nonRootKey => {
            const foundInRoots = roots.find(root => root.id === nonRootKey);
            if (!foundInRoots) {
                const foundInDocs = docs.find(doc => doc.id === nonRootKey);
                roots.push(foundInDocs);
            }
        });

        setRootNodes([...roots]);
        setNonRootNodes({...nonRoots});
    }, [docs, pathName]);

    return (
        <nav className="hidden lg:mt-10 lg:block">
            <ul role="list" className="border-l border-transparent">
                {
                    rootNodes.map((rootNode) => (
                        <li key={rootNode.id} className="relative">
                            <Link
                                aria-current="page"
                                className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
                                href={`/docs/${rootNode.id}`}
                            >
                                <span className="truncate">{rootNode.title}</span>
                            </Link>
                            <ul role="list" style={{ opacity: "1" }}>
                                    {
                                        nonRootNodes[rootNode.id]?.map((nonRootNode) => (
                                            (nonRootNode.parent === rootNode.id) && <li key={nonRootNode.id}>
                                                <Link
                                                    className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                                                    href={`/docs/${rootNode.id}/${nonRootNode.id}`}
                                                >
                                                    <span className="truncate">{nonRootNode.title}</span>
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}
