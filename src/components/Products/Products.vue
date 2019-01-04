<template>
  <div>
    <h3>Add Product</h3>
      <div class="card products__add-product">
        <div>
          <input
          v-model="addProductData.product_id"
          class='validate'
          placeholder="Id"
          >
        </div>
        <div>
          <input
          v-model="addProductData.name"
          class='validate'
          placeholder="name"
          >
        </div>
        <div>
          <input
          v-model="addProductData.price"
          class='validate'
          placeholder="price"
          >
        </div>
        <div>
          <i
          v-on:click = 'onAdd'
          class='material-icons medium'
          >
          add
          </i>
        </div>
      </div>

      <ais-index
        app-id="latency"
        api-key="3d9875e51fbd20c7754e65422f7ce5e1"
        index-name="bestbuy"
      >
        <ais-search-box></ais-search-box>
        <ais-results>
          <template slot-scope="{ result }">
            <h2>
              <ais-highlight :result="result" attribute-name="name"></ais-highlight>
            </h2>
          </template>
        </ais-results>
      </ais-index>
      
    <h3>Products</h3>

    <div
      v-for="product in sortedProducts"
      v-bind:key="product.product_id"
      class ="collection"
    >

    <div
      v-if = "editId === product.product_id"
      class ='collection-item products__list-item'
      v-bind:class ="{ 'yellow lighten-4': editId === product.product_id }"
    >

    <div>{{product.product_id}}</div>
    <div>
        <input
          class = 'validate'
          v-model='editProductData.name'
        />
      </div>
      <div>
        <input
          class = 'validate'
          v-model='editProductData.price'
        />
      </div>
      <div>
        <i
        @click = 'onEditSubmit'
        class='material-icons'
        >
        check
        </i>
        <i
        @click = 'onCancel'
        class='material-icons'
        >
        cancel
        </i>
      </div>
    </div>
  <div
    v-else class ='collection-item products__list-item'
  >
      <div>{{product.product_id}}</div>
      <div>{{product.name}}</div>
      <div>{{product.price}}</div>
      <div>
        <i
        @click = 'onEdit(product)'
        class='material-icons'
        >
        mode_edit
        </i>
        <i
        @click = 'onDelete(product.product_id)'
        class='material-icons'
        >
        delete
        </i>
        <router-link
          :to="{
            name: 'ProductPage',
            params: { product_id: product.product_id }
          }"
        >
          <i class='material-icons'>
          search
          </i>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import db from '@/db'

export default {
  name: 'HelloWorld',
  data () {
    return {
      products: [],
      addProductData: {
        product_id: '',
        name: '',
        price: '',
      },
      editId: '',
      editProductData: {
        product_id: '',
        name: '',
        price: '',
      }
    }
  },
  computed: {
    sortedProducts () {
      return this.products.slice().sort((a, b) => {
        return a.product_id - b.product_id
      })
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    getProducts () {
    db.collection('Products').get().then(
      querySnapshot => {
        const products = []

      querySnapshot.forEach(doc => {
        products.push(doc.data())
      })
      this.products = products
    })
  },
    onAdd () {
      db.collection('Products').add(this.
        addProductData).then(this.getProducts)
      },
    onDelete (product_id) {
      db.collection('Products')
        .where('product_id', '==', product_id).get ()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
          doc.ref.delete().then(this.getProducts)
        })
      })
    },
    onEdit (product) {
      this.editId = product.product_id
      this.editProductData.name = product.name
      this.editProductData.price = product.price
    },
    onCancel () {
      this.editId = ''
      this.editProductData.name = ''
      this.editProductData.price = ''
    },
    onEditSubmit () {
      db.collection('Products')
        .where('product_id', '==', this.editId).get ()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
          doc.ref.set({
            product_id: this.editId,
            name: this.editProductData.name,
            price: this.editProductData.price
          }).then(this.getProducts)
        })
        this.onCancel()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.products__list-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.products__add-product {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.material-icons {
  cursor: pointer;
}
</style>
