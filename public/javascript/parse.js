function parse(content) {
    try {
        const parsed = JSON.parse(content);

        return parsed;
    } catch (error) {
        return content;
    }
}

module.exports = parse;