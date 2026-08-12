export const dynamic = "force-dynamic";

import OwnProfilePage from "@/Components/Profile/OwnProfilePage";

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return <OwnProfilePage userId={userId} />;
}
