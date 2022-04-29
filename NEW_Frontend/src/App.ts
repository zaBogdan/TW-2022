import type { CorePage } from '../core';
import Header from './components/Header';


const App = function(this: CorePage<any>) {
    this.components = {
        'c-header': Header, 
    }

    this.title = 'Core - Homepage';
    this.nameOfLibrary = 'Core';

    this.html = `
        <div>
            <C-Header title="%title%"></C-Header>

            <h1> This is the <b>%nameOfLibrary%</b> engine!</h1>
        </div>
    `

    return this;
}

export default App;
