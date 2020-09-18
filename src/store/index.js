import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    loadedMeetups: [
      { imageUrl: 'https://cbsnews3.cbsistatic.com/hub/i/r/2020/08/05/e75c7d31-b8e5-4957-b8e6-672664837164/thumbnail/1200x630g8/247b3168454fcbd27326be7ea56d6e98/gettyimages-1208986924.jpg', 
      id: 'asdfdgg', 
      title: 'Meetup in New York',
      date: new Date(),
      location: 'New York',
      description:'NEWWWWWW YOOOORK BABIEE'
    },
      { imageUrl: 'https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-new-york.jpg?itok=neFmsUY1',
      id: 'asdfdpg', 
      title: 'Meetup in Paris',
      date: new Date(),
      location: 'Paris',
      description:'It is Paris!'
    }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations:{
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload){
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions:{
    loadMeetups ({commit}){
      commit('setLoading',true)
      firebase.database().ref('meetups').once('value')
      .then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading',false)
      })
      .catch((error)=>{
        console.log(error)
        commit('setLoading',false)
      })
    },
    createMeetup({commit}, payload){
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString()
      }
      firebase.database().ref('meetups').push(meetup)
      .then((data) =>{
        const key = data.key
        commit('createMeetup',{
          ...meetup,
          id: key
        })
      })
      .catch((error)=>{
        console.log(error)
      })
      //reach out to firebase and store it
    },
    signUserUp ({commit}, payload) {
      commit('setLoading',true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading',true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    autoSignIn({commit}, payload) {
      commit('setUser', {id:payload.uid,registeredMeetups: []})}
  },
  getters:{
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
    return getters.loadedMeetups.slice(0,5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})