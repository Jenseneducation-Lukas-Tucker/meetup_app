<template>
<v-dialog width="350px" persistent v-model="editDialog">
  <template v-slot:activator="{ on, attrs }">
  <v-btn accent v-bind="attrs" v-on="on">
    Edit Date
  </v-btn>
  </template>
  <v-card>
    <v-container>
    <v-row>
      <v-col>
        <v-card-title>Edit Meetup Date</v-card-title>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-date-picker v-model="editableDate" style="width:100%" actions>
          <template>
            <v-btn 
            class="blue--text darken-1" 
            depressed 
            @click.native="editDialog = false"
            >Close</v-btn>
            <v-btn 
            class="blue--text darken-1" 
            depressed 
            @click.native="onSaveChanges"
            >Save</v-btn>
          </template>
        </v-date-picker>
      </v-col>
    </v-row>
    </v-container>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  name:'EditDate',
props: ['meetup'],
data () {
  return {
    editDialog: false,
    editableDate: null
  }
},
methods:{
  onSaveChanges () {
    const newDate = new Date(this.meetup.date)
    const newDay = new Date(this.editableDate).getUTCDate()
    const newMonth = new Date(this.editableDate).getUTCMonth()
    const newYear = new Date(this.editableDate).getUTCFullYear()
    newDate.setUTCDate(newDay)
    newDate.setUTCMonth(newMonth)
    newDate.setUTCFullYear(newYear)
    this.$store.dispatch('updateMeetupData', {
      id: this.meetup.id,
      date: newDate
    })
  }
},
created () {
  this.editableDate = new Date(this.meetup.date).toISOString().substr(0,10)
}
}
</script>

<style>

</style>