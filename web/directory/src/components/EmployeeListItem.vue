<template>
  <ion-item
    v-if="employee"
    :routerLink="'/employee/' + employee.id"
    :detail="false"
    class="list-item"
  >
    <ion-avatar slot="start">
      <img alt="Employee's picture" :src="employee.images.thumbnail" />
    </ion-avatar>
    <ion-label class="ion-text-wrap">
      <h2>
        <h2>{{ employee.firstName }} {{ employee.lastName }}</h2>
      </h2>
      <h3>{{ employee.title }}</h3>
      <p>{{ employee.office }}</p>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonAvatar } from "@ionic/vue";

defineProps({
  employee: Object,
});
</script>

<style scoped>
.list-item ion-label {
  margin-top: 12px;
  margin-bottom: 12px;
}

.list-item h2 {
  font-weight: 600;
  margin: 0;
}
</style>
