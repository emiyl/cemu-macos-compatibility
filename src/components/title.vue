<template>
    <div class="smallerMain">
        <template v-if="titleID">
            <h1>{{ pageTitle }}</h1>
            <ul style="padding-left: 0; list-style-type: none;">
                <li>Title ID: {{ titleID }}</li>
                <li>Region: {{ region }}</li>
                <li v-if="comment">Notes: {{comment}}</li>
            </ul>

            <template v-if="tests.length">
                <h2 style="margin-bottom: 0;">Tests</h2>
                <hr>
            </template>

            <template v-for="test in tests" :key="test">
                <div class="customContainer"><p>
                    <ul style="padding-left: 0; list-style-type: none;">
                        <template v-if="test.rating">
                            <li v-if="parseInt(test.rating) > 0 && parseInt(test.rating) < 6">
                                Rating: {{ ratingArr[parseInt(test.rating)-1].name }} ({{ ratingArr[parseInt(test.rating)-1].description }})
                            </li>
                            <li v-else>Rating: {{ test.rating }}</li>
                        </template>
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
                    
                    <template v-if="test.log">
                        <pre>{{test.log}}</pre>
                    </template>

                    Entry added by {{ test.author }} on {{ test.date }}.
                </p></div>
            </template>
        </template>
        <template v-else>
            <h2>TitleID not found</h2>
            <p><a href="/">Take me home</a></p>
        </template>
    </div>
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
        this.comment = data.comment
        this.tests = data.tests.filter(x => !x.fakeEntry)

        document.title = this.pageTitle
    },
    mounted() {
        document.title = this.pageTitle // Yes this needs to be done twice idk why
    },
    data() {
        return {
            pageTitle: '',
            region: '',
            titleID: '',
            comment: '',
            tests: [],
            ratingArr: [
                {
                name: 'Unplayable',
                description: 'Crashes when booting/infinite black screen'
                },
                {
                name: 'Loads',
                description: 'Title loads, but crashes in title screen/menu/in-game'
                },
                {
                name: 'Runs',
                description: 'Starts, maybe runs well, but major glitches/issues prevent game from being completed'
                },
                {
                name: 'Playable',
                description: 'Title can be played through with minor audio or graphical glitches'
                },
                {
                name: 'Perfect',
                description: 'Title can be played with no issues'
                }
            ]
        }
    }
}
</script>

<style>

</style>