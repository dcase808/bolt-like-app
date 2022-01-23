import React from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NativeBaseProvider } from 'native-base'

import Zamow from './ZamowPrzejazd'
import Historia from './HistoriaPrzejazdow'
import Samochody from './Samochody'

const Tab = createBottomTabNavigator()


const Przejazdy = () => {

    return (
        <NativeBaseProvider>
                <Tab.Navigator
          initialRouteName="Zamow"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              size = 28
              if(route.name === 'Zamów')
                return <Ionicons name={focused ? 'navigate' : 'navigate-outline'} size={size} color="black" />
              else if(route.name === 'Historia')
                return <Ionicons name={focused ? 'book' : 'book-outline'} size={size} color="black" />
              else if(route.name === 'Samochody')
                return <Ionicons name={focused ? 'car' : 'car-outline'} size={size} color="black" />
            }
          })}
        >
            <Tab.Screen name="Zamów" component={Zamow}/>
            <Tab.Screen name="Historia" component={Historia}/>
            <Tab.Screen name="Samochody" component={Samochody}/>
        </Tab.Navigator>
        </NativeBaseProvider>
    )
}

export default Przejazdy