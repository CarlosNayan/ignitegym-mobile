import AsyncStorage from "@react-native-async-storage/async-storage";
import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export async function storageAuthTokenSave(token: string) {
  const tokenJSON = JSON.stringify(token);
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, tokenJSON);
}

export async function storageAuthTokenGet(): Promise<string | null> {
  const tokenJSON = await AsyncStorage.getItem(AUTH_TOKEN_STORAGE);
  if (!tokenJSON) return null;
  const token = JSON.parse(tokenJSON) as string;
  return token;
}

export async function storageAuthTokenRemove() {
  await AsyncStorage.removeItem(AUTH_TOKEN_STORAGE);
}
