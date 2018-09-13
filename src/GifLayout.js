import React, { Component } from 'react';
import './GifLayout.css';
import Item from './Item';

class GifLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHovered: false,
            activeElementId: -1
        };
        this.animateOnHover = this.animateOnHover.bind(this);
        this.stopAnimateOnLeave = this.stopAnimateOnLeave.bind(this);
    }

    animateOnHover(index, event) {
        this.setState({
            activeElementId: index
        })
    }

    stopAnimateOnLeave(index, event) {
        this.setState({
            activeElementId: -1
        })
    }

    render() {
        return (
            <ul className="gif-data masonry">
                {this.props.apiData.length !== 0 &&
                this.props.apiData.map((data, index)=> {
                    const srcUrl = this.state.activeElementId === index ? data.images.fixed_width.url : data.images.fixed_width_still.url;
                    return <Item
                        key={data.id}
                        src={srcUrl}
                        mouseEnterHandler={this.animateOnHover.bind(this,index)}
                        mouseLeaveHandler={this.stopAnimateOnLeave.bind(this,index)}
                        />
                })
                }
            </ul>
        );
    }
}

export default GifLayout;
