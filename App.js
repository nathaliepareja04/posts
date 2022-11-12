import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation.jsx';
import { StatusBar } from 'expo-status-bar';
import axios from "axios"

axios.defaults.baseURL="http:10.37.61.149:4000" ,{/*ipconfig*/}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Navigation/>
    </NavigationContainer>
  );
}

