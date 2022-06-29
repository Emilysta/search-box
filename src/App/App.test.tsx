import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
const data = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  }]
const initOkRespone = { "status": 200, "statusText": "", "ok": true };

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders without errors', () => {
  render(<App />);
});

test('if loading exists', async () => {
  render(<App />);
  const divElement = screen.getByTestId(/loadingTest/);
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveTextContent('Loading data...');
});

test('if data exists', async () => {
  global.fetch = jest.fn().mockResolvedValue(
    new Response(JSON.stringify(data), initOkRespone)
  );
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByTestId(/loadingTest/));
  const divElement = screen.getByTestId(/dataTest/);
  expect(divElement).toBeInTheDocument();
});

test('if error exists', async () => {
  global.fetch = jest.fn().mockResolvedValue(
    Promise.reject()
  );
  render(<App />);
  await waitForElementToBeRemoved(() => screen.queryByTestId(/loadingTest/));
  const divElement = screen.getByTestId(/errorTest/);
  expect(divElement).toBeInTheDocument();
  expect(divElement).toHaveTextContent('Ops. Something went wrong.');
});

