import { Float } from "react-native/Libraries/Types/CodegenTypes";
import { UPDATE_VOLUME, AllActionTypes } from "../types";

interface VolumeState {
    volume: boolean
}
  
const initialState: VolumeState = {
    volume: true
};

export function volumeReducer(state: VolumeState = initialState, action: AllActionTypes): VolumeState {
  console.log('volumeReducer - before - state: ', state);
  
    switch (action.type) {
      case UPDATE_VOLUME: {
        return {
          ...state,
          volume: action.payload
        };
      }
      default:
        return state
    }
    // console.log('after - state: ', state);
  };
  