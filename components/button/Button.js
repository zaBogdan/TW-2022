class Button {
  constructor(text, onClick) {
    this.text = text;
    this.onClick = onClick;
  }

  hello() {
    console.log('Hello world from Button class')
  }

  zabogdan() {
    console.log('Zabogdan')
  }

  render() {
    this.hello();
    const button = document.createElement('button');
    button.innerText = this.text;
    button.addEventListener('click', this.onClick);
    return button;
  }
}

const button = new Button('Hello', () => console.log('Clicked'));

console.log(button);
