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
                    background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709969444587.jpg);
                "
            >
                <div class="">
                    <h2 class="text-6xl font-bold mb-4">系列酒藏</h2>
                </div>
            </div>
        </header>
        <main class="container mx-auto p-6 md:p-24 mb-6">
            <ul
                class="py-8 text-center flex items-center justify-center w-full"
            >
                <li class="w-[40%]">
                    <select
                        @change="changeType"
                        class="bg-[#535252f2] w-[80%] md:w-[50%] p-2 rounded-lg"
                    >
                        <option
                            :selected="selectedType === item"
                            v-for="item in type"
                            :key="item"
                            :value="item"
                        >
                            {{ item }}
                        </option>
                    </select>
                </li>
                <li class="w-[40%]">
                    <select
                        v-model="brand"
                        @change="changeBrand"
                        class="bg-[#535252f2] w-[80%] md:w-[50%] p-2 rounded-lg"
                    >
                        <option selected value="全部">全部</option>
                        <option
                            v-for="item in selectType[selectedType]"
                            :key="item"
                            :value="item"
                        >
                            {{ item }}
                        </option>
                    </select>
                </li>
            </ul>

            <div
                class="py-8 text-center w-full flex items-center justify-start flex-col md:flex md:flex-row flex-wrap"
            >
                <div
                    v-for="item in productsList"
                    :key="item.id"
                    class="md:w-[28%] lg:w-[24%] w-[80%] mb-6 mr-2"
                >
                    <NuxtLink
                        :to="{
                            path: `product/${item.id}`,
                            query: { type: item.category },
                        }"
                    >
                        <div
                            class="flex flex-col items-center justify-between p-2 bg-[#272626e8] rounded-lg duration-500 hover:bg-[#535252ab] hover:opacity-75 h-[400px]"
                        >
                            <img
                                class="object-cover rounded-lg h-[200px] w-[150px]"
                                :src="item.imageUrl"
                                :alt="item.title"
                            />
                            <div>
                                <p class="p-1">{{ item.title }}</p>
                                <p class="p-1">售價：NT${{ item.price }}</p>
                                <del class="text-sm ml-2"
                                    >原價：NT${{ item.origin_price }}</del
                                >
                            </div>
                            <div class="flex items-center justify-between">
                                <NuxtLink
                                    :to="{
                                        path: `products/${item.id}`,
                                        query: { type: item.category },
                                    }"
                                    class="block border-2 p-2 rounded-lg cursor-pointer duration-500 hover:bg-white hover:text-black mr-2"
                                >
                                    瞭解更多
                                </NuxtLink>
                                <button
                                    @click.prevent="addProduct(item.id)"
                                    type="button"
                                    class="border-2 p-2 rounded-lg cursor-pointer duration-500 hover:bg-white hover:text-black"
                                >
                                    加入購物車
                                </button>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>

            <div class="py-8">
                <ul class="flex flex-wrap items-center justify-center">
                    <li>
                        <button
                            @click="changePage('firstPage')"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button"
                        >
                            <<
                        </button>
                    </li>
                    <li>
                        <button
                            @click="changePage('previousPage')"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button"
                        >
                            <
                        </button>
                    </li>
                    <li
                        v-for="(page, index) in totalPages"
                        :key="index + 'page'"
                    >
                        <button
                            @click="changePage('currentPage', page)"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button"
                            :class="{
                                'bg-stone-300': clickedPage === page,
                                'text-black': clickedPage === page,
                            }"
                        >
                            {{ page }}
                        </button>
                    </li>
                    <li>
                        <button
                            @click="changePage('nextPage')"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button"
                        >
                            >
                        </button>
                    </li>
                    <li>
                        <button
                            @click="changePage('lastPage')"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button"
                        >
                            >>
                        </button>
                    </li>
                </ul>
            </div>
        </main>

        <TheFooter />
    </div>
</template>

