import { toast } from "react-toastify";
import { render, screen, fireEvent } from "@testing-library/react";
import ChangePassword from "./ChangePassword";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

describe("ChangePassword Component", () => {
  beforeEach(() => {
    localStorage.clear();

    localStorage.setItem(
      "all-users",
      JSON.stringify([
        { name: "hamid", password: "666666" },
        { name: "ali", password: "7777777" },
      ]),
    );
    localStorage.setItem("confirmed-user", "hamid");
  });

  test("renders change password button", () => {
    render(<ChangePassword userData={{}} />);
    expect(screen.getByText("تغییر رمز عبور")).toBeInTheDocument();
  });

  test("shows input when clicking change password", () => {
    render(<ChangePassword userData={{}} />);

    fireEvent.click(screen.getByText("تغییر رمز عبور"));

    expect(
      screen.getByPlaceholderText("رمز جدید را وارد کنید"),
    ).toBeInTheDocument();
  });

  test("updates password in localStorage", () => {
    render(<ChangePassword userData={{}} />);

    fireEvent.click(screen.getByText("تغییر رمز عبور"));

    const input = screen.getByPlaceholderText("رمز جدید را وارد کنید");
    fireEvent.change(input, { target: { value: "999999" } });

    fireEvent.click(screen.getByText("تغییر"));

    const storedUsers = JSON.parse(localStorage.getItem("all-users") || "[]");
    const confirmedUser = localStorage.getItem("confirmed-user");
    const selectedUser = storedUsers.find((u: any) => u.name === confirmedUser);
    expect(selectedUser?.password).toBe("999999");
  });

  test("calls toast success after change password", () => {
    render(<ChangePassword userData={{}} />);

    fireEvent.click(screen.getByText("تغییر رمز عبور"));

    const input = screen.getByPlaceholderText("رمز جدید را وارد کنید");
    fireEvent.change(input, { target: { value: "999999" } });

    fireEvent.click(screen.getByText("تغییر"));

    expect(toast.success).toHaveBeenCalledWith("تغییر رمز با موفقیت انجام شد.");
  });
});
