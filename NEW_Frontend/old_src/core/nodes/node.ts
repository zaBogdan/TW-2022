import { transformTextInHTML } from "./utils";
import { createNodes } from "./createNodes";
import type { VDOMElement } from "../types/nodes";

const Node = (text: string) : VDOMElement => {
    const entryPoint = transformTextInHTML(text);
    const response : VDOMElement[] | null = createNodes(entryPoint);

    if(response === null || response.length !== 1) {
        throw new Error('Failed to parse the component');
    }

    // TODO: if we are in production mode we will serialize this component and save it
    // somewhere in JSON format, to be much more faster to build the pages and dynamic links
    /**
     * Demo:
     * if(env.Production && !md5(text)) createNode
     * else return (...path)[0]
     */
    return response[0];
}

export default Node;
export { Node };