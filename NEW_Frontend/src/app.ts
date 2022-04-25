import Header from './components/header'

async function App() {
  const template = document.createElement('template')
  template.innerHTML = `
    <div class="container">
        ${Header()}
    </div>
  `
  // Return a new node from template
  return template.content.cloneNode(true)
}

export default App;