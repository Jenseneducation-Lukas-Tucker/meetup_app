<template>
<v-container>
  <v-row wrap justify="center" class="">
    <v-col xs12 sm10 md8 >
      <v-card class="accent d-flex flex-row mb-6"
      >
        <v-container fluid>
          <v-row wrap justify="start">
            <v-col xs5 sm4 md3 cols="6">
              <v-img
                src="https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-new-york.jpg?itok=neFmsUY1"
                height="150px"
                contain
                absolute>
              </v-img>
              </v-col>
              <v-col xs7 sm8 md9 cols="3">
              <v-card-title>
                <div>                <h3 class="white--text ">My Meetup</h3>
                <div>17th July 2021</div>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-btn depressed large light class="accent" to="/meetups/1">
                  <v-icon left>mdi-arrow-right-bold-outline</v-icon>
                  View Meetup
                </v-btn>
              </v-card-actions>
              </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {

}
</script>

<style>

</style>