import ContentDisplay from "@/components/ContentDisplay";
import { getDocumentContent, getDocumentData } from "@/lib/doc"
import { getDocsByTagName } from "@/utils/doc-util"

export default function TagPage({params: {tag}}) {
  const docs = getDocumentData();
  const matchedDocs = getDocsByTagName(docs, tag);
  return (
    <ContentDisplay id={matchedDocs[0].id} />
  )
}
