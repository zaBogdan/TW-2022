import { transformTextInHTML, normalizeString, EmptyNodeError } from "./utils";

import type { vNode, vNodeProps } from "../../types/node";

// ToDo: Move this.
export const CoreElementProps : { [key: string]: any } = {
    '*zfor': (fragmentNode: vNode) => {},
    '*zif': (fragmentNode: vNode) => {}
}

export const CORE_FRAGMENT = 'z-fragment';

export type CoreHTMLAttributes = {
    nodeValue: vNodeProps,
    nodeName: string
};

const buildNodeString = (e: ChildNode) : vNode => {
    if(e.nodeType !== Node.TEXT_NODE) 
        throw new Error('Only TEXT_NODES can be parsed by this function!');
    
    const v = normalizeString(e.nodeValue);
    if (v === null || v === '') throw new EmptyNodeError();
    
    return {
        tag: CORE_FRAGMENT,
        component: true,
        children: v
    }
} 

export const getNodeString = (str: string) : vNode => ({
        tag: CORE_FRAGMENT,
        component: true,
        children: str
})


const wrapInsideFragment = (e: vNode, props: vNodeProps) : vNode => {
    return {
        tag: CORE_FRAGMENT,
        props: props,
        component: true,
        children: [e]
    }
}

const node = (e: ChildNode, nestedComponents: vNode[]) : vNode => {
    if(e.nodeType === Node.TEXT_NODE)
        return buildNodeString(e);
    
    const nodeTag = e.nodeName.toLowerCase();
    const props = {}, specialProps = {};

    Array.from(e.attributes)?.forEach((attr: CoreHTMLAttributes) => 
        CoreElementProps[attr.nodeName] !== undefined ? 
            specialProps[attr.nodeName] = attr.nodeValue
            : props[attr.nodeName] = attr.nodeValue
    )

    const shouldWrap = Object.keys(specialProps).length !== 0

    let children : vNode[] = [];
    e.childNodes.forEach((kid : ChildNode) => {
        try {
            children.push(node(kid, nestedComponents));
        } catch (e: any) {
            if (e.name !== 'EmptyNodeError')
                throw new Error(e.message);
        }
    })
    const vnode : vNode = {
        tag: nodeTag,
        props: props,
        children: children
    }

    let poz = 0;
    if(nodeTag.startsWith('c-')) {
        poz = nestedComponents.length
        vnode.component = true;
        nestedComponents[poz] = vnode;
        return shouldWrap ? 
            wrapInsideFragment(nestedComponents[poz], specialProps) 
            : nestedComponents[poz] 
    }
    
    return shouldWrap ?
        wrapInsideFragment(vnode, specialProps) 
        : vnode;
}

const createNodes = (html: string) : [vNode, vNode[]] => {
    const startingNode = transformTextInHTML(html);
    const nestedComponents: vNode[] = []

    const vTree = node(startingNode, nestedComponents);
    return [vTree, nestedComponents];
}

export default createNodes;