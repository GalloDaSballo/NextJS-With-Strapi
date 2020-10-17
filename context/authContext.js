import { createContext, useContext } from "react";

export const AuthContext = createContext({
  user: null,
  loginUser: () => {},
  logoutUser: () => {},
});

export function useAuth() {
  const { user, loginUser, logoutUser } = useContext(AuthContext);

  return { user, loginUser, logoutUser };
}
