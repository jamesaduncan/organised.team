export default async function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/styles.css");

    eleventyConfig.addFilter("sortBySchemaName", (values) => {
        let vals = [...values];
        return vals.sort((a, b) => { return a.data.schematype.toLowerCase().localeCompare(b.data.schematype.toLowerCase()) });
    });
};

export const config = {
    dir: {
        input: "src",
        output: "docs"
    }
}