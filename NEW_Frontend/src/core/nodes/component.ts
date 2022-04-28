import { transformTextInHTML } from "./utils";
import { createNodes } from "./createNodes";
import renderNodes from "../templating/renderNodes";
import type { VDOMElement, CTXType } from "../types/nodes";
import { SPECIAL_PROPS } from '../types/props';

const Component = (text: string, ctx: CTXType) : VDOMElement => {
    const entryPoint = transformTextInHTML(text);
    const response : VDOMElement[] | null = createNodes(entryPoint);

    if(response === null || response.length !== 1) {
        throw new Error('Failed to parse the component');
    }
    
    for(let _prop in SPECIAL_PROPS) {
        const id = SPECIAL_PROPS[_prop];
        if (ctx[id] !== undefined) {
            response[0].props[id] = ctx[id];
            delete ctx[id];
        }
    }
    
    return renderNodes(response[0], ctx);
}

export default Component;
export { Component };