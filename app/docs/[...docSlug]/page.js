import ContentDisplay from "@/components/ContentDisplay";

export default async function DocPage({ params: {docSlug} }) {
    const [rootId, nonRootId] = docSlug;
    const id = nonRootId ?? rootId;
    return (
        <ContentDisplay id={id} />
    )
}
