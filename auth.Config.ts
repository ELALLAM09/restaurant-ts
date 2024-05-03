import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { schemaSignin } from "./lib/schema";

interface User {
  email: string;
}

export default {
  providers: [
    Credentials({
      async authorize(
        credentials: Partial<Record<string | number, unknown>>,
        request: Request
      ): Promise<User | null> {
        if (!credentials) return null;

        const validation = schemaSignin.safeParse(credentials);

        const defaultEmail = "johnDoe@company.com";
        const defaultPassword = "123456";

        if (validation.success) {
          const { email, password } = validation.data;

          if (defaultEmail !== email || defaultPassword !== password)
            return null;

          return {
            email: defaultEmail,
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
