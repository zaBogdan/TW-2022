/**
 * Get from an HTML string the root object
 * @param text representing the HTML
 * @returns ChildNode which is the entry point
 */
const transformTextInHTML = (text: string) : ChildNode => {
    const parser = new DOMParser();
    const result = parser.parseFromString(text, 'text/html').body.childNodes;
    result.forEach(node => {
        if (node.nodeType !== Node.ELEMENT_NODE) {
            node?.parentNode?.removeChild(node);
        }
    })

    if (result.length !== 1) {
        throw new Error('You must have exactly one HTML element returned from your component');
    }

    return result[0];
};

/**
 * When parsing an html string there may occur a lot of white spaces and special caracters. This function removes all of them
 * @param s 
 * @returns the normalized string as explained below
 */
const normalizeString = (s: string | null) : string | null => {
    return s === null ? null : s.replace('\t', '').replace('\n', '').trim();
}

export { transformTextInHTML, normalizeString };