<template>
  <v-app >
    <v-navigation-drawer absolute temporary v-model="sideNav">
      <v-list>
        <v-list-item 
        v-for="item in menuItems" 
        :key="item.title"
        router
        :to="item.link">
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{item.title}}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
      <v-card
    color="grey lighten-4"
    flat
    tile
  >
    <v-app-bar dark class="primary">
      <v-app-bar-nav-icon 
      @click.native.stop="sideNav = !sideNav"
      class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only purple darken-1">
        <v-btn 
        depressed 
        class="primary"
        v-for="item in menuItems" 
        :key="item.title"
        router
        :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}</v-btn>
        </v-toolbar-items>
        
    </v-app-bar>
    </v-card>
    <main >
      <router-view/>
    </main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    sideNav: false,
    menuItems:[
      { icon: 'mdi-account-supervisor', title: 'View Meetups', link:'/meetups' },
      { icon: 'mdi-map-marker', title: 'Organize Meetup', link:'meetup/new' },
      { icon: 'mdi-account', title: 'Profile', link:'/profile' },
      { icon: 'mdi-emoticon-outline', title: 'Sign up', link:'/signup' },
      { icon: 'mdi-lock-open-variant', title: 'Sign in', link:'/signin' },
    ]
  }),
};
</script>
