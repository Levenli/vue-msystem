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
      // console.log(tag, 'nowTag')
      let preIndex = this.nowTags.findIndex(item => item.name === tag.name)
      this.closeTag(tag)
      this.$store.commit('closeTags', tag)

      console.log(preIndex, 'preIndex')

      // 当关闭的tag是当前已选中的tag时
      if (this.$route.name === tag.name) {
        let lastTag = this.nowTags[preIndex - 1]
        this.$store.commit('selectMenu', lastTag)
        this.$router.push({ name: lastTag.name }).catch(err => err)
      }
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
