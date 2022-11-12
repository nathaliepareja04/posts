import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { colors } from "../config/colors.js"
import { SPACING } from "../config/spacing.js"
import DetailScreen from "../screen/DetailScreen.jsx"
import PostActionScreen from "../screen/PostActionScreen.jsx"
import PostScreen from "../screen/PostScreen.jsx"

const Stack=createNativeStackNavigator()

export const Navigation=()=>{
    return(
        <Stack.Navigator screenOptions={{
            headerShown:false,
            contentStyle:{
                paddingHorizontal: SPACING*2,
                flex:1,
                backgroundColor: colors.black
            }}}>
            <Stack.Screen name="HomeScreen" component={PostScreen}/>
            <Stack.Screen name="DetailScreen" component={DetailScreen}/>
            <Stack.Screen name="PostActionScreen" component={PostActionScreen}/>
        </Stack.Navigator>
    )
}
