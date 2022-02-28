<template>
    <a :title="title" style="margin:3px">
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
</template>

<script>
export default {
    name:'HintButton',
    props: ['title'],
    data() {
        return {

        };
    },
    mounted() {
        this.$listeners
    },
};
</script>

<style scoped>

</style>
