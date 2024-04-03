import ContentDisplay from "@/components/ContentDisplay";
import { getDocumentData } from "@/lib/doc";
import { getDocsByAuthorName } from "@/utils/doc-util";


export default function AuthorPage({ params: { author } }) {
    const docs = getDocumentData();
    const matchedDocs = getDocsByAuthorName(docs, author);
    return (
        <ContentDisplay id={matchedDocs[0]?.id} />
    )
}
