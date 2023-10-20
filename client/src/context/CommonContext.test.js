import { renderHook, act } from "@testing-library/react-hooks";
import { ToastContextProvider } from "./ToastContext";
import { CommonContextProvider, useCommonContext } from "./CommonContext";

describe("CommonContextProvider", () => {
  // it("should set data state when setData is called", () => {
  //   const wrapper = ({ children }) => (
  //     <ToastContextProvider>
  //       <CommonContextProvider>{children}</CommonContextProvider>
  //     </ToastContextProvider>
  //   );
  //   const { result } = renderHook(() => useCommonContext(), { wrapper });

  //   act(() => {
  //     result.current.setData([{ id: 1, name: "John" }]);
  //   });

  //   expect(result.current.data).toEqual([{ id: 1, name: "John" }]);
  // });

  // it("should set isSearchPressed state when setIsSearchPressed is called", () => {
  //   const wrapper = ({ children }) => (
  //     <ToastContextProvider>
  //       <CommonContextProvider>{children}</CommonContextProvider>
  //     </ToastContextProvider>
  //   );
  //   const { result } = renderHook(() => useCommonContext(), { wrapper });

  //   act(() => {
  //     result.current.setIsSearchPressed(true);
  //   });

  //   expect(result.current.isSearchPressed).toBe(true);
  // });

  // it("should call topUpAccount API and show success toast message", async () => {
  //   const wrapper = ({ children }) => (
  //     <ToastContextProvider>
  //       <CommonContextProvider>{children}</CommonContextProvider>
  //     </ToastContextProvider>
  //   );
  //   const { result } = renderHook(() => useCommonContext(), { wrapper });

  //   const amount = 100;
  //   const type = "credit";
  //   const userID = 1;

  //   const mockResponse = { success: true };
  //   jest.spyOn(global, "fetch").mockImplementation(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve(mockResponse),
  //     })
  //   );

  //   await act(async () => {
  //     const response = await result.current.topUpAccount(amount, type, userID);
  //     expect(response).toEqual(mockResponse);
  //   });

  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith(
  //     `http://localhost:9000/api/addTransaction/${userID}`,
  //     expect.objectContaining({
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ amount, type }),
  //     })
  //   );
  //   expect(result.current.toast.success).toHaveBeenCalledWith(
  //     "Payment Successful"
  //   );

  //   global.fetch.mockRestore();
  // });

  // it("should call getPermenantUserId API and return response", async () => {
  //   const wrapper = ({ children }) => (
  //     <ToastContextProvider>
  //       <CommonContextProvider>{children}</CommonContextProvider>
  //     </ToastContextProvider>
  //   );
  //   const { result } = renderHook(() => useCommonContext(), { wrapper });

  //   const mockResponse = { id: 1 };
  //   jest.spyOn(global, "fetch").mockImplementation(() =>
  //     Promise.resolve({
  //       json: () => Promise.resolve(mockResponse),
  //     })
  //   );

  //   await act(async () => {
  //     const response = await result.current.getPermenantUserId();
  //     expect(response).toEqual(mockResponse);
  //   });

  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith(
  //     `http://localhost:9000/api/getPassengerByUserId`,
  //     expect.objectContaining({
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //   );

  //   global.fetch.mockRestore();
  // });
});