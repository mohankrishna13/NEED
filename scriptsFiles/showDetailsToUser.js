import React, { Component } from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, ScrollView, Linking } from 'react-native';
import { Card } from 'react-native-paper';
import { ColorDotsLoader } from 'react-native-indicator';


class ShowDetails extends Component {
    state = {
        data: {},
    }
    openWhatsapp() {
        let mobile = this.state.data.shopNumber;
        if (mobile) {
            let url =
                "whatsapp://send?text=" +
                "&phone=91" +
                mobile;
            Linking.openURL(url)
                .then(data => {
                    console.log("WhatsApp Opened successfully " + data);
                })
                .catch(() => {
                    alert("Make sure WhatsApp installed on your device");
                });
        } else {
            alert("Please enter mobile no");
        }

    }
    async componentWillMount() {
        await this.setState({
            data: { ...this.props.navigation.getParam('details', 'data') },
            success: true
        });
    }
    render() {
        if (this.state.data) {
            return (
                <View style={{ flex: 1, width: Dimensions.get('window').width, backgroundColor: '#FFA500' }}>
                    <View style={{
                        height: 50, margin: '1%',
                    }}>
                        <Card
                            style={{
                                backgroundColor: 'white'

                            }}
                            containerStyle={{
                                marginTop: '4%', padding: 3,
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                height: '100%',
                                backgroundColor: 'white',
                                borderWidth:2,
                                justifyContent: 'space-between'
                            }}>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.goBack() }}
                                    style={{ height: '100%', width: '15%' }}>
                                    <Image
                                        source={require('../Assests/DrawerImages/left-arrow.png')}
                                        style={{ width: 45, height: 45, marginLeft: '3%', marginTop: '3%', borderWidth: 2 }} />
                                </TouchableOpacity>
                                <Text style={{ alignSelf: 'center', fontSize: 20 }}>
                                    Details
                                </Text>
                                <View>
                                    <TouchableOpacity style={{ height: 40, width: 40, marginRight: '3%' }}
                                        onPress={() => { this.state.data.allow === "Yes" ? this.openWhatsapp() : alert('Not') }}>
                                        <Image source={require('../Assests/DrawerImages/message.png')}
                                            style={{ borderWidth: 1, height: 40, width: 40 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Card>
                    </View>
                    <Card style={{
                        margin: '4%',
                        backgroundColor: 'white',
                        padding: '2%',
                        paddingVertical: '10%',
                        height: Dimensions.get('window').height
                    }}>
                        <ScrollView
                            style={{
                                marginBottom: '5%',
                                flexDirection: 'column',
                            }}>
                            <TouchableOpacity
                                style={{
                                    marginBottom: '3%',
                                    width: Dimensions.get('window').width / 2, alignSelf: 'center'
                                }}
                                onPress={() => {
                                    this.state.data.shopImage ?
                                        this.props.navigation.navigate('ProfileImage',
                                            { from: 'Shop', data: this.state.data.shopImage }) : ''
                                }}>
                                <View>
                                    <Image source={{ uri: this.state.data.shopImage ? this.state.data.shopImage[0] : '' }}
                                        style={{
                                            width: Dimensions.get('window').width,
                                            height: Dimensions.get('window').height / 4,
                                            resizeMode: 'contain',
                                            alignSelf: 'center',
                                            borderRadius: 10

                                        }} />
                                    <Text style={{
                                        position: 'absolute',
                                        top: 80,
                                        alignSelf:'center',
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgba(100,100,100,0.5)',
                                        color: 'white',
                                        fontSize: 16
                                    }}>Click Here</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                justifyContent: 'space-between',
                                borderRadius: 2, borderWidth: 1, padding: '2%', flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                    ShopName:
                                </Text>
                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                    {this.state.data.shopName}
                                </Text>
                            </View>
                            {this.state.data.extraInfo != '' ?
                                <View style={{
                                    justifyContent: 'space-between'
                                    , marginTop: '1%',
                                    borderRadius: 2,
                                    borderWidth: 1,
                                    padding: '2%',
                                    flexDirection: 'row'
                                }}>
                                    <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                        ShopCategory:
                                    </Text>
                                    <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                        {this.state.data.extraInfo}
                                    </Text>
                                </View>
                                : <></>}
                            <View style={{
                                justifyContent: 'space-between'
                                , marginTop: '1%', borderRadius: 2, borderWidth: 1, padding: '2%', flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                    Contact Number:
                                </Text>
                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                    {this.state.data.shopNumber}
                                </Text>
                            </View>
                            <View style={{
                                justifyContent: 'space-between'
                                , marginTop: '1%',
                                borderRadius: 2,
                                borderWidth: 1,
                                padding: '2%',
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 16, paddingVertical: 2 }}>
                                    Alternate Number:
                                </Text>
                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                    {this.state.data.shopAlter}
                                </Text>
                            </View>
                            <View style={{
                                justifyContent: 'space-between'
                                , marginTop: '1%',
                                borderRadius: 2,
                                borderWidth: 1,
                                padding: '2%',
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                    Street:
                                </Text>
                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                    {this.state.data.shopAddress}
                                </Text>
                            </View>
                            <View style={{
                                justifyContent: 'space-between'
                                , marginTop: '1%',
                                borderRadius: 2,
                                borderWidth: 1,
                                padding: '2%',
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                    City:
                                </Text>
                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                    {this.state.data.shopCity}
                                </Text>
                            </View>

                            <View style={{
                                justifyContent: 'space-between',
                                marginTop: '1%',
                                borderRadius: 2,
                                borderWidth: 1, padding: '2%',
                                flexDirection: 'row'
                            }}>
                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                    Mandal:
                                </Text>
                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                    {this.state.data.shopMandal}
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
                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                    District:
                                </Text>
                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                    {this.state.data.shopDistrict}
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
                                <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                    State:
                                </Text>
                                <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                    {this.state.data.shopState}
                                </Text>
                            </View>
                            <View style={{
                                marginTop: '1%',
                                borderRadius: 2,
                                borderWidth: 1, padding: '2%',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <View style={{ flexShrink: 1, flexWrap: 'wrap' }}>
                                    <Text style={{ fontSize: 18, paddingVertical: 2 }}>
                                        Home Services/Home Delivery:
                                </Text>
                                </View>
                                <View >
                                    <Text style={{ fontSize: 18, flexShrink: 1, paddingVertical: 2 }}>
                                        {this.state.data.delivery}
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    </Card>
                </View >

            );
        }
        else {
            return (
                <View style={{ justifyContent: 'center', backgroundColor: '#161b40', height: '100%' }}>
                    <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center' }}>Data is Loading......please Wait</Text>
                    <View style={{ alignSelf: 'center', marginTop: '5%' }}>
                        <ColorDotsLoader size={18} betweenSpace={22}
                            color1={"#fff"}
                            color2={'#fc0303'}
                            color3={'#32e63e'} />
                    </View>
                </View>
            );
        }
    }
}

export default ShowDetails;