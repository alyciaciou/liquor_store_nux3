<template>
    <div
        class="mx-auto p-6 bg-black opacity-90 text-white sticky top-0 z-10 font-bold"
    >
        <nav class="flex items-center justify-between">
            <NuxtLink
                to="/"
                class="cursor-pointer flex items-center duration-300 hover:text-xl"
            >
                <img
                    class="w-14 h-10 object-cover"
                    src="https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709969615623.png"
                />
                <p>Liquor Store</p>
            </NuxtLink>
            <div class="flex items-center justify-center sm:hidden">
                <svg
                    @click="changeMode"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 p-1 cursor-pointer duration-300 hover:scale-150 mr-2"
                    fill="white"
                    viewBox="0 0 448 512"
                >
                    <path
                        d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                    />
                </svg>
                <div class="hover:font-bold">
                    <NuxtLink class="relative" to="/cart">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            class="w-6 h-6 duration-300 hover:scale-150"
                            viewBox="0 0 576 512"
                        >
                            <path
                                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                            />
                        </svg>
                        <span
                            v-if="cartStore.cartNum !== 0"
                            class="absolute bottom-4 right-[-14px] bg-red-600 px-[4px] rounded-full text-sm"
                            >{{ cartStore.cartNum }}</span
                        >
                    </NuxtLink>
                </div>
            </div>
            <ul class="sm:flex items-center justify-between hidden">
                <li
                    class="p-1 mr-2 cursor-pointer duration-300 hover:text-xl"
                    :class="{
                        'bg-slate-300': currentPage === '/about',
                        'text-black': currentPage === '/about',
                        'rounded-sm': currentPage === '/about',
                    }"
                >
                    <NuxtLink to="/about">品牌故事</NuxtLink>
                </li>
                <li
                    class="p-1 mr-2 cursor-pointer duration-300 hover:text-xl"
                    :class="{
                        'bg-slate-300': currentPage === '/products',
                        'text-black': currentPage === '/products',
                        'rounded-sm': currentPage === '/products',
                    }"
                >
                    <NuxtLink
                        :to="{ path: '/products', query: { type: '全部' } }"
                        >系列酒藏</NuxtLink
                    >
                </li>
                <li
                    class="p-1 mr-2 hover:font-bold"
                    :class="{
                        'bg-slate-300': currentPage === '/cart',
                        'text-black': currentPage === '/cart',
                        'rounded-sm': currentPage === '/cart',
                    }"
                >
                    <NuxtLink class="relative" to="/cart">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="white"
                            class="w-6 h-6 duration-300 hover:scale-150"
                            viewBox="0 0 576 512"
                        >
                            <path
                                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
                            />
                        </svg>
                        <span
                            v-if="cartStore.cartNum !== 0"
                            class="absolute bottom-4 right-[-6px] bg-red-600 px-[4px] rounded-full text-sm"
                            >{{ cartStore.cartNum }}</span
                        >
                    </NuxtLink>
                </li>
            </ul>
        </nav>
    </div>
    <ul
        v-if="isSmall"
        class="flex flex-col items-center justify-between mx-auto p-6 bg-black opacity-90 text-white sticky top-[82px] z-10 font-bold"
    >
        <li class="mb-2 cursor-pointer duration-300 hover:text-xl">
            <NuxtLink to="/about">品牌故事</NuxtLink>
        </li>
        <li class="mb-2 cursor-pointer duration-300 hover:text-xl">
            <NuxtLink :to="{ path: '/products', query: { type: '威士忌' } }"
                >系列酒藏</NuxtLink
            >
        </li>
    </ul>
</template>

<script setup>
import { useCartNumStore } from "@/stores/counter";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const cartStore = useCartNumStore();
cartStore.getCartNum();

const currentPage = ref(null);

const route = useRoute();

const isSmall = ref(false);
const changeMode = () => {
    isSmall.value = !isSmall.value;
};

onMounted(() => {
    currentPage.value = route.path;
});
</script>
