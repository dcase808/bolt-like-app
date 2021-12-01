import { List, Heading, Box, NativeBaseProvider, Center, Button} from 'native-base';
import React from 'react'
import { Text, View, Alert} from 'react-native'

const Promocje = () => {

    return (
        <NativeBaseProvider>
        <View>
             <Box w="70%">
        <Heading fontSize={24}>Aktualne Promocje</Heading>
        <List spacing={2} my={2}>
            <List.Item>Promocja 1</List.Item>
            <List.Item>Promocja 2</List.Item>
        </List>
        </Box>
            <Text>
                <Center>
            <Button
                    onPress={()=>{
                        Alert.alert("Dodaj promocję")
                        }}
                >
                    Dodaj promocję
                </Button>
                </Center>
            </Text>
        </View>
        </NativeBaseProvider>
    )
}

export default Promocje