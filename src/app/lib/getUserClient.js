import { authClient } from "./auth-client";

export const useUser = () => {
  const { data: session } = authClient.useSession();
  return session?.user || null;
};
