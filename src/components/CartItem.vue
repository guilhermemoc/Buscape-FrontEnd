<template>
  <li class="item">
    <span class="remove" v-on:click="$emit('removeFromCart')">X</span>

    <img v-bind:src="product.images[0]">

    <div>
      <div class="name">{{ product.name }}</div>
      <div class="installments">{{ product.price.installments }}x R$ <strong>{{ product.price.installmentValue | currency('') }}</strong></div>
      <div class="cash">ou <em>{{ product.price.value | currency }}</em> à vista</div>
    </div>
  </li>
</template>

<style lang="scss" scoped>
.item {
  padding: 15px;
  background: #c89e1d;
  clear: left;
  min-height: 93px;
}

.item + .item { margin-top: 3px}

.remove {
  cursor: pointer;
  float: right;
  font-weight: 900;
}

img {
  float: left;
  margin-right: 15px;
  border: 1px solid black;
  height: 90px;
  max-width: 90px;
}

.name {
  margin-top: 7px;
  min-height: 40px;
  font-weight: 700;
  color: white
}

.installments,
.cash
{ line-height: 1.2em }
</style>

<script>
export default {
  name: 'cart-item',

  props: [ 'product' ]
}
</script>
