import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";

import { Fixtures } from "./Fixtures";

describe("Fixtures component", () => {
  it("should render loading while fetching", () => {
    render(
      <MockedProvider mocks={[]} useTypeName={false}>
        <Fixtures id={1} mocks={[]} />
      </MockedProvider>
    );
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
