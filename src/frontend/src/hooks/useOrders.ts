import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { OrderItem } from '../backend';

export function usePlaceOrder() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      customerName,
      contactDetails,
      shippingAddress,
      items
    }: {
      customerName: string;
      contactDetails: string;
      shippingAddress: string;
      items: OrderItem[];
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.placeOrder(customerName, contactDetails, shippingAddress, items);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    }
  });
}
