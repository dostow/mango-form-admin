import React from "react";
import { ReferenceField, TextField } from "react-admin";

export default function (props) {
  if (typeof props.record[props.source] === "object") {
    return <span>{props.record[props.source][props.field]}</span>;
  }
  return (
    <ReferenceField {...props}>
      <TextField source="name" />
    </ReferenceField>
  );
}
