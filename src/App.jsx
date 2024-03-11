import "./App.css";
import SignUp from "./components/Auth/SignUp/SignUp";
import SignIn from "./components/Auth/SignIn/SignIn";

import MyAccount from "./pages/MyAccount/Myaccount";
import ForgotPassword from "./components/Auth/ForgotPassword/ForgotPassword";
import VerifyAccount from "./components/Auth/VerifyAccount/VerifyAccount";
import NewPassword from "./components/Auth/NewPassword/NewPassword";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./Util/AppLayout";
import { useState } from "react";

import Protection from "./components/Auth/Protection/Protection";
import MyPlan from "./pages/MyPlan/MyPlan";
import CreateImage from "./pages/Create-Image/CreateImage";
import ChatLayout from "./pages/chat/ChatLayout";
import Welcome from "./pages/chat/welcome";
import NormalChat from "./pages/chat/normal-chat";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

function App() {
  const [showChat, setShowChat] = useState(0);
  const queryClient = new QueryClient()

  const token = localStorage.getItem("token");
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Routes>
          <Route>
            <Route
              path="/signin"
              element={<SignIn />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword />}
            />
            <Route
              path="/verifyaccount"
              element={<VerifyAccount />}
            />
            <Route
              path="/newpassword"
              element={<NewPassword />}
            />
            <Route
              path="/newpassword/:id"
              element={<NewPassword />}
            />

            <Route
              element={
                // !token ? (
                //   <SignIn />
                // ) : (
                //   <Protection>
                    <AppLayout
                      showChat={showChat}
                      setShowChat={setShowChat}
                    />
                //   </Protection>
                // )
              }>
              <Route
                index
                element={
                  <Navigate
                    replace
                    to="/myaccount"
                  />
                }
              />
              <Route
                path="*"
                element={
                  <Navigate
                    replace
                    to="/myaccount"
                  />
                }
              />

              <Route
                path="/myaccount"
                element={<MyAccount />}
              />
              <Route
                path="/create-image"
                element={<CreateImage />}
              />

              <Route
                path="/myplan"
                element={<MyPlan />}
              />

              <Route
                path={"/chat"}
                element={<ChatLayout/>}>
                <Route index element={<Welcome/>} />
                <Route
                  path={':chatId'}
                  element={<NormalChat/>}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  );
}

export default App;
