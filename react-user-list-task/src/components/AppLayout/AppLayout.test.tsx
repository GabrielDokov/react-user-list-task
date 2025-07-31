import { waitFor } from "@testing-library/react";
import AppLayout from "./AppLayout";
import renderWithProviders from "../../renderWithProviders";

jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
  Outlet: () => null,
}));

describe("components > AppLayout", () => {
  it("should match the snapshot", async () => {
    const { asFragment } = renderWithProviders(<AppLayout />);

    await waitFor(() => {
      expect(asFragment()).toBeTruthy();
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
