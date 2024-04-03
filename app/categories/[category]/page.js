import ContentDisplay from "@/components/ContentDisplay";
import { getDocumentData } from "@/lib/doc"
import { getDocsByCategoryName } from "@/utils/doc-util";


export default function CategoryPage({ params: { category } }) {
    const docs = getDocumentData();
    const matchedDocs = getDocsByCategoryName(docs, category);
    return (
        <ContentDisplay id={matchedDocs[0].id} />
    )
}
