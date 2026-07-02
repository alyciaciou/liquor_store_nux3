import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useProductApi, type Product } from '@/composables/productApi';

export const useAllProductsStore = defineStore('allProducts', () => {
    const { getAllProducts } = useProductApi();
    const allProducts = ref<Product[] | null>(null);

    const getProducts = async () => {
        const productsInfo = await getAllProducts();
        allProducts.value = productsInfo.products;
    };

    return { allProducts, getProducts };
});
