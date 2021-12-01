import { List, Heading, Box, NativeBaseProvider} from 'native-base';
import React from 'react'
import { Text, View, Button, Center} from 'react-native'

const Samochody = () => {

    return (
        <NativeBaseProvider>
        <View>
             <Box w="70%">
        <Heading fontSize={24}>Dostępne samochody</Heading>
        <List spacing={2} my={2}>
            <List.Item>Samochód 1</List.Item>
            <List.Item>Samochód 2</List.Item>
            <List.Item>Samochód 3</List.Item>
            <List.Item>Samochód 4</List.Item>
        </List>
        </Box>
        </View>
        </NativeBaseProvider>
    )
}

export default Samochody