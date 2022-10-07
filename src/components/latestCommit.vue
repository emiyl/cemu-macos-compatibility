<template>
    <h1>Redirecting...</h1>

    <p><blockquote>Grabbing latest commit from GitHub API.</blockquote></p>
</template>

<script>
export default {
    async created() {
        let latestWorkflow = await this.getLatestWorkflow()
        if (latestWorkflow) window.location.href = latestWorkflow.html_url
    },
    methods: {
        async getLatestWorkflow() {
            let ret

            let commits = await fetch('https://api.github.com/repos/cemu-project/Cemu/commits', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((response) => response.text())
            .then((response) => JSON.parse(response))

            let runs = await fetch('https://api.github.com/repos/cemu-project/Cemu/actions/runs', { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((response) => response.text())
            .then((response) => JSON.parse(response))
            
            let i = -1
            while (!ret) {
                i++
                const commit = commits[i]
                const run = runs.workflow_runs.find(x => x.head_sha == commit.sha && x.workflow_id == 34555033)
                if (run && run.conclusion == 'success') ret = run
            }

            return ret
        }
    }
}
</script>

<style>

</style>