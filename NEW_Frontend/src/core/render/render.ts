import { CorePage } from "../index"
import createNodes from './nodes/index';
import renderTemplate from './templating/index';

import { vNode } from "../types/node";

// parse -> render -> recursively call on all the other components 
const generateVTree = (Component: CorePage<any>) : vNode => {
    const [vTree, nestedComponents] = createNodes(Component.html);
    renderTemplate(vTree, Component);
    for(const idx in nestedComponents) {
        const vNodeRendered = generateVTree(
            new Component.components[nestedComponents[idx].tag]({
                ...nestedComponents[idx].props,
                children: nestedComponents[idx].children
            })
        )
        // maybe there is a better way to do this but i don't care right now 
        // (other types of assignment will lose reference and won't be updated )
        nestedComponents[idx].tag = vNodeRendered.tag;  
        nestedComponents[idx].props = vNodeRendered.props;  
        nestedComponents[idx].children = vNodeRendered.children;  
        delete nestedComponents[idx].component;
    }

    return vTree;
}

const render = (Component: CorePage<any>, element: HTMLElement | null = null) => {
    const vTree = generateVTree(new Component());

    console.log(vTree);
};

export default render;