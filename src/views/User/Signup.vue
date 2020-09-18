<template>
<v-container>
  <v-row justify="center" v-if="error">
    <v-col cols="12" sm="6">
      <app-alert @dismissed="onDismissed" :text="error.message" ></app-alert>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" sm="6">
      <v-card>
        <v-card-text>
          <v-container>
            <form @submit.prevent="onSignup">
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
                  <v-text-field 
                  name="confirmpassword"
                  label="Confirm Password"
                  id="confirmpassword"
                  v-model="confirmpassword"
                  type="password"
                  :rules="[comparePasswords]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-btn type="submit"
                  :disabled="loading" 
                  :loading="loading">
                  Sign Up
                    <span class="custom-loader">
                      <v-icon light></v-icon>
                  </span>
                  </v-btn>
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
  confirmpassword:'',
}),
computed:{
  comparePasswords () {
    return this.password !== this.confirmpassword ? 'Password do not match' : ''
  },
  user() {
    return this.$store.getters.user
  },
  error () {
    return this.$store.getters.error
  },
  loading (){
    return this.$store.getters.loading
  }
},
//watch user from computed so whenever the getter gives us a state
watch: {
  user (value) {
    if (value !== null && value !== undefined) {
      this.$router.push('/')
    }
  },
},
methods: {
  onSignup () {
    // VUEX
    this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
  },
  onDismissed (){
    console.log('Dismissed Alert!')
    this.$store.dispatch('clearError')
  }
}
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>