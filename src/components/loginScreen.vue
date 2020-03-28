<template >
  <div class="text-center ma-10">
    <v-card class="mx-auto pa-10" max-width="850">
      <v-card-title primary-title class="justify-center">
        <div>
          <div>Login in to Portal</div>
        </div>
      </v-card-title>
      <v-card class="mx-auto pa-10" max-width="500">
        <v-text-field name="name" label="Username" id="id"></v-text-field>
        <v-text-field name="name" label="Password" id="id"></v-text-field>
        <v-btn flat color="primary" @click="login()">
          <v-icon class="mr-4">input</v-icon>Login
        </v-btn>
      </v-card>
    </v-card>
  </div>
</template>

<script>
 import firebase from "../firebaseInit";
export default {
  name: "loginScreen",
  methods: {
    login() {
      console.log("Login Here");

      firebase
        .auth()
        .signInWithEmailAndPassword('chamara@gmail.com', '123456').then(()=>{
            console.log("Login Sucess")
            this.$router.replace({ name: 'Home' })
        })
        .catch(function(error) {
          // Handle Errors here.
         console.log(error)
          // ...
        });
    }
  }
};
</script>

<style>
</style>