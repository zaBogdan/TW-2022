export type CorePage<T> = T & {
    html: string
    components?: CorePage<any>
}

export type ComponentContext = {
    [key: string] : any
};