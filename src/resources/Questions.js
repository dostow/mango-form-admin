import React from "react";
import {
  List,
  Datagrid,
  TextField,
  SelectField,
  DateField,
  SelectInput,
  ReferenceInput,
  SimpleForm,
  Edit,
  Create,
  TextInput
} from "react-admin";
import DynamicReferenceField from "../fields/DynamicReferenceField";

export const QuestionList = props => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="question" />
      <TextField source="answer" />
      <TextField source="action" />
      <DynamicReferenceField
        source="next"
        resource="question"
        field="question"
      />
      <DateField source="created_at" />
      <DateField source="modified_at" />
      <SelectField
        source="type"
        choices={[
          { id: "root", name: "Top Level" },
          { id: "chile", name: "Child" }
        ]}
      />
    </Datagrid>
  </List>
);

const QuestionReferenceInput = props => {
  return (
    <ReferenceInput
      {...props}
      label="Next Question"
      source="next.id"
      reference="question"
      allowEmpty
    >
      <SelectInput optionText="question" />
    </ReferenceInput>
  );
};

export const QuestionEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="action" />
      <TextInput source="answer" />
      <TextInput source="question" />
      <QuestionReferenceInput />
      <SelectInput
        source="type"
        choices={[
          { id: "root", name: "Top Level" },
          { id: "chile", name: "Child" }
        ]}
      />
    </SimpleForm>
  </Edit>
);

export const QuestionCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="action" />
      <TextInput source="answer" />
      <TextInput source="question" />
    </SimpleForm>
  </Create>
);
