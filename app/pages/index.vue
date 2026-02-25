<template>
  <div>
    <!-- Navbar -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-surface-100">
      <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Brand -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current">
              <path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"/>
            </svg>
          </div>
          <div class="leading-tight">
            <p class="font-bold text-base tracking-tight text-surface-900">LKPN</p>
            <p class="text-[9px] text-surface-400 leading-none">Laporan Kegiatan Pencegahan Narkoba Langsa</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/login" class="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
            Masuk
          </NuxtLink>
          <NuxtLink
            to="/register"
            class="text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Daftar
          </NuxtLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-24 pb-20">
      <!-- Background blobs -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary-100 rounded-full blur-3xl opacity-50"></div>
        <div class="absolute top-[10%] right-0 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-40"></div>
        <div class="absolute bottom-0 left-[30%] w-[350px] h-[350px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <!-- Logo badge -->
        <div class="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-2xl shadow-xl shadow-primary-500/30 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-10 h-10 fill-white">
            <path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"/>
          </svg>
        </div>

        <!-- Title -->
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 mb-4 leading-tight">
          LKPN
        </h1>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl font-medium text-primary-600 mb-4 tracking-wide">
          Laporan Kegiatan Pencegahan Narkoba Langsa
        </p>

        <!-- Divider -->
        <div class="flex items-center justify-center gap-3 mb-8">
          <div class="h-px w-16 bg-surface-200"></div>
          <div class="w-2 h-2 rounded-full bg-primary-400"></div>
          <div class="h-px w-16 bg-surface-200"></div>
        </div>

        <!-- Short tagline -->
        <p class="text-surface-500 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Platform digital terpadu untuk pengelolaan data dan laporan kegiatan pencegahan narkoba di Kota Langsa.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink
            to="/login"
            class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 active:scale-[0.98]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-5 h-5 fill-current">
              <path d="M141.66,133.66l-40,40a8,8,0,0,1-11.32-11.32L118.34,136H24a8,8,0,0,1,0-16h94.34L90.34,93.66A8,8,0,0,1,101.66,82.34l40,40A8,8,0,0,1,141.66,133.66ZM192,32H136a8,8,0,0,0,0,16h56V208H136a8,8,0,0,0,0,16h56a16,16,0,0,0,16-16V48A16,16,0,0,0,192,32Z"/>
            </svg>
            Masuk ke Sistem
          </NuxtLink>
          <a
            href="#tentang"
            class="inline-flex items-center gap-2 bg-white border border-surface-200 hover:bg-surface-50 text-surface-700 font-semibold px-8 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Pelajari Lebih Lanjut
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <section class="bg-white border-y border-surface-100 py-8">
      <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <p class="text-3xl font-extrabold text-primary-600">120+</p>
          <p class="text-sm text-surface-500 mt-1">Laporan Selesai</p>
        </div>
        <div>
          <p class="text-3xl font-extrabold text-primary-600">35</p>
          <p class="text-sm text-surface-500 mt-1">Kegiatan Aktif</p>
        </div>
        <div>
          <p class="text-3xl font-extrabold text-primary-600">18</p>
          <p class="text-sm text-surface-500 mt-1">Unit Terlibat</p>
        </div>
        <div>
          <p class="text-3xl font-extrabold text-primary-600">5.000+</p>
          <p class="text-sm text-surface-500 mt-1">Peserta Terjangkau</p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="tentang" class="py-24 bg-surface-50">
      <div class="max-w-5xl mx-auto px-6">
        <!-- Section Header -->
        <div class="text-center mb-16">
          <span class="inline-block text-xs font-semibold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-4 py-1.5 rounded-full mb-4">
            Tentang
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight mb-4">
            Apa itu LKPN?
          </h2>
          <p class="text-surface-400 text-base max-w-xl mx-auto">
            Memahami tujuan, fungsi, dan manfaat sistem LKPN bagi masyarakat dan instansi terkait di Kota Langsa.
          </p>
        </div>

        <!-- Cards -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <!-- Card 1 -->
          <div class="bg-white rounded-2xl border border-surface-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current">
                <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-surface-900 mb-3">Definisi & Latar Belakang</h3>
            <p class="text-surface-500 leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="bg-white rounded-2xl border border-surface-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current">
                <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-surface-900 mb-3">Siapa yang Terlibat?</h3>
            <p class="text-surface-500 leading-relaxed text-sm">
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo, volutpat lacus facilisis in.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="bg-white rounded-2xl border border-surface-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current">
                <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-surface-900 mb-3">Tujuan & Manfaat</h3>
            <p class="text-surface-500 leading-relaxed text-sm">
              Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis, praesent dapibus, neque id cursus faucibus.
            </p>
          </div>

          <!-- Card 4 -->
          <div class="bg-white rounded-2xl border border-surface-100 shadow-sm p-8 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-6 h-6 fill-current">
                <path d="M224,152a88,88,0,1,1-88-88A88.1,88.1,0,0,1,224,152ZM136,96a8,8,0,0,0-16,0v56a8,8,0,0,0,3.58,6.65l32,21.33a8,8,0,0,0,8.84-13.31L136,149.47Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold text-surface-900 mb-3">Bagaimana Cara Kerjanya?</h3>
            <p class="text-surface-500 leading-relaxed text-sm">
              Nam dui ligula, fringilla a, euismod sodales, sollicitudin vel, wisi. Morbi auctor lorem non justo. Nam lacus libero, pretium at, lobortis vitae, ornare quis, nibh. Donec aliquet, tortor sed accumsan bibendum, erat ligula aliquet magna, vitae ornare odio metus a mi. Morbi ac orci et nisl hendrerit mollis.
            </p>
          </div>
        </div>

        <!-- Full Description -->
        <div class="bg-white rounded-2xl border border-surface-100 shadow-sm p-8 md:p-12">
          <h3 class="text-xl font-bold text-surface-900 mb-6 flex items-center gap-3">
            <span class="w-1.5 h-6 bg-primary-500 rounded-full inline-block"></span>
            Penjelasan Lengkap
          </h3>
          <div class="prose prose-sm max-w-none text-surface-500 leading-relaxed space-y-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est.
            </p>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-surface-100 py-8">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-4 h-4 fill-current">
              <path d="M216,72H130.67L102.93,35a16.12,16.12,0,0,0-9.6-6.45L35.85,26.17A16.09,16.09,0,0,0,16.29,40.1L16,40.33V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72ZM32,41.93l.35-.26,57.51,2.07L114.77,72H32ZM216,208H32V88H216v120Z"/>
            </svg>
          </div>
          <div>
            <p class="font-bold text-sm text-surface-900">LKPN</p>
            <p class="text-[9px] text-surface-400 leading-none">Laporan Kegiatan Pencegahan Narkoba Langsa</p>
          </div>
        </div>
        <p class="text-xs text-surface-400">
          &copy; {{ new Date().getFullYear() }} LKPN. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'home'
})

useSeoMeta({
  title: 'LKPN – Laporan Kegiatan Pencegahan Narkoba Langsa',
  description: 'Platform digital pengelolaan data dan laporan kegiatan pencegahan narkoba di Kota Langsa.'
})
</script>
