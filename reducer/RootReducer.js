import { ActionSheetIOS } from "react-native"
//Initial State of our state
const intialState = {
    isLoading:false,
    LoginStatues:'',
    SHOPKEYS:[],
    SHOP: [{
        shopName: '',
        shopCategory: '',
        shopSubCategory: '',
        shopAddress: '',
        shopCity: '',
        shopMandal: '',
        shopDistrict: '',
        shopState: '',
        shopImage: {},
        shopNumber:'',
        shopAlter:'',

    }],
    USERDATA: {
        email: '',
        first: '',
        id: '',
        last: '',
        mobile: '',
        mandal: '',
        district: '',
        State: '',
        alternate: '',
        shop: '',
        address: '',
        shop: {
        }

    }

}
const RootReducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SETDATA':
            return {
                ...state,
                USERDATA: { ...action.payload },
                isLoading:false,
            }
        case 'UPDATEPIC': {
            return {
                ...state,
                image: action.payload,
                isLoading:false,
            }
        }
        case 'updateName': {
            return {
                ...state,
                first: action.payload
            }
        }
        case 'SHOPKEYS': {
            return {
                ...state,
                SHOPKEYS: action.payload
            }
        }
        case 'updateLast': {
            return {
                ...state,
                last: action.payload
            }
        }
        case 'updateNumber': {
            return {
                ...state,
                mobile: action.payload
            }
        }
        case 'CreateShop':{
            return {
                ...state,
            isLoading:false
            }
        }
        case 'deleteShop':{
            return{
                ...state,
                isLoading:false
            }
        }
        case 'updateAddress': {
            return {
                ...state,
                address: action.payload
            }
        }
        case 'isLoading':{
            return{
                ...state,
                isLoading:true
            }
        }
        case 'updateState': {
            return {
                ...state,
                State: action.payload
            }
        }
        case 'updateDistrict': {
            return {
                ...state,
                district: action.payload
            }
        }
        case 'updateShop': {
            return {
                ...state,
                shop:{...action.payload},
                isLoading:false,
            }
        }
        case 'shopImage': {
            return {
                ...state,
                shopImage: action.payload,
                isLoading:false,
            }
        }
        case 'SETSHOP': {
            return {
                ...state,
                SHOP: action.payload 
            }
        }
        case 'shopImage':{
            return{
                ...state,
                shopImage:action.payload,
                isLoading:false,
            }
        }
        case 'Logout':{
            return {...intialState}
        }
        case 'updatePassword':{
            return{
                ...state,
                isLoading:false,
                update:action.payload
            }
        }
        case 'forgotPassword':{
            return{
                ...state,
                isLoading:false,
                forgotPass:action.payload
            }
        }
        case 'Login':{
            return{
                ...state,
                isLoading:false,
                LoginStatus:action.payload
            }
        }
        case 'alternate':{
            return{
                ...state,
                alternate:action.payload
            }
        }
        case 'updateEmail':{
            return{
                ...state,
                isLoading:false,
                isEmailVerified:action.payload,
            }
        }
        case 'suggest':{
            return{
                ...state,
                isLoading:false
            }
        }
    }
}
export default RootReducer;