<script setup>
    //api
    import { useProductApi } from "@/composables/productApi";
    import { useCartApi } from "@/composables/cartApi";

    import { onMounted, ref, watch } from "vue";
    import { useRoute, useRouter } from "vue-router";
    import { useCartNumStore } from "@/stores/counter";
    import { useAllProductsStore } from "@/stores/getProducts";
    import { useSweetAlert } from "@/composables/useSweetAlert";

    const { getProducts } = useProductApi();
    const { addTocart } = useCartApi();
    const route = useRoute();
    const router = useRouter();
    const cartStore = useCartNumStore();
    const productsStore = useAllProductsStore();
    const { successMsg } = useSweetAlert();

    const isLoading = ref(true);
    const products = ref(null);
    const productsList = ref(null);
    const selectType = {
        威士忌: ["麥卡倫", "蘇格登", "亞伯樂", "布萊迪"],
        葡萄酒: ["漢彌根", "樂花園", "富飛"],
        香檳: ["酩悅", "路易侯德爾", "凱歌", "保羅傑", "杜瓦樂華"],
        氣泡酒: ["羅卡酒莊", "TOSO", "米娜多"],
        利口: ["安丘瑞耶斯", "吉拿", "芙內", "義大利庫司", "貝禮詩", "MB"],
        白蘭地: ["皮耶費朗", "軒尼詩"],
        全部: [
            "麥卡倫",
            "蘇格登",
            "亞伯樂",
            "布萊迪",
            "漢彌根",
            "樂花園",
            "富飛",
            "酩悅",
            "路易侯德爾",
            "凱歌",
            "保羅傑",
            "杜瓦樂華",
            "羅卡酒莊",
            "TOSO",
            "米娜多",
            "安丘瑞耶斯",
            "吉拿",
            "芙內",
            "義大利庫司",
            "貝禮詩",
            "MB",
            "皮耶費朗",
            "軒尼詩",
        ],
    };

    const type = [
        "全部",
        "威士忌",
        "葡萄酒",
        "香檳",
        "氣泡酒",
        "利口",
        "白蘭地",
    ];
    const selectedType = ref("");
    const page = ref(1);
    const queryInfo = ref({
        page: page.value,
        category: selectedType.value,
    });
    const changeType = (e) => {
        selectedType.value = e.target.value;
        router.replace({
            path: "/products",
            query: { type: `${e.target.value}` },
        });
    };

    const brand = ref("全部");
    const clickedPage = ref(1);
    const totalPages = ref(null);
    const changeBrand = async (e) => {
        brand.value = e.target.value;
        if (e.target.value === "全部") {
            if (selectedType.value !== "全部") {
                if (page.value === 1) {
                    await queryProducts();
                } else {
                    page.value = 1;
                }
            } else {
                page.value = 1;
                products.value = productsStore.allProducts;
                productsList.value = getPageData(page);
                totalPages.value = Math.ceil(
                    productsStore.allProducts.length / 10
                );
            }
        } else {
            const data = productsStore.allProducts.filter((item) => {
                return item.brand === e.target.value;
            });
            productsList.value = data;
            totalPages.value = Math.ceil(data.length / 10);
            clickedPage.value = 1;
        }
    };

    const queryProducts = async () => {
        isLoading.value = true;
        try {
            const res = await getProducts(queryInfo.value);
            isLoading.value = false;
            products.value = res.products;
            productsList.value = res.products;
            totalPages.value = res.pagination.total_pages;
        } catch (error) {}
    };

    watch(page, async (newPage) => {
        window.scrollTo({ top: 500 });
        if (selectedType.value !== "全部") {
            queryInfo.value.page = newPage;
            await queryProducts();
            if (brand.value !== "全部") {
                productsList.value = products.value.filter((item) => {
                    return item.brand === brand.value;
                });
            } else {
                productsList.value = products.value;
            }
        } else {
            productsList.value = getPageData(page);
        }
    });

    const getPageData = (page) => {
        const startIndex = (page.value - 1) * 10;
        const endIndex = startIndex + 10;
        return productsStore.allProducts.slice(startIndex, endIndex);
    };

    watch(selectedType, async (newSelectedType) => {
        page.value = 1;
        clickedPage.value = 1;
        brand.value = "全部";
        if (newSelectedType === "全部") {
            products.value = productsStore.allProducts;
            productsList.value = getPageData(page);
            totalPages.value = Math.ceil(productsStore.allProducts.length / 10);
        } else {
            queryInfo.value.category = newSelectedType;
            queryInfo.value.page = 1;
            await queryProducts();
        }
    });

    const addProduct = async (id) => {
        const info = {
            data: {
                product_id: id,
                qty: 1,
            },
        };
        isLoading.value = true;
        try {
            await addTocart(info);
            isLoading.value = false;
            cartStore.getCartNum();
            successMsg();
        } catch (error) {}
    };

    const changePage = async (type, currentPage) => {
        if (type === "firstPage") {
            page.value = 1;
        } else if (type === "previousPage") {
            page.value === 1 ? null : (page.value -= 1);
        } else if (type === "currentPage") {
            page.value = currentPage;
        } else if (type === "nextPage") {
            page.value === totalPages.value ? null : (page.value += 1);
        } else if (type === "lastPage") {
            page.value = totalPages.value;
        }
        clickedPage.value = page.value;
    };

    router.beforeEach((to, from, next) => {
        if (to.path === from.path && to.query.type !== from.query.type) {
            selectedType.value = to.query.type;
            queryInfo.value.category = selectedType.value;
            next();
        } else {
            next();
        }
    });

    onMounted(async () => {
        try {
            await productsStore.getProducts();
            isLoading.value = false;
        } catch (error) {}

        selectedType.value = route.query.type;
        // queryInfo.value.category = selectedType.value
        // try {
        //     const res = await getProducts(queryInfo.value)
        //     isLoading.value = false
        //     products.value = res.products
        //     productsList.value = res.products
        //     totalPages.value = res.pagination.total_pages
        // } catch (error) {
        // }
    });
</script>

<style>
    .swal2-popup {
        position: absolute;
        top: 12%;
    }
</style>
