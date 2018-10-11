import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Menu, Icon, Button } from 'antd';
import axios from 'axios';
import './NoteList.css'

class NoteList extends Component {
    state={}
    constructor(props){
        super(props);
        this.state={notes:props.notes,selectedItem:-1}
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.notes !== this.state.notes;
    }

    componentWillReceiveProps(nextProps){
        this.setState({notes:nextProps.notes})
    }

    componentDidMount(){
        var gitBaseUrl ='https://api.github.com/repos/rayshaw001/books/contents/Note/';
        var notes=[]
        this.state.notes.map((note,index)=>{
            note["notes"]=[];
            if(note.folder){
                axios.get(gitBaseUrl + note.name).then(response => {
                    note["notes"].push({
                        name: response.data.name,
                        folder: false
                    });
                    notes.push(note);
                    this.setState({notes:notes});
                })
            }else{
                axios.get(gitBaseUrl + note.name).then(response => {
                    note["content"] = decodeURIComponent(escape(window.atob(response.data.content)));
                    notes.push(note);
                    this.setState({notes:notes});
                })
            }
        })
    }
    render(){
        var notes=this.state.notes;
        var items=[];
        notes.map((note,index)=>{
            if(!note.folder){
                items.push (
                <Menu.Item
                        selected={this.state.selectedItem === index}
                        onClick={this.handleClick.bind(this,note.content,index)}>
                    <span>{note.name}</span>
                </Menu.Item> 
                )
            } else {
                items.push (
                    <Menu.SubMenu key="sub1" title={<span>{note.name}</span>}>
                        <NoteList notes={note.notes} handleOnItemClick={this.handleClick.bind(this)} />
                    </Menu.SubMenu>
                )
            }
        });
        return (
            <div className="NoteList">
                <Menu >
                    {items}
                </Menu>
            </div>
        );
    }



    handleClick = (content,index) => {
        //console.log(e)
        this.setState({
            selectedItem:index
        })
        this.props.handleOnItemClick(content);
    } 
}

export default NoteList;

/**
 * 
 *
                                content: decodeURIComponent(escape(window.atob(response.data.content))),
 */