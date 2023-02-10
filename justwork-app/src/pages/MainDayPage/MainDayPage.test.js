import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import MainDayPage from "./MainDayPage";

describe("MainDayPage renders and has the correct coloumns and values", () => {
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              exercises: [],
              title: "Mock Title1",
              description: "Mock Description1",
            },
            {
              id: 2,
              exercises: [],
              title: "Mock Title2",
              description: "Mock Description2",
            },
          ]),
      })
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should display the description column and the values correctly.", async () => {
    const history = createMemoryHistory(); // we need to define a mock history to the router
    render(
      <MemoryRouter history={history}> 
        <MainDayPage />
      </MemoryRouter>
    );// MemoryRouter is more performant for tests

    const description = await screen.findAllByTestId("IndividualDayDescription");
    expect(description[0].textContent).toBe("Mock Description1");
    expect(description[1].textContent).toBe("Mock Description2");
  });

  it("should display the title column and the values correctly.", async () => {
    const history = createMemoryHistory(); // we need to define a mock history to the router
    render(
      <MemoryRouter history={history}> 
        <MainDayPage />
      </MemoryRouter>
    );// MemoryRouter is more performant for tests

    const title = await screen.findAllByTestId("IndividualDayTitle")
    expect(title[0].textContent).toBe("Mock Title1");
    expect(title[1].textContent).toBe("Mock Title2");
  });

  it("should display the id column and the values correctly.", async () => {
    const history = createMemoryHistory(); // we need to define a mock history to the router
    render(
      <MemoryRouter history={history}> 
        <MainDayPage />
      </MemoryRouter>
    );// MemoryRouter is more performant for tests

    const id = await screen.findAllByTestId("IndividualDayId")
    expect(id[0].textContent).toBe("1");
    expect(id[1].textContent).toBe("2");
  });
});
