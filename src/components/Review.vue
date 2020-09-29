<template>
<v-container v-if="sameId">
  <v-row justify="center" v-if="loadedReviews.meetupId == loadedMeetup.id">
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
    v-model="editCard"
    v-for="reviews in loadedReviews" :key="reviews.id"
  >
  <v-row justify="center">
    <v-col>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline text-center">{{reviews.creatorId}}</div>
        <v-rating 
        v-model='reviews.rating'
        class="mb-1 text-center"
        color="yellow darken-3"
        background-color="grey darken-1"
        empty-icon="$ratingFull"
        half-increments
        x-large
        readonly
        ></v-rating>
        <v-list-item-subtitle class="text-center primary--text">{{reviews.review}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    </v-col>
  </v-row>
  </v-card>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props:['meetupId'],
  data () {
    return {
      editCard: false,
    }
  },
  computed: {
    ...mapGetters (['loadedReviews','loadedMeetup'])
  },
  methods: {
    sameId(){
      if(this.loadedReviews.meetupId===this.meetupId){
        return
      }else{
        console.log('not the same Id')
      }
    }
  }
}
</script>