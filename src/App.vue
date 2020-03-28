<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <h1>Jayasinghe Hardware</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-dialog v-model="createBox" overlay-opacity="0.1" max-width="600px">
      
           <v-card>
          <v-card-title  primary-title>
              Choose what to create 
          </v-card-title>
       <v-row >
           <v-col class="ma-4 text-center" >
               <v-icon color="green darken-2" size="125">shop</v-icon><br>
             <v-btn outlined="" @click="createBox=false" to="/create/txn/customers" color="primary">Sale</v-btn>
           </v-col>
           <v-col class="ma-4  text-center">
                <v-icon color="orange darken-2" size="125">local_grocery_store</v-icon><br>
               <v-btn  outlined="" @click="createBox=false" to="/create/txn/suppliers" color="primary">Purchase</v-btn>
               
           </v-col>
       </v-row>
       <v-row>
           <v-col class="ma-4  text-center">
                <v-icon color="purple darken-2" size="125">arrow_downward</v-icon><br>
               <v-btn outlined="" color="primary" @click="createBox=false" to="/create/payment/customers">Payement In</v-btn>
           </v-col>
           <v-col class="ma-4  text-center">
                <v-icon color="yellow darken-2" size="125">arrow_upward</v-icon><br>
               <v-btn outlined="" color="primary" @click="createBox=false" to="/create/payment/suppliers">Payment Out</v-btn>
           </v-col>
       </v-row>
      </v-card>
       
    </v-dialog>

    <div class="ma-6"></div>

    <v-container class="mt-3" grid-list-xs>
      <v-col cols="12">
        <v-row justify="center" no-gutters>
          <div class="mx-3 text-center">
            <v-btn fab outlined color="primary" to="/" dark>
              <v-icon>dashboard</v-icon>
            </v-btn>
            <br />
            <v-btn class="mt-2" to="/items" color="primary">Dashboard</v-btn>
          </div>
          <div class="mx-3 text-center">
            <v-btn fab outlined color="primary" to="/items" dark>
              <v-icon>store</v-icon>
            </v-btn>
            <br />
            <v-btn class="mt-2" to="/items" color="primary">Inventory</v-btn>
          </div>
          <div class="mx-3 text-center">
            <v-btn fab outlined color="primary" dark>
              <v-icon>local_shipping</v-icon>
            </v-btn>
            <br />
            <v-btn class="mt-2" color="primary">Orders</v-btn>
          </div>
          <div class="mx-3 text-center">
            <v-btn fab outlined color="primary" to="/suppliers" dark>
              <v-icon>category</v-icon>
            </v-btn>
            <br />
            <v-btn class="mt-2" to="/suppliers" color="primary">Suppliers</v-btn>
          </div>
          <div class="mx-3 text-center">
            <v-btn fab outlined color="primary" to="/customers" dark>
              <v-icon>account_box</v-icon>
            </v-btn>
            <br />
            <v-btn class="mt-2" to="/customers" color="primary">Customers</v-btn>
          </div>
          <div class="mx-3 text-center">
            <v-btn fab outlined color="success" @click="createBox=!createBox" dark>
              <v-icon>add</v-icon>
            </v-btn>
            <br />
            <v-btn class="mt-2" @click="createBox=!createBox" color="success">Create new</v-btn>
          </div>
        </v-row>
      </v-col>
    </v-container>

    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: "App",
  components: {
   
  },

  data: () => ({
    createBox: false
    //
  })
};
</script>


