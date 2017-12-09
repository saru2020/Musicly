import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

export default class VolumeView extends React.Component {

  constructor(props) {
     super(props)
     this.state = {
       imgUrl: require('../Assets/Images/volume.png'),
       opacity: 0.9,
       isActive: true
     }
  }

  render() {
    return (
      <View>
      <TouchableOpacity activeOpacity={0.2} onPress={this.volumeButtonTapped.bind(this)}>
      <Image
        // style={styles.button}
        style={{ width: 20, height: 20, alignSelf: 'flex-end' }} 
        opacity= {this.state.opacity}
        source={this.state.imgUrl}
       />
     </TouchableOpacity>
   </View>

    )
  }

  changeImageURL() {
    var imgUrl = undefined
    var opacity = undefined

    if (this.state.isActive) {
      imgUrl = require('../Assets/Images/volume.png')
      opacity = 0.9
    }
    else {
      imgUrl = require('../Assets/Images/volume-mute.png')
      opacity = 0.9
    }

    this.setState({
      imgUrl: imgUrl,
      opacity: opacity
    });

  }

  volumeButtonTapped() {
    this.state.isActive = !this.state.isActive
    this.changeVolumeState(this.state.isActive)
  }

  changeVolumeState(volumeState) {
    this.props.onVolumeControlStateChange(volumeState)
    this.state.isActive = volumeState
    this.changeImageURL()
  }

}
