<script lang="ts" setup>
import BaseCard from '@/components/base/card/BaseCard.vue'
import BaseCardSection from '@/components/base/card/BaseCardSection.vue'
</script>

<template>
  <div class="q-pa-md">
    <BaseCard flat>
      <q-skeleton height="150px" square />

      <BaseCardSection>
        <q-skeleton type="text" class="text-subtitle1" />
        <q-skeleton type="text" width="50%" class="text-subtitle1" />
        <q-skeleton type="text" class="text-caption" />
        <q-skeleton type="text" class="text-caption" />
        <q-skeleton type="text" class="text-caption" />
      </BaseCardSection>
    </BaseCard>
  </div>
</template>
