<template>
    <h5 style="margin-bottom: 1em;">{{ title || 'Downloads' }} <i v-if="loading" class="fas fa-spinner spin" style="margin-left: 6px;"></i></h5>
    <div class="gridWrapper titleGrid">
        <template 
            v-for="title in releases.filter(x => x.url).map((x, index) => {
                return {
                    titleID: x.commit ? 'cemubeta' : 'cemu',
                    name: ['Cemu', x.version ? x.version : x.commit.slice(0,7)].join(' (') + ')',
                    url: x.url,
                    target: x.target,
                    tests: [
                        {
                            comment: x.label + '<br>' + (index == 0 ? 'Recommended' : 'Experimental')
                        }
                    ]
                }
            })"
            :key="title.titleID"
        >
            <a :href="title.url" :target="title.target">
                <gridItem
                    :title="title"
                    :ratingBool="false"
                />
            </a>
        </template>
    </div>
</template>

<script>
import cachedReleases from '../../cachedReleases.json'

export default {
    props: {
        title: String
    },
    data() {
        return {
            releases: cachedReleases,
            loading: true
        }
    },
    async created() {
        let latestReleases = await this.getLatestReleases()
        let releases = this.releases

        function getRelease(release) {
            let obj = {}

            if (release) {
                obj = {
                    label: `Latest ${release.prerelease ? 'pre-' : ''}release`,
                    version: release.tag_name,
                    ghurl: release.html_url,
                    ghtarget: '_blank'
                }
            }
            else return

            let macosAsset = release.assets.find(x => x.name.includes('macos'))
            if (!macosAsset) {
                releases.push(obj)
                return
            }

            obj.url = macosAsset.browser_download_url
            obj.target = ''
            
            if (releases[0].overwriteMe) releases = []
            releases.push(obj)
        }

        getRelease(latestReleases.filter(x => !x.prerelease)[0])
        getRelease(latestReleases.filter(x => x.prerelease)[0])

        let latestWorkflow = await this.getLatestWorkflow()
        if (latestWorkflow) {
            if (releases[0].overwriteMe) releases = []
            releases.push({
                label: 'Latest commit',
                commit: latestWorkflow.head_sha,
                url: latestWorkflow.html_url,
                target: '_blank'
            })
        }
        this.releases = releases
        this.loading = false
    },
    methods: {
        getLatestReleases() {
            const url = 'https://api.github.com/repos/cemu-project/Cemu/releases'

            return fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((response) => response.text())
            .then((response) => JSON.parse(response).filter(x => x.assets))
        },
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