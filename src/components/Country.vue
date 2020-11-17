<template>
  <main>
    <v-container>
      <v-row>
        <v-col>
          <section>
    <h1 class="display-1">{{queryName}}</h1>
    <v-row align="center" justify="center">
    <StartCard v-for="card in countryDataCards" :key="card.title" :bgColorNew="card.bgColorNew" :cardTitleNew="card.titleNew" :bgColor="card.bgColor" :cardIcon="card.icon" :cardTitle="card.title" :cardAmount="card.amount" :cardAmountNew="card.amountNew"></StartCard>
    </v-row>
    </section>
    </v-col>
    </v-row>
    <section>
      <h2 class="display-1">Visuals</h2>
      <v-row align="center" justify="center"><line-chart class="ma-5" v-for="visual in countryDataVisuals" :key="visual.id" :chart-data="visual.chartData" :options="visual.options"></line-chart></v-row>
    </section>
    </v-container>
  </main>
</template>

<script>
import StartCard from '../components/StartCard'
import LineChart from '../components/lineChart'


export default {
  name: 'Country',
  props: ['queryName'],
  components: {
    StartCard,
    LineChart
  },
  data(){
    return{
      cards: [],
      visuals: []
    }
  },
  mounted (){
    this.updateCountryStats()

    
  },
//   methods: {
//     updateCountryStats(){
//      let data = this.$store.getters.country
//      let todayCases = 0
//      let cases = 0
//      let todayDeaths = 0
//      let deaths = 0
//      let recoveries = 0

  

//       for (let elem of data){
//        cases +=elem.cases
//        todayCases += elem.todayCases
//        deaths +=elem.deaths
//        todayDeaths += elem.todayDeaths
//        recoveries +=elem.recovered
//      }

//      this.cards[0].amount += cases
//      this.cards[0].amountNew += todayCases
//      this.cards[1].amount += deaths
//      this.cards[1].amountNew += todayDeaths
//      this.cards[2].amount += recoveries
   
//    },
//    updateVisuals(){
//      let data = this.allData.data.cases
//      let dataDeaths = this.allData.data.deaths
//      let dataRecoveries = this.allData.data.recovered

//      let labels = []
//      let casesPerDay = []
//      let labelsDeaths = []
//      let casesDeaths = []
//      let labelsRecoveries = []
//      let casesRecoveries = []

//      for (let key in data){
//        labels.push(key)
//        casesPerDay.push(data[key])
//      }
//      for (let i in dataDeaths){
//        labelsDeaths.push(i)
//        casesDeaths.push(dataDeaths[i])
//      }

//      for (let j in dataRecoveries){
//        labelsRecoveries.push(j)
//        casesRecoveries.push(dataRecoveries[j])
//      }


//      this.visuals.push({
//        id: 1,
//        chartData: {
//        labels: labels,
//             datasets: [{
//                 label: 'Total cases in a 30 days',
//                 backgroundColor: '#64B5F6',
//                 data: casesPerDay
//             }]
//       },
//       options: { responsive: true, maintainAspectRatio: false }
//      })
//    this.visuals.push({
//        id: 2,
//        chartData: {
//        labels: labelsDeaths,
//             datasets: [{
//                 label: 'Total deaths in a 30 days',
//                 backgroundColor: '#FF5252',
//                 data: casesDeaths
//             }]
//       },
//       options: { responsive: true, maintainAspectRatio: false }
//      })

//     this.visuals.push({
//        id: 3,
//        chartData: {
//        labels: labelsRecoveries,
//             datasets: [{
//                 label: 'Total recoveries in a 30 days',
//                 backgroundColor: '#26A69A',
//                 data: casesRecoveries
//             }]
//       },
//       options: { responsive: true, maintainAspectRatio: false }
//      })

     

//      this.cards[2].amountNew += parseInt(casesRecoveries[casesRecoveries.length-1] - casesRecoveries[casesRecoveries.length-2])
     
    
//    },
   
// },

    computed: {
        countryDataCards (){
            let countryData = this.$store.getters.country
            let cards = []

            cards.push({title: 'total cases', bgColor: 'blue lighten-2', amount:countryData.cases, amountNew: 0, icon:'mdi-alert-box'})
            cards.push({title: 'deaths', bgColor: 'red accent-2', amount:countryData.deaths, amountNew: 0, icon:'mdi-alpha-f-box'})
            cards.push({title: 'recoveries', bgColor: 'teal lighten-1', amount:countryData.recoveries, amountNew: 0, icon:'mdi-hospital'})

            return cards
        },
        countryDataVisuals(){
            let countryData = this.$store.getters.country
            let visuals = []

            visuals.push({
               id: 1,
                chartData: {
                    labels: countryData.visualLabels,
                    datasets: [{
                        label: 'Total cases',
                        backgroundColor: '#6aaaff',
                        data: countryData.visualData.cases
                    }]
                } ,
                options: {responsive: true, maintainAspectRatio: false}
            })
            visuals.push({
               id: 2,
                chartData: {
                    labels: countryData.visualLabels,
                    datasets: [{
                        label: 'Deaths',
                        backgroundColor: '#FF5252',
                        data: countryData.visualData.deaths
                    }]
                } ,
                options: {responsive: true, maintainAspectRatio: false}
            })
            visuals.push({
               id: 1,
                chartData: {
                    labels: countryData.visualLabels,
                    datasets: [{
                        label: 'Recoveries',
                        backgroundColor: '#26A69A',
                        data: countryData.visualData.recoveries
                    }]
                } ,
                options: {responsive: true, maintainAspectRatio: false}
            })

            return visuals
        }
    }
  }
</script>
