import React from 'react'
import { Text, View, Alert} from 'react-native'
import { NativeBaseProvider, Button, Center } from 'native-base'



const Konto = () => {

    return (
        <NativeBaseProvider>
            <View>
                <Center>
                <Text>
                    Nazwa Konta
                </Text>
                </Center>
                <Center>
                <Button
                    onPress={()=>{
                        Alert.alert("Zmiana hasla")
                        }}
                >
                    Zmien haslo
                </Button>
                </Center>
                <Center>
                <Button
                    onPress={()=>{
                        Alert.alert("Wyloguj")
                        }}
                >
                    Wyloguj
                </Button>
                </Center>
            </View>
        </NativeBaseProvider>
    )
}

export default Konto