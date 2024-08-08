import { api } from "@services/api";
import { createContext, ReactNode, useState } from "react";
import { UserDTO } from "src/dto/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null);

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar,
      });
    } catch (error) {
      console.error("screens/SignIn.tsx > signIn > error", error);
      if (error instanceof Error) {
        alert("Email ou senha inválidos");
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn: (email, password) => signIn(email, password),
        signOut: () => Promise.resolve(setUser(null)),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
