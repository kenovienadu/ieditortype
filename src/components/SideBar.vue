<template>
  <div
    :class="showSideBar ? 'h-[120px]' : 'h-0'"
    class="bg-[#150037] z-20 fixed bottom-0 md:top-0 left-0 w-full md:w-72 md:h-screen text-white"
  >
    <div
      class="relative text-xs md:text-sm py-2 px-4 md:p-6 w-full flex flex-col gap-4 md:gap-6"
    >
      <div class="grid grid-cols-3 gap-2 md:mt-2">
        <button
          :class="
            activeBlock == block ? 'border-b border-[#A670FF]' : ' opacity-50'
          "
          @click="activeBlock = block"
          class="px-4 py-2"
          v-for="block in blocks"
          :key="block"
        >
          {{ block }}
        </button>
      </div>
      <div
        v-show="activeBlock == 'Elements'"
        class="grid grid-cols-5 md:grid-cols-2 gap-4"
      >
        <div
          v-for="(element, i) in elements"
          :key="i"
          class="bg-white hover:text-[#A670FF] rounded-lg text-[#150037] flex flex-col gap-2 items-center p-4 cursor-pointer"
          :draggable="true"
          @dragstart="startDrag($event, element)"
        >
          <!-- <span>icon</span> -->
          <span>{{ element.type }}</span>
        </div>
      </div>
      <div v-show="activeBlock == 'Shapes'" class="grid grid-cols-2 gap-4">
        <div
          v-for="shape in shapes"
          :key="shape.element"
          :draggable="true"
          @dragstart="startDrag($event, shape)"
          class="w-12 h-12 md:w-20 md:h-20 p-4 bg-white"
        >
          {{ shape.name }}
        </div>
      </div>
      <div
        v-show="activeBlock == 'Icons'"
        class="grid grid-cols-5 md:grid-cols-4 gap-4 overflow-y-auto pb-4 pt-2"
      >
        <i
          v-for="item in icons"
          :key="item.icon"
          :draggable="true"
          @dragstart="startDrag($event, item)"
          :class="['pi', item.icon]"
          class="text-3xl md:text-4xl hover:text-[#A670FF] hover:cursor-pointer"
        ></i>
      </div>

      <div
        @click="showSideBar = !showSideBar"
        class="bg-[#A670FF] absolute p-2 right-0 -top-9 rounded-t-lg md:hidden"
      >
        <i
          :class="showSideBar ? 'pi pi-angle-up' : 'pi pi-angle-down'"
          class="text-xl"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref } from "vue";

const showSideBar = ref(true);
const activeBlock: Ref<string> = ref("Elements");
const blocks = ref(["Elements", "Shapes", "Icons"]);

interface Element {
  type: string;
  element: string;
  icon?: string;
}

const elements: Element[] = reactive([
  {
    type: "Text",
    element: "p",
  },
  {
    type: "Heading",
    element: "h4",
  },
  {
    type: "Fields",
    element: "input",
  },
  {
    type: "Button",
    element: "button",
  },
  // {
  //   type: "Image",
  //   element: "img",
  // },
]);

const icons: Element[] = reactive([
  {
    type: "Icon",
    icon: "pi-star",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-star-fill",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-circle",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-circle-fill",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-heart",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-heart-fill",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-globe",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-facebook",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-github",
    element: "i",
  },
  {
    type: "Icon",
    icon: "pi-google",
    element: "i",
  },
]);

const shapes: Element[] = reactive([
  {
    type: "Shape",
    element: "div",
  },
]);

const startDrag = (e: DragEvent, arg: Element) => {
  const data = {
    type: arg.type,
    element: arg.element,
    icon: arg.icon ? arg.icon : null,
    isNew: true,
  };

  e.dataTransfer && e.dataTransfer.setData("element", JSON.stringify(data));
};
</script>

<style></style>
