import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default {
  state:{
    reviews: [{
      rating: 5,
      review: 'blablabla',
      CreatorId:'sadfgh',
      meetupId:'asdfdgg',
      id:''
    }],
    user: null,
  },
  mutations:{
    setLoadedReviews (state, payload) {
      state.reviews = payload
    },
    registerForMeetup (state, payload){
      const id = payload.id
      if(state.user.registeredMeetups.findIndex(meetup=>meetup.id === id) >= 0){
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup=>meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    postReview (state, payload){
      state.reviews.push(payload)
    },
    deleteReview(state, payload) {
      const userReviews = state.user.reviews
      userReviews.splice(userReviews.findIndex(meetup=>meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions:{
    loadReviews ({commit, getters}){
      commit('setLoading',true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id + '/reviews/').once('value')
      .then((data) => {
        const reviews = []
        const object = data.val()
        console.log(object)

        for (let key in object) {
            reviews.push({
            id: key,
            rating: object[key].rating,
            review: object[key].review,
            creatorId: object[key].creatorId,
            meetupId: object[key].meetupId
          })
        }
        commit('setLoadedReviews', reviews)
        commit('setLoading',false)
      })
      .catch((error)=>{
        console.log(error)
        commit('setLoading',false)
      })
    },
    registerForMeetup({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/')
      .push(payload)
      .then(data => {
        commit('setLoading', false)
        commit('registerForMeetup', {id:payload, fbKey:data.key})
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
    unregisterFromMeetup({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys){
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
      .then(() => {
        commit('setLoading', false)
        commit('unregisterFromMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading',false)
      })
    },
    postReview({commit, getters}, payload) {
      commit('setLoading', true)
      const user = firebase.auth().currentUser
      const review = {
        rating: payload.rating,
        review: payload.review,
        meetupId: payload.meetupId,
        creatorId: user.email
      }
      firebase.database().ref('/users/' + getters.user.id).child('/reviews/').push(review)
      .then((data) =>{ 
        const key = data.key
        commit('setLoading', false)
        console.log(data)
        commit('postReview', {
          ...review,
          id: key})
      })
      .catch(error =>{
        commit('setLoading', false)
        console.log(error)
      })
      },

    deleteReview({commit, getters},payload){
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys){
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/reviews/').child(fbKey)
        .remove()
      .then(() => {
        commit('setLoading', false)
        commit('unregisterFromMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading',false)
      })
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
            registeredMeetups: [],
            reviews: [],
            userReviews: [],
            fbKeys: {}
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
            registeredMeetups: [],
            reviews: [],
            userReviews: [],
            fbKeys: {}
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
      commit('setUser', {
        id:payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
      .then(data => {
        const dataPairs = data.val()
        let registeredMeetups = []
        let swappedPairs = {}
        for (let key in dataPairs) {
          registeredMeetups.push(dataPairs[key])
          swappedPairs[dataPairs[key]] = key
        }
        const updatedUser = {
          id: getters.user.id,
          registeredMeetups: registeredMeetups,
          fbKeys: swappedPairs
        }
        commit('setLoading', false)
        commit('setUser', updatedUser)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading',false)
      })
    },
      logout({commit}){
        firebase.auth().signOut()
        commit('setUser', null)
      }
  },
  getters:{
    loadedReviews (state) {
      return state.reviews.sort((reviewA, reviewB) => {
        return reviewA.rating > reviewB.rating
      })
      },
    user (state) {
      return state.user
    }
  }
}