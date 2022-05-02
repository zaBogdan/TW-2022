import type { CorePage } from '../core';

interface IHeader {
    styleBasedOnType: string
    type: string,
    title: string,
}

interface IHeaderParams {
    type: string,
    title: string,
    children: any
}

const Header = function(this: CorePage<IHeader>,{ type, title, children } : IHeaderParams) {
    this.styleBasedOnType = {
        'primary': 'color: red',
        'secondary': 'color: green',
    }[type];

    this.children = children;
    this.title = title;


    this.html = `
        <div style="header">
            <h1> %title% </h1>
            <p style="%styleBasedOnType%"> This is the header component! %children% And this is the aftermath! </p>
        </div>
    `

    return this;
}

export default Header;