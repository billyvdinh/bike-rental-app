import { createSlice } from "@reduxjs/toolkit";
import reservationService from "../../services/firebase/reservations";

const initialState = {
  reservations: [],
  bikeReservations: [],
  loadingReservations: false,
};

const slice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loadingReservations = action.payload;
    },
    getReservations(state, action) {
      state.reservations = action.payload;
    },
    getBikeReservations(state, action) {
      state.bikeReservations = action.payload;
    },
    getReservation(state, action) {
      state.selectedReservation = action.payload;
    },
    createReservation(state, action) {
      state.selectedReservation = action.payload;
    },
    updateReservation(state, action) {
      const reservation = action.payload;
      state.reservations = state.reservations.map((_reservation) =>
        _reservation.id === reservation.id ? reservation : _reservation
      );
    },
    deleteReservation(state, action) {
      state.reservations = state.reservations.filter(
        (_reservation) => _reservation.id !== action.payload
      );
    },
  },
});

export const { reducer } = slice;

export const getReservations = () => async (dispatch) => {
  dispatch(slice.actions.setLoading(true));
  const reservations = await reservationService.getAll();
  dispatch(slice.actions.getReservations(reservations));
  dispatch(slice.actions.setLoading(false));
};

export const getBikeReservations = (bikeId) => async (dispatch) => {
  dispatch(slice.actions.setLoading(true));
  const reservations = await reservationService.getByBikeId(bikeId);
  dispatch(slice.actions.getBikeReservations(reservations));
  dispatch(slice.actions.setLoading(false));
};

export const getReservationsByUserId = (id) => async (dispatch) => {
  const reservations = await reservationService.getByUserId(id);
  dispatch(slice.actions.getReservations(reservations));
  dispatch(slice.actions.setLoading(false));
};

export const getReservation = (id) => async (dispatch) => {
  const reservation = await reservationService.get(id);
  dispatch(slice.actions.getReservation(reservation));
};

export const createReservation = (payload) => async (dispatch) => {
  const data = await reservationService.create(payload);
  dispatch(slice.actions.createReservation(data));
};

export const updateReservation = (id, payload) => async (dispatch) => {
  const data = await reservationService.update(id, payload);
  dispatch(slice.actions.updateReservation(data));
};

export const deleteReservation = (id) => async (dispatch) => {
  await reservationService.delete(id);
  dispatch(slice.actions.deleteReservation(id));
};
