import React, { Component } from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import * as actions from '../action/actionTypes';
import { connect } from 'react-redux'
import { Card, } from 'react-native-paper';
import { AsyncStorage, TouchableOpacity, Image } from 'react-native';
import { ColorDotsLoader } from 'react-native-indicator';
import { FlatList, StyleSheet } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

class Home extends Component {
    state = {
        query: '',
        category: [
            { key: 'Automobile Appliances and services', images: require('../Assests/Categories/automobileandservices/Repair.jpg'), },
            { key: 'Agriculture and Services', images: require('../Assests/Categories/agricultureandservices/Nursuries.jpg') },
            { key: 'Beauty and Services', images: require('../Assests/Categories/beautyandservices/Cosmotics.jpg'), },
            { key: 'Construction and Services', images: require('../Assests/Categories/constructionandservices/Iron.jpg') },
            { key: 'Daily Works and Needs and Services', images: require('../Assests/Categories/dailyworksandneeds/General.jpg') },
            { key: 'Electronic and Electric Applications and Services', images: require('../Assests/Categories/electricappliancesandservices/Electrical.jpg') },
            { key: 'Food', value: 'Category', images: require('../Assests/Categories/food/Fruits.jpg') },
            { key: 'Pets', value: 'Category', images: require('../Assests/Categories/pets/Animals.png'), },
            { key: 'Technology and Services', value: 'Category', images: require('../Assests/Categories/technologyandservices/Softwares.jpg'), },
        ],
        films: [
            { key: 'Hotels' },
            { key: 'Restaraunts' },
            { key: 'Lodges' },
            { key: 'Resorts' },
            { key: 'Meat' },
            { key: 'Fruits' },
            { key: 'sea food' },
            { key: 'Vegetables' },
            { key: 'Automobile and Appliances services' },
            { key: 'Agriculture and Services' },
            { key: 'Beauty and Services' },
            { key: 'Construction and Services' },
            { key: 'Daily Works and Needs and Services' },
            { key: 'Electronic and Electric Applications and Services' },
            { key: 'Food' },
            { key: 'Infrastructure and Services' },
            { key: 'Pets' },
            { key: 'Technology and Services' },
            { key: 'Pests' },
            { key: 'Fertilizers' },
            { key: 'Organic' },
            { key: 'Seeds' },
            { key: 'Nursuries' },
            { key: 'Tools and spares' },
            { key: 'Camera' },
            { key: 'Computers and laptop' },
            { key: 'Electric and Electronic Spares' },
            { key: 'Fridge' },
            { key: 'Home Electric Appliances' },
            { key: 'Kitchen' },
            { key: 'Tv' },
            { key: 'Washing Machine' },
            { key: 'Cement' },
            { key: 'Steel and iron Suppliers' },
            { key: 'Hydra' },
            { key: 'Cranes' },
            { key: 'Manlift' },
            { key: 'Forklifts' },
            { key: 'jcb' },
            { key: 'Trucks' },
            { key: 'Tractors' },
            { key: 'Mini auto' },
            { key: 'Eichers and Lorries' },
            { key: 'Water Suppliers' },
            { key: 'Sand' },
            { key: 'Paints' },
            { key: 'Outdoor decors' },
            { key: 'Indoor decors' },
            { key: 'Plastic Items' },
            { key: 'Glass Structures' },
            { key: 'Photo frame Works' },
            { key: 'Pop Works' },
            { key: 'Wood Works' },
            { key: 'Plant Decors' },
            { key: 'Saloons' },
            { key: 'beauty Parlour' },
            { key: 'Cosmotics' },
            { key: 'Ladies Corneres' },
            { key: 'Clothing' },
            { key: 'Massage Centers' },
            { key: 'Animals' },
            { key: 'Birds' },
            { key: 'Aqua' },
            { key: 'Automobile Repair' },
            { key: 'Bike and car Spares' },
            { key: 'Hydraulic Traders' },
            { key: 'Rented Vehicles' },
            { key: 'Lubricants' },
            { key: 'Petrol and Diesel' },
            { key: 'Vehicle Transport' },
            { key: 'Mobiles' },
            { key: 'Laptops' },
            { key: 'Computers' },
            { key: 'Sound Systems' },
            { key: 'HardWares' },
            { key: 'Softwares' },
            { key: 'Pendrives/cd/dvd' },
            { key: 'Electronic Technologies' },
            { key: 'Plumber' },
            { key: 'Carpenter' },
            { key: 'Tailor' },
            { key: 'Moter Repair' },
            { key: 'General Sores' },
            { key: 'Drivers' },
            { key: 'Internet Cafe' },
            { key: 'Welding' },
            { key: 'Turning and Lathe' },
            { key: 'Hdpe Sheets' },
            { key: 'Water Plants' },
            { key: 'Furniture' },
            { key: 'Nursing Home' },
            { key: 'Suppliers' },
            { key: 'Doctors' },
            { key: 'Medicals' },
            { key: 'PhotoShop' },
            { key: 'Stationary' },
            { key: 'Quarium' },
            { key: 'Clocks and Watches' },
            { key: 'Shoe Mart' },
            { key: 'Drinks' },
            { key: 'Others' },
        ]
    }
    findFilm(query) {
        if (query === '') {
            return [];
        }
        const { films } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return films.filter(film => film.key.search(regex) >= 0);
    }
    openDraw = () => {
        this.props.navigation.openDrawer()
    }

