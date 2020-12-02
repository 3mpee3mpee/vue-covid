<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: "Home", icon: "mdi-view-dashboard", link: "/" },
      { title: "About", icon: "mdi-account-box", link: "/about" },
      {
        title: "Top 5",
        icon: "mdi-gavel",
        link: "/",
        childrenLinks: [
          { name: "Ukraine", icon: "mdi-gavel", link: "/" },
          { name: "Russia", icon: "mdi-gavel", link: "/" },
        ],
      },
    ],
    currCountry: "",
    dataSearch: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },

  mounted() {
    this.$store.dispatch("updateTopCountries");
  },

  methods: {
    updateCountry(country) {
      this.$store.dispatch("newCountryName", country);
    },
  },
  computed: {
    countries() {
      return this.$store.getters.topCountries;
    },
  },
};
</script>

<style scoped>
</style>>

