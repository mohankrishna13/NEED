import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import 'react-native-gesture-handler';
import Login from './scriptsFiles/Login'
import Signup from './scriptsFiles/Signup';
import Dashboard from './scriptsFiles/Dashboard'
import Splash from './scriptsFiles/SplashScreen';
import ChangePassword from './scriptsFiles/ChangePassword';
const AppNavigator = createStackNavigator(
  {
    Login: Login,
    SignUp: Signup,
    Dashboard: Dashboard,
    Splash: Splash,
    forgotPassword:ChangePassword
  },
  {
    initialRouteName: 'Splash',
  }
)

export default createAppContainer(AppNavigator);
