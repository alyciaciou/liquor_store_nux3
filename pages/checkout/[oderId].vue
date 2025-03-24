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
            background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709970502446.jpg);
          "
        >
          <div class="">
            <h2 class="text-6xl font-bold mb-4">訂單明細</h2>
          </div>
        </div>
      </header>
      <main class="container mx-auto p-6 md:p-24 mb-6 text-center">
        <section class="py-8">
          <div class="flex flex-col justify-center items-center mb-10">
            <div class="w-[92%] mb-10">
              <h3 class="mb-6 font-bold text-2xl">明細</h3>
              <table class="border-t-2 w-full">
                <thead class="bg-[#272626e8] border-b-2">
                  <tr>
                    <th class="p-4"></th>
                    <th class="p-4">品項</th>
                    <th class="p-4">數量</th>
                    <th class="p-4">價格</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr class="border-b-2" v-for="(item, index) in info.products" :key="index">
                    <td class="w-[25%] md:w-[15%]">
                      <img :src="item.product.imageUrl" :alt="item.product.title" />
                    </td>
                    <td class="w-[25%]">{{ item.product.title }}</td>
                    <td class="w-[25%]">{{ item.qty }}</td>
                    <td class="w-[25%]">NT${{ item.total }}</td>
                  </tr>
                </tbody>
                <tfoot class="text-right">
                  <tr>
                    <td colspan="4" class="p-4 text-2xl">
                      <strong>總計：</strong>NT${{ info.total }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
  
            <div class="w-[92%] md:w-[60%] flex justify-center">
              <table class="border-t-2 w-full">
                <tbody v-if="info" class="text-center p-2">
                  <tr class="border-b-2">
                    <th class="p-2">訂單編號</th>
                    <td class="p-2">{{ info.id }}</td>
                  </tr>
                  <tr class="border-b-2">
                    <th class="p-2">電子郵件</th>
                    <td class="p-2">{{ info.user.email }}</td>
                  </tr>
                  <tr class="border-b-2">
                    <th class="p-2">姓名</th>
                    <td class="p-2">{{ info.user.name }}</td>
                  </tr>
                  <tr class="border-b-2">
                    <th class="p-2">電話</th>
                    <td class="p-2">{{ info.user.tel }}</td>
                  </tr>
                  <tr class="border-b-2">
                    <th class="p-2">地址</th>
                    <td class="p-2">{{ info.user.address }}</td>
                  </tr>
                  <tr class="border-b-2">
                    <th class="p-2">備註</th>
                    <td class="p-2">{{ info.message }}</td>
                  </tr>
                  <tr class="border-b-2">
                    <th class="p-2">付款狀態</th>
                    <td v-if="!info.is_paid" class="p-2 text-red-600">未付款</td>
                    <td v-else class="p-2">已付款</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <button
            v-if="!info.is_paid"
            @click="verifyPayment"
            type="button"
            class="border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-[50%] md:w-[40%] mb-4"
          >
            確認付款
          </button>
  
          <router-link v-else :to="{ path: '/products', query: { type: '全部' } }">
            <button
              type="button"
              class="border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-[50%] md:w-[40%] mb-4"
            >
              繼續購物
            </button>
          </router-link>
        </section>
      </main>
  
      <TheFooter />
    </div>
  </template>
  
  <script setup>
  
  import { useRoute } from 'vue-router'
  import { ref, onMounted } from 'vue'
  
  //api
  import { getOrder } from '@/composables/order'
  import { confirmPayment } from '@/composables/payment'
  
  const route = useRoute()
  const isLoading = ref(true)
  const info = ref('')
  
  const verifyPayment = async () => {
    isLoading.value = true
    try {
      await confirmPayment(route.params.oderId)
      info.value.is_paid = true
      isLoading.value = false
    } catch (error) {}
  }
  
  onMounted(async () => {
    try {
      const res = await getOrder(route.params.oderId)
      isLoading.value = false
      info.value = res.order
    } catch (error) {}
  })
  </script>
  