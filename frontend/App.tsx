import React from 'react';
import { StyleSheet, View} from 'react-native';

import Nav from './components/main/Nav'
import Content from './components/main/Content'


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight: '100%'
  },
});


export default function App() {


  return (
    <View style={styles.container}>
      <Nav />
      <Content />
    </View>
  );
}

