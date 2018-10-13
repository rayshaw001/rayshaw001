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
        this.state={notes:props.notes,selectedItem:-1,subitems:{}}
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.notes !== this.state.notes||nextState.subitems!==this.state.subitems;
    }

    componentWillReceiveProps(nextProps){

        this.setState({notes:nextProps.notes})
    }

    componentDidMount(){
        
    }
    render(){
        var notes=this.state.notes;
        var items=[];
        notes.map((note,index)=>{
            if(!note.folder){
                items.push (
                <Menu.Item
                    key={index}
                    selected={this.state.selectedItem === index}
                    onClick={this.handleClick.bind(this,note,index)}>
                    <Icon type="pie-chart" />
                    <span>{note.name}</span>
                </Menu.Item> 
                )
            } else {
                items.push (
                    <Menu.SubMenu 
                        key={index} 
                        title={<span><Icon type="pie-chart" /> <span>  {note.name}  </span></span>} 
                        onTitleClick={this.handleClick.bind(this,note,index)}>
                            {(this.state.subitems[index]||[]).map((item,idx)=>{
                                return (
                                <Menu.item 
                                    key={index + "-" + idx} 
                                    onClick={this.handleClick.bind(this,item,idx)}>
                                    item.name
                                </Menu.item>
                                )
                            })}
                    </Menu.SubMenu>
                )
            }
        });
        return (
            <div className="NoteList">
                <Menu 
                    mode="inline"
                    theme="dark"
                    style={{width:256}}
                >
                    {items}
                </Menu>
            </div>
        );
    }

    handleFolderToggle = (index) =>{

    }

    handleClick = (note,index) => {
        var gitBaseUrl ='https://api.github.com/repos/rayshaw001/books/contents/Note/';
        this.setState({
            selectedItem:index
        })
        if(note.folder){
            var items =this.state.subitems;
            if(!items[index]){
                items[index]=[];
                axios.get(gitBaseUrl+note.name).then(response=>{
                    response.data.map((item,idx)=>{
                        items[index].push({
                            name:note.name+"/"+item.name,
                            folder:!(item.name.endsWith(".MD")||item.name.endsWith(".md"))
                        })
                    })
                    this.setState({
                        subitems:items
                    })
                })
            }
        }else{
            axios.get(gitBaseUrl+note.name).then(response=>{
                this.props.handleOnItemClick(decodeURIComponent(escape(window.atob(response.data.content))));
            })
        }
    } 
}

export default NoteList;

/**
 * responses.data.map(note=>{
                    notes.push({
                        name: note.name,
                        folder: false
                    })
                    this.setState({ notes: notes })
                })
 *
 *                               content: decodeURIComponent(escape(window.atob(response.data.content))),
 */