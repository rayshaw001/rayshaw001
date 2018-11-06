import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import axios from 'axios';
import './NoteList.less';
import 'antd/lib/menu/style/css'; 
import 'antd/lib/icon/style/css';

class NoteList extends Component {
    state={}
    constructor(props){
        super(props);
        this.state={notes:props.notes,selectedItem:-1}
    }

    componentWillReceiveProps(nextProps){
        this.setState({notes:nextProps.notes})
    }

    render(){
        var notes=this.state.notes;
        var items=[];
        var that = this;
        notes.map((note,index)=>{
            if(!note.folder){
                items.push (
                <Menu.Item
                    key={index}
                    selected={that.state.selectedItem === index}
                    onClick={that.handleClick.bind(this,note,index)}>
                    <Icon type="file-markdown" theme="outlined" />
                    <span>{note.name}</span>
                </Menu.Item> 
                )
            } else {
                items.push (
                    <Menu.SubMenu 
                        key={index} 
                        title={<span><Icon type="folder" theme="outlined" /><span>{note.name} </span> </span>} 
                        onTitleClick={that.handleClick.bind(this,note,index)}>
                            {
                                (note.subitems||[]).map((item,idx)=>{
                                   return <Menu.Item 
                                        key={index + "-" + idx} 
                                        onClick={that.handleClick.bind(this,item,idx)}>
                                        <Icon type="file-markdown" theme="outlined" />
                                        {item.name}
                                    </Menu.Item>
                                })
                            }
                    </Menu.SubMenu>
                )
            }
        });
        return (
            <div className="NoteList">
                <Menu 
                    mode="inline"
                    theme="light"
                >
                    {items}
                </Menu>
            </div>
        );
    }

    handleClick = (note,index) => {
        var gitBaseUrl ='https://api.github.com/repos/rayshaw001/books/contents/Note/';
        var that = this;
        if(note.folder){
            var items = note.subitems || [];
            if(items.length===0){
                var _notes = this.state.notes;
                axios.get(gitBaseUrl+note.fullPath).then(response=>{
                    response.data.map((item,idx)=>{
                        var noteNameIndex=item.name.toLocaleLowerCase().lastIndexOf(".md");
                        items.push({
                            name:noteNameIndex>0?item.name.substring(0,noteNameIndex):item.name,
                            fullPath:note.name+"/"+item.name,
                            folder:!(item.type==="file")
                        })
                    })
                    _notes[index]["subitems"]=items;
                    that.setState({
                        notes:_notes
                    })
                })
            }
        }else{
            if(!note.content){
                axios.get(gitBaseUrl+note.fullPath).then(response=>{
                    note["content"]=decodeURIComponent(escape(window.atob(response.data.content)));
                    this.props.handleOnItemClick(note.content);
                })
            }else{
                this.props.handleOnItemClick(note.content);
            }

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