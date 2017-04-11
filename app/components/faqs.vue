<template src="views/faqs.html"></template>

<script>
    import Vue from 'vue';
    export default {
        data () {
            return {
                faqs: []
            }
        },
        beforeRouteEnter (to, from, next) {
            Vue.http.get("/config/data/faqs.json").then(response => {
                next(vm => {
                    vm.faqs = response.body;
                })
            }, response => {
                next(false)
            })
        },
        watch: {
            '$route' : 'fetchData'
        },
        methods: {
            fetchData () {
                Vue.http.get("/config/data/faqs.json").then(response => {
                    this.faqs = response.body;
                }, response => {
                    console.log("error", response);
                })
            }
        }
    }
</script>