import { NativeBaseProvider, Button, Input, FlatList, useToast, Box, Center } from 'native-base'
import React, {useState, useEffect, memo} from 'react'
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
      style={{ width: 320, margintop: 15}}
    />
  )
}


const ZamowPrzejazd = (prop) => {
  const [tempLocation, setTempLocation] = useState(null);
  const [location, setLocation] = useState("");
  const [rides, setRides] = useState([]);
  const [destination, setDestination] = useState("");

  const toast = useToast();



  const getRides = async () => {
    try {
     const response = await fetch('http://192.168.0.19:3000/przejazdy');
     const json = await response.json();
        if(rides.length > 0)
        {
            setRides([]);
        }
        for (let i = 0; i < json.length; i++)
        {
            let id = eval(JSON.stringify(json[i].id))
            let location = eval(JSON.stringify(json[i].location))
            let destination = eval(JSON.stringify(json[i].destination))
            let temp = { id, location, destination }
            setRides(rides => [...rides, temp]);
        }
        toast.show({
            description: "Zaktualizowano listę przejazdów",
        })
   } catch (error) {
     console.error(error);
     toast.show({
        description: "Błąd w pobieraniu listy przejazdów",
    })
   }
 }


 const orderRide = async () => {
  if(location === "" || destination === "")
  {
    toast.show({
      description: "Ustaw adres odbioru oraz adres docelowy",
    })
    return;
  }
  else
  {
    try{
      const response = await fetch('http://192.168.0.19:3000/przejazdy');
      const json2 = await response.json();
      let id = json2.length + 1;
      const response2 = await fetch('http://192.168.0.19:3000/przejazdy', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
          location: location,
          destination: destination
        })
      })
  } catch (error) {
    console.error(error);
    toast.show({
      description: "Błąd w zamawianiu przejazdu",
  })
  }
  toast.show({
    description: "Zamówiono przejazd",
  })
  getRides();
}
}


  useEffect(() => 
  {
    (async () => {
      getRides();
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
        //console.log(response[0].city + ", " + response[0].street + " " + response[0].name);
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

  const cancelRide = async (el) => {
    try {
     const response = await fetch('http://192.168.0.19:3000/przejazdy');
     const json = await response.json();
        for (let i = 0; i < json.length; i++)
        {
            let id = eval(JSON.stringify(json[i].id))
            let location = eval(JSON.stringify(json[i].location))
            let destination = eval(JSON.stringify(json[i].destination))
            let temp = { location, destination }
            let url = 'http://192.168.0.19:3000/przejazdy/'+id;
            if(el.id === id)
            {
              fetch(url, 
              { method: 'DELETE' });
              const response = await fetch('http://192.168.0.19:3000/historia');
              const json2 = await response.json();
              let id2 = json2.length + 1;
              const response2 = await fetch('http://192.168.0.19:3000/historia', {  
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  id: id2,
                  location: location,
                  destination: destination
                })
              })
            }

        }
        toast.show({
            description: "Zakończono przejazd",
        })
        getRides();
   } catch (error) {
     console.error(error);
     toast.show({
        description: "Błąd w usuwaniu przejazdu",
    })
   }
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
                    cancelRide(item);
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