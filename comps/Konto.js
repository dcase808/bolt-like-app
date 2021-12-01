import React from 'react'
import { Text, View, Button, Alert} from 'react-native'
import { NativeBaseProvider } from 'native-base'



const Konto = () => {

    return (
        <NativeBaseProvider>
            <View>
                <Text>
                    Nazwa Konta  {'\n'}
                <Button
                    onPress={()=>{
                        Alert.alert("Zmiana hasla")
                        }}
                    style={{ width: 320, marginTop: 15 }}
                >
                    Zmien haslo
                </Button>
                </Text>
            </View>
        </NativeBaseProvider>
    )
}

export default Konto