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
    user: null
  },
  mutations:{
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions:{
    createMeetup({commit}, payload){
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'jasbfjasf'
      }
      //reach out to firebase and store it
      commit('createMeetup', meetup)
    },
    signUserUp ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    }
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
    }
  }
})