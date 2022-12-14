import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

export const renderWithApollo = (Component, mocks) => {
  const component = render(() => (
    <MockedProvider mocks={mocks} useTypeName={false}>
      <Component />
    </MockedProvider>
  ));

  return component;
};
