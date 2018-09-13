import React from 'react';
import './App.css';

const Item = (props)=> {
        return (
            <li className = "gif-list-item masonry-brick" onMouseEnter={props.mouseEnterHandler} onMouseLeave={props.mouseLeaveHandler}>
                <img className = {props.gif} src = {props.src} alt = "still_image" />
            </li>
        );
};

export default Item;
