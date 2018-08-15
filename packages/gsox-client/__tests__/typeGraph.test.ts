import { build } from "../src/typeGraph";
import * as types from "./types";

let typeGraph;
beforeEach(() => {
      typeGraph = build([...Object.values(types)]);
});

test('should build typegraph', () => {
      expect(typeGraph.Complex).not.toBeNull();
      expect(typeGraph.Alert).not.toBeNull();
      expect(typeGraph).toMatchSnapshot();
});

test('Complex should have Alert and children', () => {
      const complex = typeGraph.Complex;
      expect(complex).not.toBeNull();
      const alert = complex.filter(x => x.type === "Alert");
      expect(alert).toHaveLength(1);
      expect(alert[0].children.length).toBeGreaterThanOrEqual(1);
      expect(alert).toMatchSnapshot();
})

test('Alert should have AlertType', () => {
      const complex = typeGraph.Complex;
      const alert = complex.filter(x => x.type === "Alert")[0];
      expect(alert.children.length).toBeGreaterThanOrEqual(1);
      const alertType = alert.children.filter(x => x.type === "AlertType");
      expect(alertType).toHaveLength(1);
      expect(alertType[0].children.length).toBeGreaterThanOrEqual(1);
      expect(alert.children).toMatchSnapshot();
})