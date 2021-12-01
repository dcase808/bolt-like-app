import { List, Heading, Box, NativeBaseProvider} from 'native-base';
import React from 'react'
import { Text, View, Button, Center} from 'react-native'

const Promocje = () => {

    return (
        <NativeBaseProvider>
        <View>
             <Box w="70%">
        <Heading fontSize={24}>Lista promocji</Heading>
        <List spacing={2} my={2}>
            <List.Item>Promocja 1</List.Item>
            <List.Item>Promocja 2</List.Item>
            <List.Item>Promocja 3</List.Item>
            <List.Item>Promocja 4</List.Item>
        </List>
        </Box>
            <Text>
                dodaj Kod
            </Text>
        </View>
        </NativeBaseProvider>
    )
}

export default Promocje
