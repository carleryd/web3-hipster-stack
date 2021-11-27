import * as React from "react";
import * as ReactDOM from "react-dom";
import { Home } from "./components/home";
// TypeScript imports all CSS from here, then Rollup generates CSS from this file.
import "./styles.css";

ReactDOM.render(<Home />, document.getElementById("root"));
