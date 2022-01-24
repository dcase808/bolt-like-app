import { NativeBaseProvider, Button, Input, FlatList, useToast, Box, Center } from 'native-base'
import React, {useState, useEffect} from 'react'
import { Text, View, Alert } from 'react-native'
import * as Location from 'expo-location'
 
export const Input1 = ({ placeholder, hide, onChangeText, value }) => {
    return (
      <Input
        type={hide ? 'password' : 'text'}
        mx="3"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        w={{
          base: "75%",
          md: "25%",
        }}
      />
    )
  }
 
 
const ZamowPrzejazd = () => {
  const [tempLocation, setTempLocation] = useState(null);
  const [location, setLocation] = useState("");
  const [rides, setRides] = useState([]);
  const [destination, setDestination] = useState("");
 
  const toast = useToast();
 
  useEffect(() => 
  {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        toast.show({
          description: "Brak pozwolenia na dostęp do lokalizacji",
        })
        return;
      }
 
      let location = await Location.getCurrentPositionAsync({});
      let { coords } = location;
 
      if (location) 
      {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });
        setTempLocation(response[0].city + ", " + response[0].street + " " + response[0].name);
        console.log(response[0].city + ", " + response[0].street + " " + response[0].name);
      }
 
 
    })();
  }, []);
 
  const getAddress = () =>
  {
    if (tempLocation === null)
    {
      toast.show({
        description: "Nie można pobrać adresu, spróbuj ponownie później lub wpisz adres ręcznie",
      })
    }
    else
    {
      setLocation(tempLocation);
      toast.show({
        description: "Ustawiono adres odbioru na: " + tempLocation,
      })
    }
  }
  const orderRide = () =>
  {
    if(location === "" || destination === "")
    {
      toast.show({
        description: "Ustaw adres odbioru oraz adres docelowy",
      })
      return;
    }
    else
    {
      let tempRides = rides;
      //tempRides.push(location +  "\t->\t" + destination);
      let id = rides.length;
      tempRides.push({id, location, destination})
      
      setRides(tempRides);
      console.log(rides[rides.length - 1]);
      //console.log(rides);
      toast.show({
        description: "Zamówiono przejazd",
        placement: "bottom",
      })
      //console.log(rides);
    }
  }
  const cancelRide = (id) =>
  {
    setRides(rides.filter(item => item.id !== id))
  }
    return (
        <NativeBaseProvider>
        <View>
          <Center>
          <Box w="70%">
            <Center>
            <Text>Podaj adres odbioru</Text>
            <Input1 value={location} placeholder="Adres" onChangeText={setLocation}/>
            <Button
                    onPress={()=>{
                        getAddress();
                        }}
                >
                    Pobierz aktualną lokalizację
            </Button>
            <Box>Podaj adres docelowy</Box>
            <Input1 value={destination} placeholder="Adres" onChangeText={setDestination}/>
 
            <Button
                    onPress={()=>{
                        orderRide();
                    }}
                >
                    Zamów przejazd
            </Button>
            <Button
                    onPress={()=>{
                        cancelRide(0);
                    }}
                >
                    rides test
            </Button>
            <Text>Lista zamówionych przejazdów</Text>
            <FlatList w="100%"
                    data={rides}
                    renderItem={({ item }) => (
                        <Text>Z: {item.location}, Do: {item.destination},                         
                        <Button w="5%"
                        onPress={()=>{
                            cancelRide(item.id);
                        }}
                        >
                        Zakończ
                        </Button>
                </Text>
 
                )}/>
              </Center>
              </Box>
              </Center>
        </View>
        </NativeBaseProvider>
    )
}
 
export default ZamowPrzejazd