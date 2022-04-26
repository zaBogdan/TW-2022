import { renderComponent } from './render';

class Component {
    private _children: any
    private html: string
    private style: string

    constructor() {
        this.html = ''
        this.style = ''
        this._children = ''
    }

    render() {
        this.html = renderComponent(this.html, );
    }
}

export default Component