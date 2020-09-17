<template>
<v-container>
  <v-row wrap justify="center" class="">
  <v-card xs12 sm6
    class="mx-auto info mb-3"
    max-width="400"
    v-for="meetup in loadedMeetups" :key="meetup.id"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="meetup.imageUrl"
    >
    </v-img>
  <v-row align="center" justify="center">
    <v-card-subtitle class="pb-0"></v-card-subtitle>
    <v-card-text class="text-left pl-8">
          <div class="white--text">{{meetup.date | date}}</div>
      </v-card-text>
    <v-card-text style="fontsize: 2rem" class="text--primary text-center">
      <div class="white--text font">{{ meetup.title }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="white"
        text
        :to="'/meetups/' + meetup.id"
      ><v-icon>mdi-arrow-right-bold-outline</v-icon>
      View Meetup
      </v-btn>
    </v-card-actions>
    </v-row>
  </v-card>
  </v-row>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters (['loadedMeetups'])
  }
}
</script>

<style scoped>
.font{
  font-size: 1.5rem !important;
}
</style>