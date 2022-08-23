import { createContext, useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../services/firebase/config";
import userService from "../services/firebase/users";

var ActionType;

(function (ActionType) {
  ActionType["AUTH_STATE_CHANGED"] = "AUTH_STATE_CHANGED";
})(ActionType || (ActionType = {}));

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

export const AuthContext = createContext({
  ...initialState,
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          // Here you should extract the complete user profile to make it available in your entire app.
          // The auth state only provides basic information.
          if (!state.user) {
            const user = await userService.get(authUser.uid);
            dispatch({
              type: ActionType.AUTH_STATE_CHANGED,
              payload: {
                isAuthenticated: true,
                user: { ...user },
              },
            });
          } else {
            dispatch({
              type: ActionType.AUTH_STATE_CHANGED,
              payload: {
                ...state,
                isAuthenticated: true,
              },
            });
          }

          const returnUrl = router.query.returnUrl ?? "/dashboard";
          router.push(returnUrl).catch(console.error);
        } else {
          dispatch({
            type: ActionType.AUTH_STATE_CHANGED,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const _signInWithEmailAndPassword = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const _createUserWithEmailAndPassword = async (user) => {
    const { name, email, password, role } = user;
    await createUserWithEmailAndPassword(auth, email, password);
    await userService.createWithId(auth.currentUser.uid, { name, email, role });
    await sendEmailVerification(auth.currentUser);
  };

  const logout = async () => {
    router.replace("/");
    signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "Firebase",
        createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
        signInWithEmailAndPassword: _signInWithEmailAndPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
