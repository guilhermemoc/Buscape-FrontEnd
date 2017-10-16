<template>
  <div class="product">

    <!-- product thumbnails -->
    <div class="thumbs">
      <div class="wrapper" v-for="(image, index) of product.images" v-bind:key="index">
        <img :src="image" @mouseover="showImage(index)" @click="showImage(index)">
      </div>
    </div>

    <!-- product image -->
    <div class="image">
      <img
        v-for="(image, index) of product.images"
        v-bind:key="index"
        v-bind:src="image"
        v-bind:class="{ active: index === 0 }"
      >
    </div>

    <div class="content">

      <!-- product name -->
      <div class="name">
        {{ product.name }}

        <!-- favorite action -->
        <a
          class="like button"
          v-bind:class="{ 'is-favorite': product.isFavorite }"
          @click="$emit('toggleFavorite')"
        >
          <i class="like icon"></i>
        </a>
      </div>

      <!-- product tags -->
      <div class="ui tags">
        <slot name="tags"></slot>
      </div>

      <div class="two columns">
        <div class="column">

          <!-- product price -->
          <div class="installments">{{ product.price.installments }}x R$ <strong>{{ product.price.installmentValue | currency('') }}</strong></div>
          <div class="cash">ou <em>{{ product.price.value | currency }}</em> à vista</div>

        </div><div class="column">

          <!-- buy button -->
          <button class="ui buy button" v-on:click="$emit('addToCart')">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$padding:                  7px;
$thumbnail-size:           50px;
$thumbs-size:              $thumbnail-size + (2 * $padding);
$thumb-image-size:         40px;
$image-size:               300px + (2 * $padding);
$content-margin-left:      ($thumbs-size + $image-size);
$vertical-elements-gutter: 15px;

.product {
  background-color: white;
  position: relative;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  padding: 20px $padding 20px 0;
  box-shadow: 2px 3px 8px rgba(0, 0, 0, .25);
  min-height: 200px;
}

.thumbs {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: $thumbs-size;
  height: 100%;
  padding: $padding;
  overflow: hidden;
  text-align: center;

  .wrapper {
    border: 1px solid #eeeeee;
    border-radius: 3px;
    margin-bottom: 2px;
    padding: 2px;
  }

  img {
    display: block;
    margin: 0 auto;
    height: $thumb-image-size;
    max-width: $thumb-image-size;
  }
}

.image {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: $thumbs-size;
  width: $image-size;
  height: 100%;
  padding: $padding;

  img {
    display: none;
    margin: 0 auto;
    height: 200px;
    max-width: 200px;

    &.active {
      display: block;
    }
  }
}

.content {
  margin-left: $content-margin-left;
  box-sizing: border-box;
}

.name {
  color: #444444;
  font-size: 1.7em;
  border-bottom: 1px solid #cccccc;
  padding-bottom: $vertical-elements-gutter;
  margin-bottom: $vertical-elements-gutter;
}

.ui.tags:empty { display: none }

.two.columns {
  padding-top: $vertical-elements-gutter;

  .ui.tags:empty + & { padding-top: 39px }

  .column {
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    width: 50%;
    height: 100%;
    margin: 0;
    padding: 0 10px;
  }
}

.installments {
  color: #00b151;
  font-size: 1.15rem;
  margin-bottom: 10px;

  strong { font-size: 1.4em }
}

.cash {
  color: #757575;

  em {
    color: #00b151;
    font-style: normal;
  }
}

.like.button {
  cursor: pointer;
  color: #ffcd25;
  padding-left: 10px;
}

.like.icon:before {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: 0.7em;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;

  content: '\f08a'
}

.like.button.is-favorite .like.icon:before,
.like.icon:hover:before
{ content: '\f004' }

.buy.button {
  width: 100%;
  padding: 7px 3px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  background-color: #00b151;
  color: white;
  border: 0;
}


@media only screen and (max-width : 768px) {
  .product {
    padding-left: $padding;
    text-align: center
  }

  .thumbs,
  .image,
  .content {
    position: relative;
    display: inline-block;
  }

  .image {
    left: 0;
    width: auto
  }

  .content {
    margin-left: 3px;
    width: 100%;
  }
}

