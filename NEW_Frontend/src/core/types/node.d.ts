export type vNodeProps = {
    [key: string]: any
}

export type vNode = {
    tag: string
    props?: vNodeProps
    component?: boolean 
    children: string | vNode[]
};