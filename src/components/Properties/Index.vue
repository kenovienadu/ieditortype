<template>
  <div class="bg-white w-full px-4 py-2 my-4 border-b text-[#2E2E2E] text-xs">
    <div v-if="data" class="flex items-center gap-2 justify-between">
      <div class="flex items-center gap-4 flex-wrap">
        <GlobalProperties :showProperties="showProperties" :element="element" />
        <TextProperties v-if="showProperties.font" :element="element" />
        <PaddingBorderProperties
          v-if="showProperties.border"
          :element="element"
        />
        <SizeProperties v-if="showProperties.size" :element="element" />
      </div>

      <div>
        <i
          @click="removeElement"
          v-if="data.id !== 'layout'"
          class="pi pi-trash text-red-500 text-xl cursor-pointer"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, Ref, reactive, watch } from "vue";

  import GlobalProperties from "./GlobalProperties.vue";
  import TextProperties from "./TextProperties.vue";
  import SizeProperties from "./SizeProperties.vue";
  import PaddingBorderProperties from "./PaddingBorderProperties.vue";
  import { HtmlTags } from "@/typings/enums";

  const props = defineProps<{
    element: HTMLElement | null
  }>();

  const watchElement = computed(() => props.element);

  const showProperties: Record<string, boolean> = reactive({
    background: true,
    color: true,
    border: true,
    font: true,
    textField: true,
    padding: true,
    size: true,
  });

  const data: Ref<HTMLElement | null> = ref(null);

  watch(watchElement, () => {
    setProperty();
  });

  onMounted(() => {
    setProperty();
  });

  const setAllProperties = (value: boolean): void => {
    const properties = Object.keys(showProperties);
    properties.forEach((key) => showProperties[key] = value);
  }

  const setProperty = (): void => {
    if (!props.element) return;

    data.value = props.element;
    setAllProperties(true);

    switch(props.element.tagName) {
      case HtmlTags.DIV:
        showProperties.font = false;
        showProperties.textField = false;
        showProperties.color = false;

        //Show the padding and margin properties if it's the layout
        showProperties.padding = data.value.id !== "layout";
        break;

      case HtmlTags.PARAGRAPH:
        //Text
        showProperties.background = false;
        showProperties.border = false;
        showProperties.padding = false;
        break;
      
      case HtmlTags.H4:
        //Text
        showProperties.background = false;
        showProperties.border = false;
        showProperties.padding = false;
        break;
      
      case HtmlTags.ICON:
        // Icon
        setAllProperties(false);
        showProperties.color = true;
        showProperties.font = true;
        break;

      case HtmlTags.IMG:
        setAllProperties(false);
        showProperties.size = true;
        break;
    }
  };


  const removeElement = (): void => {
    if (data.value) {
      const layout = document.getElementById("layout");
      layout?.removeChild(data.value);
      data.value = null;
    }
  };
</script>

<style></style>
