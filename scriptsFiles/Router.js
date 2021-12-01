import { createAppContainer, StackRouter } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import Profile from './Profile';
import Home from './Home';
import Sidebar from './Sidebar';
import React, { Component } from 'react'
import { Image } from 'react-native';
import Feedback from './Feedback';
import Follow from './Follow';
import Share from './Share';
import Policy from './Policy';
import MyShop from './ShopDetails';
import HeaderDrawer from './HeaderDrawer';
import Another from './ScreenExternal';
import ServicesCategories from './ServicesCategories';
import Chats from './Chats';
import ProfileImage from './ProfileImage';
import ChangePassword from './ChangePassword';
import ShowCategory from './ShowCategories';
import ShowDetails from './showDetailsToUser';
import AddShop from './AddShop';


const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
    params: { USERID: "Monster" },
    navigationOptions: {
      title: Home,
      drawerIcon: () => <Image source={require('../Assests/DrawerImages/home.png')} style={{ width: 20, height: 20, marginLeft: '8%' }} />
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: Profile,
      drawerIcon: () => <Image source={require('../Assests/DrawerImages/user.png')} style={{ width: 20, height: 20, marginLeft: '8%' }} />
    }
  },
  Shop: {
    screen: MyShop,
    navigationOptions: {
      title: 'MyShop',
      drawerIcon: () => <Image source={require('../Assests/DrawerImages/store.png')}
        style={{ width: 20, height: 20, marginLeft: '8%' }} />
    }
  },
  Feedback: {
    screen: Feedback,
    navigationOptions: {
      title: 'Feedback',
      drawerIcon: () => <Image source={require('../Assests/DrawerImages/Feedback.png')} style={{ width: 20, height: 20, marginLeft: '8%' }} />
    }
  },
  /*Share: {
    screen: Share,
    navigationOptions: {
      title: 'Share App',
      drawerIcon: () => <Image source={require('../Assests/DrawerImages/share.png')} style={{ width: 20, height: 20, marginLeft: '8%' }} />
    }
  },*/
  Follow: {
    screen: Follow,
    navigationOptions: {
      title: 'Follow Us',
      drawerIcon: () => <Image source={require('../Assests/DrawerImages/follow.png')} style={{ width: 20, height: 20, marginLeft: '8%' }} />
    }
  },
  Policy: {
    screen: Policy,
    navigationOptions: {
      title: 'Privacy Policy',
      drawerIcon: () => <Image source={require('../Assests/DrawerImages/privacy.png')} style={{ width: 20, height: 20, marginLeft: '8%' }} />
    }
  },
  

}, {
  contentComponent: props => <Sidebar{...props} />
}

);

const DrawerNavigatorExample = createStackNavigator({
  Drawer: {
    screen: DrawerNavigator,
    navigationOptions: { header: <HeaderDrawer /> }
  },
  LogoutScreen: {
    screen: Another,
  },
  ServicesType: {
    screen: ServicesCategories,
  },
  ProfileImage: {
    screen: ProfileImage,
  },
  ChangePassword: {
    screen: ChangePassword
  },
  ShowCategory:{
    screen:ShowCategory
  },
  showDetails:{
    screen:ShowDetails
  },
  AddShop:{
    screen:AddShop
  }

});

export default createAppContainer(DrawerNavigatorExample);