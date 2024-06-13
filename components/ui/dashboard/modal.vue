<template>
  <UModal v-model="isOpen" :overlay="(draggable ? false : !smallerThanSm)" :transition="!smallerThanSm" :ui="draggable ? { base: `fixed draggable-modal-${modal.uid}`, margin: 'sm:my-0', width: 'sm:max-w-md' } : ui" v-bind="attrs">
    <div :class="[ui.header.base, ui.header.padding]">
      <slot name="header">
        <div :class="ui.header.inner">
          <div v-if="icon || $slots.icon" :class="ui.icon.wrapper">
            <slot name="icon">
              <UIcon :name="(icon as string)" :class="ui.icon.base" />
            </slot>
          </div>
          <div>
            <p v-if="title || $slots.title" :class="ui.title">
              <slot name="title">
                {{ title }}
              </slot>
            </p>
            <p v-if="description || $slots.description" :class="ui.description">
              <slot name="description">
                {{ description }}
              </slot>
            </p>
          </div>
        </div>
        <UButton v-if="closeButton" aria-label="Close" v-bind="{ ...ui.default.closeButton, ...closeButton }"
          @click="isOpen = false" />
      </slot>
    </div>
    <div v-if="$slots.default" :class="[ui.body.base, ui.body.padding]">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="[ui.footer.base, ui.footer.padding]">
      <slot name="footer" />
    </div>
  </UModal>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
import { twMerge } from 'tailwind-merge'
import { modal as modalConfig } from '#ui/ui.config'
import type { Button } from '#ui/types'
const appConfig = useAppConfig()
const slots = useSlots()
const config = computed(() => ({
  rounded: 'sm:rounded-lg',
  shadow: 'sm:shadow-xl',
  width: 'sm:max-w-xl',
  height: 'h-dvh sm:h-auto',
  padding: 'p-0',
  header: {
    base: 'flex items-start justify-between gap-x-1.5 flex-shrink-0 min-h-[--header-height]',
    inner: 'flex items-start gap-4',
    padding: twMerge('px-4 py-4 sm:px-6', (slots.default || slots.footer) ? 'pb-0' : undefined)
  },
  body: {
    base: 'flex-1 flex flex-col gap-y-3',
    padding: 'px-4 py-5 sm:p-6'
  },
  footer: {
    base: 'flex items-center gap-x-1.5 flex-shrink-0',
    padding: 'px-4 py-4 sm:px-6'
  },
  title: 'text-gray-900 dark:text-white font-semibold',
  description: 'mt-1 text-gray-500 dark:text-gray-400 text-sm',
  icon: {
    wrapper: 'inline-flex',
    base: 'w-12 h-12 flex-shrink-0 text-gray-900 dark:text-white'
  },
  default: {
    closeButton: {
      icon: appConfig.ui.icons.close,
      color: 'gray' as const,
      variant: 'ghost' as const,
      size: 'sm' as const
    }
  }
}))
defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  draggable: {
    type: Boolean,
    default: false
  },
  overlay: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: undefined
  },
  title: {
    type: String,
    default: undefined
  },
  description: {
    type: String,
    default: undefined
  },
  closeButton: {
    type: Object as PropType<Button | null>,
    default: () => ({})
  },
  ui: {
    type: Object as PropType<Partial<typeof config.value & typeof modalConfig>>,
    default: () => ({})
  }
})
const emit = defineEmits(['update:modelValue'])
const isOpen = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
const breakpoints = useBreakpoints(breakpointsTailwind)
const { ui, attrs } = useUI('dashboard.modal', toRef(props, 'ui'), config, undefined, true)
const smallerThanSm = breakpoints.smaller('sm')

// draggable
interface DraggableContainer {
  container: HTMLElement | null;
  uid: number | undefined;
  width: number;
  height: number;
}
const instance = getCurrentInstance();
const modal = reactive<DraggableContainer>({
  container: null,
  uid: instance?.uid,
  width: 0,
  height: 0,
});
watch(
  () => props.modelValue,
  async (isOpen) => {
    if (isOpen && props.draggable) {
      await nextTick();
      modal.container = document.querySelector(
        `.draggable-modal-${modal.uid}`
      ) as HTMLElement;
      // const innerContainer = modal.container.children[0] as HTMLElement

      const { width, height } = useElementSize(modal.container);
      modal.width = width.value;
      modal.height = height.value;
    }
  },
  { immediate: true }
);
const { width: windowWidth, height: windowHeight } = useWindowSize();
const { x, y } = useDraggable(toRef(modal, 'container'), {
  preventDefault: true,
});

watch(
  () => [x.value, y.value],
  () => {
    if (modal.container) {
      let newX = x.value;
      let newY = y.value;

      if (newX < 0) {
        newX = 0;
      } else if (newX + modal.width > windowWidth.value) {
        newX = windowWidth.value - modal.width;
      }

      if (newY < 0) {
        newY = 0;
      } else if (newY + modal.height > windowHeight.value) {
        newY = windowHeight.value - modal.height;
      }

      modal.container.style.left = `${newX}px`;
      modal.container.style.top = `${newY}px`;
    }
  }
);
</script>
