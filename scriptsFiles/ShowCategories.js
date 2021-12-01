import React, { Component } from 'react';
import { FlatList, View, Text, TouchableOpacity, Image } from 'react-native';
import firebase from './firebaseconfig';
import NetworkUtils from './Network';
import { Card } from 'react-native-paper';
import { ColorDotsLoader, PulseLoader } from 'react-native-indicator';


class ShowCategory extends Component {
    state = {
        data: [],
        isdata: false,
        connection: false
    }

    getListViewItem = (item) => {
        this.props.
            navigation
            .navigate('showDetails', {
                'details': item,
            })
    }
    async componentWillMount() {
        if ((await NetworkUtils.isNetworkAvailable())) {
            let data = this.props.navigation.getParam('from', 'details');
            let display = [];
            let parentKeys = [];
            await firebase.
                database().
                ref('/Shops/')
                .once('value', async snapshot => {
                    await snapshot.forEach((child) => {
                        parentKeys.push(child.key)
                    })
                })
            for (let i = 0; i < parentKeys.length; i++) {
                let subKeys = [];
                await firebase.database().ref('/Shops/' + parentKeys[i])
                    .once('value', async snapshot => {
                        await snapshot.forEach((child) => {
                            subKeys.push(child.key)
                        })
                    })
                for (let k = 0; k < subKeys.length; k++) {
                    await firebase
                        .database()
                        .ref('/Shops/' + parentKeys[i] + "/" + subKeys[k])
                        .once('value', async res => {
                            console.log(res.val())
                            let dupdata = { ...res.val() }
                            let images = [];
                            if (res.val().shopSubCategory.toLowerCase() === data.toLowerCase()) {
                                if (res.val().shopImage) {
                                    for (let l = 0; l < res.val().shopImage.length; l++) {
                                        if (res.val().shopImage[l] != undefined) {
                                            await images.push(res.val().shopImage[l])
                                        }
                                    }
                                    if (images.length > 0) {
                                        dupdata.shopImage = images
                                    }
                                }
                                await display.push({ ...dupdata })
                            }

                        })
                }
            }

            Promise.all(display).then(async () => {
                if (display.length > 0) {
                    this.setState({
                        data: display,
                    });
                } else {
                    alert('No data Found')
                    setTimeout(() => {
                        this.props.navigation.goBack()
                    }, 1000)
                }
            })

        } else {
            this.setState({
                connection: true
            });
            alert('check Your Internet Connection')
        }
    }
    render() {
        return (
            <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#FFA500' }}>
                <View style={{
                    height: 50, margin: '2%',
                }}>
                    <Card containerStyle={{ margin: '1%', marginTop: '4%', padding: 8 }}>
                        <View style={{
                            flexDirection: 'row', height: '100%',
                            borderWidth:2
                        }}>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.goBack() }}
                                style={{ position: 'absolute', left: 0, height: '100%', width: '15%' }}>
                                <Image
                                    source={require('../Assests/DrawerImages/left-arrow.png')}
                                    style={{
                                        width: 45, height: 45, marginLeft: '3%',
                                        marginTop: '3%',
                                        borderWidth: 2
                                    }} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: '30%', alignSelf: 'center', fontSize: 20 }}>
                                {this.props.navigation.getParam('from', 'hello')}
                            </Text>
                        </View>
                    </Card>
                </View>
                <View style={{ flex: 1, width: '99%', marginTop: '3%' }}>
                    {this.state.data != '' ?
                        <FlatList
                            data={this.state.data}
                            numColumns={2}
                            renderItem={({ item }) =>
                                <Card style={{
                                    backgroundColor: 'white',
                                    width: '48%',
                                    padding: '3%',
                                    marginLeft: '2%',
                                    marginBottom: '2%',
                                }}>
                                    <TouchableOpacity onPress={this.getListViewItem.bind(this, item)}>
                                        <View
                                            style={{
                                                flexDirection: 'column'
                                            }}>
                                            <View style={{ alignSelf: 'center' }}>
                                                <Image source={{ uri: item.shopImage ? item.shopImage[0] : '' }}
                                                    style={{
                                                        height: 150,
                                                        width: 150,
                                                        borderRadius: 50 / 2
                                                    }} />
                                            </View>
                                            <View style={{ flex: 1, marginTop: '4%' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontStyle: 'italic',
                                                        color: 'black',
                                                        alignSelf: 'flex-start',
                                                    }}>
                                                    ShopName:{item.shopName}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1, marginTop: '4%' }}>
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontStyle: 'italic',
                                                        color: 'black',
                                                        alignSelf: 'flex-start',
                                                    }}>
                                                    ShopArea:{item.shopAddress}
                                                </Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Card>

                            }

                        /> : <View style={{ alignSelf: 'center', marginTop: '5%' }}>
                            <ColorDotsLoader size={18} betweenSpace={22}
                                color1={"#fff"}
                                color2={'#fc0303'}
                                color3={'#32e63e'} />
                        </View>
                    }
                </View>
            </View >
        );
    }
}

export default ShowCategory;