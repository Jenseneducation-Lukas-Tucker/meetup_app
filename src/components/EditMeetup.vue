<template >
<v-dialog width="350px" persistent>
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

    </v-container>
  </v-card>
</v-dialog>
</template>

<script>
export default {
data: () => ({
  dialog: false
})
}
</script>

<style>

</style>