import Header from '../components/Header';

import type { CorePage } from '../core';

interface IHome {
    links: {
        href: string,
        name: string,
    }[]
}

const Home = function(this: CorePage<IHome>) {
    this.links = [
        {
            href: 'https://google.com',
            name: 'Google'
        },
        {
            href: 'https://facebook.com',
            name: 'Facebook'
        }
    ]
    this.components = {
        'c-header': Header
    }

    this.style = {
        red: 'red'
    }

    this.headerTitle = "Core - Home";

    this.html = `
        <div style="color: %style.red%">
            <C-Header title="%headerTitle%" type="primary" links="%links%"> 
                I am the %headerTitle%! 
            </C-Header>
            
            <h1 style="%headerTitle%"> 
                This is my beautiful %headerTitle% page!
            </h1> 
            
            <a href="%link.href%" *zfor="let link in links">
                %link.text%
            </a>
        </div>
    `

    return this;
}

export default Home;