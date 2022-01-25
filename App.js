import React, { useState, Provider} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Box, Button, Center, NativeBaseProvider, Heading, Input, useToast} from 'native-base'


import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import Przejazdy from './comps/Przejazdy'
import Finanse from './comps/Finanse'
import Ustawienia from './comps/Ustawienia'


import './global.js'



const Drawer = createDrawerNavigator()

export const Input1 = ({ placeholder, hide, onChangeText, value }) => {
  return (
    <Input
      type={hide ? 'password' : 'text'}
      mx="3"
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      style={{ width: 320, margintop: 15}}
    />
  )
}


export default function App() {
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [isLogged, setIsLogged] = useState(true)

  const toast = useToast();

    const loginFunc = async () => {
      try {
       const response = await fetch('http://192.168.0.19:3000/konta');
       const json = await response.json();
          for (let i = 0; i < json.length; i++)
          {
              let loginJson = eval(JSON.stringify(json[i].login));
              let passJson = eval(JSON.stringify(json[i].haslo));
              if(login === loginJson && pass === passJson)
              {
                setIsLogged(true);
              }
              else
              {
                toast.show({
                  description: "Błędne dane logowania, spróbuj ponowanie",
                })
                console.log("Login wpisany: " + login + " Login w bazie" + loginJson)
                console.log("Haslo wpisane: " + pass + " haslo w bazie" + passJson)
              }
          }
     } catch (error) {
       console.error(error);
       toast.show({
          description: "Błąd w komunikacji z serwerem, spróbuj ponownie później",
      })
     }
   }
  const registerFunc = () =>
  {
    if(pass.length > 5)
    {
      setLoginList(loginList => [...loginList, login + " " + pass])
      toast.show({
        description: "Zarejestrowano, zaloguj się używając swoich danych",
      })
      setLogin("")
      setPass("")
    }
    else
    {
      toast.show({
        description: "Wprowadź co najmniej 5 znakowe hasło",
      })
    }

  }

  const UstawieniaWithProps = props => (
    <Ustawienia setIsLogged={setIsLogged} login={login}/>
  );
  

  if(isLogged)
  {
    return (

      <NavigationContainer> 
        <Drawer.Navigator initialRouteName="Przejazdy">
          <Drawer.Screen options={{ headerStyle: {backgroundColor: '#3489eb'}, headerTintColor:'white', }} name="Przejazdy" component={Przejazdy}/>
          <Drawer.Screen options={{ headerStyle: {backgroundColor: '#3489eb'}, headerTintColor:'white', }} name="Finanse" component={Finanse}/>
          <Drawer.Screen options={{ headerStyle: {backgroundColor: '#3489eb'}, headerTintColor:'white', }} name="Ustawienia" component={UstawieniaWithProps} />
        </Drawer.Navigator> 
        </NavigationContainer> 
      
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
                            loginFunc();
                        }}
                        style={{ width: 320, marginTop: 15 }}    
                    >
                        Zaloguj
                    </Button>
                    <Button 
                        onPress={() => {
                            registerFunc();
                        }}
                        style={{ width: 320, marginTop: 15 }}    
                    >
                        Zarejestruj
                    </Button>
                </Center>
        </Box>
        </Center>
      </NativeBaseProvider>
    )
  }
}