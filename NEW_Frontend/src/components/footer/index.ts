import html from './component.html';
import style from './style.module.css';

// const Footer = {
//     template: html,
//     style: style,
//     type: 'component',
//     props: {
//         links: [
//             {
//                 href: '',
//                 text: '',
//             }
//         ],
//         _children: {}
//     }
// }
interface IFooterLinks {
    href: string,
    text: string
}

class Footer {
    links: Array<IFooterLinks>
    _children: any
    style: string
    html: string

    constructor(links: Array<IFooterLinks>, _children: any = {}) {
        this.links = links;
        this._children = _children;
        this.style = style;
        this.html = html;
        console.log('Footer', Object.getOwnPropertyNames(this))
    }
}

export default Footer;