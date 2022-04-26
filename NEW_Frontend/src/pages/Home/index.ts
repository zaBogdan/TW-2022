import html from './index.html';
// import styles from './style.css';

const HomePage = () => {
    // run the HTML through template engine
    // add listeners to all the buttons
    // check for forms and add listeners to them
    // check for Link and make it clickable and push to the desired page when clicked
    // add style to the page
    // check for components and render them
    return html;
}

const homePage = {
    type: 'page',
    layout: 'default',
    title: 'Home',
    component: HomePage,
    path: ['/', '/home'],
}