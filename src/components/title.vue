<template>
    <template v-if="titleID">
        <h1>{{ pageTitle }}</h1>
        <ul style="padding-left: 0; list-style-type: none;">
            <li>Title ID: {{ titleID }}</li>
            <li>Region: {{ region }}</li>
            <li>Average rating: {{ (tests.map(x => x.rating).reduce((total, current) => total + current, 0) / tests.length).toString().slice(0,4) }}</li>
        </ul>

        <h2 style="margin-bottom: 0;" v-if="tests.length">Tests</h2>
        <hr>

        <template v-for="test in tests" :key="test">
            <div class="customContainer"><p>
                <ul style="padding-left: 0; list-style-type: none;">
                    <li v-if="test.rating">Rating: {{ test.rating }}
                        <template v-if="parseInt(test.rating) > 0 && parseInt(test.rating) < 6"> ({{ ratingArr[parseInt(test.rating)-1]}})</template>
                    </li>
                    <li v-if="test.comment">Comment: {{ test.comment }}</li>
                    <li>
                        <span>Source: </span>
                        <a v-if="test.sourceURL" :href="test.sourceURL" target="_blank">{{ test.source }}</a>
                        <span v-else>{{ test.source }}</span>
                    </li>
                </ul>
                <ul style="padding-left: 0; list-style-type: none;">
                    <li v-if="test.version">Cemu version: {{ test.version }}</li>
                    <li v-if="test.version">Rendering API: {{ test.renderingApi }}</li>
                    <li v-if="test.hardware">Hardware: {{ test.hardware }}</li>
                    <li v-if="test.osVersion">OS version: {{ test.osVersion }}</li>
                </ul>

                <p>Entry added by {{ test.author }} on {{ test.date }}.</p>
            </p></div>
        </template>
    </template>
    <template v-else>
        <h2>TitleID not found</h2>
        <p><a href="/">Take me home</a></p>
    </template>
</template>

<script>
import compatListObj from '../../titles.json'

export default {
    methods: {
        getPageData() {
            const titleId = this.$route.params.titleid
            return compatListObj[titleId]
        }
    },
    async created() {
        let data = this.getPageData()
        this.pageTitle = data.name
        this.region = data.region
        this.titleID = data.titleID
        this.tests = data.tests

        document.title = this.pageTitle + ' | Cemu macOS Compatibility'
    },
    mounted() {
        document.title = this.pageTitle // Yes this needs to be done twice idk why
    },
    data() {
        return {
            pageTitle: '',
            region: '',
            titleID: '',
            tests: [],
            ratingArr: [
                "Crashes when booting/infinite black screen",
                "Game loads, but crashes in title screen/menu/in-game",
                "Starts, maybe runs well, but major glitches/issues prevent game from being completed",
                "Game can be played through with minor audio or graphical glitches",
                "Game can be played with no issues",
            ]
        }
    }
}
</script>

<style>

</style>