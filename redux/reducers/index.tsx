import { combineReducers } from 'redux';
import { volumeReducer } from "./volume.reducer";
export const rootReducer = combineReducers({
    volume: volumeReducer
});
  
export type RootState = ReturnType<typeof rootReducer>;