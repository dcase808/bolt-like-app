import { NativeBaseProvider, Button, Input, FlatList, useToast, Box, Center, Heading, Modal, FormControl } from 'native-base'
import React, { useState } from 'react'
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

    const checkCode = () =>
    {
        if(code === "")
        {
            toast.show({
                description: "Wprowadź kod rabatowy",
            })
        }
        else if(code === "rabat25")
        {
            toast.show({
                description: "Dodano kod rabatowy",
            });
            setData(data => [...data, "Rabat 25% na następny przejazd"]);
            setShowModal(false);
        }
        else
        {
            toast.show({
                description: "Nieprawidłowy kod rabatowy",
            });
        }
    }

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
