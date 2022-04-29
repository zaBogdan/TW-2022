import type { ComponentContext } from '../../types/Page';
import type { vNode } from '../../types/node';

import { CORE_FRAGMENT } from '../nodes/index';

const resolvePath = (object : ComponentContext, path : string, defaultValue: number | null | string) => path
   .split('.')
   .reduce((o, p) => o ? o[p] : defaultValue, object)

const replaceStringWithCTX = (stringOnlyCTX: boolean, str: string, ctx: ComponentContext) : any => {
    const regex = /%([a-zA-Z0-9.\[\]\']+)%/g;
    let match = regex.exec(str);

    // if we are in a component context
    if(stringOnlyCTX === false && match !== null) {
        return resolvePath(ctx, match[1], null);
    }

    let newStr = '', cursor = 0;
    while(match) {
        newStr += str.slice(cursor, match.index);
        newStr += resolvePath(ctx, match[1], '');
        cursor = match.index + match[0].length;
        
        match = regex.exec(str);
    }

    newStr += str.substring(cursor);
    return newStr;
}

const renderTemplate = (vTree: vNode, ctx: ComponentContext) : void => {
    // case when we have a string child
    if(vTree.tag === CORE_FRAGMENT && typeof vTree.children === 'string') {
        // if that string child is actually %children%, treat it here!

        vTree.children = replaceStringWithCTX(true, vTree.children, ctx);
        return;
    } 

    // case when we have a component
    let stringOnlyCTX = !(vTree.component === true);

    // here I will handle for now only the string props, then come back for *zfor, *zif, *zonClick, *zOnSubmit
    // WARNING: don't put %% in special props, maybe i will need to rethink this
    
    for(const prop in vTree.props) {
        if (prop === '*zfor')
            vTree.props['__forCTX'] = 1;
        vTree.props[prop] = replaceStringWithCTX(stringOnlyCTX, vTree.props[prop], ctx);
    }

    // typescript is stupid and i need to do this check... even though I can have only string or array of vNode....
    if(typeof vTree.children !== 'object')
        throw new Error('Something went really wrong here');
    
    // if we had a for before we don't need to re-loop 
    if (vTree.props && vTree.props['__forCTX'] !== undefined)
        return;
    
    // TODO &
    // WARNING: if we find %children% we must add it to the tree 
    // now the question is will it lose reference?  

    // now go recursive over all kids with this function :D
    for(let kid in vTree.children) {
        renderTemplate(vTree.children[kid], ctx)
    }
};

export default renderTemplate;