import html from './component.html';
import styles from './styles.module.css';


const render = (text, obj) : string => {
	Object.keys(obj).forEach(key => {
		text = text.replace(`\${${key}}`, obj[key]);
	})
	return text
}

const Header = (name) : string => {
	// document.styleSheets = styles
	const footerTemplate = document.createElement('template');

	footerTemplate.innerHTML = html;
	footerTemplate.style.all = styles
	// const shadowRoot = this.attachShadow({ mode: 'closed' });

    // shadowRoot.appendChild(footerTem plate.content);


	// console.log(styles)
	return render(html, { name });
};

const HeaderComponent = {
	type: 'component',
	component: Header,
	tag: 'Header',
	props: ["name"],
}
export default Header;