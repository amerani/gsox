import * as React from "react";
import { DataProvider } from "../";

test('should render', () => {
      expect(React.createElement(DataProvider)).toMatchSnapshot();
})

test('should render with props', () => {
      expect(React.createElement(DataProvider, { client:{ }, ws: { } })).toMatchSnapshot();
})