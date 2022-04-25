import html from './header.html';

const render = (text, obj) => {
	Object.keys(obj).forEach(key => {
		text = text.replace(`\${${key}}`, obj[key]);
	})
	return text
}

const Header = () => {
	const name = 'zaBogdan';
	return render(html, { name });
};

export default Header;