import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screen/Home';
import FlatList1 from '../screen/FlatList1';
import Maps from '../screen/Maps';


const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator initialRouteName="Maps">
    
      <Drawer.Screen name="Home" component={Home}  />
      <Drawer.Screen name='Flatlist1' component={FlatList1} />
      <Drawer.Screen name='Maps' component={Maps} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
