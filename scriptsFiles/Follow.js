import React, { Component } from 'react';
import { Text, View, Image, Linking, Dimensions } from 'react-native';
import HeaderDrawer from './HeaderDrawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Follow extends Component {
    state = {}
    openDraw = () => {
        this.props.navigation.openDrawer()
    }
    navigateTo = () => {
        this.props.navigation.navigate('ScreenExternal')
    }
    render() {
        return (
            <View style={{ backgroundColor: '#FFA500', height: Dimensions.get('window').height + 100 }}>
                <HeaderDrawer openDraw={this.openDraw} navigate={this.navigateTo} title={"Follow Us"} />
                <View style={{ padding: '2%', paddingVertical: '5%' }}>
                    <TouchableOpacity style={{ margin: '4%', borderWidth: 2, padding: '3%' }}
                        onPress={() => { Linking.openURL('mailto:MNP.NEED.OFFICIAL@gmail.com') }}
                    >
                        <Image source={require('../Assests/DrawerImages/gmail.png')} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>MNP.NEED.OFFICIAL@gmail.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: '4%', borderWidth: 2, padding: '3%' }}
                        onPress={() => { Linking.openURL('https://www.facebook.com/n/?mnp.need');
}}
                    >
                        <Image source={require('../Assests/DrawerImages/facebook.png')} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>MNP NEED</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ margin: '4%', borderWidth: 2, padding: '3%' }}
                        onPress={() =>
                            Linking.openURL(`http://instagram.com/_u/mnp_need_official`)
                        }>
                        <Image source={require('../Assests/DrawerImages/instagram.png')} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>mnp_need_official</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: '4%', borderWidth: 2, padding: '3%' }} onPress={() =>
                        Linking.openURL('https://twitter.com/MnpNeed')
                    }>
                        <Image source={require('../Assests/DrawerImages/twitter.png')} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} >@MNP_NEED_OFFICIAL</Text>
                    </TouchableOpacity>
                </View >
            </View >
        );
    }
}

export default Follow;