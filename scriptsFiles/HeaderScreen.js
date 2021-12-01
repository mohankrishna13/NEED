import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native'

class HeaderScreen extends Component {
    state = {}
    
    render() {
        return (
            <View style={{ backgroundColor: '#FFA500'}}>
                <Image source={require('../Assests/images/logo.jpg')}
                    style={{
                        height:150,
                        width:150,
                        alignSelf: 'center',
                        marginTop: '3%',
                        borderRadius: 50
                    }}
                />
                <Text
                    style={{
                        marginTop: '4%',
                        textAlign: 'center',
                        textDecorationLine: 'underline',
                        color: 'black',
                        paddingVertical:'2%',
                        fontSize: 20,
                        fontStyle: 'italic',
                        fontWeight:'bold'
                    }}>Get Everything While You Stay Home</Text>
            </View>
        );
    }
}

export default HeaderScreen;