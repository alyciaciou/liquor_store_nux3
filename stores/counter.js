import { ref } from "vue";
import { defineStore } from "pinia";
import { useCartApi } from "@/composables/cartApi";

export const useCartNumStore = defineStore("cartNum", () => {
  const { getCartInfo } = useCartApi();
  const cartNum = ref(0);
  const getCartNum = async () => {
    const info = await getCartInfo();
    cartNum.value = info.data.carts.length;
  };

  return { cartNum, getCartNum };
});
