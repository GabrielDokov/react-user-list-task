import { render, waitFor } from "@testing-library/react";
import AppLayout from "./AppLayout";

jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
  Outlet: () => null,
}));

describe("components > AppLayout", () => {
  it("should match the snapshot", async () => {
    const { asFragment } = render(<AppLayout />);

    await waitFor(() => {
      expect(asFragment()).toBeTruthy();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
