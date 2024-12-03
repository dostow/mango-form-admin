import React, { Fragment, useCallback, FC, useState } from "react";
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
  ShowBase,
  useShowController,
  Show,
  SimpleList,
  SimpleShowLayout,
} from "react-admin";
import { matchPath, Route, useLocation, useNavigate, useParams } from "react-router-dom";
// import { Drawer } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import { Form } from "../types";
// import { IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Drawer, Grid, Grid2, IconButton, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useShowStyles = makeStyles(() => ({
  root: {
    paddingTop: "40px",
    width: "90vw",
    '@media (min-width: 960px)': {
      width: "40vw",
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "1em",
  },
  form: {
  },
  inlineField: {
    display: "inline-block",
    width: "50%",
  },
  section: {},
}));

interface Props extends ShowProps {
  onCancel: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface UploadFileProps extends FileFieldProps {
  source?: string;
  record?: Record<string, any>;
}

const UploadFile: FC<UploadFileProps> = (props) => {
  const { source = 'url', record } = props;
  const url = record?.[source];

  if (!url) {
    return null;
  }

  // Get filename from URL by splitting on underscore and getting the latter part
  const getFileName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathSegments = urlObj.pathname.split('/');
      const fullFileName = pathSegments[pathSegments.length - 1] || url;

      // Split by underscore and get the latter part
      const parts = fullFileName.split('_');
      if (parts.length > 1) {
        return parts[parts.length - 1];
      }
      return fullFileName;
    } catch {
      // If URL parsing fails, try direct string split
      const parts = url.split('_');
      if (parts.length > 1) {
        return parts[parts.length - 1];
      }
      return url;
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* <Download sx={{ color: 'primary.main' }} /> */}
      <span>{getFileName(url)}</span>
    </div>
  );
};

export const FormShow: FC<Props> = ({ onCancel, ...props }) => {
  const classes = useShowStyles();
  const translate = useTranslate();
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h6">{translate("Registration Form")}</Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </div>
      <Show
        id={props.id}
        title={<Typography variant="h6">&nbsp;|&nbsp;{translate("Details")}</Typography>}
      >
        <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
          <Grid container spacing={2}>
            {/* Personal Information Section */}
            <Grid item md={6}>
              <Typography variant="subtitle1">Personal Information</Typography>
              <SimpleShowLayout>
                <DateField source="created_at" label="Created" />
                <TextField source="firstName" label="First Name" />
                <TextField source="lastName" label="Last Name" />
                <EmailField source="email" label="Email" />
                <TextField source="phone" label="Phone" />
                <TextField source="gender" label="Gender" />
                <FunctionField
                  label="Date of Birth"
                  render={(record: any) =>
                    `${record?.dob?.day} - ${record?.dob?.month} - ${record?.dob?.year}`
                  }
                />
              </SimpleShowLayout>
            </Grid>

            {/* Address Information Section */}
            <Grid item md={6}>
              <Typography variant="subtitle1">Address Information</Typography>
              <SimpleShowLayout>
                <TextField source="address" label="Address" />
                <TextField source="billingAddress" label="Billing Address" />
                <TextField source="billingEmail" label="Billing Email" />
                <TextField source="residency" label="Residency" />
              </SimpleShowLayout>
            </Grid>

            {/* Company Information Section */}
            <Grid item md={6}>
              <Typography variant="subtitle1">Company Information</Typography>
              <SimpleShowLayout>
                <TextField source="company" label="Company" />
                <TextField source="billingFirstName" label="Billing First Name" />
                <TextField source="billingLastName" label="Billing Last Name" />
                <TextField source="billingPhone" label="Billing Phone" />
              </SimpleShowLayout>
            </Grid>

            {/* Additional Information Section */}
            <Grid item md={6}>
              <Typography variant="subtitle1">Additional Information</Typography>
              <SimpleShowLayout>
                <TextField source="plan" label="Plan" />
                <TextField source="mode" label="Type" />
                <FunctionField
                  label="Inspection Day"
                  render={(record: any) =>
                    `${record.inspectionDay.day} - ${record.inspectionDay.month} - ${record.inspectionDay.year}`
                  }
                />
                <TextField source="inspectionTime" label="Inspection Time" />
              </SimpleShowLayout>
            </Grid>

            {/* Uploads Section */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Uploads</Typography>
              <SimpleShowLayout>
                <ArrayField source="files" label="">
                  <SimpleList
                    linkType={(record) => record.url}
                    primaryText={record => (
                      <UploadFile record={record} source="url" label={record.name || 'File'} />
                    )}
                    secondaryText={record => {
                      const date = new Date(record.created_at);
                      return `Uploaded on ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}`;
                    }}
                    sx={{
                      bgcolor: 'background.paper',
                      '& .RaSimpleList-secondary': {
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                      }
                    }}
                  />
                </ArrayField>
              </SimpleShowLayout>
            </Grid>
          </Grid>
        </Paper>
      </Show>
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
  // list: {
  //   flexGrow: 1,
  //   transition: theme.transitions.create(["all"], {
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginRight: 0,
  // },
  listWithDrawer: {
    marginRight: 400,
  },
  drawerPaper: {
    zIndex: 100,
  },
}));

export const FormList: FC<ListProps> = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const match = matchPath('/form/:id/show', location.pathname);
  const handleClose = useCallback(() => {
    navigate("/form");
  }, [navigate]);


  return (
    <div className={classes.root}>
      <Fragment>
        <List
          filterDefaultValues={{ mode: "residential" }}
          filters={<Filters />}
          pagination={<FormPagination />}
          {...props}
          sx={{
            flexGrow: 1,
            transition: (theme: any) =>
              theme.transitions.create(['all'], {
                duration: theme.transitions.duration.enteringScreen,
              }),
            marginRight: !!match ? '400px' : 0,
          }}
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
          open={!!match}
          anchor="right"
          onClose={handleClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {!!match && (
            <FormShow
              id={(match as any).params.id}
              onCancel={handleClose}
              {...props}
            />
          )}
        </Drawer>
      </Fragment>
    </div>
  );
};
