const React = require('react');
const moment = require('moment');
import Layout from './layout';


const getRandomColor = () => {
    let colors = ['red', 'yellow', 'blue', 'orange', 'green', 'violet']
    let min = 0;
    let max = colors.length - 1;

    const index = Math.round(Math.random() * (max - min) + min);
    console.log(index)
    console.log(colors[index]);
    return colors[index];
}

class HomePage extends React.Component {


    render() {

        let entries = this.props.entries;
        console.log('IN homepage.jsx');
        console.log(entries);

        entries .map(entry => {

            console.log(entry)
            console.log(entry.title)
            console.log(entry.timestamp)
            console.log(entry.message)
        })


        return (
           <div>
                I am a homepage
           </div>
        );
    }
}

module.exports = HomePage;


