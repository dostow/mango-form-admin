import * as React from "react";
import { useSelector } from "react-redux";
import { Layout, LayoutProps } from "react-admin";
import AppBar from "./AppBar";
// import Menu from "./Menu";
import { darkTheme, lightTheme } from "./themes";
import { AppState } from "../types";

// const CustomSidebar = (props: any) => <Sidebar {...props} size={200} />;

const DefaultLayout = (props: LayoutProps) => {
  const theme = useSelector((state: AppState) =>
    state.theme === "dark" ? darkTheme : lightTheme
  );
  return (
    <Layout
      {...props}
      appBar={AppBar}
      //   sidebar={CustomSidebar}
      //   menu={Menu}
      theme={theme}
    />
  );
};
export default DefaultLayout;
