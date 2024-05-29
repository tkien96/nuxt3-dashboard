<script setup lang="ts">
definePageMeta({ layout: 'admin', })
import type { Member } from '~/types/dashboard'
const { data: members } = await useFetch<Member[]>('/api/members', { default: () => [] })
const q = ref('')
const isInviteModalOpen = ref(false)
const filteredMembers = computed(() => {
  return members.value.filter((member) => {
    return member.name.search(new RegExp(q.value, 'i')) !== -1 || member.username.search(new RegExp(q.value, 'i')) !== -1
  })
})
</script>
<template>
  <UiDashboardPanelContent class="pb-24">
    <UiDashboardSection title="Manage access" description="Invite new members by email address."
      orientation="horizontal" :ui="{ container: 'lg:sticky top-2' }">
      <template #links>
        <UButton label="Invite people" color="black" @click="isInviteModalOpen = true" />
      </template>
      <UCard :ui="{ header: { padding: 'p-4 sm:px-6' }, body: { padding: '' } }" class="min-w-0">
        <template #header>
          <UInput v-model="q" icon="i-heroicons-magnifying-glass" placeholder="Search members" autofocus />
        </template>
        <SettingsMembersList :members="filteredMembers" />
      </UCard>
    </UiDashboardSection>
    <UiDashboardModal v-model="isInviteModalOpen" title="Invite people"
      description="Invite new members by email address" :ui="{ width: 'sm:max-w-md' }">
      <SettingsMembersForm @close="isInviteModalOpen = false" />
    </UiDashboardModal>
  </UiDashboardPanelContent>
</template>
