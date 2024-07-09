import axios from "axios";
import { IFiltersState, TFilter, TFiltersData } from "../common/types";
import { requests } from "./request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppSettings } from "../AppSettings";

const api = axios.create({
  baseURL: AppSettings.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosRequest = {
  fetchFilters: () => requests.get(api.getUri() + "/filters"),
  postFilter: (filterData: TFilter) =>
    requests.post(api.getUri() + "/filters", filterData, {
      "Content-Type": "application/json",
    }),
};

export const fetchFilters = createAsyncThunk<
  IFiltersState,
  void,
  {
    rejectValue: string;
  }
>("filters/fetchFilters", async (_, { rejectWithValue }) => {
  try {
    const result = await AxiosRequest.fetchFilters();
    const data: TFiltersData = result ?? [];
    return { data, loading: false, error: null };
  } catch (error: any) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
});

export const saveFilter = createAsyncThunk<
  void,
  TFilter,
  {
    rejectValue: string;
  }
>("filter/saveFilter", async (filterData, { rejectWithValue }) => {
  try {
    const response = await AxiosRequest.postFilter(filterData);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message || "An unknown error occurred");
  }
});

export default api;
