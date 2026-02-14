import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useSubmitExportInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      companyName,
      contactPerson,
      email,
      phone,
      destinationCountry,
      productsOfInterest,
      estimatedQuantity,
      message
    }: {
      companyName: string;
      contactPerson: string;
      email: string;
      phone: string;
      destinationCountry: string;
      productsOfInterest: string[];
      estimatedQuantity: string;
      message: string;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitExportInquiry(
        companyName,
        contactPerson,
        email,
        phone,
        destinationCountry,
        productsOfInterest,
        estimatedQuantity,
        message
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    }
  });
}
