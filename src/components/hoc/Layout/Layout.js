import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import classes from './Layout.css'
import React, { Component } from 'react';

export default function Layout(ComposedComponent) {
    class Children extends Component {

        render() {
            console.log(this.props.user);
            return(
                <div className={classes.Layout}>
                    <Header user={this.props.user}/>
                    <ComposedComponent {...this.props} />
                    <Footer />
                </div>
            )
        }
    }

    return Children;
}