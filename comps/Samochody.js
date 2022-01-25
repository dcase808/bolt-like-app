import { FlatList, Heading, Box, NativeBaseProvider, Center, Button, useToast} from 'native-base';
import React, { useState, useEffect } from 'react'
import { Text, View} from 'react-native'


const Samochody = () => {

    const [data, setData] = useState([]);

    const toast = useToast();

    const getCars = async () => {
        try {
         const response = await fetch('https://random-data-api.com/api/vehicle/random_vehicle?size=20');
         const json = await response.json();
            if(data.length > 0)
            {
                setData([]);
            }
            for (let i = 0; i < json.length; i++)
            {
                setData(data => [...data, eval(JSON.stringify(json[i].make_and_model))]);
            }
            toast.show({
                description: "Zaktualizowano listę samochodów",
            })
       } catch (error) {
         console.error(error);
         toast.show({
            description: "Błąd w pobieraniu listy samochodów",
        })
       }
     }
    useEffect(() => {
        getCars();
    }, []);
   

    return (
        <NativeBaseProvider>
        <View>
            <Center>
             <Box w="70%">
                 <Center>
        <Heading fontSize={24}>Dostępne samochody</Heading>
        <FlatList 
              data={data}
              renderItem={({ item }) => (
                <Text>{item}</Text>
              )}/>

        <Button
                    onPress={()=>{
                        getCars();
                        }}
                    style={{ backgroundColor: '#3489eb', width: 320, margintop: 15}}
                >
                    Zaktualizuj listę dostępnych samochodów
            </Button>
            </Center>
            </Box>
        </Center>
        </View>
        </NativeBaseProvider>
    )
}

export default Samochody