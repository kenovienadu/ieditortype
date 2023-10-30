<template>
  <div
    class="fixed z-20 md:pl-72 left-0 top-0 w-full p-2 px-6 px-md-10 bg-[#A670FF] text-sm flex items-center justify-between"
  >
    <div class="flex items-center gap-4">
      <span class="md:hidden">
        <i class="pi pi-microsoft text-white"></i>
      </span>
      <h2 class="hidden md:block text-white font-bold text-xl md:ml-4">
        iEDITOR
      </h2>

      <input
        class="focus:outline-none w-36 p-2 bg-[#8E5DDD] text-white focus:border-white border border-[#A670FF] capitalize"
        type="text"
        v-model="popupName"
      />
    </div>
    <div class="flex items-center md:gap-4">
      <button
        v-for="btn in buttons"
        :key="btn.title"
        @click="btn.action"
        class="p-2 px-4 md:w-28 rounded md:bg-white md:text-[#150037] hover:bg-white/50 md:hover:opacity-95"
      >
        <span class="hidden md:block">{{ btn.title }}</span>
        <span class="md:hidden">
          <i :class="btn.icon" class="text-white"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ComputedRef, WritableComputedRef } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const buttons = reactive([
  {
    title: "Preview",
    icon: "pi pi-desktop",
    action: () => {
      router.push("/preview");
    },
  },
  {
    title: "Save",
    icon: "pi pi-save",
    action: handleSave,
  },
]);

const popup: ComputedRef<Record<string, string>> = computed(() => {
  let saved = localStorage.getItem("saved");
  return saved ? JSON.parse(saved) : null;
});

const popupName: WritableComputedRef<string> = computed({
  get() {
    return popup.value ? popup.value.name : "Untitled";
  },
  set(val) {
    popup.value.name = val;
    localStorage.setItem("saved", JSON.stringify(popup.value));
  },
});

function handleSave() {
  let element = document.getElementById("container");

  const newElement = {
    name: popupName.value,
    element: element && element.innerHTML,
  };

  localStorage.setItem("saved", JSON.stringify(newElement));
}
</script>

<style></style>
