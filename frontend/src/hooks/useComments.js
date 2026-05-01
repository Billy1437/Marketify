import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, deleteComment } from "../lib/api";

export const useCreateComment = () => {
  // need query client
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: addComment,
    onSuccess: (_, variables) => {
      // why we need this ? => because when we add comment => we need to update ui => so we need to refetch data
      // this tells react query , the cached data associated with "product" and variables.productId key 
      // is no longer valid and should be refetched.
    //   added variables.id because when adding product => we needed variables.id
      queryClient.invalidateQueries({ queryKey: ["product", variables.productId] });
    },
  });
  return result;
};


// this eed id because => to refetch the product data after comment is deleted
// and this use id is from the parent component => productDetail
export const useDeleteComment = (productId) => {
    const queryClient = useQueryClient();
    const result = useMutation({
        mutationFn : deleteComment,
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey : ["product",productId]})
        }
    })
    return result;
}
