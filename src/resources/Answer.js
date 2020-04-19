import React from "react";
import {
  List,
  Datagrid,
  TextField,
  SimpleForm,
  Edit,
  SelectInput,
  ReferenceField,
  Filter,
  Create,
  TextInput,
  DateInput
} from "react-admin";

const Filters = props => (
  <Filter {...props}>
    <TextInput label="phone" source="phone" />
  </Filter>
);

const Form = props => (
  <SimpleForm {...props}>
    <DateInput source="created_at" />
    <TextInput source="phone" />
    <TextInput source="messageID" />
    <TextInput source="messageText" />
    <TextInput source="participant" />
    <TextInput source="senderJID" />
    <SelectInput
      source="status"
      options={[{ optionText: "Sent", value: "Sent" }]}
    />
  </SimpleForm>
);

export const AnswerList = props => (
  <List {...props} filters={<Filters />}>
    <Datagrid rowClick="edit">
      <ReferenceField
        label="Question"
        source="question.id"
        reference="question"
      >
        <TextField source="question" />
      </ReferenceField>
      <TextField source="messageID" />
      <TextField source="messageText" />
      <TextField source="phone" />
    </Datagrid>
  </List>
);
export const AnswerEdit = props => (
  <Edit {...props}>
    <Form />
  </Edit>
);

export const AnswerCreate = props => (
  <Create {...props}>
    <Form />
  </Create>
);
