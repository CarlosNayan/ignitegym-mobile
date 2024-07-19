import { Center, Spinner } from "native-base";

export function Loading() {
  return (
    <Center h="full" bg="gray.700">
      <Spinner color="green.500" />
    </Center>
  );
}
