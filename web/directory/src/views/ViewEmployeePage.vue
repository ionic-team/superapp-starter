<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
        <ion-title>Details</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" color="light" v-if="employee">
      <ion-card>
        <ion-card-header>
          <ion-avatar>
            <img alt="Employee's picture" :src="employee.images.thumbnail" />
          </ion-avatar>
          <ion-card-title>
            {{ employee.firstName }} {{ employee.lastName }}
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <h2>{{ employee.department }}, {{ employee.title }}</h2>
          <h3>{{ employee.office }}</h3>
        </ion-card-content>
      </ion-card>

      <ion-list :inset="true">
        <ion-item>
          <ion-icon :icon="call" slot="start" size="large"></ion-icon>
          <ion-label>{{ employee.contact.phone }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :icon="phonePortrait" slot="start" size="large"></ion-icon>
          <ion-label>{{ employee.contact.cell }}</ion-label>
        </ion-item>
        <ion-item>
          <ion-icon :icon="mail" slot="start" size="large"></ion-icon>
          <ion-label>{{ employee.contact.email }}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { call, mail, phonePortrait } from "ionicons/icons";
import { useRoute } from "vue-router";
import { getEmployeeById } from "../../../data/dataApi";

const route = useRoute();
const employee = getEmployeeById(parseInt(route.params.id as string, 10));
</script>

<style scoped>
ion-card {
  background: transparent;
  box-shadow: none;
}

ion-card ion-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: 100px;
}

ion-card ion-card-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ion-card ion-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
