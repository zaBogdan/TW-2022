if (module.hot) {
    module.hot.accept();
}

import Core, { Render } from './core';
import App from './App';
Core.render(App, document.getElementById('app'));