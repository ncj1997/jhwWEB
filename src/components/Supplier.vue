<template>
  <div>
    <div class="pa-10">
      <v-overlay :dark="false" :absolute="true" :opacity="0.50" :value="isOverlay" :z-index="5">
        <v-card>
          <v-btn class="mr-3 mt-3" style="float:right" fab small color="primary" @click="closeWindow()">
            <v-icon>close</v-icon>
          </v-btn>
          <v-card-title primary-title>Create a new Supplier</v-card-title>
          <v-card>
              <v-form ref="form" v-model="valid" lazy-validation>
            <v-container grid-list-xs>
              <v-row align="center" justify="center" class="ma-1">
                <v-text-field name="name" label="Name" v-model="name" id="id"  :rules="[v => !!v || 'Name is required']" autocomplete="off"></v-text-field>
              </v-row>
              <v-row align="center" justify="center" class="ma-1">
                <v-text-field
                  name="name"
                  label="Telephone Number"
                  id="id"
                  v-model="telephone"
                  autocomplete="new-password"
                ></v-text-field>
              </v-row>
              <v-row align="center" justify="center" class="ma-1">
                <v-text-field
                  name="name"
                  label="Opening Balance"
                  id="id"
                   :rules="[v => !!v || 'Opening Balance Required']"
                  autocomplete="new-password"
                  v-model="balance"
                ></v-text-field>
              </v-row>

              <v-row align="center" justify="center" class="ma-1 mt-5">
                <v-btn :loading="isLoading" @click="addCustomer()" color="primary">Save</v-btn>
              </v-row>
            </v-container>
              </v-form>
          </v-card>
        </v-card>
      </v-overlay>

      <div class="text-right mb-12">
        <v-btn class="mt-12 mr-12" color="primary" @click="getCustomerData()">
          <v-icon>refresh</v-icon>
        </v-btn>
        <v-btn class="mt-12" color="primary" @click="isOverlay = !isOverlay">
          <v-icon left>add</v-icon>Add new Supplier
        </v-btn>
      </div>
      <v-card>
        <v-card-title>
          Supplier Report
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-detailsFF
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="customers"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
          :loading="!isDataAvailable"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="viewCustomer(item)">playlist_add_check</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import db from "../firebaseInit";


export default {
  name: "customer",

  data: () => ({
    search: "",
    isOverlay: false,
    isLoading:false,
    isDataAvailable:false,
    name:'',
    valid:false,
    telephone:'',
    balance:'',
    customerModel: {
      id: "",
      name: "",
      telephone:"",
      balance: "",
      last_payment: "",
      last_active: ""
    },
    customers: [],
    headers: [
      { text: "Supplier Name", value: "name" },
      { text: "Balance", value: "balance" },
      { text: "Last Payment", value: "last_payment" },
      { text: " Telephone", value: "telephone" },
      { text: "Last Active Date", value: "last_active" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  created() {
    console.log("I am here");
    this.getCustomerData();
  },
  methods: {
    closeWindow(item) {
      console.log(item);
      this.isOverlay=false
    },
    viewCustomer(item) {
      console.log(item.id);
      this.$router.push({ name: 'view-data-customer', params: { type: 'suppliers',id:item.id } })
    },
    getCustomerData() {
        this.customers=[]
      db.firestore()
        .collection("suppliers")
        .get()
        .then(dataSet => {
          dataSet.forEach(data => {
            console.log(data.id);
            const dataCustomer = {
              id: data.id,
              telephone:data.data().telephone,
              name: data.data().name,
              balance: data.data().balance,
              last_payment: data.data().last_payment,
              last_active: moment(data.data().last_active.toDate()).format(
                "MMM Do YY"
              )
            };
            this.customers.push(dataCustomer);
          });
          //console.log(dataSet.data();
          this.isDataAvailable=true
        });
    },
    addCustomer(){
        this.isLoading=true;
        db.firestore().collection('suppliers').add({
            name:this.name,
            balance:this.balance,
            last_active: new Date(),
            telephone: this.telephone
        }).then(()=>{
            console.log("Data Added ")
            this.isLoading=false
            this.isOverlay=false
            this.getCustomerData()
        })
    }
  }
};
</script>

<style>
</style>