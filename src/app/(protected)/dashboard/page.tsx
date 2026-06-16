import { UserMenuWithSession } from "@/features/auth/components/user-menu";

export default function Dashboard() {
  return (
    <div>
      <UserMenuWithSession variant="profile" />
      Hello world
    </div>
  );
}
