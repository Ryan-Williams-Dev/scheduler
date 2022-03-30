import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment";

afterEach(cleanup);

describe('Appointment', () => {
  it.skip("renders without crashing", () => {
    render(<Appointment />);
  });
  
});

