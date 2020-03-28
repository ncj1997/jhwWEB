<template>
  <v-container>
    <div class="text-right mb-12">
      <v-btn class="mt-12 mr-12" color="primary" @click="initialize()">
        <v-icon>refresh</v-icon>
      </v-btn>
      <v-btn class="mt-12" color="primary" @click="isOverlay = !isOverlay">
        <v-icon left>add</v-icon>Add new Item
      </v-btn>
    </div>

    <v-spacer></v-spacer>

    <v-overlay :dark="false" :absolute="true" :opacity="0.50" :value="isOverlay" :z-index="5">
      <div>
        <v-card style="padding:14px">
          <v-btn style="float:right" fab small color="primary" @click="closeWindow()">
            <v-icon>clear</v-icon>
          </v-btn>
          <v-card-title primary-title>Add New Item to List</v-card-title>
          <v-container grid-list-xs>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                name="name"
                label="Item Name"
                v-model="itemModel.name"
                :rules="[v => !!v || 'Name is required']"
                prepend-icon="local_mall"
                required
              ></v-text-field>
              <v-text-field
                name="name"
                label="Item Purcahse Price"
                v-model="itemModel.pur_price"
                :rules="[v => !!v || 'Price is required']"
                prepend-icon="local_shipping"
              ></v-text-field>
              <v-text-field
                name="name"
                :rules="[v => !!v || 'Price is required']"
                label="Item Sale Price"
                v-model="itemModel.sale_price"
                prepend-icon="monetization_on"
              ></v-text-field>
              <div class="text-center">
                <v-btn v-if="isEdit" color="primary" @click="updateItem()">
                  <v-icon left>edit</v-icon>Edit
                </v-btn>

                <v-btn
                  v-if="!isEdit"
                  @click="submitData()"
                  color="primary"
                  prepend-icon="local_mall"
                  :disabled="isLoading"
                  :loading="isLoading"
                >
                  <v-icon left>add</v-icon>Add
                </v-btn>
              </div>
            </v-form>
          </v-container>
        </v-card>
      </div>
    </v-overlay>
    <div>
      <v-card>
        <v-card-title>
          Hardware Inventory
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-dialog v-model="isDeleteBox" max-width="290">
          <v-card class="pa-10">
            <h4 class="text-center pb-4">Need to delete this item?</h4>
            <div class="text-center">
              <v-btn color="primary" @click="deleteItem()">Yeah Delete</v-btn>
            </div>
          </v-card>
        </v-dialog>
        <v-data-table
          :headers="headers"
          :items="items"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
          :loading="!isDataAvailable"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon class="mr-2" @click="onEdit(item)">mdi-pencil</v-icon>
            <v-icon @click="onDelete(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <br />
    <br />
    <br />
  </v-container>
</template>

<script>
//import CustomerReportVue from './CustomerReport.vue'
import db from "../firebaseInit";

export default {
  name: "HelloWorld",
  components: {},
  data: () => ({
    itemModel: {
      id: "",
      name: "",
      pur_price: "",
      sale_price: ""
    },
    search: "",
    documentId: "",
    valid: false,
    isDataAvailable:false,
    isOverlay: false,
    isLoading: false,
    isDeleteBox: false,
    isEdit: false,
    seen: true,
    items: [],
    headers: [
      { text: "Item Name", value: "name" },
      { text: "Purchase Price", value: "pur_price" },
      { text: "Selling Price", value: "sale_price" },
      { text: "Actions", value: "actions", sortable: false }
    ]
  }),
  created() {
    this.initialize();
  },
  methods: {
    closeWindow() {
      this.isOverlay = false;
      this.itemModel = {};
    },
    submitData() {
      if (this.$refs.form.validate()) {
        console.log("everthing Ok");
        this.isLoading = true;
        db.firestore()
          .collection("items")
          .add({
            Name: this.itemModel.name,
            Pur_Price: this.itemModel.pur_price,
            Sal_Price: this.itemModel.sale_price
          })
          .then(() => {
            console.log("Data Sucessfull Inserted");
            this.isLoading = false;
            this.initialize();
            this.itemModel = {};
            this.isOverlay = false;
          })
          .then(error => {
            console.log(error);
            this.isLoading = false;
            this.itemModel = {};
          });
      } else {
        console.log("everthing not Ok");
      }
    },
    initialize() {
      this.items = [];
      db.firestore()
        .collection("items")
        .get()
        .then(querysnapshot => {
          querysnapshot.forEach(doc => {
            // console.log(doc.data());
            const data = {
              id: doc.id,
              name: doc.data().Name,
              pur_price: doc.data().Pur_Price,
              sale_price: doc.data().Sal_Price
            };
            this.items.push(data);
          });
          this.isDataAvailable = true;
        });
    },
    onEdit(item) {
      this.itemModel = item;
      this.isOverlay = true;
      this.isEdit = true;
    },
    onDelete(item) {
      this.documentId = item.id;
      console.log(this.documentId);
      this.isDeleteBox = true;
    },
    updateItem() {
      db.firestore()
        .collection("items")
        .doc(this.itemModel.id)
        .update({
          Name: this.itemModel.name,
          Pur_Price: this.itemModel.pur_price,
          Sal_Price: this.itemModel.sale_price
        })
        .then(() => {
          console.log("Update Sucess");
          this.isOverlay = false;
          this.itemModel = {};
          this.initialize();
        });
    },
    deleteItem() {
      db.firestore()
        .collection("items")
        .doc(this.documentId)
        .delete()
        .then(() => {
          console.log("Delete Sucess");
          this.isDeleteBox = false;
          this.initialize();
        });
    }
  }
};
</script>

<style>
.v-overlay__content {
  position: relative;
  width: 50%;
}
</style>