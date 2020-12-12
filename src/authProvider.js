const apiUrl = process.env.REACT_APP_API_URL + "/auth";
const apiKey = process.env.REACT_APP_API_KEY;
const headers = new Headers();
headers.set("x-dostow-group-access-key", apiKey);
headers.set("Content-Type", "application/json");

export default {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    const request = new Request(`${apiUrl}/sign_in`, {
      headers,
      method: "POST",
      body: JSON.stringify({ Email: username, Password: password }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem("token", token);
      });
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
