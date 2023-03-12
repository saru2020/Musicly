import { UPDATE_VOLUME, AllActionTypes } from '../types';
import { ActionCreator } from 'redux';
// import { useDispatch } from 'react-redux'
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

const volumeUpdateSuccess: ActionCreator<AllActionTypes> = (volume: boolean) => {
    // console.log('volumeUpdateSuccess - volume: ', volume);
    return { type: UPDATE_VOLUME, payload: volume };
}

export function updateVolume({ volume }: { volume: boolean }) {
    // const dispatch = useDispatch()
    // console.log('inside actions/index.tsx: volume: ', volume);
    return dispatch => {
        const res = volumeUpdateSuccess(volume)
        // console.log('updateVolume - res: ', res);
        
        return dispatch(res)
    };
}