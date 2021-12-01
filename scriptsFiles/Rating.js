import React, { Component } from 'react';
import { Text,View } from 'react-native';
import HeaderDrawer from './HeaderDrawer';

class Rating extends Component {
    state = {}
    openDraw = () => {
        this.props.navigation.openDrawer()
    }
    navigateTo =()=>{
        this.props.navigation.navigate('ScreenExternal')
    }
    render() {
        return (
            <View>
                <HeaderDrawer openDraw={this.openDraw} navigate={this.navigateTo}/>
            </View>
        );
    }
}
 
export default Rating;