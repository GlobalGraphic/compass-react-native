import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  Accelerometer.isAvailableAsync();

  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [z, setZ] = useState('');

  const round = n => {
    if(!n) {
      return 0;
    }

    return Math.floor(n * 100) / 100;
  }

  const onOrientationChanged = () => {
    Accelerometer.setUpdateInterval(500);
    Accelerometer.addListener(accelerometerData => {
      setX(round(accelerometerData.x));
      setY(round(accelerometerData.y));
      setZ(round(accelerometerData.z));
    });
  }

  useEffect(() => {
    onOrientationChanged();
  },[])

  let angle = Math.atan2(y,x);
  angle = angle * (180 / Math.PI);
  angle = angle + 90;
  angle = (angle + 360) % 360;
  angle = Math.floor(angle);

  return (
    <View style={styles.container}>
      <Image style={[
        styles.image,
        {transform: [{rotate: `${360 - angle}deg`}]},
      ]} resizeMode="contain" source={require('./assets/compass.png')}/>
      <Text style={styles.angle}>{angle}deg</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '70%',
    flex: 1,
    alignSelf: 'center',
  },
  angle: {
    fontSize: 40
  }
});
