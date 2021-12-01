import { NativeBaseProvider, Button, Input } from 'native-base'
import React from 'react'
import { Text, View, Alert } from 'react-native'

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

const ZamowPrzejazd = () => {

    return (
        <NativeBaseProvider>
        <View>
            <Text>Podaj Adres</Text>
            <Input1 placeholder="adres"/>
            <Button
                    onPress={()=>{
                        Alert.alert("Zamowiono przejazd")
                        }}
                >
                    Zamów przejazd
                </Button>
        </View>
        </NativeBaseProvider>
    )
}

export default ZamowPrzejazd