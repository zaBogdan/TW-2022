// import App from './App';
// import { Router } from './core';


if (module.hot) {
  module.hot.accept();
}

// const app = async () => {
//   const root = document.getElementById('app');
//   Render(root, App());
// };

// const app = async () => {
//   document.getElementById('app').appendChild(await App());
// };
// window.addEventListener("popstate", Router());
// document.addEventListener("DOMContentLoaded", () => {
//   Router();
// });

// app();

import { CreateElement, RenderTemplate } from './core';

const Header = () => (
 `
 <h1>I am the header element</h1>
 `
)

const html = `
  <div id="container" style="color: red">
    Hello world
    %Header()%
    %for(const index in this.links ){%
      <a href="%this.links[index].text%">%this.links[index].text%</a>
    %}%
    <p id="text" class="myP">
      Hello, %name%!
    </p>
  </div>
`
const template = RenderTemplate(html, { name: 'John', links: [{ text: 'google.com' }, { text: 'facebook.com' }], Header });
console.log(template);
console.log(CreateElement(template));


//https://dev.to/buttercubz/explained-and-created-a-simple-virtual-dom-from-scratch-5765