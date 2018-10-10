import React, { Component } from 'react';
import './Main.css';

import Paper from '@material-ui/core/Paper';
import MarkDown from 'react-markdown';
import axios from 'axios';


class Main extends Component {
    state={input:''}
    constructor(props){
        super(props);
    }

    componentDidMount(){
        axios.get('https://api.github.com/repos/rayshaw001/books/contents/Note/K8s%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97.md')
        .then(res =>{
            var text=decodeURIComponent(escape(window.atob(res.data.content)))
            this.setState({input: text})
        })
        
    }

    render() {
        return (
            <div className="Main">
                <MarkDown source={this.state.input} />
            </div>
        );
    }
}

export default Main;
