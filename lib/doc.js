import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postDirectory = path.join(process.cwd(), "docs");

export const getDocumentData = () => {
    const fileNames = fs.readdirSync(postDirectory);

    const allDocument = fileNames.map((fileName) => {
        const id = fileName.replace(".md", "");

        const fullPath = path.join(postDirectory, fileName);

        const fileContent = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContent);

        return {
            id,
            ...matterResult.data
        }
    });

    return allDocument.sort((a, b) => {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1;
        }
        return 0;
    });
}

export const getDocumentContent = async (id) => {
    const fullPath = path.join(postDirectory, `${id}.md`);

    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const processedFile = await remark().use(html).process(matterResult.content);

    const contentHtml = processedFile.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data
    };
}

