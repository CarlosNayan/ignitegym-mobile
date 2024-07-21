import { Image, ImageProps } from "react-native";

type props = ImageProps & {
  size: number;
  marginRight?: number;
};

export function UserPhoto({ size, ...rest }: props) {
  return <Image width={size} height={size} {...rest} borderRadius={100} />;
}
