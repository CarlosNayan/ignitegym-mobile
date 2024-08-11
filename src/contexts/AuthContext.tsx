import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
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
  updateUser: (user: UserDTO) => Promise<void>;
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
      const tokenStorage = await storageAuthTokenGet();

      if (tokenStorage && userStorage) {
        api.defaults.headers.common["Authorization"] = `Bearer ${tokenStorage}`;

        setUser(userStorage);
      }
    } catch (error) {
      console.error("screens/SignIn.tsx > cachedUserData > error", error);
      showToast.error("Não foi possível carregar os dados do usuário");
    } finally {
      setIsLoadingChachedUserData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingChachedUserData(true);
      const { data } = await api.post("/sessions", { email, password });

      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      if (data.user && data.token) {
        await storageUserSave(data.user);
        await storageAuthTokenSave(data.token);
        setUser(data.user);
      }
    } catch (error) {
      console.error("screens/SignIn.tsx > signIn > error", error);
      if (error instanceof AppError) {
        showToast.error(error.message);
        return;
      }
    } finally {
      setIsLoadingChachedUserData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingChachedUserData(true);
      setUser(null);
      await storageUserRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      console.error("screens/SignIn.tsx > signOut > error", error);
      showToast.error("Não foi possível sair");
    } finally {
      setIsLoadingChachedUserData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated);
      await storageUserSave(userUpdated);
    } catch (error) {
      console.error("screens/Profile.tsx > updateUserProfile > error", error);
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
        updateUser: (userUpdated) => updateUserProfile(userUpdated),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
