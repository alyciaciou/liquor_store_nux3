import { ref } from "vue";
import { defineStore } from "pinia";
import { useProductApi } from "@/composables/productApi";

export const useAllProductsStore = defineStore("allProducts", () => {
    const { getAllProducts } = useProductApi();
    const allProducts = ref(null);
    const getProducts = async () => {
        const productsInfo = await getAllProducts();
        allProducts.value = productsInfo.products;
    };

    return { allProducts, getProducts };
});
