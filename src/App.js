import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import dataProvider from "./rest";
import authProvider from "./authProvider";
import transformer from "./transformer";
import { FormList } from "./resources/Form";
import { Login, Layout } from "./layout";

const App = () => (
  <Admin
    dataProvider={transformer(dataProvider)}
    authProvider={authProvider}
    layout={Layout}
  >
    <Resource options={{ label: "Forms" }} name="form" list={FormList} />
  </Admin>
);

export default App;
