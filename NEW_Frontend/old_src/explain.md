There will be two types of things you can make:

1. A page that will return html content
2. Components that will take in arguments as attributes(or props) 


So the process is

const ButtonComponent = (onClick, type) => {
    const styleBasedOnType = {
        primary: 'color: red',
        secondary: 'color: green'
    }[type]

    html = ` <--- this will be imported from component.html
        <button style=%styleBasedOnType%"">
        </button>
    `

    return createComponent(html, {
        onClick, <-- I will have to treat this case somehow (for functions/user actions) 
        type,
        styleBasedOnType
    })
}

How the parsing works:
-> I break all the HTML into pieces (DOMParser)
-> I create the small elements (tag, props, children) with the 3 cases (string, component, html)
-> I apply context (using template-ing)
-> Return the "node" (well I think there is no need for createPage)




const HomePage : Page = () => {
    setTitle('Home');
    const [data, setData] = useState({}); <-- it will have a prop called 'reactive'
    const name = 'zaBogdan'
    const customData = {
        hello: 1,
        data: 2,
    }

    const persons = [
        {
            name: 'Bogdan',
            age: 21
        },
        {
            name: 'Alin',
            age: 20
        }
    ]
    html = ` <--- this will be imported from component.html
        <div>
            <Header-Component></Header-Component>
            
            <h1>Hello %name%</h1>

            <p>
                %data?.hello%
                %data?.data%
            </p>

            <ul>
                <li *zFor="let person in persons">
                    %person.name% - %person.age%
                </li>
            </ul>

            

            <Card-Component data={persons[0]}>
                <h1>This is the text from the card!</h1>
            </Card-Component>

            <Button-Component onClick={() => setData(customData)}>Submit</Button-Component>
        </div>
    `

    return createPage(html, {
        data, <--- it will also have a property called reactive
        persons,
        customData
    })

}
export default HomePage;


Now in main we will have something like:

import Home from './pages/home'

render(Home)

The createPage function:

first of all 

-> Run the createPage(html, _ctx) function, where _ctx is the context of the page (variables and object needed for root level) 
-> createPage will run the DOMParser 
-> When we have all the elements parsed we will iterate through all of them (parent then children and so on) and call createElement

The createElement function (returns an array):
-> here we will have 3 major cases:
    -> We have a normal HTML (div, p, a etc)
    -> We have a custom component (marked with `-component` at the end, subject to change)
    -> We have a string

    The only case that I don't support right now is the component one. The idea would be to run renderComponent(tag, props, children) and to render all of it's html.
-> We will look for props like *zFor, *zIf (only if stmt for now)
-> When I try each and every case, I will have a callback function (with the object as argument) that will do some other processing


The callback function:
-> From the building of the VDOM we will want to save only the elements that can be changed during the lifecycle
-> To do that we can store the path to the object in a "linked list"
-> when changed we will trigger a re-render to him and all his children (that are in that linked list)