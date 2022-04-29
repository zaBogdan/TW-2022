import type { VDOMElement, CTXType, VDOMProps } from "../types/nodes";
import { STRING_NODE, Z_FRAGMENT } from '../nodes/createNodes';

export const ALLOWED_PROPS = ['*zfor', '*zif'];
export enum Cases {
    FOR_LOOP, // when I have *zFor in props
    IF_CASE, // when I have *zIf in props
    STRING_REPLACE // when I have %<literal>% in props or children with type string
} 

/**
 * 
 * 
 * Cases that I have for zFor
 * 1. Root element has zFor -> create a new div and make the children 
 * 2. For each new children we should handle all the cases possible
 * 3. Return the div as root point
 * 
 * Cases for zIf:
 * 1. An element has zIf: we return an empty node if the condition is false
 * 2. The empty node will not be added/will be removed as child
 * 
 * 
 * Cases that I have for string substitution:
 * 1. props.<prop> = '... %<literal>% ...' -> we send it for updates (string, ctx)
 * 2. we have a children with node type string -> so we check it's children if it needs updates. (string, ctx)
 */

const emptyNode : VDOMElement = {
    tag: '',
    props: {},
    children: []
} 

const contextReplace = (text: string, ctx: CTXType) : string => {
    const re = /%([^%]+)?%/g;
    let initialCode = 'const r=[];';
    let match : RegExpExecArray | null;
    let cursor = 0;
    
    const add = (line: string) => {
        initialCode += `r.push(\`${line}\`);`;
    };

    while(match = re.exec(text)) {
        add(text.slice(cursor, match.index))
        add(match[1], true)
        cursor = match.index + match[0].length
    }
    add(text.substring(cursor));

    console.log(text);
};

const evaluate = (type: Cases, node: VDOMElement, ctx: CTXType) => {
    let code = '';
    // if(type === Cases.IF_CASE) {
    //     // code = `if(${cond})`
    // }
    if(type === Cases.FOR_LOOP) {
        const cond = node.props['*zfor'];
        console.log(cond, ctx)

    }

    // const
}


const handleCases = (node: VDOMElement, ctx: CTXType, isRootNode: boolean = false) : VDOMElement => {
    if(node.props['*zfor'] !== undefined && node.props['*zif'] !== undefined) {
        throw new Error('You can\'t have two types of structural directives at once!')
    }

    let exitPoint : VDOMElement;
    console.log('Templating',node)
    if(node.props['*zif'] !== undefined) {
        // TODO: Handle this!
        // evaluate('if', node.props['*zif'], ctx)
        // return emptyNode;
    } 

    if(node.props['*zfor'] !== undefined) {
        evaluate(Cases.FOR_LOOP, node, ctx);
        // TODO: Handle this case!
        // evaluate('for', node.props['*zfor'], ctx) (here i should update the ctx for children)
        exitPoint = {
            tag: Z_FRAGMENT,
            props: {},
            children: []
        }
    } else {
        exitPoint = node;
    }

    //now for each prop i will try to update the string

    // for each children I will pass the context


    // console.log('Templating render: ', node, ctx);

    // if(isRootNode === true && node.props['*zfor'] !== undefined) {
    //     exitPoint = {
    //         tag: 'div', 
    //         props: {},
    //         children: updateNode(node, ctx, Cases.FOR_LOOP)
    //     };
    // } else {
    //     exitPoint = node;
    // }

    // if(node.tag === STRING_NODE) {
    //     return updateNode(node, ctx, Cases.STRING_REPLACE)[0]
    // }

    // console.log('Exitpoint determined now working up', exitPoint);

    // for(const prop in exitPoint.props) {
    //     // if(exitPoint.props[prop])
    //     console.log('HandleCase:', prop, exitPoint.props[prop])
    //     // match if value contains %[a-zA-Z0-9]%

    // }

    


}

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

/***
 * Render page & Render component (this will be basically same thing with different contexts)
 * + render component will have a callback that will decide if the component can be changed in the future
 * 
 */

// this function is called only once, no recursive calls!
const renderNodes = (entryPoint: VDOMElement, ctx: CTXType) : VDOMElement => {
    if(ctx['*__zCalled'] !== undefined)
        throw new Error('Don\'t this function must be called only once!');
    ctx['*__zCalled'] = true;

    const exitPoint = handleCases(entryPoint, ctx, true);

    return entryPoint;
}

export default renderNodes;