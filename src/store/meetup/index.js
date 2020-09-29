import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default {
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
  },
  mutations:{
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if(payload.title){
        meetup.title = payload.title
      }
      if(payload.description){
        meetup.description = payload.description
      }
      if(payload.date){
        meetup.date = payload.date
      }
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
            date: obj[key].date,
            location: obj[key].location,
            creatorId: obj[key].creatorId
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
    createMeetup ({commit, getters}, payload) {
      commit('setLoading',true)
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          return fileData.ref.getDownloadURL()
          .then(url => {
              imageUrl = url
              return firebase.database().ref('meetups').child(key).update({ imageUrl: url })
          })
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
          commit('setLoading',false)
        })
        .catch((error) => {
          commit('setLoading',false)
          console.log(error)
        })
      // Reach out to firebase and store it
    },
    updateMeetupData({commit}, payload){
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title){
        updateObj.title = payload.title
      }
      if (payload.description){
        updateObj.description = payload.description
      }
      if (payload.date){
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetup', payload)
      })
      .catch(error => {
        console.log(error)
        commit('setLoading', false)
      })
    },
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
    }
  }
}