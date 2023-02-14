import React, { Component } from 'react';
import { Menu } from 'antd';
import { FileMarkdownOutlined, FolderOpenOutlined, FolderOutlined } from '@ant-design/icons';
import axios from 'axios';


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
        var folder = [];
        var item = []
        notes.map((note,index)=>{
            if(!note.folder){
                folder.push (
                <Menu.Item
                    key={index}
                    selected={that.state.selectedItem === index}
                    onClick={that.handleClick.bind(this,note,index)}>
                    <FileMarkdownOutlined />
                    <span>{note.name}</span>
                </Menu.Item> 
                )
            } else {
                note.clicked = note.clicked || false;
                item.push (
                    <Menu.SubMenu 
                        key={index} 
                        title={
                            note.clicked ? (<span> <FolderOpenOutlined /><span>{note.name} </span> </span>) :
                        (<span> <FolderOutlined /><span>{note.name} </span> </span>)
                    } 
                        onTitleClick={that.handleClick.bind(this,note,index)}>
                            {
                                (note.subitems||[]).map((item,idx)=>{
                                   return <Menu.Item 
                                        key={index + "-" + idx} 
                                        onClick={that.handleClick.bind(this,item,idx)}>
                                        <FileMarkdownOutlined />
                                        {item.name} 
                                    </Menu.Item>
                                })
                            }
                    </Menu.SubMenu>
                )
            }
        });
        items.push(item);
        items.push(folder);
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
            var clicked = note.clicked || false;
            var _notes = this.state.notes;
            if(items.length===0){
                axios.get(gitBaseUrl+note.fullPath).then(response=>{
                    response.data.map((item,idx)=>{
                        var noteNameIndex=item.name.toLocaleLowerCase().lastIndexOf(".md");
                        items.push({
                            name:noteNameIndex>0?item.name.substring(0,noteNameIndex):item.name,
                            fullPath:note.name+"/"+item.name,
                            folder:!(item.type==="file")
                        })
                    })
                    _notes[index]["subitems"] = items;
                    _notes[index]["clicked"] = !clicked;
                    that.setState({
                        notes:_notes
                    })
                })
            } else {
                _notes[index]["clicked"] = !clicked;
                that.setState({
                    notes:_notes
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