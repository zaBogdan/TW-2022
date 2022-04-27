export type RenderObjects = {
    [key: string]: string | boolean | number | Array<any>
}

const renderTemplate = (text: string, props: RenderObjects = {}) : string => {
    const re = /%([^%]+)?%/g;
    let initialCode = 'const r=[];';

    const add = (line: string, isJS: boolean = false) => {
        const isStmt = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g
         
        initialCode += isJS === false ? 
                        `r.push(\`${line}\`);` :
                        (line.match(isStmt) ? line : `r.push(${line.startsWith('this.') ? line : `this.${line}`});`);
    }

    let match : RegExpExecArray | null;
    let cursor = 0;

    console.log("Starting to parse")
    while(match = re.exec(text)) {
        add(text.slice(cursor, match.index))
        add(match[1], true)
        cursor = match.index + match[0].length
    }
    add(text.substring(cursor));
    initialCode += 'return r.join(\'\');'; 
    return new Function(initialCode).apply(props);
}

export { renderTemplate };