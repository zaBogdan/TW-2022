import type { CorePage } from '../core';

interface IHeader {
    styleBasedOnType: string
    type: string,
    title: string,
}

interface IHeaderParams {
    type: string,
    title: string
}

const Header = function(this: CorePage<IHeader>,{ type, title } : IHeaderParams) {
    this.styleBasedOnType = {
        'primary': 'color: red',
        'secondary': 'color: green',
    }[type];

    this.title = title;

    this.html = `
        <div style="header">
            <h1> %title% </h1>
            <p style="%styleBasedOnType%"> This is the header component! %children% </p>
        </div>
    `

    return this;
}

export default Header;