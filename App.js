import React, { useState, Provider} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Box, Button, Center, NativeBaseProvider, Heading, Input} from 'native-base'


import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import LoginScreen from './comps/LoginScreen'
import Zamow from './comps/ZamowPrzejazd'
import Historia from './comps/HistoriaPrzejazdow'
import Samochody from './comps/Samochody'
import ONas from './comps/ONas'
import Promocje from './comps/Promocje'
import Platnosci from './comps/Platnosci'
import Konto from './comps/Konto'

import './global.js'


const Tab = createBottomTabNavigator()

export const Input1 = ({ placeholder, hide, onChangeText, value }) => {
  return (
    <Input
      type={hide ? 'password' : 'text'}
      mx="3"
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      w={{
        base: "75%",
        md: "25%",
      }}
    />
  )
}


export default function App() {
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [isLogged, setIsLogged] = useState(false)

  if(isLogged)
  {
    return (

      <NativeBaseProvider>
      <NavigationContainer>       
        <Tab.Navigator
          initialRouteName="ZamowPrzejazd"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              size = 28
              if(route.name === 'Zamow')
                return <Ionicons name={focused ? 'navigate' : 'navigate-outline'} size={size} color="black" />
              else if(route.name === 'Login')
                return <Ionicons name={focused ? 'log-in' : 'log-in-outline'} size={size} color="black" />
              else if(route.name === 'Historia')
                return <Ionicons name={focused ? 'book' : 'book-outline'} size={size} color="black" />
              else if(route.name === 'Samochody')
                return <Ionicons name={focused ? 'car' : 'car-outline'} size={size} color="black" />
              else if(route.name === 'O nas')
                return <Ionicons name={focused ? 'alert-circle' : 'alert-circle-outline'} size={size} color="black" />
              else if(route.name === 'Promocje')
                return <Ionicons name={focused ? 'flag' : 'flag-outline'} size={size} color="black" />
              else if(route.name === 'Platnosci')
                return <Ionicons name={focused ? 'card' : 'card-outline'} size={size} color="black" />
              else if(route.name === 'Konto')
                return <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color="black" />
 
            }
          })}
        >
          <Tab.Screen
            name="Zamow"
            component={Zamow}
          />
          <Tab.Screen
          name="Historia"
          component={Historia}
          />
           <Tab.Screen
          name="Samochody"
          component={Samochody}
          />
           <Tab.Screen
          name="Promocje"
          component={Promocje}
          />
           <Tab.Screen
          name="Platnosci"
          component={Platnosci}
          />
           <Tab.Screen
          name="Konto"
          component={Konto}
          />
          <Tab.Screen
          name="O nas"
          component={ONas}
          />
        
        </Tab.Navigator>
   </NavigationContainer>
 
    </NativeBaseProvider>
    );
  }
  else
  {
    return (
      <NativeBaseProvider>
        <Center>
          <Box safeArea p="2" py="8" w="90%" maxW="290">
            <Center><Heading>Zaloguj się</Heading></Center>
              <Center>
                <Input1 placeholder="Login" value={login} onChangeText={setLogin} />
                <Input1 placeholder="Haslo" hide value={pass} onChangeText={setPass} />
                  <Button 
                    onPress={() => {
                      if(login === 'login' && pass === 'pass')
                      {
                        setIsLogged(true)
                      }
                      else
                        Alert.alert("Błędne dane")
                        }}
                      style={{ width: 320, marginTop: 15 }}    
                    >
                    Zaloguj
                  </Button>
              </Center>
          </Box>
        </Center>
      </NativeBaseProvider>
    )
  }
}

