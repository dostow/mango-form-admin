import React, { Fragment, useCallback, FC } from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  EmailField,
  Pagination,
  Filter,
  TextInput,
  ShowProps,
  ListProps,
  useEditController,
  useTranslate,
  SelectInput,
  FileField,
  ArrayField,
  FileFieldProps,
  FunctionField,
} from "react-admin";
import { Route, RouteChildrenProps, useHistory } from "react-router-dom";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Form } from "../types";
import { IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { RaBox, BoxedShowLayout } from "ra-compact-ui";

const useShowStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 40,
    width: 300,
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1em",
  },
  form: {
    [theme.breakpoints.up("xs")]: {
      width: 300,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100vw",
      marginTop: -30,
    },
  },
  inlineField: {
    display: "inline-block",
    width: "50%",
  },
  section: {},
}));

interface Props extends ShowProps {
  onCancel: () => void;
}

const UploadFile: FC<FileFieldProps> = (props: any) => {
  const [label] = props.record.filename.split("_")[1].split(".");

  return <FileField {...props} source="url" title={label} />;
};

export const FormShow: FC<Props> = ({ onCancel, ...props }) => {
  const classes = useShowStyles();
  const controllerProps = useEditController<Form>(props);
  const translate = useTranslate();
  if (!controllerProps.record) {
    return null;
  }
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">{translate("Registration Form")}</Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </div>
      <BoxedShowLayout {...controllerProps}>
        <RaBox display="flex" flexDirection="column">
          <DateField source="created_at" label="Created" />
          <TextField source="plan" />
          <TextField source="mode" label="Type" />
          {/* <ImageField source="passport" /> */}
          <TextField source="firstName" />
          <TextField source="lastName" />
          <EmailField source="email" />
          <TextField source="address" />
          <TextField source="billingAddress" />
          <TextField source="billingEmail" />
          <TextField source="company" />
          <TextField source="billingFirstName" />
          <TextField source="billingLastName" />
          <TextField source="billingPhone" />
          <FunctionField
            label="Date of Birth"
            render={(record: any) =>
              `${record?.dob?.day} - ${record?.dob?.month} - ${record?.dob?.year}`
            }
          />

          <TextField source="gender" />
          {/* <TextField source="meta.host" /> */}
          <TextField source="phone" />
          <TextField source="residency" />
          <RaBox display="inline-flex" flexDirection="column" flexGrow={1}>
            <ArrayField source="files" label="Uploads">
              <Datagrid>
                <UploadFile source="url" label="" title="File" />
              </Datagrid>
            </ArrayField>
          </RaBox>
          <FunctionField
            label="Inspection Day"
            render={(record: any) =>
              `${record.inspectionDay.day} - ${record.inspectionDay.month} - ${record.inspectionDay.year}`
            }
          />

          <TextField source="inspectionTime" />
          {/* <DateField source="created_at" />
        <DateField source="modified_at" /> */}
        </RaBox>
      </BoxedShowLayout>
    </div>
  );
};

const Filters: FC = (props) => (
  <Filter {...props}>
    <TextInput label="Plan" source="plan" />
    <SelectInput
      label="Type"
      source="mode"
      choices={[
        { id: "residential", name: "Residential" },
        { id: "company", name: "Company" },
      ]}
    />
  </Filter>
);

const FormPagination: FC = (props) => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} {...props} />
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  list: {
    flexGrow: 1,
    transition: theme.transitions.create(["all"], {
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  listWithDrawer: {
    marginRight: 400,
  },
  drawerPaper: {
    zIndex: 100,
  },
}));

export const FormList: FC<ListProps> = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClose = useCallback(() => {
    history.push("/form");
  }, [history]);

  return (
    <div className={classes.root}>
      <Route path="/form/:id">
        {({ match }: RouteChildrenProps<{ id: string }>) => {
          const isMatch = !!(
            match &&
            match.params &&
            match.params.id !== "create"
          );

          return (
            <Fragment>
              <List
                {...props}
                filterDefaultValues={{ mode: "residential" }}
                filters={<Filters />}
                pagination={<FormPagination />}
                {...props}
              >
                <Datagrid rowClick="show">
                  <DateField source="created_at" label="Created" />
                  <TextField source="plan" />
                  <TextField source="mode" label="Type" />
                  <TextField source="firstName" />
                  <TextField source="lastName" />
                  <EmailField source="email" />
                </Datagrid>
              </List>
              <Drawer
                variant="persistent"
                open={isMatch}
                anchor="right"
                onClose={handleClose}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {isMatch ? (
                  <FormShow
                    id={(match as any).params.id}
                    onCancel={handleClose}
                    {...props}
                  />
                ) : null}
              </Drawer>
            </Fragment>
          );
        }}
      </Route>
    </div>
  );
};
