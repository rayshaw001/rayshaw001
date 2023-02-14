import React, { Component } from 'react';
import './Header.css';

import { Avatar } from 'antd';



class Header extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    render() {
        let AvatarUrl = 'https://avatars3.githubusercontent.com/u/15726041';
        let gitPageUrl = "https://rayshaw001.github.io";
        return (
            <div className="Header">
                <Avatar 
                    size="large"
                    className='avatar'
                    onClick={this.handleOnClick.bind(this, gitPageUrl)}
                    alt="Ray Shaw"
                    src={AvatarUrl}
                />
            </div>
        );
    }

    handleOnClick = (link) =>{
        window.location=link;
    }
}

export default Header;
