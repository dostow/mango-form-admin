import { ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemIcon, MenuItem, Tooltip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as React from "react";
import { FC, Fragment, ReactElement } from "react";
import { useTranslate } from "react-admin";

const useStyles = makeStyles((theme) => ({
  icon: { minWidth: theme.spacing(5) },
  sidebarIsOpen: {
    "& a": {
      paddingLeft: theme.spacing(3),
      transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
    },
  },
  sidebarIsClosed: {
    "& a": {
      paddingLeft: theme.spacing(2),
      transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
    },
  },
}));

interface Props {
  dense: boolean;
  handleToggle: () => void;
  icon: ReactElement;
  isOpen: boolean;
  name: string;
  sidebarIsOpen: boolean;
}

const SubMenu: FC<Props> = ({
  handleToggle,
  sidebarIsOpen,
  isOpen,
  name,
  icon,
  children,
  dense,
}) => {
  const translate = useTranslate();
  const classes = useStyles();

  const header = (
    <MenuItem dense={dense} button onClick={handleToggle}>
      <ListItemIcon className={classes.icon}>
        {isOpen ? <ExpandMore /> : icon}
      </ListItemIcon>
      <Typography variant="inherit" color="textSecondary">
        {translate(name)}
      </Typography>
    </MenuItem>
  );

  return (
    <Fragment>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        <Tooltip title={translate(name)} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          className={
            sidebarIsOpen ? classes.sidebarIsOpen : classes.sidebarIsClosed
          }
        >
          {children}
        </List>
      </Collapse>
    </Fragment>
  );
};

export default SubMenu;
