<template>
  <v-card
    max-width="300"
    class="summary-card ma-3 pt-6 rounded-b"
    :class="bgColor"
    dark
    outlined
    tile
  >
    <div class="icon-wrapper">
      <v-icon class="ma-auto display-1">{{ cardIcon }}</v-icon>
    </div>
    <v-card-title class="headline text-bold">
      <p class="count" :title="cardAmountNew + ' today'">{{ cardAmount }}</p>
    </v-card-title>
    <v-card-subtitle class="text-center text-bold font-weight-bold">
      {{ cardTitle }}
    </v-card-subtitle>
    <div :style="bgColorNew" class="todayDiv rounded-b elevation-0">
      <v-card-title class="headline text-bold">
        <p class="count" :title="cardAmountNew + ' today'">
          {{ cardAmountNew }}
        </p>
      </v-card-title>
      <v-card-subtitle class="text-center text-bold font-weight-bold">
        {{ cardTitleNew }}
      </v-card-subtitle>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "StartCard",
  data() {
    return {};
  },
  props: {
    bgColor: String,
    cardIcon: String,
    cardTitle: String,
    cardAmount: Number,
    cardAmountNew: Number,
    cardTitleNew: String,
    bgColorNew: String,
  },
};
</script>

<style scoped>
.icon-wrapper > .v-icon {
  width: 100%;
}

.summary-card {
  width: 100%;
  border-radius: 5px !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
}

.summary-card,
.headline > .count {
  width: 100%;
  text-align: center;
}

.todayDiv {
  box-shadow: rgba(0, 0, 0, 0.75);
}
</style>