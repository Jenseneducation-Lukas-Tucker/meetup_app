<template>
  <v-dialog
    class="elevation-16 mx-auto"
    width="300"
  >
    <template v-slot:activator="{ on, attrs }">
  <v-btn accent v-bind="attrs" v-on="on">
    Rate & Review
  </v-btn>
  </template>
    <v-card-title class="headline">
      {{meetup.title}}
    </v-card-title>
          <v-textarea
          clearable
          counter="150"
          name="description"
          label="Description"
          id="description"
          required
          v-model="meetup.description"
        ></v-textarea>
      <div class="text-center mt-12">
        <v-rating
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
        ></v-rating>
      </div>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn text>No Thanks</v-btn>
      <v-btn
        color="primary"
        text
      >
        Rate Now
      </v-btn>
    </v-card-actions>
  </v-dialog>
</template>
<script>
export default {
props:['meetup']  
}
</script>