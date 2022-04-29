import { CTXType } from '../types/nodes';
import { Node } from '../nodes';

import type { ComponentType } from '../types/component';

const Component = (text: string, ctx: CTXType) : ComponentType => {
    const vNode = Node(text);
    console.log('------------------------------------');
    console.log('Tree:', vNode);
    console.log('Context :', ctx);
    console.log('------------------------------------');
    
    // return 
}

export default { Component };
export { Component }; 