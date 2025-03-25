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
            background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709970265168.jpg);
          "
        >
          <div class="">
            <h2 class="text-6xl font-bold mb-4">購物車</h2>
          </div>
        </div>
      </header>
      <main class="container mx-auto p-6 md:p-24 mb-6">
        <table v-if="info !== null && info.carts.length !== 0" class="border-t-2 w-full py-8">
          <thead class="bg-[#272626e8] border-b-2 text-center">
            <tr>
              <th class="p-4">品項</th>
              <th class="p-4 hidden sm:block">單價</th>
              <th class="p-4">數量</th>
              <th class="p-4">小計</th>
              <th class="p-4"></th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr class="border-b-2" v-for="(item, index) in info.carts" :key="item">
              <td class="w-[24%] p-2">
                <div class="flex flex-col items-center justify-between">
                  <img
                    :src="item.product.imageUrl"
                    class="rounded-lg md:h-[200px] md:w-[160px] object-cover mb-2"
                    :alt="item.product.title"
                  />
                  <p class="">{{ item.product.title }}</p>
                </div>
              </td>
              <td class="w-[20%] p-2 hidden sm:table-cell">NT${{ item.product.price }}</td>
              <td class="p-2 w-[24%]">
                <div class="border-2 rounded-lg mb-4 md:mb-0 flex items-center">
                  <button
                    :disabled="item.qty === 1 || isDisabled"
                    @click="minusNum(item, index)"
                    class="duration-500 hover:bg-white hover:text-black font-extrabold text-white py-2 rounded-l-lg w-[20%] text-center min-w-[30px]"
                    type="button"
                  >
                    -
                  </button>
                  <img
                    v-if="isChangeNum && itemIndex === index"
                    class="h-6 w-6 mx-auto"
                    src="/Rolling-1s-150px.gif"
                    alt="loading"
                  />
                  <input
                    @change="changeNum($event, item, index)"
                    v-else
                    :value="item.qty"
                    type="text"
                    class="text-center bg-gray-800 p-2 w-[60%] min-w-[30px]"
                  />
                  <button
                    :disabled="isDisabled"
                    @click="addNum(item, index)"
                    class="duration-500 hover:bg-white hover:text-black font-extrabold text-white py-2 rounded-r-lg w-[20%] text-center min-w-[30px]"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="w-[20%] p-2">NT${{ item.total }}</td>
              <td class="w-[10%] p-2">
                <button @click="deleteItem(item.id)" type="button">
                  <svg
                    class="w-6 h-6"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot class="text-right">
            <tr>
              <td colspan="6" class="p-6 text-3xl">
                <strong>總計：</strong> NT${{ info.final_total }}
              </td>
            </tr>
          </tfoot>
        </table>
  
        <div
          v-if="info !== null && info.carts.length !== 0"
          class="py-8 text-center flex flex-col md:flex-row items-center justify-between"
        >
          <NuxtLink
            :to="{ path: '/products', query: { type: '威士忌' } }"
            class="border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-full md:w-[35%] lg:w-[20%] mb-4"
          >
            繼續購物
          </NuxtLink>
          <NuxtLink
            to="/order"
            class="border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-full md:w-[35%] lg:w-[20%] mb-4"
          >
            下一步
          </NuxtLink>
        </div>
  
        <div v-if="info !== null && info.carts.length === 0" class="py-8 text-center">
          <p class="p-2 text-3xl mb-8">尚未加入商品</p>
          <NuxtLink
            :to="{ path: '/products', query: { type: '全部' } }"
            class="inline-block border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-[60%] md:w-[25%] mb-4"
          >
            前往購物
          </NuxtLink>
        </div>
      </main>
  
      <TheFooter />
    </div>
  </template>
  
  <script setup>
  
  import { useSweetAlert } from '@/composables/useSweetAlert'
  import { ref, onMounted, watch } from 'vue'
  
  //api
  import { useCartApi } from '@/composables/cartApi'

  const { getCartInfo, updateCartItem } = useCartApi()
  const { deleteMsg } = useSweetAlert()
  
  const isLoading = ref(true)
  const isChangeNum = ref(false)
  const itemIndex = ref('')
  const info = ref(null)
  const isDisabled = ref(false)
  
  const addNum = async (item, index) => {
    isDisabled.value = true
    itemIndex.value = index
    item['qty'] += 1
    const data = {
      data: {
        product_id: item['product_id'],
        qty: item['qty']
      }
    }
    isChangeNum.value = true
    try {
      await updateCartItem(item['id'], data)
      const cartInfo = await getCartInfo()
      isChangeNum.value = false
      info.value = cartInfo.data
      isDisabled.value = false
    } catch (error) {}
  }
  
  const minusNum = async (item, index) => {
    isDisabled.value = true
    itemIndex.value = index
    item.qty = Math.max(1, item.qty - 1)
    const data = {
      data: {
        product_id: item['product_id'],
        qty: item['qty']
      }
    }
    isChangeNum.value = true
    try {
      await updateCartItem(item['id'], data)
      const cartInfo = await getCartInfo()
      isChangeNum.value = false
      info.value = cartInfo.data
      isDisabled.value = false
    } catch (error) {
      console.error('Error updating cart item:', error)
      isDisabled.value = false
      isChangeNum.value = false
    }
  }
  
  const changeNum = async (e, item, index) => {
    itemIndex.value = index
    let num = parseInt(e.target.value)
    num = Math.max(1, num)
    const data = {
      data: {
        product_id: item['product_id'],
        qty: num
      }
    }
    isChangeNum.value = true
    try {
      await updateCartItem(item['id'], data)
      const cartInfo = await getCartInfo()
      isChangeNum.value = false
      info.value = cartInfo.data
    } catch (error) {
      console.error('Error updating cart item:', error)
      isChangeNum.value = false
    }
  }
  
  const deleteItem = (cartId) => {
    deleteMsg(info, cartId)
  }
  
  onMounted(async () => {
    try {
      const res = await getCartInfo()
      isLoading.value = false
      info.value = res.data
    } catch (error) {}
  })
  
  watch(
    () => info.value?.carts,
    (newCarts) => {
      if (newCarts) {
        newCarts.forEach((item) => {
          if (item.qty < 1) {
            item.qty = 1
            updateCartItem(item.id, { data: { product_id: item.product_id, qty: 1 } }).catch(
              (error) => console.error('Error updating cart item:', error)
            )
          }
        })
      }
    },
    { deep: true }
  )
  </script>
  