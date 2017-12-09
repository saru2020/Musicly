import React, { Component } from 'react';
import { StyleSheet, Text, View, Slider, Button, Image, TouchableOpacity } from 'react-native';
import VolumeBox from './VolumeBox'
import Sound from 'react-native-sound';

class SoundBox extends React.Component {

  constructor(props) {
   super(props)
   this.sound = new Audio.Sound();
   this.isPlaying = false;

   this.state = {
     name: props.name,
     fileName: props.fileName,
     title: props.title,
     volume: props.volume,
     imageOpacity: 0.1
   }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>{this.state.name}</Text> */}

        <TouchableOpacity activeOpacity={0.2} onPress={this.playButtonTapped}>

         <Image
           style={styles.button}
           opacity= {this.state.imageOpacity}
          source={this.getImageFilePath()}
          />

       </TouchableOpacity>


        {/* <Button
          title={this.state.title}
          onPress={this.playButtonTapped}
        /> */}
        <VolumeBox ref={instance => { this.volumeBox = instance; }} defaultVolume={this.state.volume} onVolumeChange={this.volumeChanged}/>

        {/* <Text>Hello World!</Text>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text> */}
      </View>
    )
  }

  volumeChanged = async (vol) => {
    // this.sound.setVolumeAsync(vol)
    // this.state.volume = vol;
    if (this.isPlaying) {
      this.state.volume = vol
      await this.sound.setVolumeAsync(vol);
    }
    // console.warn(vol);
    // console.warn(this.sound.volume);
  }

  getImageFilePath() {
    // console.warn(this.state.fileName);
    if (this.state.fileName === 'Rain') {
      return require('../Assets/Images/Rain.png');
    }
    else if (this.state.fileName === 'Thunder') {
      return require('../Assets/Images/Thunder.png');
    }
    else if (this.state.fileName === 'Fire') {
      return require('../Assets/Images/Fire.png');
    }
    else if (this.state.fileName === 'Wind') {
      return require('../Assets/Images/Wind.png');
    }

  }

  getFilePath() {
    // console.warn(this.state.fileName);
    if (this.state.fileName === 'Rain') {
      return require('../Assets/Sounds/Rain.mp3');
    }
    else if (this.state.fileName === 'Thunder') {
      return require('../Assets/Sounds/Thunder.mp3');
    }
    else if (this.state.fileName === 'Fire') {
      return require('../Assets/Sounds/Fire.mp3');
    }
    else if (this.state.fileName === 'Wind') {
      return require('../Assets/Sounds/Wind.mp3');
    }

  }

  highlightBox() {
    this.setState({
      imageOpacity: 0.9
    });
  }

  unHighlightBox() {
    this.setState({
      imageOpacity: 0.2
    });
  }

  playButtonTapped = async () => {
    if (!this.isPlaying) {
      this.highlightBox();
      this.playSound();
      this.volumeBox.disabled(false)
      // console.warn(this.volumeBox.volume);
      // this.volumeBox.getVal(this.volumeBox.volume)
      // this.refs.volumeBox.setState({ disabled: false })
    }
    else {
      //Stop & then unload audio
      this.sound.stopAsync()
      this.sound.unloadAsync()
      this.isPlaying = false
      this.unHighlightBox()
      this.volumeBox.disabled(true)
      // this.refs.volumeBox.setState({ disabled: true })
    }
  }

  playSound = async () => {
    // console.warn('playSound');
    this.isPlaying = true
    var requiredNew = require
      await Audio.setIsEnabledAsync(true);
      try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        allowsRecordingIOS: false,
        // audio interrupts audio from other apps
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      });
    } catch (error) {
      console.error(`Error setting the audio mode::: ${error}`);
    }

      // await Audio.setAudioModeAsync({
      //       playsInSilentModeIOS: true,
      //       allowsRecordingIOS: true,
      //       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      //       shouldDuckAndroid: false,
      //       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      //   })

      // await Audio.setAudioModeAsync({"playsInSilentModeIOS": "true"})
      // await Audio.setAudioModeAsync("interruptionModeIOS": INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS)
      // await Audio.setAudioModeAsync("interruptionModeAndroid": INTERRUPTION_MODE_ANDROID_DO_NOT_MIX)
      // let sound = new Audio.Sound();
      // this.audio = sound
      // let filePath = '../Assets/Sounds/' + this.state.fileName + '.mp3'
      // console.warn(filePath);
      // await sound.loadAsync(require('../Assets/Sounds/' + this.state.fileName + '.mp3'));
      // await sound.loadAsync(require('../Assets/Sounds/Crazy.mp3'));
      await this.sound.loadAsync(this.getFilePath());
      // await sound.loadAsync(require('${this.getFilePath}'));
      // await this.sound.setVolumeAsync(this.state.volume);
      this.volumeChanged(this.state.volume);
      await this.sound.playAsync();
      this.sound.setIsLoopingAsync(true); //Repeats Indefinitely - Infinite Looping
      this.sound.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);

    };

  onPlaybackStatusUpdate(status) {
    this.isPlaying = status.isPlaying
    // console.warn(status.isLoaded);
    // console.warn(status.isPlaying);
    // console.warn("somethinfg");
  }

}

export default SoundBox;

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
