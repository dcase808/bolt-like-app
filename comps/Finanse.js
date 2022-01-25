import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeBaseProvider } from 'native-base'

import Promocje from './Promocje'
import Platnosci from './Platnosci'

const Tab = createBottomTabNavigator()


const Finanse = () => {

    return (
        <NativeBaseProvider>
                <Tab.Navigator
          initialRouteName="Płatności"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              size = 28
              if(route.name === 'Promocje')
                return <Ionicons name={focused ? 'flag' : 'flag-outline'} size={size} color={focused ? "white":"black"} />
              else if(route.name === 'Płatności')
                return <Ionicons name={focused ? 'card' : 'card-outline'} size={size} color={focused ? "white":"black"} />
            }
          })}
        >
            <Tab.Screen options={{ tabBarActiveTintColor: 'white', tabBarActiveBackgroundColor: '#3489eb',tabBarInactiveTintColor: 'black'}}  name="Płatności" component={Platnosci}/>
            <Tab.Screen options={{ tabBarActiveTintColor: 'white', tabBarActiveBackgroundColor: '#3489eb',tabBarInactiveTintColor: 'black'}}  name="Promocje" component={Promocje}/>
        </Tab.Navigator>
        </NativeBaseProvider>
    )
}

export default Finanse
