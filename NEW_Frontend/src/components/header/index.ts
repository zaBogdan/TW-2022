import { Component } from '../../core';
// import html from './component.html';
// import styles from './styles.module.css';

const Header = (props) => {
	const html = `
		<div>
			<h3> %title% </h3>
			<p> This is a custom header component! </p> 
		</div>
	`;
	return Component(html, {...props, title: 'zaBogdan'})
};

export default Header;