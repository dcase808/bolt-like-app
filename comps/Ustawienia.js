import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeBaseProvider, Button } from 'native-base'

import ONas from './ONas'
import Konto from './Konto'

const Tab = createBottomTabNavigator()


const Ustawienia = (props) => {

    return (
        <NativeBaseProvider>
                <Tab.Navigator
          initialRouteName="Konto"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              size = 28
              if(route.name === 'Konto')
                return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color="black" />
              else if(route.name === 'O nas')
                return <Ionicons name={focused ? 'alert-circle' : 'alert-circle-outline'} size={size} color="black" />
                
            }
          })}
        >
            <Tab.Screen options={{ tabBarActiveTintColor: 'white', tabBarActiveBackgroundColor: '#3489eb',tabBarInactiveTintColor: 'black'}} name="Konto" component={() => <Konto setIsLogged={props.setIsLogged} login={props.login} /> } />
            <Tab.Screen options={{ tabBarActiveTintColor: 'white', tabBarActiveBackgroundColor: '#3489eb',tabBarInactiveTintColor: 'black'}} name="O nas" component={ONas}/>
            
        </Tab.Navigator>
        </NativeBaseProvider>
    )
}

export default Ustawienia
