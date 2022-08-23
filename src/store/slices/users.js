import { createSlice } from "@reduxjs/toolkit";
import userService from "../../services/firebase/users";

const initialState = {
  users: [],
  loadingUsers: false,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loadingUsers = action.payload;
    },
    getUsers(state, action) {
      state.users = action.payload;
    },
    getUser(state, action) {
      state.selectedUser = action.payload;
    },
    createUser(state, action) {
      state.selectedUser = action.payload;
    },
    updateUser(state, action) {
      const user = action.payload;
      state.users = state.users.map((_user) =>
        _user.id === user.id ? user : _user
      );
    },
    deleteUser(state, action) {
      state.users = state.users.filter((_user) => _user.id !== action.payload);
    },
  },
});

export const { reducer } = slice;

export const getUsers = () => async (dispatch) => {
  dispatch(slice.actions.setLoading(true));
  const users = await userService.getAll();
  dispatch(slice.actions.getUsers(users));
  dispatch(slice.actions.setLoading(false));
};

export const getUser = (id) => async (dispatch) => {
  const user = await userService.get(id);
  dispatch(slice.actions.getUser(user));
};

export const createUser = (payload) => async (dispatch) => {
  const data = await userService.create(payload);
  dispatch(slice.actions.createUser(data));
};

export const updateUser = (id, payload) => async (dispatch) => {
  const data = await userService.update(id, payload);
  dispatch(slice.actions.updateUser(data));
};

export const deleteUser = (id) => async (dispatch) => {
  await userService.delete(id);
  dispatch(slice.actions.deleteUser(id));
};
