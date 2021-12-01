import React, { Component } from 'react';
import { View, Image, Dimensions, Text, FlatList, Alert } from 'react-native';
import HeaderDrawer from './HeaderDrawer';
import { connect } from 'react-redux';
import * as actions from '../action/actionTypes';
import { Card, Button } from 'react-native-paper';
import firebase from './firebaseconfig'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Shop extends Component {
    state = {
        navigation: ''
    }
    EditList = async (index) => {
        await this.props.navigation.navigate('AddShop', {
            From: 'Edit', index: index,
            data: { ...this.props.SHOP[index] },
            onBack: this.onBack.bind(this)
        })
        this.setState({
            navigation: true
        })
    }
    async onBack() {
        await this.props.SETSHOP(this.props.USERDATA.id);
        await this.props.SETSHOPKEYS(this.props.USERDATA.id)
    }
    DeleteList = async (index) => {
        Alert.alert(
            "Warning",
            "Are you sure to delete this Shop",
            [
                {
                    text: "Cancel",
                    onPress: () => alert("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        let shopid = this.props.SHOPKEYS[0][index];
                        await this.props.deleteShop(this.props.USERDATA.id, shopid)
                        await this.props.SETSHOP(this.props.USERDATA.id)
                        await this.props.SETSHOPKEYS(this.props.USERDATA.id)
                        this.setState({
                            sucess: 'true'
                        });
                    }

                }
            ],
            { cancelable: false }
        );
    }
    openDraw = () => {
        this.props.navigation.openDrawer()
    }
    render() {
        return (
            <View style={{ flex: 1, width: '100%', height: '100%', backgroundColor: '#FFA500' }}>
                <HeaderDrawer openDraw={this.openDraw} title={'MyShop'} />
                <View style={{ position: 'absolute', right: 10, top: 10 }}>
                    <Button
                        mode='contained' color='black'
                        labelStyle={{ fontWeight: 'bold',color:'#FFA500' }}
                        disabled={this.props.isLoading}
                        onPress={() => {
                            this.props.navigation.navigate('AddShop', { from: 'new', onBack: this.onBack.bind(this) })
                        }}
                    >Add Shop</Button>
                </View>
                <View style={{ flex1: 1, margin: '3%', paddingBottom: 15, height: '100%' }}>
                    <FlatList
                        data={this.props.SHOP}
                        renderItem={({ item, index }) =>
                            <View>
                                <View style={{ paddingVertical: 4 }}>
                                    <Card style={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        padding: '2%',
                                        paddingVertical: '10%',
                                        marginBottom: '10%'
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                width: Dimensions.get('window').width / 2,
                                                alignSelf: 'center'
                                            }}
                                            onPress={() => {
                                                this.props.navigation.navigate('ProfileImage',
                                                    {
                                                        from: "Shop's",
                                                        data: this.props.SHOP[index].shopImage,
                                                        onBack: this.onBack.bind(this),
                                                        index: index
                                                    })
                                            }}>
                                            <View>
                                                <Image
                                                    source={{
                                                        uri: this.props.SHOP[index].shopImage ? this.props.SHOP[index].shopImage[Object.keys(this.props.SHOP[0].shopImage)[0]] : ''
                                                    }}
                                                    style={{
                                                        width: Dimensions.get('window').width / 2,
                                                        height: Dimensions.get('window').height / 4,
                                                        alignSelf: 'center',
                                                        borderRadius: 50, margin: '5%'
                                                    }}
                                                />
                                                <Text style={{
                                                    position: 'absolute',
                                                    top: 100,
                                                    alignSelf: 'center',
                                                    fontWeight: 'bold',
                                                    backgroundColor: 'rgba(100,100,100,0.5)',
                                                    color: 'white',
                                                    fontSize: 16
                                                }}>Click Here</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{
                                            width: '100%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                ShopName:
                                    </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopName}
                                            </Text>
                                        </View>
                                        <View style={{
                                            width: '100%',
                                            marginTop: '1%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                Contact Number:
                                    </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopNumber}
                                            </Text>
                                        </View>
                                        <View style={{
                                            width: '100%',
                                            marginTop: '1%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                Alternate Number:
                                            </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopAlter}
                                            </Text>
                                        </View>
                                        <View style={{
                                            width: '100%',
                                            marginTop: '2%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                ShopCategory:
                                    </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopCategory}
                                            </Text>
                                        </View>


                                        {this.props.SHOP[index].shopSubCategory === 'Others' ?
                                            <View style={{
                                                width: '100%',
                                                borderRadius: 2,
                                                borderWidth: 1, padding: '2%',
                                                marginTop: '2%',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                    ShopSubCategory:
                                    </Text>
                                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                    {this.props.SHOP[index].extraInfo}
                                                </Text>
                                            </View>
                                            :
                                            <View style={{
                                                width: '100%',
                                                borderRadius: 2,
                                                borderWidth: 1, padding: '2%',
                                                marginTop: '2%',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                    ShopSubCategory:
                                    </Text>
                                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                    {this.props.SHOP[index].shopSubCategory}
                                                </Text>
                                            </View>

                                        }

                                        <View style={{
                                            width: '100%', marginTop: '1%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                Street:
                                    </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopAddress}
                                            </Text>
                                        </View>
                                        <View style={{
                                            width: '100%', marginTop: '1%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                City:
                                    </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopCity}
                                            </Text>
                                        </View>

                                        <View style={{
                                            width: '100%',
                                            marginTop: '1%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                Mandal:
                                    </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopMandal}
                                            </Text>
                                        </View>

                                        <View style={{
                                            width: '100%',
                                            marginTop: '1%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                District:
                                            </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopDistrict}
                                            </Text>
                                        </View>
                                        <View style={{
                                            width: '100%',
                                            marginTop: '1%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                                State:
                                    </Text>
                                            <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                                {this.props.SHOP[index].shopState}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                marginTop: '1%',
                                                borderRadius: 2,
                                                borderWidth: 1,
                                                padding: '2%', flexDirection: 'row',
                                                justifyContent: 'space-between'
                                            }}>
                                            <View style={{
                                                flexShrink: 1,
                                                flexWrap: 'wrap'
                                            }}>
                                                <Text style={{
                                                    fontSize: 18,
                                                    paddingVertical: 2
                                                }}>
                                                    Home Services/Home Delivery:
                                                    </Text>
                                            </View>
                                            <Text style={{
                                                fontSize: 18,
                                                flexShrink: 1,
                                                paddingVertical: 2
                                            }}>
                                                {this.props.SHOP[index].delivery}
                                            </Text>
                                        </View>
                                        <View style={{
                                            marginTop: '1%',
                                            borderRadius: 2,
                                            borderWidth: 1,
                                            padding: '2%',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Text style={{
                                                fontSize: 18,
                                                paddingVertical: 2,
                                                flexShrink: 1,
                                                flexWrap: 'wrap',
                                            }}>
                                                Allow Others To Message through Whatsapp:
                                            </Text>
                                            <Text style={{
                                                fontSize: 18,
                                                paddingVertical: 2
                                            }}>
                                                {this.props.SHOP[index].allow}
                                            </Text>
                                        </View>
                                    </Card>
                                </View>
                                <View style={{ position: 'absolute', width: 100, right: 6, top: 10 }}>
                                    <Button
                                        mode='contained' color='black'
                                        labelStyle={{ fontWeight: 'bold',color:'#FFA500'}} onPress={() => { this.DeleteList(index) }}
                                    >Delete</Button>
                                </View>
                                <View style={{ position: 'absolute', top: 10, left: 6, width: 100 }}>
                                    <Button
                                        mode='contained' color='black'
                                        labelStyle={{ fontWeight: 'bold',color:'#FFA500' }} onPress={() => {
                                            this.EditList(index)
                                        }
                                        }
                                    >Edit</Button>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>
        );
    }


}
function mapStateToProps(state) {
    return {
        ...state
    }
}
const MyShop = connect(mapStateToProps, { ...actions })(Shop)
export default MyShop;

