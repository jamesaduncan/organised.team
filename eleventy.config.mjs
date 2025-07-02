export default async function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/styles.css");
};

export const config = {
    dir: {
        input: "src",
        output: "docs"
    }
}