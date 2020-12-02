<template>
  <div>
    <!-- <v-navigation-drawer 
  v-model="drawer"
  color="blue"
  dark
  app>
    <v-list>
        <v-list-item
        class="ma-10"
          v-for="item in items"
          :key="item.title"
          link :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="key in items" :key="key">{{key.title}}</v-list-item>
      </v-list>
  </v-navigation-drawer> -->

    <v-app-bar color="red" dark hide-on-scroll app>
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->

      <v-toolbar-title
        >COVID-19 Tracking App
        <v-icon medium class="mb-1 ml-2">mdi-pill</v-icon></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="country in countries"
            :key="country"
            @click="() => {}"
            link
            :to="'/country/' + country"
          >
            <v-list-item-title @click="updateCountry(country)">{{
              country
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- <v-icon class="mr-5" v-model="drawer" @click="drawer = !drawer">mdi-file-search</v-icon> -->
    </v-app-bar>

    <v-container>
      <v-row>
        <v-col>
          <section>
            <h1 class="display-1">World Stats</h1>
            <v-row align="center" justify="center">
              <StartCard
                v-for="card in cards"
                :key="card"
                :bgColorNew="card.bgColorNew"
                :cardTitleNew="card.titleNew"
                :bgColor="card.bgColor"
                :cardIcon="card.icon"
                :cardTitle="card.title"
                :cardAmount="card.amount"
                :cardAmountNew="card.amountNew"
              ></StartCard>
            </v-row>
          </section>
        </v-col>
      </v-row>
      <section>
        <h2 class="display-1">Visuals</h2>
        <v-row align="center" justify="center"
          ><line-chart
            class="ma-5"
            v-for="visual in visuals"
            :key="visual.id"
            :chart-data="visual.chartData"
            :options="visual.options"
          ></line-chart
        ></v-row>
      </section>
    </v-container>
  </div>
</template>

<script>
import StartCard from "./StartCard";
import LineChart from "./lineChart";

export default {
  name: "Home",
  components: {
    StartCard,
    LineChart,
  },
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
    cards: [
      {
        title: "total cases",
        bgColor: "blue lighten-2",
        amount: 0,
        amountNew: 0,
        icon: "mdi-alert-box",
        titleNew: "today cases",
        bgColorNew: "background-color: black",
      },
      {
        title: "deaths",
        bgColor: "red accent-2",
        amount: 0,
        amountNew: 0,
        icon: "mdi-alpha-f-box",
        titleNew: "today deaths",
        bgColorNew: "background-color: black",
      },
      {
        title: "recoveries",
        bgColor: "teal lighten-1",
        amount: 0,
        amountNew: 0,
        icon: "mdi-hospital",
        titleNew: "today recoveries",
        bgColorNew: "background-color: black",
      },
    ],
    visuals: [],
    continents: null,
    allData: null,
    recoveredData: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },

  mounted() {
    this.$store.dispatch("updateTopCountries");

    this.axios
      .get("https://corona.lmao.ninja/v2/continents?sort")
      .then((response) => {
        this.continents = response;
        this.updateStats();
      })
      .catch((error) => {
        console.error("An API error:", error);
      });

    this.axios
      .get("https://corona.lmao.ninja/v2/historical/all")
      .then((response) => {
        this.allData = response;
        this.updateVisuals();
      })
      .catch((error) => {
        console.error("An API error:", error);
      });
  },

  methods: {
    updateCountry(country) {
      this.$store.dispatch("newCountryName", country);
    },
    updateStats() {
      let data = this.continents.data;
      let todayCases = 0;
      let cases = 0;
      let todayDeaths = 0;
      let deaths = 0;
      let recoveries = 0;

      for (let elem of data) {
        cases += elem.cases;
        todayCases += elem.todayCases;
        deaths += elem.deaths;
        todayDeaths += elem.todayDeaths;
        recoveries += elem.recovered;
      }

      this.cards[0].amount += cases;
      this.cards[0].amountNew += todayCases;
      this.cards[1].amount += deaths;
      this.cards[1].amountNew += todayDeaths;
      this.cards[2].amount += recoveries;
    },
    updateVisuals() {
      let data = this.allData.data.cases;
      let dataDeaths = this.allData.data.deaths;
      let dataRecoveries = this.allData.data.recovered;

      let labels = [];
      let casesPerDay = [];
      let labelsDeaths = [];
      let casesDeaths = [];
      let labelsRecoveries = [];
      let casesRecoveries = [];

      for (let key in data) {
        labels.push(key);
        casesPerDay.push(data[key]);
      }
      for (let i in dataDeaths) {
        labelsDeaths.push(i);
        casesDeaths.push(dataDeaths[i]);
      }

      for (let j in dataRecoveries) {
        labelsRecoveries.push(j);
        casesRecoveries.push(dataRecoveries[j]);
      }

      this.visuals.push({
        id: 1,
        chartData: {
          labels: labels,
          datasets: [
            {
              label: "Total cases in a 30 days",
              backgroundColor: "#64B5F6",
              data: casesPerDay,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
      this.visuals.push({
        id: 2,
        chartData: {
          labels: labelsDeaths,
          datasets: [
            {
              label: "Total deaths in a 30 days",
              backgroundColor: "#FF5252",
              data: casesDeaths,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });

      this.visuals.push({
        id: 3,
        chartData: {
          labels: labelsRecoveries,
          datasets: [
            {
              label: "Total recoveries in a 30 days",
              backgroundColor: "#26A69A",
              data: casesRecoveries,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });

      this.cards[2].amountNew += parseInt(
        casesRecoveries[casesRecoveries.length - 1] -
          casesRecoveries[casesRecoveries.length - 2]
      );
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
.field {
  position: absolute;
  top: 0;
  right: 0;
  background-color: black;
  color: white;
  border-radius: 0 0 0 30px;
  border: 3px solid white;
  padding: 0 30px;
  height: 50px;
}

.field:focus {
  outline: none;
}
</style>>