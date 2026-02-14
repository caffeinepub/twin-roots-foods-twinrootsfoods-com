import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Order, ExportInquiry } from '../backend';

export function useAllOrders() {
  const { actor, isFetching } = useActor();

  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching
  });
}

export function useAllExportInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<ExportInquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllExportInquiries();
    },
    enabled: !!actor && !isFetching
  });
}
