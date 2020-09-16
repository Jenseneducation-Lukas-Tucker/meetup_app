<template>
  <v-app>
    <v-navigation-drawer fixed v-model="sideNav">
      <v-list>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>mdi-account-supervisor</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>View Meetups</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dark absolute class="primary">
      <v-app-bar-nav-icon 
      @click.native.stop="sideNav = !sideNav"
      class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>DevMeetup</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items fixed class="hidden-xs-only purple darken-1">
        <v-btn depressed class="primary">
          <v-icon left>mdi-account-supervisor</v-icon>
          View Meetups</v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <main>

    </main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    sideNav: false,
    menuItems:[
      { icon: 'mdi-account-supervisor', title: 'view Meetups'}
    ]
  }),
};
</script>
