import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getAllProducts, getProductById,deleteProduct, getMyProducts, updateProduct } from "../lib/api";

export const useProducts = () => {
  const result = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return result;
};


export const useCreateProduct = () => {
    const result =  useMutation({mutationFn : createProduct})
    return result;
}

// here needs id , because we need to fetch the data of the specific product,
// if id is not there or false or undefined then dont fetch

export const useProduct = (id) => {
    const result = useQuery({
        queryKey : ["product",id],
        queryFn : () => getProductById(id),
        // this expects boolean
        // enabled mean dont fetch data until the id is true
        // if id is not there or false or undefined then dont fetch
        enabled :Boolean(id)

    })

    return result;
}


// why dont i need id here
// => because we call this function when user click the delete button.
// => and we pass the id to the deleteProduct function
// so the id will be passed. when call the useDeleteProduct()
export const useDeleteProduct = () => {
    const result = useMutation({
        mutationFn: deleteProduct
    })
    return result;
}

export const useMyProducts = () => {
    return useQuery({
        queryKey : ["myProducts"],
        queryFn : getMyProducts
    })
}


export const useUpdateProduct = () => {

    const queryClient = useQueryClient();

    // use cache invalidate to update the data of the specific product when user updates it
    return useMutation({
        mutationFn : updateProduct,
        onSuccess : (_, variables) => {
            // invalidate because first does => 
                // first homepage product lists
            queryClient.invalidateQueries({queryKey : ["products"]});
                // then product page => detail page
            queryClient.invalidateQueries({queryKey : ["product", variables.id]})
                // then profile page => user's products page
            queryClient.invalidateQueries({queryKey : ["myProducts"]})

        }
       
});
}
