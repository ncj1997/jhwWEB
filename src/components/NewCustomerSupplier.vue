<template>
  <v-card>
    <v-btn style="float:right" fab small color="primary" @click="closeWindow()">
      <v-icon>close</v-icon>
    </v-btn>
    <v-card-title primary-title>Create new customers or suppliers</v-card-title>
    <v-card>
      <v-container grid-list-xs>
        <v-row align="center" justify="center" class="ma-1">
          <v-text-field name="name" label="Name" id="id" autocomplete="off"></v-text-field>
        </v-row>
        <v-row align="center" justify="center" class="ma-1">
          <v-text-field name="name" label="Telephone Number" id="id" autocomplete="new-password"></v-text-field>
        </v-row>
        <v-row align="center" justify="center" class="ma-1">
          <v-text-field name="name" label="Opening Balance" id="id" autocomplete="new-password"></v-text-field>
        </v-row>

        <v-row align="center" justify="center" class="ma-1 mt-5">
          <v-btn color="primary">Save</v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "newcustomersupplier",
  methods: {
    closeWindow() {
      console.log("OK")
      this.$parent.isOverlay=false
    }
  }
};
</script>

<style>
</style>