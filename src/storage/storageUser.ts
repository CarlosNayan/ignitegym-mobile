import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserDTO } from "@dtos/UserDTO";
import { USER_STORAGE } from "@storage/storageConfig";

export async function storageUserSave(user: UserDTO) {
  const userJSON = JSON.stringify(user);
  await AsyncStorage.setItem(USER_STORAGE, userJSON);
}

export async function storageUserGet() {
  const userJSON = await AsyncStorage.getItem(USER_STORAGE);
  if (!userJSON) return null;
  const user = JSON.parse(userJSON) as UserDTO;
  return user;
}
