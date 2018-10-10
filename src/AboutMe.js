import React, { Component } from 'react';
import './AboutMe.css';

class AboutMe extends Component {
    constructor(){
        this.setState({
            color:0
        })
    }
    render() {
        
        return (
            <div className="AboutMe">
                <div id="home" style="color=">
                    <div className="div">
                    <h1 className="h">Welcome to my Personal Git Page </h1>
                    <h2 className="h">My Github Page is <a className="a" href="https://github.com/rayshaw001">rayshaw001</a></h2>
                    <h2 className="h">My CSDN blog Page is <a className="a" href="http://blog.csdn.net/rayshaw001">rayshaw001</a></h2>
                    <h2 className="h">My leetcode Page is <a className="a" href="https://leetcode.com/rayshaw001/">rayshaw001</a></h2>
                    <h2 className="h">My Netease Cloud Music Account is <a className="a" href="http://music.163.com/#/user/home?id=74132453">RayShaw</a></h2>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="800" width="auto">
                        <polyline points="0,400 40,100 80,600 120,155 160,477 200,55 240,555 280,100 320,666 360,234 400,555 440,277 480,555 520,123 560,722 600,100 640,600 680,155 720,477 760,55 800,555 840,300 880,700 920,321 960,567 1000,77 1040,585 1080,355 1120,800 1160,100 1200,600 1240,155 1280,477 1320,55 1360,555 1400,400 1440,100 1480,600 1520,155 1560,477 1600,55 1640,555 1680,120 1720,700 1760,100 1800,800 1840,150 1880,650 1920,300"
                            style="fill:transparent;stroke:#01A982;stroke-width:3;fill-rule:evenodd;repeat-x:true" />
                    </svg>
                    <h1 className="h">Thanks for your coming @_@~ </h1>
                </div>   
                <canvas></canvas>
                <script type="text/javascript" src="./js/three.min.js"></script>
                <script type="text/javascript" src="./js/index.js"></script>
                <script type="text/javascript" src="./js/three-waves.min.js"></script>
            </div>
        );
    }
}

export default AboutMe;
