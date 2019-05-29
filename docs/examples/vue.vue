<template>
  <div>
    <input id="input" v-model="input" />
    <div id="output">
      {{ output }}
    </div>
  </div>
</template>


  <script>
function reverse(string) {
  return string
    .split("")
    .reverse()
    .join("");
}
export default {
  data() {
    return {
      input: ""
    };
  },
  computed: {
    output() {
      return reverse(this.input);
    }
  }
};
</script>
