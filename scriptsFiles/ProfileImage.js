import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../action/actionTypes';
import firebase from './firebaseconfig';
import { View, Image, TouchableOpacity, Alert, FlatList, Text, ActivityIndicator, Dimensions, Button } from 'react-native';
import { Card } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { ColorDotsLoader } from 'react-native-indicator';
import Modal from 'react-native-modal';


class ProfileImageComponent extends Component {
    state = {
        success: '',
        shopimage: '',
    }
    async AddPics() {
        let image = '';
        let FinalImages = [];
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            multiple: true,
        }).then(async images => {
            image = null,
                images.map(async (i) => {
                    FinalImages.push({ uri: i.path })
                })
            await this.props.shopImage(FinalImages,
                this.props.USERDATA.id,
                this.props.SHOPKEYS[0][this.props.navigation.getParam('index', 'profile')]
            )
            await this.props.SETSHOP(this.props.USERDATA.id)
            //this.props.navigation.goBack(),
            //this.props.navigation.state.params.onBack();
        }).catch((e) => alert(e));

    }
    deletePic(Listindiex) {
        let index = this.props.navigation.getParam('index', 'profile')
        let shopKey = this.props.SHOPKEYS[0][index];
        Alert.alert(
            "Warning",
            "Are you sure want to delete this Photo",
            [
                {
                    text: "Cancel",
                    onPress: () => alert("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: async () => {
                        let key = [];
                        await firebase.database()
                            .ref('/Shops/' + this.props.USERDATA.id + '/' + shopKey + '/' + 'shopImage')
                            .once('value', async snapshot => {
                                if (snapshot) {
                                    await key.push(Object.keys(snapshot.val()))
                                }
                            })

                        await firebase.database()
                            .ref('/Shops/' + this.props.USERDATA.id + '/' + shopKey + '/' + 'shopImage' + '/' + key[0][Listindiex]).remove()

                        await firebase.storage().ref('/ShopImages/' + this.props.USERDATA.id + '/' + shopKey + '/' + 'shop' + key[0][Listindiex]).delete();
                        //await this.props.SETSHOP(this.props.USERDATA.id)

                        await this.props.navigation.goBack(),
                            await this.props.navigation.state.params.onBack();
                        alert('SuccessFully Deleted......')
                        this.setState({
                            sucess: 'true'
                        });
                    }

                }
            ],
            { cancelable: false }
        );
    }
    Goback() {
        let data = this.props.navigation.getParam('from', 'profile');
        if (data === "Profile") {
            this.props.navigation.goBack()
        } else if (data === "Shop's") {
            this.props.navigation.goBack(),
                this.props.navigation.state.params.onBack();
        } else if (data === "Shop") {
            this.props.navigation.goBack();
        }
    }
    componentWillMount() {
        if ((this.props.navigation.getParam('from', 'profile') != 'Profile')) {
            this.setState({
                shopimage: this.props.navigation.getParam('data', '')
            });
        }
    }
    render() {
        console.log(this.props.SHOP)
        return (
            <View style={{ backgroundColor: '#FFA500' }}>
                <Card containerStyle={{ margin: '1%', height: 50, padding: 8, backgroundColor: 'white',borderWidth:2,borderColor:'black' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.Goback()
                            }}
                            style={{ position: 'absolute', left: 0 }}>
                            <Image
                                source={require('../Assests/DrawerImages/left-arrow.png')
                                }
                                style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={{ marginLeft: '30%', fontSize: 20 }}>
                            {this.props.navigation.getParam('from', 'Profile')} Images
                        </Text>
                        {this.props.navigation.getParam('from', 'asd') === 'Profile' ?
                            <></> : this.props.navigation.getParam('from', 'asd') === "Shop's"
                                ? <View style={{ marginLeft: '10%' }}>
                                    <Button title="Add Photo"
                                        style={{ marginLeft: '45%' }}
                                        onPress={() => {
                                            this.AddPics()
                                        }}
                                    />
                                </View> : <></>
                        }
                    </View>
                </Card>

                {this.props.navigation.getParam('from', 'profile') === 'Profile' ?
                    this.props.USERDATA && this.props.USERDATA.image != '' ?
                        <View>
                            <Image source={{ uri: this.props.USERDATA.image }}
                                style={{ resizeMode: 'contain', height: Dimensions.get('window').height, width: Dimensions.get('window').width }} />
                        </View> :
                        <Image source={require('../Assests/DrawerImages/mypic.jpg')}
                            style={{
                                resizeMode: 'contain', height: '50%',
                                width: null,
                                position: 'absolute',
                                left: 10,
                                right: 10,
                                marginTop: '50%'
                            }} />
                    : this.props.navigation.getParam('from', 'profile') === "Shop's" ?
                        <View style={{ height: Dimensions.get('window').height }}>
                            <FlatList
                                data={Object.keys(this.props.SHOP[this.props.navigation.getParam('index', '')].shopImage)}
                                renderItem={({ index }) => {
                                    return (
                                        <View style={{
                                            marginTop: '3%',
                                            borderWidth: 2,
                                            flexDirection: 'column',
                                            backgroundColor: 'white',
                                            margin: '3%',
                                            padding: '3%',
                                        }}>
                                            <View style={{ width: 100, marginRight: '0%', marginLeft: '70%' }}>
                                                <Button title="Delete" style={{ width: 20, height: 20 }}
                                                    onPress={() => {
                                                        this.deletePic(index)
                                                    }}
                                                />
                                            </View>
                                            <Image source={{ uri: this.props.SHOP[this.props.navigation.getParam('index', '')].shopImage[index] }}
                                                style={{
                                                    marginTop: '2%',
                                                    alignSelf: 'center',
                                                    width: Dimensions.get('window').width - 100,
                                                    height: Dimensions.get('window').height / 3,
                                                    resizeMode: 'contain'
                                                }} />

                                        </View>

                                    )
                                }}
                            />
                        </View>
                        : <View style={{ height: Dimensions.get('window').height }}>
                            <FlatList
                                data={Object.values(this.state.shopimage)}
                                renderItem={({ index, keys }) => {
                                    return (
                                        <View style={{
                                            marginTop: '3%',
                                            marginBottom: '3%',
                                            borderWidth: 2,
                                            padding: '3%',
                                            backgroundColor: 'white', margin: '3%'
                                        }}>

                                            <Image source={{ uri: this.state.shopimage[index] }}
                                                style={{
                                                    width: Dimensions.get('window').width - 50,
                                                    height: Dimensions.get('window').height / 3,
                                                    resizeMode: 'contain',
                                                    alignSelf: 'center'
                                                }} />
                                        </View>
                                    )
                                }}
                            />
                        </View>
                }
                <View>
                    <Modal
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        transparent={true}
                        animationType={"fade"}
                        visible={this.props.isLoading}>
                        <View style={{
                            backgroundColor: 'rgba(100,100,100,0.5)',
                            alignItems: 'center',
                            alignSelf: 'center',
                            width: '130%',
                            height: '130%',
                            justifyContent: 'center'
                        }}>
                            <View style={{
                                alignItems: 'center',
                                backgroundColor: "#fff",
                                height: 100,
                                paddingVertical: 10,
                                width: '80%',
                                borderRadius: 10,
                                borderWidth: 1,
                                flexDirection: 'row',
                                borderColor: 'black',
                                justifyContent: 'space-around'
                            }}>

                                <Text style={{ fontWeight: 'bold', fontSize: Dimensions.get('window').height / 40 }}>Please wait</Text>
                                <View style={{ alignSelf: 'center', marginLeft: '-55%', marginTop: '3%' }}>
                                    <ColorDotsLoader size={8} betweenSpace={10}
                                        color1={"blue"}
                                        color2={'#fc0303'}
                                        color3={'#32e63e'} />
                                </View>
                            </View>
                        </View>
                    </Modal>
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
const ProfileImage = connect(mapStateToProps, { ...actions })(ProfileImageComponent)
export default ProfileImage;