    async componentWillMount() {
        const value = await AsyncStorage.getItem('id');
        await this.props.SETDATA(value);
        await this.props.SETSHOP(value);
        await this.props.SETSHOPKEYS(value);

    }
    getListViewItem = (item) => {
        this.props.navigation.navigate('ServicesType', { 'itemName': item.key })
    }
    search() {
        if (this.state.query) {
            if (this.state.query.trim()) {
                let obj = this.state.category.find(o => o.key === this.state.query);
                if (obj != undefined) {
                    this.props.navigation.navigate('ServicesType', { 'itemName': this.state.query })
                } else {
                    this.props.navigation.navigate('ShowCategory', { from: this.state.query })
                }
                this.setState({ query: '' });
            } else {
                alert('Invalid Text')
                this.setState({ query: '' });

            }
        } else {
            alert('Invalid Text')
            this.setState({ search: '' });
        }
    }
    render() {
        const { query } = this.state;
        const film = this.findFilm(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        if (this.props.USERDATA != undefined && this.props.USERDATA.State != '') {
            return (
                <View>
                    <View style={{ width: '100%', height: '100%', backgroundColor: '#FFA500' }}>
                        <View>
                            <Card style={{ margin: '1%', height: 50, padding: 8, }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => { this.openDraw() }} style={{ position: 'absolute', left: 0 }}>
                                        <Image source={require('../Assests/DrawerImages/menu.png')} style={{ width: 30, height: 30 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.search() }} style={{ position: 'absolute', right: '1%' }}>
                                        <Image source={require('../Assests/DrawerImages/search.png')} style={{ width: 30, height: 30 }} />
                                    </TouchableOpacity>

                                </View>
                            </Card>

                        </View>
                        <View style={{ flex: 1, margin: '1%', marginLeft: '-1%' }}>
                            <FlatList
                                data={this.state.category}
                                numColumns={2}
                                renderItem={({ item }) =>
                                    <Card style={{
                                        backgroundColor: 'white',
                                        width: '48%',
                                        padding: '3%',
                                        marginLeft: '2%',
                                        marginBottom: '2%',
                                    }}>
                                        <TouchableOpacity onPress={this.getListViewItem.bind(this, item)}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: 'column'
                                                }}>
                                                <View style={{ alignSelf: 'center' }}>
                                                    <Image source={item.images}
                                                        style={{
                                                            resizeMode: 'stretch',
                                                            width: Dimensions.get('screen').width / 2.5,
                                                            height: Dimensions.get('screen').height / 6,
                                                            borderRadius: 20
                                                        }} />
                                                </View>
                                                <View style={{ flex: 1, marginTop: '4%' }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            fontStyle: 'italic',
                                                            color: 'black',
                                                            alignSelf: 'center',
                                                            marginLeft: 10,
                                                            flexShrink: 1
                                                        }}>
                                                        {item.key}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </Card>
                                }
                            />
                        </View>
                    </View>
                    <View style={{ position: 'absolute', width: '89%', top: 7, marginLeft: '2.5%' }}>
                        <Autocomplete
                            listContainerStyle={{
                                width: '80%',
                                marginLeft: '16%',
                                marginBottom: 2,
                            }}
                            listStyle={{ borderWidth: 1 }}
                            inputContainerStyle={{ borderWidth: 2, borderColor: 'black', width: '83%', marginLeft: '11%' }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            defaultValue={query}
                            data={film.length === 1 && comp(query, film[0].key) ? [] : film}
                            onChangeText={text => this.setState({ query: text })}
                            placeholder="Search Here....."
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => this.setState({ query: film[index].key })}>
                                    <Text style={{
                                        alignSelf: 'flex-end',
                                        fontSize: 15,
                                        paddingVertical: 3
                                    }}>
                                        {film[index].key}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View >
                </View>
            );
        } else {
            return (
                <View>
                    <View style={{
                        backgroundColor: 'rgba(100,100,100,0.5)',
                        height: '130%',
                    }}>
                        <View style={{
                            alignItems: 'center',
                            backgroundColor: "#fff",
                            height: 100,
                            paddingVertical: 10,
                            margin: '3%',
                            marginTop: '90%',
                            borderRadius: 10,
                            borderWidth: 1,
                            flexDirection: 'row',
                            borderColor: 'black',
                            justifyContent: 'space-around'
                        }}>

                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: Dimensions.get('window').height / 40
                            }}>Data is Fetching</Text>
                            <View style={{ alignSelf: 'center', marginLeft: '-40%', marginTop: '3%' }}>
                                <ColorDotsLoader size={8} betweenSpace={10}
                                    color1={"black"}
                                    color2={'#fc0303'}
                                    color3={'#32e63e'} />
                            </View>
                        </View>
                    </View>
                </View >
            );
        }
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },

});

function mapStateToProps(state) {
    return {
        ...state
    }
}
const HomeComponent = connect(mapStateToProps, { ...actions })(Home)
export default HomeComponent;