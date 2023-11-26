import React from "react";
import { expect, test } from "vitest";
import { render } from "@testing-library/react";

import App from "../App";

test("renders without crashing", () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
