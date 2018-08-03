import * as React from "react";
import * as ReactDOM from "react-dom"
import { DataProvider } from "@gsox/client";
import { Ping } from "./types";

ReactDOM.render(<DataProvider inject={new Ping()} />, document.getElementById('content'));