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
                    background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709969444587.jpg);
                ">
                <div class="">
                    <h2 class="text-6xl font-bold mb-4">系列酒藏</h2>
                </div>
            </div>
        </header>
        <main class="container mx-auto p-6 md:p-24 mb-6">
            <ul class="py-8 text-center flex items-center justify-center w-full">
                <li class="w-[40%]">
                    <select @change="changeType" class="bg-[#535252f2] w-[80%] md:w-[50%] p-2 rounded-lg">
                        <option :selected="selectedType === item" v-for="item in type" :key="item" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </li>
                <li class="w-[40%]">
                    <select
                        v-model="brand"
                        @change="changeBrand"
                        class="bg-[#535252f2] w-[80%] md:w-[50%] p-2 rounded-lg">
                        <option selected value="全部">全部</option>
                        <option v-for="item in selectType[selectedType]" :key="item" :value="item">
                            {{ item }}
                        </option>
                    </select>
                </li>
            </ul>

            <div class="py-8 text-center w-full flex items-center justify-start flex-col md:flex md:flex-row flex-wrap">
                <div v-for="item in productsList" :key="item.id" class="md:w-[28%] lg:w-[24%] w-[80%] mb-6 mr-2">
                    <div
                        class="flex h-[400px] cursor-pointer flex-col items-center justify-between rounded-lg bg-[#272626e8] p-2 duration-500 hover:bg-[#535252ab] hover:opacity-75"
                        @click="goToProduct(item)">
                        <img
                            class="h-[200px] w-[150px] rounded-lg object-cover"
                            :src="item.imageUrl"
                            :alt="item.title" />
                        <div>
                            <p class="p-1">{{ item.title }}</p>
                            <p class="p-1">售價：NT${{ item.price }}</p>
                            <del class="ml-2 text-sm">原價：NT${{ item.origin_price }}</del>
                        </div>
                        <div class="flex items-center justify-between">
                            <span
                                class="mr-2 block cursor-pointer rounded-lg border-2 p-2 duration-500 hover:bg-white hover:text-black">
                                瞭解更多
                            </span>
                            <button
                                @click.stop="addProduct(item.id)"
                                type="button"
                                class="cursor-pointer rounded-lg border-2 p-2 duration-500 hover:bg-white hover:text-black">
                                加入購物車
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="py-8">
                <ul class="flex flex-wrap items-center justify-center">
                    <li>
                        <button
                            @click="changePage('firstPage')"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button">
                            <<
                        </button>
                    </li>
                    <li>
                        <button
                            @click="changePage('previousPage')"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button">
                            <
                        </button>
                    </li>
                    <li v-for="(page, index) in totalPages" :key="index + 'page'">
                        <button
                            @click="changePage('currentPage', page)"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button"
                            :class="{
                                'bg-stone-300': clickedPage === page,
                                'text-black': clickedPage === page,
                            }">
                            {{ page }}
                        </button>
                    </li>
                    <li>
                        <button
                            @click="changePage('nextPage')"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button">
                            >
                        </button>
                    </li>
                    <li>
                        <button
                            @click="changePage('lastPage')"
                            class="py-2 px-4 border-2 duration-500 hover:bg-white hover:text-black"
                            type="button">
                            >>
                        </button>
                    </li>
                </ul>
            </div>
        </main>

        <TheFooter />
    </div>
</template>

