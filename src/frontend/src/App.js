import { GlobalStateContext } from "./utils/globalStateContext";
import { ModalContext } from "./utils/modalUtils";
import { useReducer, useEffect, useCallback } from "react"
import globalReducer from "./utils/globalReducer";
import { useModalReducer } from "./utils/modalUtils";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Root from "./views/Root";
import Home from "./views/Home";
import ProtectedRoute from "./views/ProtectedRoute";
import Register from "./views/Register";
import Verification from "./views/Verification";
import About from "./views/About";
import Help from "./views/Help";
import Error from "./views/Error";
import SelectPatient from "./views/SelectPatient";
import Calendar from "./views/Calendar";
import SelectShiftByDate from "./components/dialogs/SelectShiftByDate";

import { CssBaseline, ThemeProvider } from "@mui/material";
import Theme from "./styles/Theme";

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/",
                element: <SelectPatient />
              },
              {
                path: "/calendar",
                element: <Calendar />,
                children: [
                  {
                    path: "/calendar/select-shift-by-date",
                    element: <SelectShiftByDate />
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/emailVerification/:token",
        element: <Verification />,
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/help",
        element: <Help />
      },
    ]
  }
]);

function App() {
  /* FOR SECURITY: 
  Refactor these hooks to fetch authenticated
  session data from backend-server */

  const initialState = useCallback(() => {
    // Get global state values from localStorage on load if available
    const localStorage = window.localStorage.careSync ?
      JSON.parse(window.localStorage.getItem("careSync")) : null;
    // Set the global state values from localStorage
    if (localStorage) {
      return {
        isAuth: localStorage.isAuth,
        user: localStorage.user,
        selectedPatient: localStorage.selectedPatient
      };
      // Set global state to defaults if not in localStorage
    } else {
      return {
        isAuth: false,
        user: "",
        selectedPatient: ""
      };
    }
  }, []);

  // Global state handler
  const GlobalProvider = ({ children }) => {
    const [store, dispatch] = useReducer(globalReducer, initialState());

    // Set required global state values in localStorage any time their state changes
    useEffect(() => {
      // console.log("updating localStorage from store...");
      window.localStorage.setItem("careSync", JSON.stringify({
        ...store,
      }));
    }, [store]);

    return (
      <GlobalStateContext.Provider value={{ store, dispatch }}>
        {children}
      </GlobalStateContext.Provider>
    );
  }

  // Modal and drawer state handler
  const ModalProvider = ({ children }) => {
    const [modalState, modalDispatch] = useModalReducer({
      modalIsOpen: false,
      drawerlIsOpen: false
    });
    return (
      <ModalContext.Provider value={{ modalState, modalDispatch }}>
        {children}
      </ModalContext.Provider>
    );
  }

  return (
    <GlobalProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </GlobalProvider >
  );
}

export default App;