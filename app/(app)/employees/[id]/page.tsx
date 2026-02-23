import { getSingleEmployee } from "@/lib/employees";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import SingleEmployeePageContent from "@/components/SingleEmployeePageContent";
export default async function EmployeDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["singleEmployee", id],
    queryFn: () => getSingleEmployee(Number(id)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleEmployeePageContent id={Number(id)} />
    </HydrationBoundary>
  );
}
