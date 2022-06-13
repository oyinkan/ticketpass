<template>
  <div class="flex">
    <p>{{perPage}} of {{total}}</p>
  </div>
</template>

<script>
export default {
  name: 'PaginationBar',
  props: [
    'perPage', 
    'total'
  ]
}
</script>

<style>

</style>