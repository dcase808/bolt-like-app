import { List, Heading, Box, NativeBaseProvider, Center, FlatList, useToast, Button} from 'native-base';
import React, { useState, useEffect } from 'react'
import { Text, View} from 'react-native'

const HistoriaPrzejazdow = () => {

    const [history, setHistory] = useState([]);

    const toast = useToast();

    const getHistory = async () => {
        try {
         const response = await fetch('http://192.168.0.19:3000/historia');
         const json = await response.json();
            if(history.length > 0)
            {
                setHistory([]);
            }
            for (let i = 0; i < json.length; i++)
            {
                let id = eval(JSON.stringify(json[i].id))
                let location = eval(JSON.stringify(json[i].location))
                let destination = eval(JSON.stringify(json[i].destination))
                let temp = { id, location, destination }
                setHistory(history => [...history, temp]);
            }
            toast.show({
                description: "Zaktualizowano listę zakończonych przejazdów",
            })
       } catch (error) {
         console.error(error);
         toast.show({
            description: "Błąd w pobieraniu listy zakończonych przejazdów",
        })
       }
     }
     useEffect(() => {
        getHistory();
    }, []);
    return (
            <NativeBaseProvider>
            <View>
                <Center>
                <Box w="70%">
                    <Center>
            <Heading fontSize={24}>Historia przejazdów</Heading>
            <FlatList 
                data={history}
                renderItem={({ item }) => (
                <View style={{ height: 40, flexDirection: 'row' }}>
                <View >
                    <Text>Z: {item.location}</Text>                        
                    <Text>Do: {item.destination}</Text>
                </View>

                </View>
                )}/>
                            <Button 
                        onPress={()=>{
                            getHistory();
                            }}
                            style={{height: 30, backgroundColor: '#3489eb', width: 320, margintop: 15}}
                    >
                        Pobierz liste przejazdów
                </Button>
                </Center>
            </Box>

            </Center>
            </View>
            </NativeBaseProvider>
    )
}

export default HistoriaPrzejazdow
