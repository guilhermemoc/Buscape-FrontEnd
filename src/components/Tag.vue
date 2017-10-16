<template>
  <div class="tag"><slot></slot></div>
</template>

<style lang="scss" scoped>
$height:              24px;
$arrow-size:          $height / 2;
$gutter:              $arrow-size + 7px;
$tag-default-bgcolor: #0090de;
$tag-default-color:   white;

.tag + .tag { margin-left: $gutter }

.tag {
  position: relative;
  background-color: $tag-default-bgcolor;
  color: $tag-default-color;
  display: inline-block;
  padding: 0 3px 0 7px;
  height: $height;
  line-height: $height;
  text-transform: uppercase;
  font-size: 0.7em;

  &:before{
    content: "";
    position: absolute;
    top: 0;
    right: -$arrow-size;
    width: 0;
    height: 0;
    border-color: transparent transparent transparent $tag-default-bgcolor;
    border-style: solid;
    border-width: $arrow-size 0 $arrow-size $arrow-size;
	}
}
</style>

<script>
export default { name: 'tag' }
</script>
