import React, { useEffect, useContext } from 'react';
import ExampleContext from './context/Context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import routesConfig from './hooks/routes/routes';

const App = () => {
  axios.defaults.baseURL='http://localhost:5000'
  axios.defaults.withCredentials = true;
  const { isLogin, setUserid, setLogin} = useContext(ExampleContext);
  useEffect(()=>{
    axios.get('/profile').then(
      response =>{
        try{
          console.log(response.data)
          
          if (response.data.userId){
            setUserid(response.data.userId)
            setLogin(true)
          }
          console.log(isLogin)
        } catch (error) {
          // Handle the error, e.g., show an error message to the user
          console.error('Registration failed:', error);
        }
      }
    )
  })
  return (
    <BrowserRouter>
      <Routes>
        {routesConfig.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          >
            {route.children && (
              route.children.map((childRoute, childIndex) => (
                <Route
                  key={childIndex}
                  path={childRoute.path}
                  element={childRoute.element}
                />
              ))
            )}
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
