import { NativeBaseProvider, Button, Input, FlatList, useToast, Box, Center, Heading, Modal, FormControl } from 'native-base'
import React, { useState, useEffect } from 'react'
import { Text, View, Alert} from 'react-native'

export const Input1 = ({ placeholder, hide, onChangeText, value }) => {
    return (
      <Input
        type={hide ? 'password' : 'text'}
        mx="3"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    )
  }


const Promocje = () => {
    const [code, setCode] = useState("");
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState([]);

    const toast = useToast();

    const checkCode = async () => {
        try {
         const response = await fetch('http://192.168.0.19:3000/kody_rabatowe');
         const json = await response.json();
            for (let i = 0; i < json.length; i++)
            {
                if (code === "")
                {
                    toast.show({
                        description: "Wprowadź kod rabatowy",
                    })
                    return;
                }                
                let kod = eval(JSON.stringify(json[i].kod))
                let opis = eval(JSON.stringify(json[i].opis))
                if(code === kod)
                {
                    setData(data => [...data, opis])
                    toast.show({
                        description: "Dodano kod rabatowy",
                    });
                    setShowModal(false);
                    return;
                }
                else
                {
                    toast.show({
                        description: "Nieprawidłowy kod rabatowy",
                    });
                }
            }
       } catch (error) {
         console.error(error);
         toast.show({
            description: "Błąd w dodawaniu kodu rabatowego",
        })
       }
     }

    const getRabates = async () => {
        try {
         const response = await fetch('http://192.168.0.19:3000/znizki');
         const json = await response.json();
            if(data.length > 0)
            {
                setData([]);
            }
            for (let i = 0; i < json.length; i++)
            {
                let desc = eval(JSON.stringify(json[i].opis))
                setData(data => [...data, desc]);
            }
            toast.show({
                description: "Pobrano listę rabatów",
            })
       } catch (error) {
         console.error(error);
         toast.show({
            description: "Błąd w pobieraniu listy rabatów",
        })
       }
     }
     useEffect(() => {
        getRabates();
    }, []);

    return (
        <NativeBaseProvider>
        <View>
            <Center>
                <Box w="70%">
                    <Center>
                <Heading fontSize={24}>Aktualne Promocje</Heading>
        
                <Text>
                <FlatList 
                    data={data}
                    renderItem={({ item }) => (
                        <Text>{item}</Text>
                )}/>
                <Text>{'\n'}</Text>
                <Button
                    onPress={() => 
                        setShowModal(true)}
                        style={{backgroundColor:'#3489eb', width: 320, margintop: 15}}
                >
                Dodaj promocję
                </Button>
                
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Dodaj promocję</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                        <FormControl.Label>Podaj kod rabatowy</FormControl.Label>
                        <Input1 placeholder="Kod rabatowy" onChangeText={setCode}/>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                        <Button
                            variant="ghost"
                            colorScheme="blueGray"
                            onPress={() => {
                            setShowModal(false)
                            }}
                        >
                            Anuluj
                        </Button>
                        <Button
                        style={{backgroundColor:'#3489eb'}}
                            onPress={() => {
                            checkCode()
                            }}
                        >
                            Dodaj
                        </Button>
                        </Button.Group>
                    </Modal.Footer>
                    </Modal.Content>
                </Modal>
                </Text>
                </Center>
                </Box>
            </Center>
        </View>
        </NativeBaseProvider>
    )
}

export default Promocje