import React from "react";
import { Admin, ListGuesser, Resource } from "react-admin";
import dataProvider from "./rest";
import authProvider from "./authProvider";
import transformer from "./transformer";
import { FormList } from "./resources/Form";
import { Layout, Login } from "./layout";

const App = () => (
  <Admin
    title={"SOM Admin"}
    dataProvider={transformer(dataProvider)}
    authProvider={authProvider}
    loginPage={Login}
    requireAuth={true}
  // layout={Layout}
  >
    <Resource options={{ label: "Forms" }} name="form" list={FormList} />
  </Admin>
);

export default App;