@media screen and (max-width: 425px) {
  .thumbs { display: none }

  .image { width: 100% }

  .two.columns {
    .column {
      display: block;
      width: 100%;
      text-align: center;
    }
  }

  .two.columns .column + .column {
    margin-top: 20px
  }
}
</style>

<script>
const NOT_FOUND_IMAGE = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgaGVpZ2h0PSIzMDBweCIKICAgd2lkdGg9IjMwMHB4IgogICB2ZXJzaW9uPSIxLjAiCiAgIHZpZXdCb3g9Ii0zMDAgLTMwMCA2MDAgNjAwIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpZD0ic3ZnNjY4NyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MSByMTM3MjUiCiAgIHNvZGlwb2RpOmRvY25hbWU9IkltYWdlbV9uw6NvX2Rpc3BvbsOtdmVsLnN2ZyI+PG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhNjcwMSI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczY2OTkiIC8+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxMzY2IgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjcxNSIKICAgICBpZD0ibmFtZWR2aWV3NjY5NyIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMC43ODY2NjY2NyIKICAgICBpbmtzY2FwZTpjeD0iMTUwIgogICAgIGlua3NjYXBlOmN5PSIxNTAiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzY2ODciIC8+PGNpcmNsZQogICAgIHN0cm9rZT0iI0FBQSIKICAgICBzdHJva2Utd2lkdGg9IjEwIgogICAgIHI9IjI4MCIKICAgICBmaWxsPSIjRkZGIgogICAgIGlkPSJjaXJjbGU2Njg5IiAvPjx0ZXh0CiAgICAgc3R5bGU9ImZvbnQtc2l6ZTozNjBweDtsaW5lLWhlaWdodDoxMjUlO2ZvbnQtZmFtaWx5OidCaXRzdHJlYW0gVmVyYSBTYW5zJywgJ0xpYmVyYXRpb24gU2FucycsIEFyaWFsLCBzYW5zLXNlcmlmO3RleHQtYWxpZ246Y2VudGVyO2xldHRlci1zcGFjaW5nOjE7d3JpdGluZy1tb2RlOmxyLXRiO3RleHQtYW5jaG9yOm1pZGRsZTtmaWxsOiM0NDQ0NDQ7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW9wYWNpdHk6MC41IgogICAgIHRyYW5zZm9ybT0ic2NhbGUoMC4yLDAuMikiCiAgICAgaWQ9InRleHQ2NjkxIgogICAgIHNvZGlwb2RpOmxpbmVzcGFjaW5nPSIxMjUlIj5JTUFHRU0gTsODTzwvdGV4dD4KPHRleHQKICAgICB5PSI3Ny4zNjI3NDciCiAgICAgeD0iLTAuNTk3NjU2MjUiCiAgICAgc3R5bGU9ImZvbnQtc2l6ZTo3MnB4O2xpbmUtaGVpZ2h0OjEyNSU7Zm9udC1mYW1pbHk6J0JpdHN0cmVhbSBWZXJhIFNhbnMnLCAnTGliZXJhdGlvbiBTYW5zJywgQXJpYWwsIHNhbnMtc2VyaWY7dGV4dC1hbGlnbjpjZW50ZXI7bGV0dGVyLXNwYWNpbmc6MC4yO3dyaXRpbmctbW9kZTpsci10Yjt0ZXh0LWFuY2hvcjptaWRkbGU7ZmlsbDojNDQ0NDQ0O3N0cm9rZTojMDAwMDAwO3N0cm9rZS13aWR0aDowLjQwMDAwMDAxO3N0cm9rZS1vcGFjaXR5OjAuNSIKICAgICBpZD0idGV4dDY2OTEtNiIKICAgICBzb2RpcG9kaTpsaW5lc3BhY2luZz0iMTI1JSI+RElTUE9Ow61WRUw8L3RleHQ+Cjwvc3ZnPg=='

export default {
  name: 'product',

  methods: {
    showImage (index) {
      let images = this.$el.querySelectorAll('.image img')

      for (let image of images) image.classList.remove('active')

      images[index].classList.add('active')
    }
  },
  props: [ 'product' ],
  mounted () {
    Array.from(this.$el.querySelectorAll('img')).forEach(image => {
      let onImageError = () => { image.src = NOT_FOUND_IMAGE }

      image.onerror = onImageError
    })
  }
}
</script>
