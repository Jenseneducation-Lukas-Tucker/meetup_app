<template>
  <v-dialog
    class="elevation-16 mx-auto"
    width="350"
    persistent
    v-model="editDialog"
  >
    <template v-slot:activator="{ on, attrs }">
  <v-btn accent v-bind="attrs" v-on="on" >
    Rate & Review
  </v-btn>
  </template>
  <form action.prevent="onPost"></form>
  <v-card width="100%">
    <v-row justify="center">
    <v-card-title class="headline">
      {{meetup.title}}
    </v-card-title>
    </v-row>
          <v-textarea
          clearable
          counter="150"
          name="review"
          label="Review"
          id="review"
          required
          v-model="review"
        ></v-textarea>
      <div class="text-center mt-12">
        <v-rating
          v-model="rating"
          class="mb-5"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
          x-large
        ></v-rating>
      </div>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn text @click="editDialog = false">No Thanks</v-btn>
      <v-btn
        color="primary"
        text
        type="submit"
        @click="onPost"
      >
        Rate Now
      </v-btn>
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
props:['meetup'], 
data() {
  return {
    editDialog: false,
    rating: 0,
    review: '',
  }
},
computed:{
      formIsValid (){
        return this.rating !== '0' 
      },
      },
methods: {
  onPost() {
    if(!this.formIsValid){
      return
    }
    this.editDialog = false
    const reviewData = {
    review: this.review,
    rating: this.rating,
    meetupId: this.meetup.id
    }
    this.$store.dispatch('postReview',reviewData)
  }
}

}
</script>