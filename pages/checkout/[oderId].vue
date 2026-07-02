<template>
    <div class="bg-[#070707f0] text-white">
        <TheNavbar />
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <img class="h-16 w-16" src="/Rolling-1s-150px.gif" alt="loading" />
        </div>
        <header>
            <div
                class="h-[500px] bg-cover bg-center flex flex-col items-center justify-center text-center opacity-85"
                style="
                    background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709970502446.jpg);
                ">
                <div class="">
                    <h2 class="text-6xl font-bold mb-4">訂單明細</h2>
                </div>
            </div>
        </header>
        <main class="container mx-auto p-6 md:p-24 mb-6 text-center">
            <section class="flex flex-col items-center gap-8 py-8">
                <div class="w-[92%]">
                    <h3 class="mb-6 text-2xl font-bold">明細</h3>
                    <div v-if="info" class="border-t-2">
                        <table class="w-full border-b-2">
                            <thead class="bg-[#272626e8] text-center">
                                <tr>
                                    <th class="w-[25%] p-4"></th>
                                    <th class="w-[35%] p-4">品項</th>
                                    <th class="w-[15%] p-4">數量</th>
                                    <th class="w-[25%] p-4">價格</th>
                                </tr>
                            </thead>
                        </table>
                        <div class="max-h-[50vh] overflow-y-auto border-b-2 md:max-h-[60vh] [scrollbar-gutter:stable]">
                            <table class="w-full">
                                <tbody class="text-center">
                                    <tr class="border-b-2" v-for="(item, index) in info.products" :key="index">
                                        <td class="w-[25%] p-4 align-middle">
                                            <img
                                                class="mx-auto max-h-[120px] w-auto rounded-lg object-cover"
                                                :src="item.product.imageUrl"
                                                :alt="item.product.title" />
                                        </td>
                                        <td class="w-[35%] p-4 align-middle">{{ item.product.title }}</td>
                                        <td class="w-[15%] p-4 align-middle">{{ item.qty }}</td>
                                        <td class="w-[25%] p-4 align-middle">NT${{ item.total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p class="p-4 text-right text-2xl"><strong>總計：</strong>NT${{ info.total }}</p>
                    </div>
                </div>

                <div class="w-[92%] md:w-[60%]">
                    <table v-if="info" class="w-full border-t-2">
                        <tbody class="text-center">
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

                <button
                    v-if="!info?.is_paid"
                    @click="verifyPayment"
                    type="button"
                    class="border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-[50%] md:w-[40%]">
                    確認付款
                </button>

                <NuxtLink
                    v-else
                    :to="{ path: '/products', query: { type: '全部' } }"
                    class="border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-[50%] md:w-[40%]">
                    繼續購物
                </NuxtLink>
            </section>
        </main>

        <TheFooter />
    </div>
</template>

<script setup lang="ts">
    import { useOrderApi, type OrderInfo } from '@/composables/order';
    import { usePaymentApi } from '@/composables/payment';

    const { getOrder } = useOrderApi();
    const { confirmPayment } = usePaymentApi();

    const route = useRoute();
    const isLoading = ref(true);
    const info = ref<OrderInfo | null>(null);

    const verifyPayment = async () => {
        isLoading.value = true;
        try {
            await confirmPayment(String(route.params.oderId));
            if (info.value) info.value.is_paid = true;
            isLoading.value = false;
        } catch (error) {}
    };

    onMounted(async () => {
        try {
            const res = await getOrder(String(route.params.oderId));
            isLoading.value = false;
            info.value = res.order;
        } catch (error) {}
    });
</script>
