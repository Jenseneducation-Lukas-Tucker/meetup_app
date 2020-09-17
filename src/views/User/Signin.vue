<template>
<v-container>
  <v-row justify="center">
    <v-col cols="12" sm="6">
      <v-card>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignin">
              <v-row>
                <v-col cols="12">
                  <v-text-field 
                  name="email"
                  label="Mail"
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field 
                  name="password"
                  label="Password"
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn type="submit">Sign In</v-btn>
                </v-col>
              </v-row>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {
data: () => ({
  email: '',
  password:'',
}),
computed:{
  user() {
    return this.$store.getters.user
  }
},
//watch user from computed so whenever the getter gives us a state
watch: {
  user (value) {
    if (value !== null && value !== undefined) {
      this.$router.push('/')
    }
  }
},
methods: {
  onSignin () {
    // VUEX
    this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
  }
}
}

</script>

<style>

</style>