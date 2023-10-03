<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="dismiss">
            <ion-icon :icon="chevronBack"></ion-icon> Hub
          </ion-button>
        </ion-buttons>
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
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { chevronBack } from "ionicons/icons";
import EmployeeListItem from "@/components/EmployeeListItem.vue";
import { Employee } from "../../../data/types";
import { getEmployees } from "../../../data/dataApi";
import { dismissPlugin } from "../../../data/superAppHandoff";
import { ref } from "vue";

const employees = ref<Employee[]>(getEmployees());

const refresh = (ev: CustomEvent) => {
  setTimeout(() => {
    ev.detail.complete();
  }, 3000);
};

const dismiss = () => {
  dismissPlugin.dismiss();
};
</script>
