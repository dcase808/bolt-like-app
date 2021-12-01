import { List, Heading, Box, NativeBaseProvider} from 'native-base';
import React from 'react'
import { Text, View, Button, Center} from 'react-native'

const Platnosci = () => {

    return (
        <NativeBaseProvider>
        <View>
             <Box w="70%">
        <Heading fontSize={24}>Aktualne Płatności</Heading>
        <List spacing={2} my={2}>
            <List.Item>Karta</List.Item>
            <List.Item>Gotówka</List.Item>
            <List.Item>Paypal</List.Item>
            <List.Item>Blik</List.Item>
        </List>
        </Box>
            <Text>
                dodaj Platnosci guzik
            </Text>
        </View>
        </NativeBaseProvider>
    )
}

export default Platnosci