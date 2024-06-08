import "@/mocks/htmlElementHeight";
import { fakeDB, handlers } from "@/mocks/serverResponse.mock";
import "@testing-library/jest-dom";
import { setupServer } from "msw/node";

export const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  fakeDB.reset();
});

afterAll(() => server.close());
