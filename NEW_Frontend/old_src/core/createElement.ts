export const STRING_TAG = 'string'
export type VDOMProps = { [key: string]: string } 

export type VDOMElement = {
    tag: string,
    props: VDOMProps,
    children: string | VDOMElement | VDOMElement[]
};

const e = (htmlNode: any) : VDOMElement | null => {
    if(htmlNode.nodeType === Node.TEXT_NODE) {
        const output = htmlNode.nodeValue.replace('\t', '').replace('\n', '').trim();
        if(output === "")
            return null;
        return {
            tag: STRING_TAG,
            props: {},
            children: output
        };
    }
    const props: VDOMProps = {};
    const tag = htmlNode.nodeName.toLowerCase();
    Array.from(htmlNode?.attributes).forEach((attr: any) => {
        props[attr.nodeName] = attr.nodeValue;
    })

    let children: Array<VDOMElement> | VDOMElement= [];
    
    htmlNode.childNodes.forEach((child: any) => {
        const response : VDOMElement | null = e(child);
        if(response !== null)
            children.push(response)
    })

    return {
        tag, 
        props,
        children
    }
}

const createElement = (text: string) : VDOMElement => {
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
    const entryPoint = result[0];
    const response : VDOMElement | null = e(entryPoint);
    if(response === null) {
        throw new Error('Failed to parse the component')
    }
    return response;
};

export { createElement };