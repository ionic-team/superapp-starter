<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Employee Directory</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-refresher slot="fixed" @ionRefresh="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Employee Directory</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <EmployeeListItem
          v-for="employee in employees"
          :key="employee.id"
          :employee="employee"
        />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonSearchbar,
} from "@ionic/vue";
import EmployeeListItem from "@/components/EmployeeListItem.vue";
import { getEmployees, Employee } from "@/data/employees";
import { ref } from "vue";

const employees = ref<Employee[]>(getEmployees());

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};
</script>
