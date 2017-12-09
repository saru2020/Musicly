import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Slider
} from 'react-native';

export default class VolumeBox extends Component {
  constructor(props) {
   super(props)

   this.state = {
     volume: props.defaultVolume,
     disabled: true
   }

  }

  componentWillMount() {
    this.disabled(this.state.disabled)
  }

  disabled(val) {
    // console.warn(val);
    this.setState({ disabled: val })
  }
  getVal(val){
    // console.warn(val);
    this.props.onVolumeChange(val);
  }
  sliderValueChanged(val){
    // console.warn(val);
    this.setState({ volume: val })
    this.getVal(val)
  }

  render() {

    return (
      <View style={styles.container}>
        <Slider
         style={{ width: 150, height: 30 }}
        //  step={1}//Used to define the steps for slider Changes, it basically disables smooth dragging.
         trackStyle={customStyles.track}
         thumbStyle={customStyles.thumb}
         minimumTrackTintColor='#4286f4'

         minimumValue={0}
         maximumValue={1}
         value={this.state.volume}
         disabled={this.state.disabled}
         onValueChange={val =>
           this.sliderValueChanged(val)
         }
         onSlidingComplete={ val =>
           this.getVal(val)
         }
        />
        {/* <Text style={styles.welcome}>
          {this.state.volume}
        </Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

var customStyles = StyleSheet.create({
  track: {
    height: 4,
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: '#30a935',
    borderWidth: 2,
  }
});
