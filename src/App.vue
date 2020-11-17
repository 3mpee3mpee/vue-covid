<template>
  <v-app>
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

  <v-app-bar 
  color="red"
  dark
  hide-on-scroll
  app>
  <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
  
  <v-toolbar-title>COVID-19 Tracking App <v-icon medium class="mb-1 ml-2">mdi-pill</v-icon></v-toolbar-title>
  <v-spacer></v-spacer>
  <v-menu left bottom >
    <template v-slot:activator="{on}">
      <v-btn icon v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item v-for="country in countries" :key="country" @click="() => {}"  link :to="'/country'+country">
        <v-list-item-title @click="updateCountry(country)">{{country}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <!-- <v-icon class="mr-5" v-model="drawer" @click="drawer = !drawer">mdi-file-search</v-icon> -->
 
  
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-main>

    <!-- Provides the application the proper gutter -->
    
      
      <v-container fluid>
      <!-- If using vue-router -->
      
      <router-view></router-view>
       </v-container>

   
  </v-main>

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
  
  },

  data: () => ({
    drawer: false,
    group: null,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', link:'/' },
      { title: 'About', icon: 'mdi-account-box', link:'/about' },
      { title: 'Top 5', icon: 'mdi-gavel', link:'/', childrenLinks: [{name: 'Ukraine', icon: 'mdi-gavel', link: '/'}, {name: 'Russia', icon: 'mdi-gavel', link: '/'}] },
      
    ],
    currCountry: '',
    countries: [],
    dataSearch: null
    
  }),
   watch: {
      group () {
        this.drawer = false
      },
},

mounted(){
  this.$store.dispatch('updateTopCountries')
},

  
  methods:{
    updateCountry (country){
      this.$store.dispatch('newCountryName', country)
    }
  },
  computed: {
    countries () {
      return this.$store.getters.topCountries
    }
  }
}
</script>

<style scoped>
  .field{
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

.field:focus{
  outline: none;
}

</style>>

