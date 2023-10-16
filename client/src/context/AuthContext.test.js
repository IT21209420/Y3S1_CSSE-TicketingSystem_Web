import { renderHook, act } from "@testing-library/react-hooks";
import { AuthContextProvider, useAuth } from "./AuthContext";
import { ToastContextProvider } from "./ToastContext";

describe("AuthContext", () => {
  it("should set user on successful login", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <ToastContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </ToastContextProvider>
      ),
    });

    const userData = {
      email: "test@example.com",
      password: "password123",
    };

    // Call the loginUser function with the test user data
    act(() => {
      result.current.loginUser(userData);
    });

    // Wait for the next update to the hook
    await waitForNextUpdate();

    // Check that the user state has been set
    expect(result.current.user).toEqual({
      email: "test@example.com",
      name: "Test User",
    });
  });

  it("should clear user on logout", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <ToastContextProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </ToastContextProvider>
      ),
    });

    // Set the initial user state
    act(() => {
      result.current.setUser({
        email: "test@example.com",
        name: "Test User",
      });
    });

    // Call the logout function
    act(() => {
      result.current.logoutUser();
    });

    // Wait for the next update to the hook
    await waitForNextUpdate();

    // Check that the user state has been cleared
    expect(result.current.user).toBeNull();
  });
});