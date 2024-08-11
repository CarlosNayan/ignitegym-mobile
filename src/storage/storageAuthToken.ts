import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export type Tokens = {
  token: string;
  refresh_token: string;
};

export async function storageAuthTokenSave(
  token: string,
  refresh_token: string
) {
  const tokenJSON = JSON.stringify({ token, refresh_token });
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, tokenJSON);
}

export async function storageAuthTokenGet(): Promise<Tokens | null> {
  const tokensJSON = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);

  if (!tokensJSON) return null;

  return JSON.parse(tokensJSON);
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
