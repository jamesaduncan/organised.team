export default async function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/styles.css");

    eleventyConfig.addFilter("sortBySchemaName", (values) => {
        let vals = [...values];
        return vals.sort((a, b) => { return a.data.schematype.toLowerCase().localeCompare(b.data.schematype.toLowerCase()) });
    });

    // Date filter for sitemap
    eleventyConfig.addFilter("date", (date, format) => {
        const d = new Date(date);
        if (format === '%Y-%m-%d') {
            return d.toISOString().split('T')[0];
        }
        return d.toISOString();
    });
};

export const config = {
    dir: {
        input: "src",
        output: "docs"
    }
}