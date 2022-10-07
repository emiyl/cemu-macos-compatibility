<template>
    <h1>Changelog</h1>
    <p>This is a macOS-specific changelog of new features and fixes added to Cemu.</p>
    
    <template v-for="log in logArr" :key="log.commit">
        <h5>{{ log.commit.slice(0,7) }}</h5>
        <p>
            <ul>
                <li v-for="change in log.changes" :key="change">{{change}}</li>
            </ul>
        </p>
        <blockquote v-if="log.date" style="border: none; padding: 0;">{{ new Intl.DateTimeFormat('en-US', { dateStyle: 'medium'}).format(new Date(log.date)) }}</blockquote>
    </template>

    <br>
</template>

<script>
import importLog from '../../commitLog.json'

export default {
    data() {
        return {
            logArr: importLog
        }
    }
}
</script>