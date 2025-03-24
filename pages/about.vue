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
            background-image: url(https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709969238747.jpg);
          "
        >
          <div class="">
            <h2 class="text-6xl font-bold mb-4">品牌故事</h2>
          </div>
        </div>
      </header>
      <main class="container mx-auto p-6 md:p-24 mb-6">
        <div class="text-center py-8">
          <h3 class="text-4xl mb-10 font-bold">關於我們</h3>
          <ul>
            <li
              class="flex-col items-center justify-center md:flex md:flex-row md:justify-between mb-6"
            >
              <img
                @load="handleImg"
                class="h-[400px] w-full md:w-[48%] object-cover rounded-lg inline-block"
                src="https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709969259688.jpg"
              />
              <div class="md:w-[48%] w-full inline-block leading-relaxed mt-4 md:mt-0">
                <h4 class="mb-2 text-xl">使命</h4>
                <p>
                  Liquor
                  Store的使命是將世界各地最精彩的葡萄酒和烈酒帶給您的門前。透過精心挑選的品牌和風格多樣的產品，我們希望成為您品酒旅程的良伴，無論是探索新的口味還是深入了解酒類文化，我們都在這裡為您提供支持和專業建議。
                </p>
              </div>
            </li>
            <li
              class="flex-col items-center justify-center md:flex md:flex-row-reverse md:justify-between mb-6"
            >
              <img
                class="h-[400px] w-full md:w-[48%] object-cover rounded-lg inline-block"
                src="https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709969285389.jpg"
              />
              <div class="md:w-[48%] w-full inline-block leading-relaxed mt-4 md:mt-0">
                <h4 class="mb-2 text-xl">品質</h4>
                <p>
                  Liquor Store引以為傲的不僅是產品，更是它們背後的故事和品質。Liquor
                  Store的酒款來自世界各地最優秀的生產者。我們與這些生產者建立了緊密的合作關係，確保每一瓶酒都代表著最高的品質標準和獨特的風格。無論您是尋找一瓶特別的禮物，還是想要為自己的私人收藏添置新的寶藏，我們的產品都能滿足您的需求。
                </p>
              </div>
            </li>
            <li
              class="flex-col items-center justify-center md:flex md:flex-row md:justify-between mb-6"
            >
              <img
                class="h-[400px] w-full md:w-[48%] object-cover rounded-lg inline-block"
                src="https://storage.googleapis.com/vue-course-api.appspot.com/liquor_store/1709969306190.jpg"
              />
              <div class="md:w-[48%] w-full inline-block leading-relaxed mt-4 md:mt-0">
                <h4 class="mb-2 text-xl">承諾</h4>
                <p>
                  作為您信任的選擇，Liquor
                  Store承諾為您提供卓越的客戶服務和無與倫比的購物體驗。無論您對酒類知識的了解程度如何，我們的團隊都將竭誠為您提供支持和建議。我們也非常重視您的意見和反饋，因為這將幫助我們不斷改進，成為您的首選酒類購物平台。感謝您選擇與我們一起探索美好的葡萄酒和烈酒世界！
                </p>
              </div>
            </li>
          </ul>
        </div>
      </main>
  
      <TheFooter />
    </div>
  </template>
  
  <script setup>
  
  import { ref } from 'vue'
  
  const isLoading = ref(true)
  const handleImg = () => {
    isLoading.value = false
  }
  </script>
  