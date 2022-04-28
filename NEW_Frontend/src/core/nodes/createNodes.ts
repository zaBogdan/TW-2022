import { normalizeString } from "./utils";

import Components from "../../components";

import type { VDOMElement, VDOMProps } from "../types/nodes";

export const STRING_NODE = "string" 

const createNodeString = (htmlNode: ChildNode) : VDOMElement[] | null => {
    if(htmlNode.nodeType !== Node.TEXT_NODE)
        return null;
    const tag = normalizeString(htmlNode.nodeValue);
    if(tag === null || tag === '')
        return null;
    return [{
        tag: STRING_NODE,
        props: {},
        children: tag,
    }];
}

const createNodeFromComponent = (node: VDOMElement) : VDOMElement[] | null => {
    let normalizedTag = node.tag.slice(2);
    normalizedTag = normalizedTag.charAt(0).toUpperCase() + normalizedTag.slice(1).toLowerCase();
    return [Components[normalizedTag]({ ...node.props, children: node.children })];
};

const createNodes = (htmlNode: ChildNode) : VDOMElement[] | null => {
    if(htmlNode.nodeType === Node.TEXT_NODE) {
        return createNodeString(htmlNode); 
    }

    const tag = htmlNode.nodeName;
    const props: VDOMProps = {};
    Array.from(htmlNode.attributes).forEach((attr: any) => {
        props[attr.nodeName] = attr.nodeValue;
    })

    let children: VDOMElement[] = [];
    
    htmlNode.childNodes.forEach((child: any) => {
        const response : VDOMElement[] | null = createNodes(child);
        if(response !== null)
            children.push(...response)
    })

    if(tag.startsWith('C-')) 
        return createNodeFromComponent({tag, props, children});
    return [{
        tag: tag.toLocaleLowerCase(),
        props,
        children,
    }]
}

export default { createNodes };
export { createNodes };