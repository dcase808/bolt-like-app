import React, { useState } from 'react'
import { Alert, Text } from 'react-native'
import { Input, Center, Box, Button } from "native-base"

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

const LoginScreen = ({ navigation }) => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [isLogged, setIsLogged] = useState(false)

    if(!isLogged)
        return (
            <Box>
                <Center>
                    <Input1 placeholder="Login" value={login} onChangeText={setLogin} />
                    <Input1 placeholder="Haslo" hide value={pass} onChangeText={setPass} />
                    <Button 
                        onPress={() => {
                            if(login === 'login' && pass === 'pass')
                                setIsLogged(true)
                            else
                                Alert.alert("Błędne dane")
                        }}
                        style={{ width: 320, marginTop: 15 }}    
                    >
                        Zaloguj
                    </Button>
                </Center>
            </Box>
        )
    else
        return (
            <Box>
                <Center>
                    <Text>
                        ZALOGOWANO
                    </Text>
                </Center>
            </Box>
        )
}

export default LoginScreen