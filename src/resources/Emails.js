import React from "react";
import {
  List,
  Datagrid,
  TextField,
  SimpleForm,
  Edit,
  EmailField,
  Create,
  TextInput
} from "react-admin";

const Form = props => (
  <SimpleForm {...props}>
    <TextInput source="email" />
    <TextInput source="mailspaceNamespace" />
    <TextInput source="password" />
    <TextInput source="whatsapp" />
  </SimpleForm>
);
export const EmailList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="mailspaceNamespace" />
      <EmailField source="email" />
      <TextField source="whatsapp" />
    </Datagrid>
  </List>
);
export const EmailEdit = props => (
  <Edit {...props}>
    <Form />
  </Edit>
);

export const EmailCreate = props => (
  <Create {...props}>
    <Form />
  </Create>
);
