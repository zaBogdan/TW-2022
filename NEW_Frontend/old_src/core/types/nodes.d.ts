/**
 * @type defining how a node is represented in the virtual DOM
 */
export type VDOMElement =  {
    tag: string,
    props: VDOMProps,
    children: string | VDOMElement | VDOMElement[]
};

export type VDOMProps = { [key: string]: CTXObjectValues } 

export type CTXObjectValues = Number | String | Object | Array<any>

/**
 * @type for the object given as context to Components and pages
 */
export type CTXType = {
    [key: string]:  CTXObjectValues
}

