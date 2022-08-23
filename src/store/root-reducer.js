import { combineReducers } from "@reduxjs/toolkit";
import { reducer as userReducer } from "./slices/users";
import { reducer as bikeReducer } from "./slices/bikes";
import { reducer as reservationReducer } from "./slices/reservations";

export const rootReducer = combineReducers({
  users: userReducer,
  bikes: bikeReducer,
  reservations: reservationReducer,
});
