import React, { Component } from 'react';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { Text, View, Image, AsyncStorage,  } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import firebase from './firebaseconfig';
import { connect } from 'react-redux';
import * as actions from '../action/actionTypes';

class SidebarComponent extends Component {
    state = {
        image: ''
    }
    componentWillMount() {
        if (this.props.USERDATA != undefined) {
            this.setState({
                image: this.props.USERDATA.image
            });
        }
    }
    render() {
        return (
            <View style={{ flex: 1, height: '100%' }}>
             
                <ScrollView style={{ marginleft: '1%', borderRadius: 10, backgroundColor: '#FFA500' }}>
                    {this.props.USERDATA != undefined && this.props.USERDATA.image != "" ?
                        <Image source={{ uri: this.props.USERDATA.image }}
                            style={{ width: 150, height: 150, borderRadius: 150, marginLeft: 10 }} /> :
                        <Image source={require('../Assests/DrawerImages/mypic.jpg')}
                            style={{ alignSelf: 'center', width: 150, height: 150, borderRadius: 150, marginLeft: 10 }} />}
                    <Text
                        style={{
                            position: 'relative',
                            left: 10,
                            fontSize: 20,
                            fontStyle: 'italic',
                            color: 'black'
                        }}>{this.props.USERDATA && this.props.USERDATA.first ?
                            this.props.USERDATA.first + " " + this.props.USERDATA.last
                            :
                            <Text style={{ fontSize: 10, flexShrink: 1 }}>Name</Text>
                        }</Text>
                    <Divider style={{ paddingVertical: 1, marginTop: 2, backgroundColor: '#1f8c1d' }}></Divider>
                    <DrawerNavigatorItems {...this.props} />
                    <Divider style={{ paddingVertical: 1, marginTop: 2, backgroundColor: '#1f8c1d' }}></Divider>
                    <TouchableOpacity

                        onPress={async () => {
                            await firebase.auth().signOut().then(async () => {
                                await AsyncStorage.clear();
                                await this.props.Logout();
                                await this.props.navigation.navigate('LogoutScreen');
                            })
                        }}>
                        <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '7%' }}>
                            <Image source={require('../Assests/DrawerImages/Logout.png')} style={{ width: 22, height: 22 }} />
                            <Text style={{ fontSize: 20, marginHorizontal: '11%', marginTop: '-2%' }}>Logout</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}
function mapStateToProps(state) {
    return {
        ...state
    }
}
const Sidebar = connect(mapStateToProps, { ...actions })(SidebarComponent)
export default Sidebar;
