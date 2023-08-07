import React, { Fragment, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import { useDispatch } from "react-redux";
import DefaultComponent from "./components/DefaultComp/DefaultComponent.jsx";
import { isJsonString } from "./until";
import * as UserService from "./services/UserService";
import { updateUser } from "./redux/slides/userSlide";
import LoadingComponent from "./components/LoadingComp/LoadingComponent";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();

    if (decoded?.id) {
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false);
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};

    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }

    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const { decoded } = handleDecoded();
      const currentTime = new Date();

      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }

      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <LoadingComponent isLoading={isLoading}>
        <Router>
          <Routes>
            {routes.map((route) => {
              const Page = route.page;
              // const isCheckAuth = !route.isPrivate || user.isAdmin;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;

              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </LoadingComponent>
    </div>
  );
}

export default App;
