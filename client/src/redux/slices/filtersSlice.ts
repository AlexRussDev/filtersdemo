import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFilters } from "../../api/api";
import { IFiltersState } from "../../common/types";

const initialState: IFiltersState = {
  data: [],
  loading: false,
  error: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFilters.fulfilled,
        (state, action: PayloadAction<IFiltersState>) => {
          state.loading = false;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default filtersSlice.reducer;
