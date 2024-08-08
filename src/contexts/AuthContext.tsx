import { createContext } from "react";
import { UserDTO } from "src/dto/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: 3,
          name: "Carlos",
          email: "carlos@teste.com",
          avatar: "https://github.com/carlosnayan.png",
        },
        signIn: () => Promise.resolve(),
        signOut: () => Promise.resolve(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
