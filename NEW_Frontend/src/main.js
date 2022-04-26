import App from './App';
import { Router } from './core';


if (module.hot) {
  module.hot.accept();
}

// const app = async () => {
//   const root = document.getElementById('app');
//   Render(root, App());
// };

const app = async () => {
  document.getElementById('app').appendChild(await App());
};
window.addEventListener("popstate", Router());
document.addEventListener("DOMContentLoaded", () => {
  Router();
});

app();