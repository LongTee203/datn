export type UserRole = "admin" | "customer";

export interface MockUser {
  id: string;
  email: string;
  password: string; // plain-text for demo only
  role: UserRole;
  name: string;
  avatar: string; // initials
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    email: "admin@gmail.com",
    password: "1",
    role: "admin",
    name: "Admin",
    avatar: "A",
  },
  {
    id: "2",
    email: "long@gmail.com",
    password: "1",
    role: "customer",
    name: "Long",
    avatar: "L",
  },
];

export function findUser(email: string, password: string): MockUser | null {
  return (
    MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    ) ?? null
  );
}
