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
      <v-btn large router to="/meetups/new" class="accent ma-3">Organize Meetups</v-btn>
    </v-col>
  </v-row>
  <v-row justify="center" wrap>
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
  data: () => ({
    meetups : [
      { imageUrl: 'https://cbsnews3.cbsistatic.com/hub/i/r/2020/08/05/e75c7d31-b8e5-4957-b8e6-672664837164/thumbnail/1200x630g8/247b3168454fcbd27326be7ea56d6e98/gettyimages-1208986924.jpg', id: 'asdfdgg', title: 'Meetup in New York'},
            { imageUrl: 'https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1444253482/DG2015-new-york.jpg?itok=neFmsUY1', id: 'asdfdpg', title: 'Meetup in Paris'}
    ]
  }),
  methods: {
    onLoadMeetup(id){
      this.$router.push('/meetups/' + id)
    }
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