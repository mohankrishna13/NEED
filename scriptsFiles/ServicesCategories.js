import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
class ServicesCategories extends Component {
    state = {
        type: ''
    }
    componentDidMount() {
        let data = this.props.navigation.getParam('itemName', 'Monster')
        data = data.split(' ')
        this.setState({
            type: data[0]
        });

    }
    getListViewItem = (item) => {
        let data = item.key
        this.props.navigation.navigate('ShowCategory', { from: data })
    }
    render() {
        const Food = [
            { key: 'Hotels', images: require('../Assests/Categories/food/Hotel.jpg') },
            { key: 'Restaraunts', images: require('../Assests/Categories/food/Restaraunt.jpg') },
            { key: 'Lodges', images: require('../Assests/Categories/food/Lodges.jpg') },
            { key: 'Resorts', images: require('../Assests/Categories/food/Resorts.jpg') },
            { key: 'Meat', images: require('../Assests/Categories/food/Meat.jpg') },
            { key: 'Fruits', images: require('../Assests/Categories/food/Fruits.jpg') },
            { key: 'sea food', images: require('../Assests/Categories/food/Sea.jpg') },
            { key: 'Vegetables', images: require('../Assests/Categories/food/Vegetables.jpg') },
            { key: 'Others', images: require('../Assests/Categories/food/Other.jpg') },
        ]
        const Agriculture = [
            { key: 'Pests',images: require('../Assests/Categories/agricultureandservices/Pets.jpg') },
            { key: 'Fertilizers',images: require('../Assests/Categories/agricultureandservices/Fertilaizers.jpg') },
            { key: 'Organic',images: require('../Assests/Categories/agricultureandservices/Organic.jpg') },
            { key: 'Seeds',images: require('../Assests/Categories/agricultureandservices/Seeds.jpg') },
            { key: 'Nursuries',images: require('../Assests/Categories/agricultureandservices/Nursuries.jpg') },
            { key: 'Tools and spares',images: require('../Assests/Categories/agricultureandservices/Tools.jpg') },
            { key: 'Others',images: require('../Assests/Categories/agricultureandservices/Others.jpg') },
        ]
        const Electronic = [
            { key: 'Camera', images: require('../Assests/Categories/electricappliancesandservices/Camera.jpg') },
            { key: 'Computers and laptop', images: require('../Assests/Categories/electricappliancesandservices/Computer.jpg') },
            { key: 'Electric and Electronic Spares', images: require('../Assests/Categories/electricappliancesandservices/Electrical.jpg') },
            { key: 'Fridge', images: require('../Assests/Categories/electricappliancesandservices/Fridge.jpg') },
            { key: 'Home Electric Appliances', images: require('../Assests/Categories/electricappliancesandservices/Home.jpg') },
            { key: 'Kitchen', images: require('../Assests/Categories/electricappliancesandservices/Kitchen.jpg') },
            { key: 'Tv', images: require('../Assests/Categories/electricappliancesandservices/Tv.jpg') },
            { key: 'Washing Machine', images: require('../Assests/Categories/electricappliancesandservices/Washing.jpg') },
            { key: 'Others', images: require('../Assests/Categories/electricappliancesandservices/Other.jpg') },
        ]
        const Construction = [
            { key: 'Cement', images: require('../Assests/Categories/constructionandservices/Cement.jpg') },
            { key: 'Steel and iron Suppliers', images: require('../Assests/Categories/constructionandservices/Iron.jpg') },
            { key: 'Hydra', images: require('../Assests/Categories/constructionandservices/Hydra.jpg') },
            { key: 'Cranes', images: require('../Assests/Categories/constructionandservices/Cranes.jpg') },
            { key: 'Manlift', images: require('../Assests/Categories/constructionandservices/Manlift.jpg') },
            { key: 'Forklifts', images: require('../Assests/Categories/constructionandservices/Forklift.png') },
            { key: 'jcb', images: require('../Assests/Categories/constructionandservices/Jcb.jpg') },
            { key: 'Trucks', images: require('../Assests/Categories/constructionandservices/Trucks.jpg') },
            { key: 'Tractors', images: require('../Assests/Categories/constructionandservices/Tractor.jpg') },
            { key: 'Mini auto', images: require('../Assests/Categories/constructionandservices/Mini.png') },
            { key: 'Eichers and Lorries', images: require('../Assests/Categories/constructionandservices/Lorries.jpg') },
            { key: 'Water Suppliers', images: require('../Assests/Categories/constructionandservices/Water.jpg') },
            { key: 'Sand', images: require('../Assests/Categories/constructionandservices/Sand.jpg'), },
            { key: 'Paints', images: require('../Assests/Categories/constructionandservices/Paint.jpg') },
            { key: 'Others', images: require('../Assests/Categories/constructionandservices/Other.jpg') },
        ]
        const Beauty = [
            { key: 'Saloons',images:require('../Assests/Categories/beautyandservices/Saloon.jpg'), },
            { key: 'beauty Parlour',images:require('../Assests/Categories/beautyandservices/Beauty.jpg'), },
            { key: 'Cosmotics',images:require('../Assests/Categories/beautyandservices/Cosmotics.jpg'), },
            { key: 'Ladies Corneres',images:require('../Assests/Categories/beautyandservices/Corner.jpg'), },
            { key: 'Clothing',images:require('../Assests/Categories/beautyandservices/Clothing.jpg'), },
            { key: 'Massage Centers',images:require('../Assests/Categories/beautyandservices/Massage.jpg'), },
        ]

        const Pets = [
            { key: 'Animals',images:require('../Assests/Categories/pets/Animals.png'), },
            { key: 'Birds',images: require('../Assests/Categories/pets/Birds.jpg'), },
            { key: 'Aqua',images: require('../Assests/Categories/pets/Aqua.jpg'), },
            { key: 'Others',images :require('../Assests/Categories/pets/Other.jpg'),},
        ]
        const Automobile = [
            { key: 'Automobile Repair',images:require('../Assests/Categories/automobileandservices/Repair.jpg'), },
            { key: 'Bike and car Spares',images:require('../Assests/Categories/automobileandservices/Spare.jpg') },
            { key: 'Hydraulic Traders',images:require('../Assests/Categories/automobileandservices/Traders.jpg'), },
            { key: 'Rented Vehicles',images:require('../Assests/Categories/automobileandservices/Rent.jpg'), },
            { key: 'Lubricants',images: require('../Assests/Categories/automobileandservices/Lubricant.png'),},
            { key: 'Petrol and Diesel' ,images:require('../Assests/Categories/automobileandservices/Petrol.jpg'),},
            { key: 'Vehicle Transport',images: require('../Assests/Categories/automobileandservices/Transport.jpg'),},
            { key: 'Others',images:require('../Assests/Categories/automobileandservices/Other.jpg'), },
        ]
        const Technology = [
            { key: 'Mobiles' ,images:require('../Assests/Categories/technologyandservices/Mobiles.jpg'),},
            { key: 'Laptops',images: require('../Assests/Categories/technologyandservices/Laptops.jpg'),},
            { key: 'Computers',images: require('../Assests/Categories/technologyandservices/Computer.jpg'),},
            { key: 'Sound Systems',images:require('../Assests/Categories/technologyandservices/Sound.jpg'), },
            { key: 'HardWares',images: require('../Assests/Categories/technologyandservices/Hardware.jpg'), },
            { key: 'Softwares' ,images:require('../Assests/Categories/technologyandservices/Softwares.jpg'),},
            { key: 'Pendrives/cd/dvd',images:require('../Assests/Categories/technologyandservices/Pendrives.jpg'), },
            { key: 'Electronic Technologies' ,images: require('../Assests/Categories/technologyandservices/Electrical.jpg'),},
            { key: 'Others',images:require('../Assests/Categories/technologyandservices/Other.jpg') },
        ]
        const Daily = [
            { key: 'Plumber', images: require('../Assests/Categories/dailyworksandneeds/Plumber.png') },
            { key: 'Carpenter', images: require('../Assests/Categories/dailyworksandneeds/Carpenter.jpg') },
            { key: 'Tailor', images: require('../Assests/Categories/dailyworksandneeds/Tailor.jpg') },
            { key: 'Moter Repair', images: require('../Assests/Categories/dailyworksandneeds/Motor.jpg') },
            { key: 'General Sores', images: require('../Assests/Categories/dailyworksandneeds/General.jpg') },
            { key: 'Drivers', images: require('../Assests/Categories/dailyworksandneeds/Drivers.jpg') },
            { key: 'Internet Cafe', images: require('../Assests/Categories/dailyworksandneeds/Internet.jpg') },
            { key: 'Welding', images: require('../Assests/Categories/dailyworksandneeds/Welding.jpg') },
            { key: 'Turning and Lathe', images: require('../Assests/Categories/dailyworksandneeds/Turning.jpg') },
            { key: 'Hdpe Sheets', images: require('../Assests/Categories/dailyworksandneeds/Sheets.jpg'), },
            { key: 'Water Plants', images: require('../Assests/Categories/dailyworksandneeds/Water.jpg'), },
            { key: 'Furniture', images: require('../Assests/Categories/dailyworksandneeds/Furniture.jpg'), },
            { key: 'Nursury', images: require('../Assests/Categories/dailyworksandneeds/Nursury.jpg'), },
            { key: 'Suppliers', images: require('../Assests/Categories/dailyworksandneeds/Suppliers.jpg'), },
            { key: 'Doctors', images: require('../Assests/Categories/dailyworksandneeds/Doctors.jpg'), },
            { key: 'Medicals', images: require('../Assests/Categories/dailyworksandneeds/Medicals.jpg'), },
            { key: 'PhotoShop', images: require('../Assests/Categories/dailyworksandneeds/Photo.jpg'), },
            { key: 'Stationary', images: require('../Assests/Categories/dailyworksandneeds/Stationary.jpg'), },
            { key: 'Quarium', images: require('../Assests/Categories/dailyworksandneeds/Quarium.png'), },
            { key: 'Clocks and Watches', images: require('../Assests/Categories/dailyworksandneeds/Clocks.jpg'), },
            { key: 'Shoe Mart', images: require('../Assests/Categories/dailyworksandneeds/Shoe.jpg'), },
            { key: 'Drinks', images: require('../Assests/Categories/dailyworksandneeds/Drinks.jpg'), },
            { key: 'Others', images: require('../Assests/Categories/dailyworksandneeds/Other.jpg'), },
        ]
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: '#FFA500' }}>
                <View style={{
                    height: 50, margin: '1%',
                }}>
                    <Card containerStyle={{ margin: '1%', padding: 8, borderWidth: 2, borderColor: 'black' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ height: 50, alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ position: 'absolute', left: 0 }}>
                                    <Image source={require('../Assests/DrawerImages/left-arrow.png')}
                                        style={{ width: 40, height: 40, marginTop: 3 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignSelf: 'center', marginLeft: '20%', }}>
                                <Text style={{ fontSize: 20 }}>{this.props.navigation.getParam('itemName', 'Monster')}</Text>
                            </View>
                        </View>
                    </Card>
                </View>
                <View style={{ flex: 1, marginLeft: '1%', marginRight: '1%', marginTop: '3%' }}>
                    <FlatList
                        numColumns={2}
                        data={this.state.type === 'Electronic' ? Electronic :
                            this.state.type === 'Automobile' ? Automobile :
                                this.state.type === 'Daily' ? Daily :
                                    this.state.type === 'Agriculture' ? Agriculture :
                                        this.state.type === 'Food' ? Food :
                                            this.state.type === 'Technology' ? Technology :
                                                this.state.type === 'Construction' ? Construction :
                                                    this.state.type === 'Infrastructure' ? Infrastructure :
                                                        this.state.type === 'Beauty' ? Beauty :
                                                            this.state.type === 'Pets' ? Pets : Electronic}
                        renderItem={({ item }) =>
                            <Card
                                containerStyle={
                                    {
                                        margin: '2%',
                                        width: '46%',
                                        marginTop: '3%',
                                        marginBottom: '2%',
                                        backgroundColor: 'white',
                                    }
                                }>
                                <TouchableOpacity onPress={this.getListViewItem.bind(this, item)}>
                                    <View
                                        style={{
                                            flexDirection: 'column'
                                        }}>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Image source={item.images}
                                                style={{
                                                    resizeMode:'stretch',
                                                    width:Dimensions.get('screen').width/2.5,
                                                    height: Dimensions.get('screen').height /6,
                                                    borderRadius: 20
                                                }} />
                                        </View>
                                        <View style={{
                                            flex: 1, marginTop: '10%',
                                        }}>
                                            <Text
                                                style={{
                                                    fontSize: Dimensions.get('window').width / 20,
                                                    fontStyle: 'italic',
                                                    color: 'black',
                                                    alignSelf: 'center',
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
        );
    }
}

export default ServicesCategories;