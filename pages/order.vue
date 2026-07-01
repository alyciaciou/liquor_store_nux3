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
                    <h2 class="text-6xl font-bold mb-4">訂單內容</h2>
                </div>
            </div>
        </header>
        <main class="container mx-auto p-6 lg:p-24 mb-6">
            <div class="flex flex-col gap-8 py-8 lg:flex-row lg:items-stretch lg:justify-between">
                <div class="flex w-full min-h-0 flex-col lg:w-[48%]">
                    <h3 class="mb-6 shrink-0 text-center text-2xl font-bold lg:text-start">訂單內容</h3>
                    <div v-if="info" class="flex min-h-0 flex-1 flex-col overflow-hidden border-t-2">
                        <table class="w-full shrink-0 border-b-2">
                            <thead class="bg-[#272626e8] text-center">
                                <tr>
                                    <th class="w-[25%] p-4"></th>
                                    <th class="w-[35%] p-4">品項</th>
                                    <th class="w-[15%] p-4">數量</th>
                                    <th class="w-[25%] p-4">價格</th>
                                </tr>
                            </thead>
                        </table>
                        <div class="min-h-0 overflow-y-auto max-h-[60vh] border-b-2">
                            <table class="w-full">
                                <tbody class="text-center">
                                    <tr class="border-b-2" v-for="item in info.carts" :key="item.id">
                                        <td class="w-[25%] p-4 align-middle">
                                            <img
                                                class="mx-auto max-h-[120px] w-auto rounded-lg object-cover"
                                                :src="item.product.imageUrl"
                                                :alt="item.product.title" />
                                        </td>
                                        <td class="w-[35%] p-4 align-middle text-center">
                                            {{ item.product.title }}
                                        </td>
                                        <td class="w-[15%] p-4 align-middle text-center">{{ item.qty }}</td>
                                        <td class="w-[25%] p-4 align-middle text-center">NT${{ item.total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <p v-if="info" class="mt-auto shrink-0 p-4 text-right text-2xl">
                        <strong>總計：</strong>NT${{ info.final_total }}
                    </p>
                </div>

                <div class="flex w-full flex-col lg:w-[48%]">
                    <h3 class="mb-6 shrink-0 text-2xl font-bold">
                        填寫訂購資訊
                        <small class="text-red-500"> ( * 為必填資訊)</small>
                    </h3>
                    <VForm class="flex flex-1 flex-col" @submit="confirmOrden">
                        <div class="mb-4">
                            <label for="email" class="mb-1">
                                Email
                                <span class="text-red-500">*</span>
                            </label>
                            <VField
                                rules="required|email"
                                v-model="orderInfo.email"
                                id="email"
                                type="email"
                                class="w-full rounded p-1 text-black mb-2"
                                placeholder="請輸入 Email"
                                name="email" />
                            <ErrorMessage class="text-red-500" name="email" />
                        </div>
                        <div class="mb-4">
                            <label for="name" class="mb-1">
                                收件人姓名
                                <span class="text-red-500">*</span>
                            </label>
                            <VField
                                rules="required"
                                v-model="orderInfo.name"
                                id="name"
                                type="text"
                                class="w-full rounded p-1 text-black mb-2"
                                placeholder="請輸入姓名"
                                name="name" />
                            <ErrorMessage class="text-red-500" name="name" />
                        </div>
                        <div class="mb-4">
                            <label for="tel" class="mb-1">
                                收件人電話
                                <span class="text-red-500">*</span>
                            </label>
                            <VField
                                rules="required|numeric|min:8"
                                v-model="orderInfo.tel"
                                id="tel"
                                type="text"
                                class="w-full rounded p-1 text-black mb-2"
                                placeholder="請輸入電話"
                                name="tel" />
                            <ErrorMessage class="text-red-500" name="tel" />
                        </div>
                        <div class="mb-4">
                            <label for="address" class="mb-1">
                                收件人地址
                                <span class="text-red-500">*</span>
                            </label>
                            <VField
                                rules="required"
                                v-model="orderInfo.address"
                                id="address"
                                type="text"
                                class="w-full rounded p-1 text-black mb-2"
                                placeholder="請輸入地址"
                                name="address" />
                            <ErrorMessage class="text-red-500" name="address" />
                        </div>
                        <div class="mb-4">
                            <label for="message" class="mb-1"> 留言 </label>
                            <textarea
                                v-model="orderInfo.message"
                                id="message"
                                class="w-full rounded-lg p-1 text-black"
                                cols="30"
                                rows="10"></textarea>
                        </div>

                        <div class="mt-auto flex flex-col items-center justify-between text-center md:flex-row">
                            <NuxtLink
                                to="/cart"
                                class="border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-full md:w-[35%] mb-4">
                                上一步
                            </NuxtLink>
                            <button
                                type="submit"
                                class="border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-full md:w-[35%] mb-4">
                                送出訂單
                            </button>
                        </div>
                    </VForm>
                </div>
            </div>
        </main>

        <TheFooter />
    </div>
</template>

<script setup lang="ts">
    //api
    import { useCartApi } from '@/composables/cartApi';
    import { useOrderApi } from '@/composables/order';

    //vee-validate
    import { Field as VField, Form as VForm, ErrorMessage } from 'vee-validate';

    const { submitOrder } = useOrderApi();
    const { getCartInfo } = useCartApi();

    interface CartProduct {
        brand: string;
        category: string;
        content: string;
        description: string;
        id: string;
        imageUrl: string;
        is_enabled: number;
        num: number;
        origin_price: number;
        price: number;
        title: string;
        type: string;
        unit: string;
    }

    interface CartItem {
        final_total: number;
        id: string;
        product_id: string;
        qty: number;
        total: number;
        product: CartProduct;
    }

    interface CartInfo {
        carts: CartItem[];
        final_total: number;
        total: number;
    }

    const router = useRouter();
    const isLoading = ref(true);
    const info = ref<CartInfo | null>(null);

    const orderInfo = ref({
        email: '',
        name: '',
        tel: '',
        address: '',
        message: '',
    });

    const confirmOrden = async () => {
        const data = {
            data: {
                user: {
                    name: orderInfo.value.name,
                    email: orderInfo.value.email,
                    tel: orderInfo.value.tel,
                    address: orderInfo.value.address,
                },
                message: orderInfo.value.message,
            },
        };
        isLoading.value = true;
        try {
            const res = await submitOrder(data);
            isLoading.value = false;
            router.push(`/checkout/${res.orderId}`);
        } catch (error) {
            console.error('submitOrder error:', error);
        }
    };

    onMounted(async () => {
        try {
            const res = await getCartInfo();
            isLoading.value = false;
            info.value = res.data;
        } catch (error) {
            console.error('getCartInfo error:', error);
        }
    });
</script>
