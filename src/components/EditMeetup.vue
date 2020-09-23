<template >
<v-dialog width="350px" persistent v-model="editDialog">
  <template v-slot:activator="{ on, attrs }">
  <v-btn fab accent v-bind="attrs" v-on="on">
    <v-icon>mdi-pencil-plus</v-icon>
  </v-btn>
  </template>
  <v-card>
    <v-container>
    <v-row>
      <v-col>
        <v-card-title>Edit Meetup</v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
          <v-text-field
          name="title"
          label="Title"
          id="title"
          required
          v-model="meetup.title"
          ></v-text-field>
        <v-textarea
          clearable
          counter="150"
          name="description"
          label="Description"
          id="description"
          required
          v-model="meetup.description"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-card-actions>
          <v-btn 
          depressed 
          class="blue--text darken-1" 
          @click="editDialog =false">Cancel</v-btn>
          <v-btn 
          depressed 
          class="blue--text darken-1" 
          @click="onSave">Save</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
    </v-container>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  props:['meetup'],
  data: () => ({
    editDialog:false,
}),
  methods:{
    onSave () {
      if(this.meetup.title.trim() === '' || this.meetup.description.trim() === ''){
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.meetup.title,
        description: this.meetup.description
      })

    }
  }
}
</script>

<style>

</style>