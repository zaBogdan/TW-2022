import type { CorePage } from '../core';
import Header from './components/Header';


const App = function(this: CorePage<any>) {
    this.components = {
        'c-header': Header, 
    }

    this.title = 'Core - Homepage';
    this.nameOfLibrary = 'Core';

    this.links = [
        {
            href: 'https://google.com',
            text: 'Google',
        },
        {
            href: 'https://apple.com',
            text: 'Apple',
        }
    ]

    this.html = `
        <div style="hello">
            <C-Header title="%title%" type="primary">
                <h1>Children H!</h1>
            </C-Header>

            <p> This is the <b>%nameOfLibrary%</b> engine!</p>

            <a href="%link.href%" *zFor="let link in links">%link.text%</a>
        </div>
    `

    return this;
}

export default App;
