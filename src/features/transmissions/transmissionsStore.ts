import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { ITransmission } from '../../types/GeneralTypes'


interface TransmissionsStoreState{
    allTransmissions: ITransmission[],
    filteredTransmissions? : ITransmission[],
    newTransmissions: boolean
}

const initialState: TransmissionsStoreState =
{
    allTransmissions: [],
    //filteredTransmissions: []
    newTransmissions: false
}

export const authSlice = createSlice({
    name: 'transmissions',
    initialState,
    reducers: {
      newTransmission: (state, action: PayloadAction<ITransmission>) => {
        state.allTransmissions.push(action.payload);
        state.newTransmissions = true;
      }
    }
})

export const { newTransmission } = authSlice.actions;
export const selectNewTransmissions = (state: RootState) => state.transmissions.newTransmissions;

export default authSlice.reducer;