"use client";
import { useSession } from "@/lib/provider";
export default function DashboardPage() {
  const session = useSession();
  if (!session || !session.user) return;

  return <div>{`Hello ${session?.user.name}`}</div>;
}
