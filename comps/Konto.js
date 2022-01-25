import React from 'react'
import { Text, View, Alert} from 'react-native'
import { NativeBaseProvider, Button, Center, Box } from 'native-base'

const Konto = (props) => {

    return (
        <NativeBaseProvider>
            <View>
                <Center>
                    <Box w="70%">
                        <Center>
                <Text>
                    Witaj, {props.login}!
                </Text>
                
                <Button
                    onPress={()=>{
                        props.setIsLogged(false);
                        }}
                        style={{backgroundColor:'#3489eb', width: 320, margintop: 15}}
                >
                    
                    Wyloguj
                </Button>
                </Center>
                </Box>
                </Center>
            </View>
        </NativeBaseProvider>
    )
}

export default Konto
