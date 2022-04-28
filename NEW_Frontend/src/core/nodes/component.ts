import { transformTextInHTML } from "./utils";
import { createNodes } from "./createNodes";
import renderNodes from "../templating/renderNodes";
import type { VDOMElement, CTXType } from "../types/nodes";

const Component = (text: string, ctx: CTXType) : VDOMElement => {
    const entryPoint = transformTextInHTML(text);
    const response : VDOMElement[] | null = createNodes(entryPoint);

    if(response === null || response.length !== 1) {
        throw new Error('Failed to parse the component');
    }

    // TODO: if we are in production mode we will serialize this component and save it
    // somewhere in this form, to be much more faster to build the pages and dynamic links
    return renderNodes(response[0], ctx);
}

export default Component;
export { Component };