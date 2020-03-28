<template>
  <div class="about">
    <v-container class="grey lighten-5 mb-6">
      <v-row>
        <v-col no-gutters>
          <v-card>
            <v-card-title>
              Transactions
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchTXN"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-detailsFF
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headersTXN"
              :items="dataTxn"
              :items-per-page="10"
              :search="searchTXN"
              class="elevation-1"
              :loading="!isDataAvailableTXN"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon class="mr-2" @click="viewCustomer(item)">playlist_add_check</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col no-gutters>
          <v-card>
            <v-card-title>
              Payments
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchPayment"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-detailsFF
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headersPayment"
              :items="dataPayment"
              :items-per-page="10"
              :search="searchPayment"
              class="elevation-1"
              :loading="!isDataAvailablePayment"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon class="mr-2" @click="viewCustomer(item)">playlist_add_check</v-icon>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import db from "../firebaseInit";

export default {
  name: "viewData",
  beforeRouteEnter(to, from, next) {
    next(vm => vm.init(to.params.type, to.params.id));

    // console.log(to.params)
    // this.type=to.params.type
    // this.doc=to.params.id
    //  console.log(this.doc)
  },
  data: () => ({
    searchPayment: "",
    searchTXN: "",
    headersPayment: [
      { text: "Date", value: "payment_date" },
      { text: "Amount", value: "amount" },
      { text: "Mode", value: "mode" },
      { text: "Reference", value: "reference_no", sortable: false }
    ],
    headersTXN: [
      { text: "Date", value: "payment_date" },
      { text: "Amount", value: "amount" },
      { text: "Reference", value: "reference_no", sortable: false }
    ],
    isDataAvailablePayment: false,
    isDataAvailableTXN: false,
    dataTxn: [],
    dataPayment: []
  }),

  methods: {
    init(type, id) {
      
      console.log(type+" "+id);
      this.getDataPayments(type,id);
      this.getDataTXN(type, id);
    },
    getDataPayments(supORcus, document) {
      // console.log(supORcus, document);
      //this.customers = [];
      db.firestore()
        .collection(supORcus)
        .doc(document)
        .collection("payments")
        .get()
        .then(dataSet => {
          dataSet.forEach(data => {
            console.log(data.id);
            const dataTxn = {
              id: data.id,
              mode: data.data().mode,
              amount: data.data().amount,
              reference_no: data.data().reference_no,
              payment_date: moment(data.data().date.toDate()).format(
                "MMM Do YYYY"
              )
            };
            // console.log(dataTxn);
            this.dataPayment.push(dataTxn);
            //this.customers.push(dataTxn);
          });
          //console.log(dataSet.data();
          this.isDataAvailablePayment = true;
        });
    },
    getDataTXN(supORcus, document) {
      // console.log(supORcus, document);
      //this.customers = [];
      db.firestore()
        .collection(supORcus)
        .doc(document)
        .collection("txn")
        .get()
        .then(dataSet => {
          dataSet.forEach(data => {
            console.log(data.id);
            const dataTxn = {
              id: data.id,
              mode: data.data().mode,
              amount: data.data().amount,
              reference_no: data.data().reference_no,
              payment_date: moment(data.data().date.toDate()).format(
                "MMM Do YYYY"
              )
            };
            // console.log(dataTxn);
            this.dataTxn.push(dataTxn);
            //this.customers.push(dataTxn);
          });
          //console.log(dataSet.data();
          this.isDataAvailableTXN = true;
        });
    }
  }
};
</script>>