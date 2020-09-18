<template>
<v-container>
  <v-row wrap>
    <v-col xs12 sm6 
    class="
    text-center
    pb-2 
    pt-4
    pt-sm-4">
      <v-btn large router to="/meetups" class="accent ma-3">Explore Meetups</v-btn>
      <v-btn large router :to="{path:'meetup/new'}" class="accent ma-3">Organize Meetups</v-btn>
    </v-col>
  </v-row>
  <v-row justify="center">
          <v-progress-circular
      indeterminate
      color="primary"
      :width="7"
      :size="70"
      v-if="loading"
    ></v-progress-circular>
  </v-row>
  <v-row justify="center" wrap v-if="!loading">
    <v-col xs12 sm6
    >
        <v-carousel
    cycle
    height="400"
    show-arrows-on-hover
    style="cursor: pointer"
  >
    <v-carousel-item
      v-for="meetup in meetups"
      :key="meetup.id"
      :src="meetup.imageUrl"
      @click="onLoadMeetup(meetup.id)"
    >
        <v-row
          class="fill-height"
          align="end"
          justify="center"
        >
          <div class="title">{{ meetup.title }} </div>
        </v-row>
    </v-carousel-item>
  </v-carousel>
    </v-col>
  </v-row>
  <v-row wrap class="mt-2">
    <v-col xs12 sm6 class="text-center">
      <p>Join Our Awesome Meetups!</p>
    </v-col>

  </v-row>

</v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading(){
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup(id){
      this.$router.push('/meetups/' + id)
    },
  }
}
</script>

<style scoped>
.title{
  position: absolute;
  text-align: center;
  background-color:rgba(0, 0, 0, 0.3) ;
  color: white;
  font-size: 2em;
  padding: 20px;
  bottom: 50px;
}
</style>