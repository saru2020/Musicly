import React, { Component } from 'react';
import { Button } from 'react-native';

import { StyleSheet, Text, View } from 'react-native';
import SoundBox from './SoundBox'
import VolumeView from './VolumeView'

let defaultVolume = 0.6
export default class App extends React.Component {

  constructor(props) {
     super(props)
     this.state = {
       volumeControlState: true
     }
     this.volumeControlChanged=this.volumeControlChanged.bind(this)
  }

  render() {
    return (
      <View style={styles.verticalContainer}>
        <View style={styles.volumeControlContainer}>
          <View style={styles.volumeControl}>
            <VolumeView onVolumeControlStateChange={this.volumeControlChanged}/>
          </View>
        </View>
        <View style={styles.horizontalContainer}>
          <SoundBox ref={instance => { this.rain = instance; }} name="Rain" volume={defaultVolume} fileName="Rain" title="Let it Rain!" style={styles.leftOne}/>
          <SoundBox ref={instance => { this.fire = instance; }} name="Fire" volume={0.8} fileName="Fire" title="Lit the Fire!" style={styles.leftOne}/>
        </View>
        <View style={styles.horizontalContainer}>
          <SoundBox ref={instance => { this.wind = instance; }} name="Wind" volume={0.4} fileName="Wind" title="Let the Wind Pass!" style={styles.leftOne}/>
          <SoundBox ref={instance => { this.thunder = instance; }} name="Thunder" volume={0.3} fileName="Thunder" title="Let the Thunder shout!" style={styles.rightOne}/>
        </View>
      </View>
    );
  }

  volumeControlChanged(volumeState) {
    // console.warn(volumeState);
    this.rain.volumeControlChanged(volumeState)
    this.fire.volumeControlChanged(volumeState)
    this.wind.volumeControlChanged(volumeState)
    this.thunder.volumeControlChanged(volumeState)
  }
}

//CSS
const styles = StyleSheet.create({
  verticalContainer: {
    flex: 2,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  horizontalContainer: {
    flex: 1,
    // backgroundColor: '#fffeee',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  leftOne: {
    flex: 1,
    width: 100,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightOne: {
    flex: 1,
    width: 200,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeControlContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    // top: 20
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'flex-end',
    right: 20,
    top: 20
  }
});

class HomeView extends React.Component {

  constructor(props) {
   super(props)
  }

}
