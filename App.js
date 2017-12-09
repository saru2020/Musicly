import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SoundBox from './Components/SoundBox'

let defaultVolume = 0.6
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.verticalContainer}>
        <View style={styles.horizontalContainer}>
          <SoundBox name="Rain" volume={defaultVolume} fileName="Rain" title="Let it Rain!" style={styles.leftOne}/>
          <SoundBox name="Fire" volume={0.8} fileName="Fire" title="Lit the Fire!" style={styles.leftOne}/>
        </View>
        <View style={styles.horizontalContainer}>
          <SoundBox name="Wind" volume={0.4} fileName="Wind" title="Let the Wind Pass!" style={styles.leftOne}/>
          <SoundBox name="Thunder" volume={0.3} fileName="Thunder" title="Let the Thunder shout!" style={styles.rightOne}/>
        </View>
      </View>
    );
  }
}

//CSS
const styles = StyleSheet.create({
  verticalContainer: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  horizontalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  leftOne: {
    flex: 1,
    width: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightOne: {
    flex: 1,
    width: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
