import React from 'react';
import './SearchBox.css';


const SearchBox = (props)=> {
    return (
        <div className="search-box">
            <input type="text" value={props.inputValue} onChange={props.changeHandler} placeholder = {props.placeHolderText} autoFocus = {props.enableAutoFocus}/>
        </div>
    );
};

export default SearchBox;
