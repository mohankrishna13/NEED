import { View, Text, Image, BackHandler, AsyncStorage } from 'react-native';
import React, { Component } from 'react';
import { ColorDotsLoader } from 'react-native-indicator';
import * as actions from '../action/actionTypes';
import { connect } from 'react-redux';
import NetworkUtils from './Network';



class SplashComponent extends Component {
    static navigationOptions = {
        header: false
    }
    state = {

    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            BackHandler.exitApp()
        })
    }
    async componentWillMount() {
        if (!(await NetworkUtils.isNetworkAvailable())) {
            alert('Check Your Internet Connection...')
        }
        let prop = this.props;
        const navi = prop.navigation;
        const value = await AsyncStorage.getItem('id');
        if (value) {
            setTimeout(() => {
                navi.navigate('Dashboard');
            }, 2000);
        } else {
            setTimeout(() => {
                navi.navigate('Login');
            }, 2000);
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: '#FFA500', height: '100%' }} >
                <Image source={require('../Assests/images/logo.jpg')}
                    style={{
                        height: 200,
                        width: 200,
                        alignSelf: 'center',
                        marginTop: '50%',
                        borderRadius: 50
                    }}
                />
                <Text
                    style={{
                        marginTop: '4%',
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                        color: 'black',
                        paddingVertical: '2%',
                        fontSize: 20,
                        fontStyle: 'italic',
                        fontWeight: 'bold'
                    }}>Get Everything While You Stay Home</Text>

                <View style={{ alignSelf: 'center', marginTop: '5%' }}>
                    <ColorDotsLoader size={18} betweenSpace={22}
                        color1={"#fff"}
                        color2={'#fc0303'}
                        color3={'#32e63e'} />
                </View>
              
            </View >
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state
    }
}
const Splash = connect(mapStateToProps, { ...actions })(SplashComponent)
export default Splash;
