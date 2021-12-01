import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Card } from 'react-native-elements';

class HeaderDrawer extends Component {
    state = {}
    render() {
        return (
            <View>
                <Card containerStyle={{ margin: '1%', height: 50, padding: 8 ,backgroundColor:'white',borderWidth:2,borderColor:'black'}}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => { this.props.openDraw() }} style={{ position: 'absolute', left: 0 }}>
                            <Image source={require('../Assests/DrawerImages/menu.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: '40%', fontSize: 20,fontWeight:'bold' }}>{this.props.title}</Text>
                    </View>
                </Card>
            </View>
        );
    }
}
export default HeaderDrawer;