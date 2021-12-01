import { List, Heading, Box, NativeBaseProvider} from 'native-base';
import React from 'react'
import { Text, View, Button, Center} from 'react-native'

const HistoriaPrzejazdow = () => {

    return (
        <NativeBaseProvider>
        <View>
             <Box w="70%">
        <Heading fontSize={24}>Historia przejazdów</Heading>
        <List spacing={2} my={2}>
            <List.Item>Przejazd 1</List.Item>
            <List.Item>Przejazd 2</List.Item>
            <List.Item>Przejazd 3</List.Item>
            <List.Item>Przejazd 4</List.Item>
        </List>
        </Box>
        </View>
        </NativeBaseProvider>
    )
}

export default HistoriaPrzejazdow