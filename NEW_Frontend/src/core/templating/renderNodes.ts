import type { VDOMElement, CTXType, VDOMProps } from "../types/nodes";
import { STRING_NODE } from '../nodes/createNodes';

export const ALLOWED_PROPS = ['*zfor', '*zif'];
export enum Cases {
    FOR_LOOP, // when I have *zFor in props
    IF_CASE, // when I have *zIf in props
    STRING_REPLACE // when I have %<literal>% in props or children with type string
} 

/**
 * Cases that I have for zFor
 * 1. Root element has zFor -> create a new div and make the children 
 * 2. For each new children we should handle all the cases possible
 * 3. Return the div as root point
 * 
 * Cases for zIf:
 * 1. An element has zIf: we return an empty node if the condition is false
 * 2. The empty node will not be added/removed as child
 * 
 * 
 * Cases that I have for string substitution:
 * 1. props.<prop> = '... %<literal>% ...'
 * 2. 
 */



const updateNode = (node: VDOMElement, ctx: CTXType, op: Cases) : VDOMElement[] => {
    switch(op) {
        case Cases.FOR_LOOP:
            console.log('For')
            return node;
            break;
        case Cases.IF_CASE:
            console.log('If')

            break;
        case Cases.STRING_REPLACE:
            console.log('String')
            break;
        default:
            throw new Error('Unknown update cases!');
    }
}

const handleCases = (node: VDOMElement, ctx: CTXType, isRootNode: boolean = false) : VDOMElement => {
    console.log('Templating render: ', node, ctx);
    let exitPoint : VDOMElement;

    if(isRootNode === true && node.props['*zfor'] !== undefined) {
        exitPoint = {
            tag: 'div', 
            props: {},
            children: updateNode(node, ctx, Cases.FOR_LOOP)
        };
    } else {
        exitPoint = node;
    }

    if(node.tag === STRING_NODE) {
        return updateNode(node, ctx, Cases.STRING_REPLACE)[0]
    }

    console.log('Exitpoint determined now working up', exitPoint);

    for(const prop in exitPoint.props) {
        // if(exitPoint.props[prop])
        console.log('HandleCase:', prop, exitPoint.props[prop])
        // match if value contains %[a-zA-Z0-9]%

    }

    


}

// this function is called only once, no recursive calls!
const renderNodes = (entryPoint: VDOMElement, ctx: CTXType) : VDOMElement => {
    if(ctx['*__zCalled'] !== undefined)
        throw new Error('Don\'t this function must be called only once!');
    ctx['*__zCalled'] = true;

    const exitPoint = handleCases(entryPoint, ctx, true);

    return entryPoint;
}

export default renderNodes;