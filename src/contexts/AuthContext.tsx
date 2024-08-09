import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

import {
  storageUserGet,
  storageUserRemove,
  storageUserSave,
} from "@storage/storageUser";

export type AuthContextDataProps = {
  user: UserDTO | null;
  isLoadingCachedUserData: boolean;
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
  const [isLoadingCachedUserData, setIsLoadingChachedUserData] = useState(true);

  const { showToast } = useToast();

  async function cachedUserData() {
    try {
      const userStorage = await storageUserGet();
      if (userStorage) {
        setUser(userStorage);
      }
    } catch (error) {
      throw new Error();
    } finally {
      setIsLoadingChachedUserData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password });
      await storageUserSave(data.user);
      setUser(data.user);
    } catch (error) {
      console.error("screens/SignIn.tsx > signIn > error", error);
      if (error instanceof AppError) {
        showToast(error.message);
        return;
      }
    }
  }

  async function signOut() {
    try {
      setIsLoadingChachedUserData(true);
      // await new Promise(resolve => setTimeout(resolve, 3000));
      setUser(null);
      await storageUserRemove();
    } catch (error) {
      console.error("screens/SignIn.tsx > signOut > error", error);
      showToast("Não foi possível sair");
    } finally {
      setIsLoadingChachedUserData(false);
    }
  }
  useEffect(() => {
    cachedUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingCachedUserData,
        signIn: (email, password) => signIn(email, password),
        signOut: () => signOut(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
