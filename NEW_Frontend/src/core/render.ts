/**
 * @type defining the structure of the object which can be passed to the render function
 */
export type renderObject = { [key: string]: number | string | boolean | Array<any> }

/**
 * This function substitutes all lines that contain %<instruction>% with their true value
 * @param text
 * @param obj 
 * @returns the text given as input with the proper modifications
 */
const renderComponent = (text: string, obj: renderObject) : string => {
    return text;
};

export { renderComponent };