import React, { Component } from 'react';
import './Main.css';

import MarkDown from 'react-markdown';
import axios from 'axios';
import NoteList from '../NoteList/NoteList';
import Header from '../Header/Header';
import AboutMe from '../AboutMe/AboutMe';

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
                    var noteNameIndex=note.name.toLocaleLowerCase().lastIndexOf(".md");
                    notes.push({
                        name: noteNameIndex>0?note.name.substring(0,noteNameIndex):note.name,
                        fullPath:note.name,
                        folder: !(note.type==="file")
                    })
                    this.setState({ notes: notes })
                })
            })
    }

    shouldComponentUpdate(nextProps,nextState){
        return nextState.notes.length === this.state.noteTotalSize || this.state.input !== nextState.input;
    }

    render() {

        return (
            <div className="Main">
                <div className='header'>
                    <Header />
                </div>
                <div className='body'>
                    <div className='notelist'>
                        <NoteList notes={this.state.notes} handleOnItemClick={this.handleOnItemClick.bind(this)}/>
                    </div>
                    <div className='markdown'>
                        {this.state.input != null && this.state.input !== '' ? <MarkDown children={this.state.input} /> : <AboutMe />}
                    </div>
                    
                </div>
            </div>
        );
    }

    handleOnItemClick(content){
        // console.log(content);
        this.setState({ input: content})

        // axios.get('https://api.github.com/repos/rayshaw001/books/contents/Note/K8s%20%E6%9D%83%E5%A8%81%E6%8C%87%E5%8D%97.md')
        //     .then(res => {
        //         var text = decodeURIComponent(escape(window.atob(res.data.content))) 
        //     }
        // )
        
    }
}

export default Main;
