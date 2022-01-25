import { NativeBaseProvider, Button, Input, FlatList, useToast, Box, Center } from 'native-base'
import React, {useState, useEffect} from 'react'
import { Text, View, Alert, ScrollView } from 'react-native'
import * as Location from 'expo-location'
 
export const Input1 = ({ placeholder, hide, onChangeText, value }) => {
    return (
      <Input
        type={hide ? 'password' : 'text'}
        mx="3"
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={{ width: 320, margintop: 15}}
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
                    style={{backgroundColor: '#3489eb', width: 320, margintop: 15}}
                >
                    Pobierz aktualną lokalizację
            </Button>
            <Box>Podaj adres docelowy</Box>
            <Input1 value={destination} placeholder="Adres" onChangeText={setDestination}/>
 
            <Button
                    onPress={()=>{
                        orderRide();
                    }}
                    style={{backgroundColor: '#3489eb', width: 320, margintop: 15}}
                >
                    Zamów przejazd
                    
            </Button>

            <Text>Lista zamówionych przejazdów</Text>
            {/* <ScrollView>
              {
                rides.map((el, i) =>
                  <View key={`ride-${i}`}>
                    <Text>Z: {el.location}, Do: {item.destination}</Text>
                    <Button onPress={() => { cancelRide(el.id) }}>Zakończ</Button>
                  </View>
                )
              }


            </ScrollView> */}
            
            <FlatList
              data={rides}
              renderItem={({ item }) => (
              <View style={{ height: 60, flexDirection: 'row' }}>
                <View >
                  <Text>Z: {item.location}</Text>                        
                  <Text>Do: {item.destination}</Text>
                </View>
                <Button 
                  style={{ 
                    height: 45,
                    width: 45,
                    marginLeft: 10,
                    backgroundColor: '#3489eb'
                  }}
                  fontSize={'9xl'}
                  onPress={()=>{
                      cancelRide(item.id);
                  }}
                >
                  ✔
                </Button>
                </View>
              )}/>
              </Center>
              </Box>
              </Center>
        </View>
        </NativeBaseProvider>
    )
}
 
export default ZamowPrzejazd
