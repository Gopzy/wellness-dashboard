import { store } from "../../store";
import { setCredentials } from "../../store/reducer/authSlice";

// function to persist the logged in user by restore auth session
export const restoreAuthSession = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      const parsedUser = JSON.parse(user);
      store.dispatch(setCredentials({ token, user: parsedUser }));
    } catch {
      localStorage.removeItem("user");
    }
  }
};
