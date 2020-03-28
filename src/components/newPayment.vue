<template>
  <v-form v-model="isValid" ref="form">
    <v-snackbar class="text-center" color="success" v-model="sucessBox">Sucessfully Inserted</v-snackbar>

    <v-col justify="centered">
      <v-card max-width="600" class="ma-auto">
       <v-card-title  v-if=name primary-title>
        Current Balance :  {{name.balance}}
       </v-card-title>
        <v-row justify="center" class="ma-auto pa-5">
          <v-autocomplete
            v-model="name"
            :items="nameList"
            :loading="isLoadingList"
            :search-input.sync="search"
            color="white"
            hide-no-data
            hide-selected
            item-text="name"
            item-value="id"
            :rules="[v => !!v || 'Name is Required']"
            label="Name "
            placeholder="Select a Name"
            prepend-icon="mdi-database-search"
            return-object
          ></v-autocomplete>
        </v-row>
        <v-row class="ma-auto">
          <v-col cols="12" sm="6" md="4">
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="datePayment"
                  label="Payment Date"
                  :rules="[v => !!v || 'Date is Required']"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="datePayment" @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col>
            <v-text-field
              v-model="amount"
              :rules="[v => !!v || 'Valid Balance Required']"
              label="Amount"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="ma-auto pa-4">
          <p>Payment Options</p>

          <v-btn-toggle shaped v-model="type" tile color="deep-purple accent-3" group>
            <v-btn value="Cash">Cash</v-btn>

            <v-btn value="Bank Transer">AC transfer</v-btn>

            <v-btn value="Online">Online</v-btn>

            <v-btn value="Cheque">Cheque</v-btn>
          </v-btn-toggle>
        </v-row>
        <v-row v-if="type=='Cheque'" class="ma-auto pa-4">
          <v-col>
            <v-select
              :items="itemList"
              v-model="bank"
              @select="console.log()"
              label="Bank Name"
              segmented
              :rules="[v => !!v || 'Opening Balance Required']"
              overflow
              editable
            ></v-select>
          </v-col>
          <v-col>
            <v-text-field
              label="Cheque No"
              :rules="[v => !!v || 'Opening Balance Required']"
              v-model="cheque_no"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateCheque"
                  label="Cheque Due Date"
                  prepend-icon="event"
                  :rules="[v => !!v || 'Opening Balance Required']"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dateCheque" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row class="ma-auto pa-4">
          <v-text-field label="Referece No" v-model="reference_no"></v-text-field>
        </v-row>
        <v-row justify="center" class="ma-auto pa-4">
          <v-btn color="primary" :loading="isLoading" @click="dataSubmit()">Add this</v-btn>
        </v-row>
      </v-card>
    </v-col>
  </v-form>
</template>

<script>
import db from "../firebaseInit";
import * as firebase from "firebase";
export default {
  beforeRouteEnter(to, from, next) {
    next(vm => vm.init(to.params.type));
  },
  data: () => ({
    datePayment: new Date().toISOString().substr(0, 10),
    dateCheque: new Date().toISOString().substr(0, 10),
    menu: false,
    amount: "",
    cheque_no: "",
    search: "",
    bank: "",
    name: "",
    isLoadingList: true,
    nameList: [],
    sucessBox: true,
    modal: false,
    isValid: false,
    menu2: false,
    reference_no: "",
    menu1: false,
    newBalance:"",
    PYMTtype: "",
    isLoading: false,
    itemList: ["HNB", "Commercial", "BOC", "Peoples"],
    type: "Cash",
    myFirebaseFirestoreTimestampFromDate: firebase.firestore.Timestamp.fromDate(
      new Date()
    )
  }),
  methods: {
    init(typePYMT) {
      this.PYMTtype = typePYMT;
      this.getAllSupplersORCustomers();
    },
    getAllSupplersORCustomers() {
      this.nameList=[]
      db.firestore()
        .collection(this.PYMTtype)
        .orderBy("name")
        .get()
        .then(data => {
          data.forEach(item => {
            const person = {
              name: item.data().name,
              id: item.id,
              balance:item.data().balance
            };
            this.nameList.push(person);
          });
          this.isLoadingList = false;
        });
    },
    dataSubmit() {
      this.$refs.form.validate();
      if (this.isValid) {
        this.isLoading = true;
        if (this.type == "Cheque")
          this.reference_no =
            this.bank +
            "/" +
            this.cheque_no +
            "/" +
            this.dateCheque +
            "/" +
            this.reference_no;
            console.log(this.name.balance)
           this.dateToFirebase();
      }
    },
    dateToFirebase() {
      const newmyFirebaseFirestoreTimestampFromDate = firebase.firestore.Timestamp.fromDate(
        new Date(this.datePayment)
      );
      db.firestore()
        .collection(this.PYMTtype)
        .doc(this.name.id)
        .collection("payments")
        .add({
          amount: this.amount,
          date: newmyFirebaseFirestoreTimestampFromDate,
          mode: this.type,
          reference_no: this.reference_no
        })
        .then(() => {
        
          this.newBalance= (Number(this.name.balance)-Number(this.amount)).toString()
          db.firestore()
        .collection(this.PYMTtype)
        .doc(this.name.id).update({
          balance:this.newBalance,
          last_payment:this.amount,
          last_active:newmyFirebaseFirestoreTimestampFromDate

          
        })
          this.isLoading = false;
          this.$refs.form.reset();
          this.sucessBox = true;
          this.getAllSupplersORCustomers();
      
        });
    }
  }
};
</script>

<style>
</style>