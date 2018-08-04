import pingResolver from "../src/pingResolver";

test('should create server', () => {
      expect(pingResolver).toMatchSnapshot();
})