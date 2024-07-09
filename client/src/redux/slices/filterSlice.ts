import { createSlice } from "@reduxjs/toolkit";
import { saveFilter } from "../../api/api";
import { IBaseState } from "../../common/types";

const initialState: IBaseState = {
  loading: false,
  error: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveFilter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveFilter.fulfilled, (state, _) => {
        state.loading = false;
      })
      .addCase(saveFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default filterSlice.reducer;
