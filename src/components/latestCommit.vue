<template>
    <h1 id="title">Redirecting...</h1>

    <p><blockquote id="quote">Grabbing latest commit from GitHub API.</blockquote></p>
</template>

<script>
export default {
    async created() {
        let latestWorkflow = await this.getLatestWorkflow()
        if (latestWorkflow) window.location.href = latestWorkflow.html_url
        else {
            document.getElementById('quote').innerHTML = 'Failed to grab latest commit.'
            document.getElementById('title').innerHTML = 'Error'
        }
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
            .then((response) => response.workflow_runs)
            
            let i = -1
            while (!ret) {
                i++
                const commit = commits[i]
                if (!commit) break
                const run = runs.find(x => x.head_sha == commit.sha && x.workflow_id == 34555033)
                if (run && run.conclusion == 'success') ret = run
            }

            return ret
        }
    }
}
</script>

<style>

</style>