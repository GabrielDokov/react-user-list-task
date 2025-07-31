import UserList from "./UserList";
import renderWithProviders from "../../renderWithProviders";
import { usersMock } from "../../mocks/userMock";
import { UsersState } from "../../features/slices/userInfoSlice";

jest.mock("react-router", () => ({
  useNavigate: () => jest.fn(),
}));

const userInfo: UsersState = {
  users: usersMock,
  isLoading: false,
};

describe("components > UserList", () => {
  it("should match the snapshot with no data", async () => {
    const { asFragment } = renderWithProviders(<UserList />, {
      preloadedState: { userInfo },
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it("should match the snapshot with data from redux", async () => {
    const { asFragment } = renderWithProviders(<UserList />, {
      preloadedState: { userInfo },
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
