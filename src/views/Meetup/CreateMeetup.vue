<template>
<v-container>
  <v-row justify="center">
    <v-col sm="6">
      <h1 class="primary--text">Create a new Meetup</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <form @submit.prevent="onCreateMeetup">
        <v-row justify="center">
          <v-col sm="6"
          cols="12">
            <v-text-field
            name="title"
            label="Title"
            id="title"
            v-model="title"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="6"
          cols="12">
            <v-text-field
            name="location"
            label="Location"
            id="location"
            v-model="location"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="6"
          cols="12">
            <v-text-field
            name="imageUrl"
            label="Image URL"
            id="imageUrl"
            v-model="imageUrl"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
            <img :src="imageUrl" height="225px">
        </v-row>
        <v-row justify="center">
          <v-col sm="6"
          cols="12">
        <v-textarea
          clearable
          :rules="rules"
          counter="150"
          name="description"
          label="Description"
          id="description"
          v-model="description"
          required
        ></v-textarea>
          </v-col>
        </v-row>
        <v-row justify="center">
          <h2>Choose a Date & Time</h2>
        </v-row>
        <v-row justify="center">
          <v-date-picker v-model="date" class="ma-3">
          </v-date-picker>
          <v-time-picker v-model="time" format="24hr" class="ma-3">
          </v-time-picker>
        
        </v-row>
        
        <v-row justify="center">
            <v-btn 
            class="primary ma-3" :disabled="!formIsValid"
            type="submit"
            >
              Create Meetup
            </v-btn>
        </v-row>
        </form>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
    data: () => ({
      rules: [v => v.length <= 150 || 'Max 150 characters'],
      title:'',
      location:'',
      imageUrl:'',
      description:'',
      date: '',
      time: new Date()
    }),
    computed:{
      formIsValid (){
        return this.title !== '' && 
        this.location !== '' && 
        this.imageUrl !== '' && 
        this.description !== ''
      },
      submittableDateTime() {
        const date = new Date (this.date)
        if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
        }else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
        }
        console.log(date)
        return date
      }
    },
    methods:{
      onCreateMeetup (){
        if(!this.formIsValid) {
          return 
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          imageUrl: this.imageUrl,
          description: this.description,
          date: this.submittableDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      }
    }
}
</script>

<style>

</style>