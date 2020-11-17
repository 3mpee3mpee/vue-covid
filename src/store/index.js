import Vue from 'vue'
import Vuex from 'vuex'
import Country from './country'
import CountryPrototype from './countryPrototype'
import Common from './common'


Vue.use(Vuex)

export default new Vuex.Store({
  
  modules: {
      Country,
      CountryPrototype,
      Common
  }
})
