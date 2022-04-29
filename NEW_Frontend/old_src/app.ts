import Header from './components/header'
import { Router } from './core'
import * as styles from './style.module.css';
import Footer from './components/footer'

// const app = () => {
//   router = new Router();

//   router.addRoute('/', () => Home());
//   router.addRoute('/about', () => About());
// }
new Footer([
  {
    href: '/',
    text: 'home'
  }
]);
module?.hot?.accept();


async function App() {
  const template = document.createElement('template')
  template.innerHTML = `
    <div class="container">
    <h1 style="${styles}">Before header</h1>
        ${Header('zaBogdan')}
    </div>
  `
  // Return a new node from template
  return template.content.cloneNode(true)
}

export default App;