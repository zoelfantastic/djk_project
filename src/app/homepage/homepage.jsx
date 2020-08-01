import React, { PureComponent } from 'react';
import { withAppContext } from 'context';
import { Carousel } from 'antd';
import './homepage.less';

class HomePage extends PureComponent {
    constructor(props) {
        super(props);
    }

    onChange(a, b, c) {
        console.log(a, b, c);
    }

    render() {
        return(
            <Carousel autoplay>
                <div>
                <h3>1</h3>
                </div>
                <div>
                <h3>2</h3>
                </div>
                <div>
                <h3>3</h3>
                </div>
                <div>
                <h3>4</h3>
                </div>
            </Carousel>)
    }
}


export default withAppContext(HomePage);
