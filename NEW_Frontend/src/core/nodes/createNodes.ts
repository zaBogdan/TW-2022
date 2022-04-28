import { normalizeString } from "./utils";

import Components from "../../components";

import type { VDOMElement, VDOMProps } from "../types/nodes";
import { CHECK_SPECIAL_PROPS } from "../types/props";

export const STRING_NODE = "z-string" 
export const Z_FRAGMENT = "z-fragment"

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

const createNodeFromComponent = (node: VDOMElement) : VDOMElement | null => {
    let normalizedTag = node.tag.slice(2);
    normalizedTag = normalizedTag.charAt(0).toUpperCase() + normalizedTag.slice(1).toLowerCase();
    return Components[normalizedTag]({ ...node.props, children: node.children });
};

const wrapInsideFragment = (node: VDOMElement, props: VDOMProps = {}) : VDOMElement => {
    return {
        tag: Z_FRAGMENT,
        props,
        children: [
            node
        ]
    }
}

const createNodes = (htmlNode: ChildNode) : VDOMElement[] | null => {
    if(htmlNode.nodeType === Node.TEXT_NODE) {
        return createNodeString(htmlNode); 
    }

    const tag = htmlNode.nodeName;
    const props: VDOMProps = {};
    const specialProps: VDOMProps = {}

    Array.from(htmlNode.attributes).forEach((attr: {[key: string]: string}) => {
        CHECK_SPECIAL_PROPS[attr.nodeName] !== undefined ?
            specialProps[attr.nodeName] = attr.nodeValue
            : props[attr.nodeName] = attr.nodeValue;
    })

    let children: VDOMElement[] = [];
    
    htmlNode.childNodes.forEach((child: any) => {
        const response : VDOMElement[] | null = createNodes(child);
        if(response !== null)
            children.push(...response)
    })
    let response : VDOMElement | null;
    if(tag.startsWith('C-')) 
        response = createNodeFromComponent({tag, props, children});
    else 
        response = {
            tag: tag.toLocaleLowerCase(),
            props,
            children,
        };
    if(response === null)
        return null;
    
    return [
        Object.keys(specialProps).length !== 0 ?
            wrapInsideFragment(response, specialProps)
            : response
    ] 
    
}

export default { createNodes };
export { createNodes };