import { NativeBaseProvider, Button, Input, FlatList, useToast, Box, Center, Heading, Modal, FormControl } from 'native-base'
import React,{useState} from 'react'
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
const Platnosci = () => {
    const [showModal, setShowModal] = useState(false)
    const [payment, setPayment] = useState('');
    const [cardId, setCardId] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cvv2, setCvv2] = useState('');
    const toast = useToast();

    const showPayment = () => {
        if (cardId === '' || name === '' || lastName === '' || expiration === '' || cvv2 ==='')
        {
            toast.show({
                description: "Proszę uzupełnić wszystkie pola",
            })
        }   
        else
        {
            setPayment(cardId + ' ' + name + ' '  + lastName + ' ' + expiration + ' ' + cvv2);
            setShowModal(false);
        }

    }
    return (
        <NativeBaseProvider>
            <Center>
        <View>
            
             <Box w="70%">
        <Heading fontSize={24}>Aktualne Płatności</Heading>
        </Box>
            <Text>
                <Center>
            <Button
                    onPress={()=>{
                        setShowModal(true)
                        }}
                    style={{ backgroundColor: '#3489eb', width: 320, margintop: 15}}
                >
                    Dodaj Platność
                </Button>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Dodaj karte</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                        <FormControl.Label>Podaj numer karty</FormControl.Label>
                        <Input1 placeholder="Dane karty" onChangeText={setCardId}/>
                        </FormControl>
                        <FormControl>
                        <FormControl.Label>Podaj imie</FormControl.Label>
                        <Input1 placeholder="Imie" onChangeText={setName}/>
                        </FormControl>
                        <FormControl>
                        <FormControl.Label>Podaj nazwisko</FormControl.Label>
                        <Input1 placeholder="Nazwisko" onChangeText={setLastName}/>
                        </FormControl>
                        <FormControl>
                        <FormControl.Label>Podaj date ważności karty</FormControl.Label>
                        <Input1 placeholder="Data zakończenia" onChangeText={setExpiration}/>
                        <FormControl>
                        <FormControl.Label>Podaj kod CVV2</FormControl.Label>
                        <Input1 placeholder="Kod CVV2" onChangeText={setCvv2}/>
                        </FormControl>
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
                            showPayment()
                            }}
                        >
                            Dodaj
                        </Button>
                        </Button.Group>
                    </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <Text>
                {payment}               
               </Text>
                </Center>
            </Text>
        </View>
        </Center>
        </NativeBaseProvider>
    )
}

export default Platnosci
