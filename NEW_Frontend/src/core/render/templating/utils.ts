import type { ComponentContext } from '../../types/Page';


const resolvePath = (object : ComponentContext, path : string, defaultValue: number | null) => path
    .split('.')
    .reduce((o, p) => o ? o[p] : defaultValue, object)

const replaceStringWithCTX = (str: string, ctx: ComponentContext) : string => {
    const regex = /%([a-zA-Z0-9.\[\]\']+)%/g;
    let match;
    while(match = regex.exec(str)) {
        console.log(resolvePath(ctx, match[1], null));
    }

    return '';
}

// export const 

export const process = (data: any, ctx: ComponentContext) : any => {
 if(typeof data === 'string') {
     return replaceStringWithCTX(data, ctx);
 }
}