import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import EmployeesPageContent from "@/components/EmployeesPageContent";
import { getAllEmployees } from "@/lib/employees";
export default async function EmployeesPage() {
  const queryClient = new QueryClient();
  const page = 1;
  const searchQuery = null;
  await queryClient.prefetchQuery({
    queryKey: ["allEmployees", page, searchQuery],
    queryFn: () => getAllEmployees(page, searchQuery),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EmployeesPageContent />
    </HydrationBoundary>
  );
}
