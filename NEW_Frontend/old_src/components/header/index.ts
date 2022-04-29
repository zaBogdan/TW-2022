import { Component } from '../../core';
// import html from './component.html';
// import styles from './styles.module.css';

const Header = ({ title }) => {


	const html = `
		<div style="header">
			<h3> %title% </h3>
			<p> This is a custom header component! </p> 
		</div>
	`;
	return Component(html, {title})
};

export default Header;