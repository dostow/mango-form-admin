import React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from "react-admin";
import dataProvider from "./rest";
import authProvider from "./authProvider";
import {
  QuestionList,
  QuestionEdit,
  QuestionCreate
} from "./resources/Questions";
import { EmailList, EmailCreate, EmailEdit } from "./resources/Emails";
import transformer from "./transformer";
import { AnswerList, AnswerEdit, AnswerCreate } from "./resources/Answer";

const App = () => (
  <Admin dataProvider={transformer(dataProvider)} authProvider={authProvider}>
    <Resource
      name="question"
      list={QuestionList}
      edit={QuestionEdit}
      create={QuestionCreate}
    />
    <Resource
      name="answer"
      list={AnswerList}
      edit={AnswerEdit}
      create={AnswerCreate}
    />
    <Resource
      name="emails"
      list={EmailList}
      edit={EmailEdit}
      create={EmailCreate}
    />
    <Resource name="supporticket" list={ListGuesser} edit={EditGuesser} />
  </Admin>
);

export default App;
