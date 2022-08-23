import { createSlice } from "@reduxjs/toolkit";
import bikeService from "../../services/firebase/bikes";

const initialState = {
  bikes: [],
  loadingBikes: false,
};

const slice = createSlice({
  name: "bikes",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loadingBikes = action.payload;
    },
    getBikes(state, action) {
      state.bikes = action.payload;
    },
    getBike(state, action) {
      state.selectedBike = action.payload;
    },
    createBike(state, action) {
      state.selectedBike = action.payload;
    },
    updateBike(state, action) {
      const bike = action.payload;
      state.bikes = state.bikes.map((_bike) =>
        _bike.id === bike.id ? bike : _bike
      );
    },
    deleteBike(state, action) {
      state.bikes = state.bikes.filter((_bike) => _bike.id !== action.payload);
    },
  },
});

export const { reducer } = slice;

export const getBikes = () => async (dispatch) => {
  dispatch(slice.actions.setLoading(true));
  const bikes = await bikeService.getAll();
  dispatch(slice.actions.getBikes(bikes));
  dispatch(slice.actions.setLoading(false));
};

export const getBikesByDateRange = (start, end) => async (dispatch) => {
  dispatch(slice.actions.setLoading(true));
  const bikes = await bikeService.getByDateRange(start, end);
  dispatch(slice.actions.getBikes(bikes));
  dispatch(slice.actions.setLoading(false));
};

export const getBike = (id) => async (dispatch) => {
  const bike = await bikeService.get(id);
  dispatch(slice.actions.getBike(bike));
};

export const createBike = (payload) => async (dispatch) => {
  const data = await bikeService.create(payload);
  dispatch(slice.actions.createBike(data));
};

export const updateBike = (id, payload) => async (dispatch) => {
  const data = await bikeService.update(id, payload);
  dispatch(slice.actions.updateBike(data));
};

export const deleteBike = (id) => async (dispatch) => {
  await bikeService.delete(id);
  dispatch(slice.actions.deleteBike(id));
};
