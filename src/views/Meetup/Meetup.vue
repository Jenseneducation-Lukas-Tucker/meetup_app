<template>
<v-container>
    <v-row wrap justify="center" v-if="loading">
          <v-progress-circular
      indeterminate
      color="primary"
      :width="7"
      :size="70"
    ></v-progress-circular>
  </v-row>
  <v-row wrap v-else>
    <v-col xs12>
      <v-card>
        <v-card-title>
          <h4 class="primary--text">{{meetup.title}}</h4>
          <template v-if="userIsCreator">
            <v-spacer></v-spacer>
            <app-edit-meetup :meetup="meetup"></app-edit-meetup>
          </template>
        </v-card-title>
        <v-img
        :src="meetup.imageUrl"
        height="400px">
        </v-img>
        <v-card-text>
          <div class="info--text">{{meetup.date | date}} - {{meetup.location}}</div>
          <div>
            <app-edit-date 
            :meetup="meetup" v-if="userIsCreator">
            </app-edit-date>
            <app-edit-time 
            :meetup="meetup" v-if="userIsCreator">
            </app-edit-time>
            </div>
          <div>
          {{ meetup.description }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <app-write-review :meetup="meetup"></app-write-review>
          <app-register :meetupId="meetup.id" v-if="userIsAuth &&!userIsCreator"></app-register>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row justify="center">
    <app-review :meetup="meetup"></app-review>
  </v-row>
  </v-container> 
</template>

<script>
export default {
  name:'meetup',
  props:['id'],
  computed: {
    meetup (){
    return this.$store.getters.loadedMeetup(this.id)
    },
    reviews () {
      return this.$store.getters.loadedReviews
    },
    userIsAuth () {
      return this.$store.getters.user != null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuth) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading(){
      return this.$store.getters.loading
    }
  }
}
</script>

<style>

</style>