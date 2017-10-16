<template>
  <div id="app">
    <header class="font-default">
      <logo class="logo"></logo>

      <div class="cart__wrapper" v-if="cart.products.length > 0">
        <label class="cartToggleLabel animated fadeIn" for="cartToggle" v-bind:data-cart-qty="cart.products.length"></label>

        <input id="cartToggle" type="checkbox">

        <div class="cart animated fadeInDown">
          <ul class="cart__products">
            <cart-item
              v-for="(cartItem, index) of cart.products"
              v-bind:key="index"
              v-bind:product="cartItem"
              v-on:removeFromCart="removeFromCart(cartItem)"
            ></cart-item>
          </ul>

          <div class="cart__footer">
            <h2>subtotal</h2>
            <div class="installments">{{ cart.subtotal.installments }}x <strong>{{ cart.subtotal.installmentValue | currency }}</strong></div>
            <div class="cash">ou <em>{{ cart.subtotal.value | currency }}</em> à vista</div>
          </div>
        </div>
      </div>
    </header>

    <!-- product list -->
    <div class="ui products">
      <product
        v-for="(product, index) of products" v-bind:key="index"
        v-bind:product="product"
        v-on:addToCart="addToCart(product)"
        v-on:toggleFavorite="toggleFavorite(product)"
      >

        <!-- product tags -->
        <template slot="tags" v-if="product.tags">
          <tag v-for="(tag, index) of product.tags" v-bind:key="index">{{ tag.text }}</tag>
        </template>
      </product>
    </div>
  </div>
</template>

<style lang="scss">
@import 'assets/css/main.css';
@import 'assets/css/animate.css';

</style>

<script>
import {db} from './firebase'

import Vue from 'vue'
import VueFire from 'vuefire'

import CartItem from '@/components/CartItem'
import Logo from '@/components/Logo'
import Product from '@/components/Product'
import Tag from '@/components/Tag'

Vue.use(VueFire)

export default {
  name: 'app',

  components: { CartItem, Logo, Product, Tag },
  data () {
    return {
      cart: {
        subtotal: {
          installments: 1,
          installmentValue: 0,
          value: 0
        },
        products: []
      },
      products: {}
    }
  },

  firebase: {
    products: { source: db.ref('products') }
  },

  methods: {
    addToCart (product) {
      if (this.cart.products.indexOf(product) === -1) this.cart.products.push(product)
      this.updateTotals()
    },
    removeFromCart (product) {
      this.cart.products.splice(this.cart.products.indexOf(product), 1)
      this.updateTotals()
    },
    toggleFavorite (product) {
      let index = this.products.indexOf(product)
      if (index !== -1) this.products[index].isFavorite = !this.products[index].isFavorite
    },
    updateTotals () {
      let installments = 1
      let subtotal = 0

      for (let product of this.cart.products) {
        if (product.price.installments > installments) {
          installments = product.price.installments
        }

        subtotal += product.price.value
      }

      this.cart.subtotal.installments = installments
      this.cart.subtotal.installmentValue = subtotal / installments
      this.cart.subtotal.value = subtotal
    }
  }
}
</script>
