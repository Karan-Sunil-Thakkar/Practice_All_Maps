import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import MapView, {
  Marker,
  Callout,
  Circle,
  Polyline,
  Polygon,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '../config/constant/index2';
import MapViewDirections from 'react-native-maps-directions';

const Maps = () => {
  //  For part 1
  const [markersList, setMarkersList] = useState([
    {
      id: 1,
      latitude: 18.586873145186104,
      longitude: 73.73190117279333,
      title: 'Team A',
      description: 'This Team A current location',
    },
    {
      id: 2,
      latitude: 18.598895613221995,
      longitude: 73.75153757047013,
      title: 'Team B',
      description: 'This Team B current location',
    },
  ]);

  //  mapRef state state (Part 4)
  const mapRef = useRef(null);

  // creating useState for origin and destination (Part 5)......
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();

  //  Custome component for image.. (part 2)
  const MyCustomMarkerView = () => {
    return (
      <Image
        style={{
          width: 40,
          height: 40,
        }}
        source={require('../assests/Images/shope.png')}
      />
    );
  };

  const MyCustomCalloutView = () => {
    return (
      <View>
        <Text>Coustom text</Text>
      </View>
    );
  };

  // const handleSubmit=(data,details)=>{
  //   const location= details.geometry.location;
  //   console.log(location);
  //   setMarkersList([
  //     {
  //       id:1,
  //       latitude:location.lat,
  //       longitude:location.lng
  //     },

  //   ])

  // }

  //  function to move to the locations .... (part 4)
  async function moveToLocation(latitude, longitude) {
    mapRef.current.animateToRegion(
      {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
      2000,
    );
  }

  return (
    <View style={styles.container}>
      {/*  For search Places in Google Maps  (Part 4 ......) */}
      <View style={{zIndex: 1, flex: 0.5, flexDirection: 'row'}}>
        {/* This part is done  in  */}
      <View>
      {/* <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log(JSON.stringify(data));
            console.log(JSON.stringify(details?.geometry?.location));
            moveToLocation(
              details?.geometry?.location.lat,
              details?.geometry?.location.lng,
            );

            // handleSubmit(data,details);
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: 'en',
          }}
          onFail={err => {
            console.log(err);
          }}
        /> */}
      </View>
      </View>

      {/*  starting code ....... */}

      <MapView
        // mapRef (part 4)
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 18.586873145186104,
          longitude: 73.73190117279333,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {/*  For Custome Images..................... (Part 2).*/}
        {/* 18.616621, 73.701170 */}

        <Marker
          coordinate={{
            latitude: 18.616621,
            longitude: 73.70117,
          }}>
          <MyCustomMarkerView />

          <Callout style={{width: 300, height: 100, backgroundColor: 'white'}}>
            <MyCustomCalloutView />
          </Callout>
        </Marker>
        {/* 18.57766608424186, 73.73879884969064 locations of blueridge */}
        {/* 18.592161065551164, 73.73378944780546 locations of hinjewadi */}

        {/* For rendering the list of  marker ...............(part 1) */}
        {markersList.map(marker => {
          return (
            <Marker
              //  draggable  .... (part 3)
              draggable
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              description={marker.description}
              //  this will give you the coordination of  drop location (Part 3)
              onDragEnd={e => console.log({x: e.nativeEvent.coordinate})}
            />
          );
        })}

        {/*  Creating circel in (Part 3) .....*/}

        <Circle
          center={{
            latitude: 18.57766608424186,
            longitude: 73.73190117279333,
          }}
          radius={200}
          fillColor="red"
          strokeWidth={1}
          strokeColor="red"
        />

        {/*  Creating or drawing  Line (Part 3 )  with the help of polyline....*/}
        {/* 18.600533641630633, 73.72442745658843 */}
        {/* 18.6533639326934, 73.80140862748516 */}
        <Polyline
          strokeWidth={2}
          strokeColor="blue"
          coordinates={[
            {
              latitude: 18.600533641630633,
              longitude: 73.72442745658843,
            },
            {
              latitude: 18.6533639326934,
              longitude: 73.80140862748516,
            },
          ]}
        />

        {/* Creating Poylgon (Part 3 .....) */}
        {/* 18.575252787614755, 73.73959977385796 */}
        {/* 18.66065322108048, 73.73538073877955 */}
        {/* 18.531791357993146, 73.84692660863688 */}
        {/* 18.671370753543155, 73.84284663198822 */}

        <Polygon
          strokeWidth={2}
          strokeColor="red"
          fillColor="#EBF5FB"
          coordinates={[
            {
              latitude: 18.575252787614755,
              longitude: 73.73959977385796,
            },
            {
              latitude: 18.66065322108048,
              longitude: 73.73538073877955,
            },
            {
              latitude: 18.531791357993146,
              longitude: 73.84692660863688,
            },
            {
              latitude: 18.671370753543155,
              longitude: 73.84284663198822,
            },
          ]}
        />

        {/*  Maps Directions (Part 5 )........... */}
        {origin != undefined && destination != undefined ? (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
          />
        ) : null}
      </MapView>
    </View>
  );
};

export default Maps;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
});
