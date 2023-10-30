<template>
  <div class="flex items-center gap-2 border p-2">
    <span>Width</span>

    <input
      @input="updateSize('width')"
      type="number"
      class="w-12 h-7 border focus:outline-none text-[#a670ff] text-center"
      v-model="properties.width"
    />
  </div>

  <div class="flex items-center gap-2 border p-2">
    <span>Height</span>

    <input
      @input="updateSize('height')"
      type="number"
      class="w-12 h-7 border focus:outline-none text-[#a670ff] text-center"
      v-model="properties.height"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, reactive, ref, watch, Ref, PropType } from "vue";

const props = defineProps({
  element: Object as PropType<HTMLElement>,
});

const data: Ref<HTMLElement | null> = ref(null);

const properties = reactive({
  width: <number>10,
  height: <number | null>null,
});

const watchElement = computed(() => props.element);

watch(watchElement, () => {
  if (props.element) {
    setProperty();
  }
});

onMounted(() => {
  setProperty();
});

const setProperty = () => {
  if (!props.element) return;
  data.value = props.element;

  properties.height = parseInt(data.value.style.height, 10);
  properties.width = parseInt(data.value.style.width, 10);
};

const updateSize = (type: any) => {
  if (!data.value) return;
  data.value.style[type] = (properties as any)[type] + "px";
  data.value.style.maxWidth = "98%";
  data.value.style.maxHeight = "98%";
};
</script>

<style></style>
