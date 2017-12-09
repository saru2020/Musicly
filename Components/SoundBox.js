import React, { Component } from 'react';
import { StyleSheet, Text, View, Slider, Button, Image, TouchableOpacity } from 'react-native';
import VolumeBox from './VolumeBox'
import Sound from 'react-native-sound';

class SoundBox extends React.Component {

  constructor(props) {
   super(props)

  Sound.setCategory('Playback', true); // true = mixWithOthers

   this.isPlaying = false;

   this.state = {
     sound: undefined,
     name: props.name,
     fileName: props.fileName,
     title: props.title,
     volume: props.volume,
     imageOpacity: 0.1,
     volumeControlEnabled: true
   }

  }

  render() {
    return (
      <View style={styles.container}>

          <TouchableOpacity activeOpacity={0.2} onPress={this.playButtonTapped}>

           <Image
             style={styles.button}
             opacity= {this.state.imageOpacity}
            source={this.getImageFilePath()}
            />

         </TouchableOpacity>

      <VolumeBox ref={instance => { this.volumeBox = instance; }} defaultVolume={this.state.volume} onVolumeChange={this.volumeChanged}/>

      </View>
    )
  }

  changeSoundVolume (vol) {
    if (this.state.sound == null) {
      return
    }

    if (this.state.volumeControlEnabled) {
      // var sound = this.state.sound
      // sound.setVolume(vol);
      // this.setState({
      //   sound: sound
      // })
      this.state.sound.setVolume(vol);
    }
    else{
      this.state.sound.setVolume(0);
    }
  }

  volumeControlChanged = async (volumeState) => {
    this.state.volumeControlEnabled = volumeState
    this.changeSoundVolume(this.state.volume)
    // if (this.state.volumeControlEnabled) {
    //   this.state.sound.setVolume(this.state.volume);
    // }
    // else{
    //   this.state.sound.setVolume(0);
    // }

  }

  volumeChanged = async (vol) => {
    if (this.isPlaying) {
      this.state.volume = vol
      this.changeSoundVolume(vol)
      // this.state.sound.setVolume(vol);

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
      this.stopSound()
      this.isPlaying = false
      this.unHighlightBox()
      this.volumeBox.disabled(true)
      // this.refs.volumeBox.setState({ disabled: true })
    }
  }

  playSound() {
    this.isPlaying = true

    const callback = (error, sound) => {
      if (error) {
        Alert.alert('error', error.message);
        return;
      }

      sound.setNumberOfLoops(-1);
      this.volumeChanged(this.state.volume);

      // Run optional pre-play callback
      onPrepared: (sound) => {
        //Not getting called
      }
      sound.play(() => {
        // Release when it's done so we're not using up resources
        sound.release();
      });
    };

    this.setState({
      sound: new Sound(this.getFilePath(), error => callback(error, this.state.sound))
    });

  }

  stopSound() {
    this.state.sound.stop()
  }

}

export default SoundBox;

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
