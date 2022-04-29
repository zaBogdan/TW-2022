if (module.hot) {
    module.hot.accept();
}

import Core, { Render } from './core';
import Home from './pages/Home';

Core.render(Home, document.getElementById('app'));