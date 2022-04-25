import App from './App';

module?.hot?.accept();

const app = async () => {
  document.getElementById('app').appendChild(await App());
};
// Load app
app();