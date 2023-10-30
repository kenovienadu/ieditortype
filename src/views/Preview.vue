<template>
  <div class="h-screen w-screen flex items-center justify-center">
    <div
      v-show="showPopup"
      ref="preview"
      :class="
        showPopup
          ? 'animate__animated animate__fadeIn'
          : 'animate__animated animate__fadeOut'
      "
      class="z-20 fixed inset-0 flex items-center justify-center"
    ></div>

    <div
      v-show="showPopup"
      @click="togglePopup(false)"
      style="background: #15003753"
      class="fixed inset-0 overlay animate__animated animate__fadeIn"
    ></div>

    <div class="grid grid-cols-1 gap-2">
      <button
        @click="showPopup = !showPopup"
        class="bg-[#A670FF] px-6 py-3 rounded-lg text-sm text-white hover:opacity-90"
      >
        Show Pupop <strong>{{ popup && popup.name }}</strong>
      </button>
      <button
        @click="goBack"
        class="bg-[#A670FF] px-6 py-3 rounded-lg text-sm text-white hover:opacity-90"
      >
        Go Back
      </button>
    </div>
    <button @click="togglePopup(false)">
      <i
        class="text-3xl pi pi-times-circle text-white absolute right-10 top-10 z-20"
      ></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, Ref, ComputedRef, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const showPopup = ref(false);
const preview: Ref<HTMLElement | null> = ref(null);

const popup: ComputedRef<Record<string, string>> = computed(() => {
  let saved = localStorage.getItem("saved");
  return saved ? JSON.parse(saved) : null;
});

const togglePopup = (arg: boolean) => {
  showPopup.value = arg;
};

const goBack = () => {
  router.go(-1);
};

watch(showPopup, () => {
  if (popup.value && showPopup.value) {
    const element = popup.value.element;
    popup.value.name;
    if (preview.value) {
      preview.value.innerHTML = element;
    }
  }
});
</script>

<style></style>
