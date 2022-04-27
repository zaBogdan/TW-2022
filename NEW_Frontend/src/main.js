if (module.hot) {
  module.hot.accept();
}

import { CreateElement, RenderTemplate } from './core'
// console.log('All exports:',Data['Router']())
const helper = () => {
  return []
}

const children = [{name: 'Child'}, ...helper()]

console.log('Children: ', children)

const Header = () => (
 `
 <h1>I am the header element</h1>
 `
)
const obj = {
  hello: 1,
  world: 2
}

const html = `
  <div id="container" style="color: red">
    Hello world
    <Header-Component title="%title%" data="%obj%">
      <h1>This is my cute header!</h1>
    </Header-Component>
    %for(const index in this.links ){%
      <a href="%this.links[index].text%">%this.links[index].text%</a>
    %}%
    <p id="text" class="myP">
      Hello, %name%!
    </p>
  </div>
`
const template = RenderTemplate(html, { obj, title: 'Zeact', name: 'John', links: [{ text: 'google.com' },{ text: 'test.com' }, { text: 'facebook.com' }], Header });
console.log(template);
console.log(CreateElement(template));



//https://dev.to/buttercubz/explained-and-created-a-simple-virtual-dom-from-scratch-5765