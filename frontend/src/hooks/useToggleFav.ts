import { usePictoMutation } from '@/hooks/useQueryExtension';
import { useMutationFeedback } from '@/hooks/useMutationFeedback';
import { togglefav } from '@/api/api-functions/togglefav';
import { useDispatch } from 'react-redux';
import { updateImageFavoriteStatus } from '@/features/imageSlice';
import { useQueryClient } from '@tanstack/react-query';

export const useToggleFav = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const toggleFavouriteMutation = usePictoMutation({
    mutationFn: async (image_id: string) => togglefav(image_id),
    autoInvalidateTags: ['images'],
    onSuccess: async (_data, image_id) => {
      dispatch(updateImageFavoriteStatus(image_id));
      await queryClient.invalidateQueries({ queryKey: ['person-images'] });
    },
  });
  useMutationFeedback(toggleFavouriteMutation, {
    showLoading: false,
    showSuccess: false,
  });
  return {
    toggleFavourite: (id: any) => toggleFavouriteMutation.mutate(id),
    toggleFavouritePending: toggleFavouriteMutation.isPending,
  };
};
