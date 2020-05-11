<template>
  <div>
    <el-tag
      :key="tag.name"
      v-for="tag in nowTags"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="selectTag(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState({
      nowTags: state => state.tab.tagsList
    })
  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations({
      closeTag: 'closeTags'
    }),
    handleClose(tag) {
      this.closeTag(tag)
      // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    selectTag(tag) {
      this.$store.commit('selectMenu', tag)
      this.$router.push({ name: tag.name }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag {
  margin-left: 10px;
  cursor: pointer;
}
</style>
