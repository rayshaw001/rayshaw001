import React, { Component } from 'react';
import './Main.css';

import MarkDown from 'react-markdown';
import axios from 'axios';
import NoteList from '../NoteList/NoteList';
import Header from '../Header/Header';

class Main extends Component {
    state={input:'',notes:[],noteTotalSize:0}
    constructor(props){
        super(props);
    }

    componentDidMount(){
        var baseUrl = 'https://api.github.com/repos/rayshaw001/books/contents/Note/';
        var notes=[];
        axios.get(baseUrl)
            .then(responses => {
                this.setState({noteTotalSize:responses.data.length});
                responses.data.map(note=>{
                    notes.push({
                        name: note.name,
                        folder: false
                    })
                    this.setState({ notes: notes })
                })
            })
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.notes.length === this.state.noteTotalSize || this.state.input !== nextState.input;
    }

    render() {
        console.log(this)
        return (
            <div className="Main">
                <Header />
                <div className='body'>
                    <NoteList notes={this.state.notes} handleOnItemClick={this.handleOnItemClick.bind(this)}/>
                    <MarkDown className='markdown' source={this.state.input} />
                </div>
            </div>
        );
    }

    handleOnItemClick(content){
        this.setState({ input: content})
        /*
        axios.get('https://api.github.com/repos/rayshaw001/books/contents/Note/K8s%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97.md')
            .then(res => {
                var text = decodeURIComponent(escape(window.atob(res.data.content))) 
            }
        )
        */
    }
}

export default Main;
