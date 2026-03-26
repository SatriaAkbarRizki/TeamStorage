<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-primary-950 to-slate-900 flex items-center justify-center p-4 font-sans"
  >
    <!-- Loading -->
    <div v-if="loading" class="flex flex-col items-center gap-4 text-white/60">
      <svg
        class="animate-spin w-10 h-10"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      <span class="text-sm">Memuat file...</span>
    </div>

    <!-- Error / Not Found -->
    <div v-else-if="error" class="text-center text-white max-w-md">
      <div
        class="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          class="w-10 h-10 fill-current"
        >
          <path
            d="M236.8,188.09,149.35,36.22a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"
          />
        </svg>
      </div>
      <h1 class="text-2xl font-bold mb-2">Link Tidak Valid</h1>
      <p class="text-white/60">{{ error }}</p>
    </div>

    <!-- File Info Card -->
    <div v-else-if="file" class="w-full max-w-lg">
      <!-- Card -->
      <div
        class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
      >
        <!-- File type icon header -->
        <div
          class="bg-gradient-to-r from-primary-600 to-primary-800 p-8 flex items-center justify-center"
        >
          <div
            class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center"
          >
            <svg
              v-if="isImage"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="w-10 h-10 fill-current text-white"
            >
              <path
                d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,200V172l52-52,44,44,20-20,56,56H40Z"
              />
            </svg>
            <svg
              v-else-if="isVideo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="w-10 h-10 fill-current text-white"
            >
              <path
                d="M164.44,105.34l-48-32A8,8,0,0,0,104,80v64a8,8,0,0,0,12.44,6.66l48-32a8,8,0,0,0,0-13.32ZM120,129.05V95l25.58,17ZM216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200Z"
              />
            </svg>
            <svg
              v-else-if="isPdf"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="w-10 h-10 fill-current text-white"
            >
              <path
                d="M224,152a8,8,0,0,1-8,8H192v16h16a8,8,0,0,1,0,16H192v16a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8h32A8,8,0,0,1,224,152ZM92,172a28,28,0,0,1-28,28H56v8a8,8,0,0,1-16,0V152a8,8,0,0,1,8-8H64A28,28,0,0,1,92,172Zm-16,0a12,12,0,0,0-12-12H56v24h8A12,12,0,0,0,76,172Zm88,8a36,36,0,0,1-36,36H112a8,8,0,0,1-8-8V152a8,8,0,0,1,8-8h16A36,36,0,0,1,164,180Zm-16,0a20,20,0,0,0-20-20h-8v40h8A20,20,0,0,0,148,180ZM40,112V40A16,16,0,0,1,56,24h96a8,8,0,0,1,5.66,2.34l56,56A8,8,0,0,1,216,88v24a8,8,0,0,1-16,0V96H152a8,8,0,0,1-8-8V40H56v72a8,8,0,0,1-16,0ZM160,80h28.69L160,51.31Z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="w-10 h-10 fill-current text-white"
            >
              <path
                d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
              />
            </svg>
          </div>
        </div>

        <!-- File Details -->
        <div class="p-6 text-white space-y-4">
          <div>
            <h1 class="text-xl font-bold break-all">{{ file.nameFile }}</h1>
            <p class="text-white/50 text-sm mt-1">{{ file.fileType }}</p>
          </div>

          <!-- Meta row -->
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-white/10 rounded-xl p-3">
              <p class="text-white/50 text-xs mb-1">Ukuran</p>
              <p class="font-semibold text-sm">
                {{ formatSize(file.fileSize) }}
              </p>
            </div>
            <div class="bg-white/10 rounded-xl p-3">
              <p class="text-white/50 text-xs mb-1">Diunggah</p>
              <p class="font-semibold text-sm">
                {{ formatDate(file.createdAt) }}
              </p>
            </div>
          </div>

          <!-- Uploader -->
          <div class="flex items-center gap-3 bg-white/10 rounded-xl p-3">
            <img
              :src="uploaderAvatar"
              @error="
                ($event.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(file?.userName || 'User')}&background=dfdfdf&color=333`
              "
              alt="Uploader avatar"
              class="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <p class="text-white/50 text-xs">Diunggah oleh</p>
              <p class="font-semibold text-sm">{{ file.userName }}</p>
            </div>
          </div>

          <!-- Download Button -->
          <button
            @click="downloadFile"
            :disabled="downloading"
            class="w-full py-3 px-4 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-900/30 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg
              v-if="!downloading"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              class="w-5 h-5 fill-current"
            >
              <path
                d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0ZM165.66,90.34a8,8,0,0,0-11.32,0L136,108.69V32a8,8,0,0,0-16,0v76.69L101.66,90.34A8,8,0,0,0,90.34,101.66l40,40a8,8,0,0,0,11.32,0l40-40A8,8,0,0,0,165.66,90.34Z"
              />
            </svg>
            <svg
              v-else
              class="animate-spin w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              />
            </svg>
            {{ downloading ? "Mengunduh..." : "Unduh File" }}
          </button>
        </div>
      </div>

      <!-- Branding -->
      <p class="text-center text-white/30 text-xs mt-6">
        Dibagikan via SLKPN TeamStorage
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "home",
});

const route = useRoute();
const config = useRuntimeConfig();
const token = route.params.token as string;

const loading = ref(true);
const error = ref<string | null>(null);
const file = ref<any>(null);
const downloading = ref(false);

// File type checks
const isImage = computed(() => file.value?.fileType?.startsWith("image/"));
const isVideo = computed(() => file.value?.fileType?.startsWith("video/"));
const isPdf = computed(() => file.value?.fileType === "application/pdf");

const uploaderAvatar = computed(() => {
  if (!file.value) return "";
  if (file.value.imageAvatar)
    return `${config.public.apiBase}/general/downloadavatar?avatar=${file.value.imageAvatar}`;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(file.value.userName)}&background=dfdfdf&color=333`;
});

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const downloadFile = async () => {
  if (!file.value) return;
  downloading.value = true;
  try {
    const blob = await $fetch<Blob>(
      `${config.public.apiBase}/files/download?id=${file.value.id}`,
      {
        responseType: "blob",
      },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.value.nameFile;
    a.click();
    URL.revokeObjectURL(url);
  } catch {
    alert("Gagal mengunduh file.");
  } finally {
    downloading.value = false;
  }
};

onMounted(async () => {
  try {
    const res = await $fetch<{
      success: boolean;
      message: string;
      data: { folders: any[]; files: any[] };
    }>(`${config.public.apiBase}/files/getsharefile?token=${token}`);
    if (res.success && res.data?.files?.length > 0) {
      file.value = res.data.files[0];
    } else {
      error.value = "File tidak ditemukan atau link sudah tidak valid.";
    }
  } catch (err: any) {
    error.value =
      err?.data?.message || "Link tidak valid atau sudah kedaluwarsa.";
  } finally {
    loading.value = false;
  }
});
</script>
