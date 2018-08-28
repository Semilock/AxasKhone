import routes from './route';
import axiosInstance from './axios.config';

const login = (username, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };
  return fetch(`${routes.basePath}/${routes.login}/`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.refresh) {
        //TODO: implementing later
        // store user details and jwt token in application state or storage to keep user logged in.
        // axiosInstance
        //   .get(`${routes.user.profileInfo}/`)
        //   .then(error => console.log('my warn', error));
      }
      return user;
    });
};

const logout = () => {
  //TODO: implementing later
  // removing tokn in storage or state ,...
};

const getProfile = () => {
  //TODO: implementing later

  return axiosInstance.get(`${routes.basePath}/${routes.user.profileInfo}/`);
};

const handleResponse = response => {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      // if (response.status === 401)  // Unauthorized error
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};

export const userService = {
  login,
  logout,
  getProfile
};