<script setup lang="ts">
    //api
    import { useProductApi } from '@/composables/productApi';
    import { useCartApi } from '@/composables/cartApi';

    import { useCartNumStore } from '@/stores/counter';
    import { useAllProductsStore } from '@/stores/getProducts';
    import { useSweetAlert } from '@/composables/useSweetAlert';

    import type { Ref } from 'vue';

    interface Product {
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

    interface QueryInfo {
        page: number;
        category: string;
    }

    type PageAction = 'firstPage' | 'previousPage' | 'currentPage' | 'nextPage' | 'lastPage';

    const { getProducts } = useProductApi();
    const { addTocart } = useCartApi();
    const route = useRoute();
    const router = useRouter();
    const cartStore = useCartNumStore();
    const productsStore = useAllProductsStore();
    const { successMsg } = useSweetAlert();

    const PAGE_SIZE = 12;

    const isLoading = ref(true);
    const products = ref<Product[] | null>(null);
    const productsList = ref<Product[]>([]);
    const selectType: Record<string, string[]> = {
        威士忌: ['麥卡倫', '蘇格登', '亞伯樂', '布萊迪'],
        葡萄酒: ['漢彌根', '樂花園', '富飛'],
        香檳: ['酩悅', '路易侯德爾', '凱歌', '保羅傑', '杜瓦樂華'],
        氣泡酒: ['羅卡酒莊', 'TOSO', '米娜多'],
        利口: ['安丘瑞耶斯', '吉拿', '芙內', '義大利庫司', '貝禮詩', 'MB'],
        白蘭地: ['皮耶費朗', '軒尼詩'],
        全部: [
            '麥卡倫',
            '蘇格登',
            '亞伯樂',
            '布萊迪',
            '漢彌根',
            '樂花園',
            '富飛',
            '酩悅',
            '路易侯德爾',
            '凱歌',
            '保羅傑',
            '杜瓦樂華',
            '羅卡酒莊',
            'TOSO',
            '米娜多',
            '安丘瑞耶斯',
            '吉拿',
            '芙內',
            '義大利庫司',
            '貝禮詩',
            'MB',
            '皮耶費朗',
            '軒尼詩',
        ],
    };

    const type = ['全部', '威士忌', '葡萄酒', '香檳', '氣泡酒', '利口', '白蘭地'] as const;
    const selectedType = ref('全部');
    const page = ref(1);
    const queryInfo = ref<QueryInfo>({
        page: page.value,
        category: selectedType.value,
    });
    const changeType = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        selectedType.value = target.value;
        router.replace({
            path: '/products',
            query: { type: `${target.value}` },
        });
    };

    const brand = ref('全部');
    const clickedPage = ref(1);
    const totalPages = ref(0);
    const changeBrand = async (e: Event) => {
        const target = e.target as HTMLSelectElement;
        brand.value = target.value;
        const allProducts: Product[] = productsStore.allProducts ?? [];
        if (target.value === '全部') {
            if (selectedType.value !== '全部') {
                if (page.value === 1) {
                    await queryProducts();
                } else {
                    page.value = 1;
                }
            } else {
                page.value = 1;
                products.value = allProducts;
                productsList.value = getPageData(page);
                totalPages.value = Math.ceil(allProducts.length / PAGE_SIZE);
            }
        } else {
            const data = allProducts.filter((item) => item.brand === target.value);
            productsList.value = data;
            totalPages.value = Math.ceil(data.length / PAGE_SIZE);
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
        if (selectedType.value !== '全部') {
            queryInfo.value.page = newPage;
            await queryProducts();
            if (brand.value !== '全部') {
                productsList.value = products.value?.filter((item) => item.brand === brand.value) ?? [];
            } else {
                productsList.value = products.value ?? [];
            }
        } else {
            productsList.value = getPageData(page);
        }
    });

    const getPageData = (pageRef: Ref<number>) => {
        const allProducts: Product[] = productsStore.allProducts ?? [];
        const startIndex = (pageRef.value - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        return allProducts.slice(startIndex, endIndex);
    };

    watch(selectedType, async (newSelectedType) => {
        page.value = 1;
        clickedPage.value = 1;
        brand.value = '全部';
        const allProducts: Product[] = productsStore.allProducts ?? [];
        if (newSelectedType === '全部') {
            products.value = allProducts;
            productsList.value = getPageData(page);
            totalPages.value = Math.ceil(allProducts.length / PAGE_SIZE);
        } else {
            queryInfo.value.category = newSelectedType;
            queryInfo.value.page = 1;
            await queryProducts();
        }
    });

    const goToProduct = (item: Product) => {
        router.push({
            path: `/products/${item.id}`,
            query: { type: item.category },
        });
    };

    const addProduct = async (id: string) => {
        const payload = {
            data: {
                product_id: id,
                qty: 1,
            },
        };
        isLoading.value = true;
        try {
            await addTocart(payload);
            isLoading.value = false;
            cartStore.getCartNum();
            successMsg();
        } catch (error) {}
    };

    const changePage = async (pageAction: PageAction, currentPage?: number) => {
        if (pageAction === 'firstPage') {
            page.value = 1;
        } else if (pageAction === 'previousPage') {
            page.value === 1 ? null : (page.value -= 1);
        } else if (pageAction === 'currentPage') {
            page.value = currentPage ?? 1;
        } else if (pageAction === 'nextPage') {
            page.value === totalPages.value ? null : (page.value += 1);
        } else if (pageAction === 'lastPage') {
            page.value = totalPages.value;
        }
        clickedPage.value = page.value;
    };

    watch(
        () => route.query.type,
        (newType) => {
            if (route.path !== '/products') return;
            const category = (Array.isArray(newType) ? newType[0] : newType) || '全部';
            if (selectedType.value === category) return;
            selectedType.value = category;
            queryInfo.value.category = category;
        }
    );

    onMounted(async () => {
        try {
            await productsStore.getProducts();
            isLoading.value = false;
        } catch (error) {}

        const queryType = route.query.type;
        const category = (Array.isArray(queryType) ? queryType[0] : queryType) || '全部';

        if (selectedType.value === category) {
            // 初始值已是「全部」且網址也是「全部」時，watch 不會觸發，需手動載入
            const allProducts: Product[] = productsStore.allProducts ?? [];
            if (category === '全部') {
                products.value = allProducts;
                productsList.value = getPageData(page);
                totalPages.value = Math.ceil(allProducts.length / PAGE_SIZE);
            } else {
                queryInfo.value.category = category;
                queryInfo.value.page = 1;
                await queryProducts();
            }
        } else {
            selectedType.value = category;
        }
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
