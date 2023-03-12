import { Float } from "react-native/Libraries/Types/CodegenTypes"

export const UPDATE_VOLUME = "UPDATE_VOLUME"


interface UpdateVolumeAction {
    type: typeof UPDATE_VOLUME,
    payload: boolean
}

export type AllActionTypes = UpdateVolumeAction