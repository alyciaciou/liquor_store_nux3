<template>
    <div class="bg-[#070707f0] text-white">
      <TheNavbar />
      <div
        v-if="isLoading"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      >
        <img class="h-16 w-16" src="/Rolling-1s-150px.gif" alt="loading" />
      </div>
      <header>
        <div
          class="h-[500px] bg-cover bg-center flex flex-col items-center justify-center text-center opacity-85"
          style="
            background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709970405629.jpg);
          "
        >
          <div class="">
            <h2 class="text-6xl font-bold mb-4">商品細節</h2>
          </div>
        </div>
      </header>
      <main class="container mx-auto p-6 md:p-24 mb-6">
        <div class="py-8 text-center flex flex-col md:flex-row items-center justify-between">
          <img
            class="object-cover block w-[70%] md:w-[48%] h-[50%] rounded-lg mb-6 md:mb-0"
            :src="info.imageUrl"
            :alt="info.title"
          />
  
          <div class="w-[70%] md:w-[48%]">
            <p class="text-4xl mb-10 font-bold">{{ info.title }}</p>
            <p class="mb-2">{{ info.description }}</p>
            <ul class="mb-2">
              <li v-for="item in content" :key="item">{{ item }}</li>
            </ul>
            <p class="mb-8">
              <strong>售價:NT${{ info.price }}</strong> <del>原價:NT${{ info.origin_price }}</del>
            </p>
  
            <div
              class="cart-item flex flex-col md:flex-row justify-center md:justify-between items-center border-b pb-4"
            >
              <div class="w-[60%] md:w-[40%] border-2 rounded-lg mb-4 md:mb-0">
                <button
                  @click="minusNum"
                  class="hover:bg-white hover:text-black duration-500 font-extrabold text-white py-2 rounded-l-lg w-[20%] text-center"
                  type="button"
                >
                  -
                </button>
                <input v-model="currentNum" type="text" class="text-center bg-gray-800 p-2 w-[60%]" />
                <button
                  @click="addNum"
                  class="hover:bg-white hover:text-black duration-500 font-extrabold text-white py-2 rounded-r-lg w-[20%] text-center"
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                @click="addProduct"
                type="button"
                class="w-[60%] md:w-[40%] item-name border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </main>
  
      <TheFooter />
    </div>
  </template>
  
  <script setup>
  
  import { useRoute } from 'vue-router'
  import { useCartNumStore } from '@/stores/counter'
  import { useSweetAlert } from '@/composables/useSweetAlert'
  import { ref, onMounted, watch } from 'vue'
  
  //api
  import { getProductInfo } from '@/composables/productApi'
  import { addTocart } from '@/composables/cartApi'
  
  const { successMsg } = useSweetAlert()
  const route = useRoute()
  const cartStore = useCartNumStore()
  const isLoading = ref(true)
  
  const info = ref('')
  const content = ref('')
  const currentNum = ref(1)
  
  const addNum = () => {
    currentNum.value += 1
  }
  
  const minusNum = () => {
    currentNum.value = Math.max(1, currentNum.value - 1)
  }
  
  watch(currentNum, (newValue) => {
    const parsedValue = parseInt(newValue, 10)
    currentNum.value = isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue
  })
  
  const addProduct = async () => {
    currentNum.value = parseInt(currentNum.value)
    const info = {
      data: {
        product_id: route.params.id,
        qty: currentNum.value
      }
    }
    isLoading.value = true
    try {
      await addTocart(info)
      isLoading.value = false
      cartStore.getCartNum()
      successMsg()
    } catch (error) {}
  }
  
  onMounted(async () => {
    try {
      const res = await getProductInfo(route.params.id)
      isLoading.value = false
      info.value = res.product
      content.value = info.value.content.split(';')
    } catch (error) {}
  })
  </script>
  
  <style>
  .swal2-popup {
    position: absolute;
    top: 12%;
  }
  </style>
  