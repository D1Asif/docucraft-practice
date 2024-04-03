export const getDocsByAuthorName = (docs, author) => {
    return docs.filter((doc) => doc.author === author.replace("%20", " "));
}

export const getDocsByTagName = (docs, tag) => {
    return docs.filter((doc) => doc.tags.includes(tag));
}

export const getDocsByCategoryName = (docs, category) => {
    return docs.filter((doc) => doc.category === category);
}