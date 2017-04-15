<template>
    <div class="cards">
        <div class="card" v-for="city1 in citys">
            <div class="card-header">{{city1.city}}</div>
            <div class="card-content">
                <div class="card-content-inner">
                    <span class="city-wd">{{city1.temperature}}</span>
                    <i id="fa0" class="svnicon01" :class=[city1.wicon]></i>
                </div>
            </div>
            <div class="card-footer">
                <span @click="deleteCity({city:city1})">删除</span>
                <span >{{city1.lastUpdate}} 更新</span>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex';

export default {
    data(){
        return {

        }
    },
    props: ['citys'],
    methods: {

        ...mapMutations([
          'deleteCity','initCity'
        ])

    }
}

</script>