<template>
    <div class="bg-[#070707f0] text-white">
        <TheNavbar/>
        <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <img class="h-16 w-16" src="/Rolling-1s-150px.gif" alt="loading">
        </div>
        <header>
            <div class="h-[500px] bg-cover bg-center flex flex-col items-center justify-center text-center opacity-85" style="background-image: url(https://images.unsplash.com/photo-1552844418-3d618ca9af68?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);">
                <div class="">
                    <h2 class="text-6xl font-bold mb-4">
                        查無此頁
                    </h2>
                </div>
            </div>
        </header>
        <main class="container mx-auto p-6 md:p-24 mb-6">
            <div class="py-8 text-center flex flex-col items-center justify-between">
                <p class="p-2 text-3xl mb-6">查無此頁內容</p>
                <svg class="w-10 h-10 mb-6" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M119.4 44.1c23.3-3.9 46.8-1.9 68.6 5.3l49.8 77.5-75.4 75.4c-1.5 1.5-2.4 3.6-2.3 5.8s1 4.2 2.6 5.7l112 104c2.9 2.7 7.4 2.9 10.5 .3s3.8-7 1.7-10.4l-60.4-98.1 90.7-75.6c2.6-2.1 3.5-5.7 2.4-8.8L296.8 61.8c28.5-16.7 62.4-23.2 95.7-17.6C461.5 55.6 512 115.2 512 185.1v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.6 300.4C17.2 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.5-129.5 119.4-141z"/></svg>
                <NuxtLink to="/" class=" border-2 p-2 rounded-lg duration-500 hover:bg-white hover:text-black w-[50%] md:w-[20%] mb-4">
                    前往首頁
                </NuxtLink>
            </div>
        </main>
        
        <TheFooter/>
    </div>
</template>


<script setup>

    import { useCartNumStore } from '@/stores/counter'
    
    const cartStore = useCartNumStore()
    cartStore.getCartNum()

</script>
