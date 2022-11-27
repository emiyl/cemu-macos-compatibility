<template>
  <div class="smallerMain">
    <h1>Installing Cemu (macOS)</h1>

    <h5 style="margin-bottom: 1em;">Downloads <i v-if="loading" class="fas fa-spinner spin" style="margin-left: 6px;"></i></h5>
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

    <p>To install, simply open the <code>.dmg</code> file, and drag and drop the Cemu application into your Applications folder.</p>
    <p>On first launch, you will need to right-click on the Cemu application in Finder and click "Open". At this point, the launch will be blocked as the build is not signed. Right-click on the Cemu application again and click "Open" for the second time. When prompted, hit "Open" again. This is not needed for subsequent launches.</p>
    <p>Once Cemu is installed, you can follow my <a href="https://cemu.cfw.guide" target="_blank">setup guide</a> to install your games and to optimise Cemu.</p>
    <p class="customContainer textBox">If you have any issues during installation, please ask in the #macos channel in the <a href="https://discord.gg/5psYsup" target="_blank">Cemu Discord Server</a>.</p>

    <h1>Troubleshooting</h1>

    <p><b>Flickering or invisible textures:</b> In some games, such as Mario Kart 8 and Bayonetta 2, some textures appear to flicker or not appear. This can be fixed by setting the environment variable <code>MVK_CONFIG_FAST_MATH_ENABLED=0</code> in exchange for a 5-10% performance hit.</p>
    <p><b>Pipeline failure</b>: Cemu can sometimes fail to create or compile a pipeine cache when using MoltenVK. The best solution to this currently is to delete your existing shader cache, by right-clicking on the title in Cemu and clicking "Remove shader caches".</p>
    <p><b>No sound:</b> By default, Cemu on macOS sets audio output to 0%, with no audio device set. Go into the audio settings, select an audio device, and turn up the volume.</p>

    <h1>Non-portable paths</h1>

    <p>Unlike Windows, the macOS release of Cemu uses a non-portable installation. This means that all games, user data, and caches are stored elsewhere on the system, rather than in the same directory as the executable.</p>

    <ul style="padding-left: 0; list-style: none; line-height: 1.7em;">
        <li><b>Config and user data:</b> <code>~/Library/Application Support/Cemu</code></li>
        <li><b>Shader and pipeline caches:</b> <code>~/Library/Caches/Cemu</code></li>
        <li><b>Language and default profiles:</b> <code>Cemu.app/Contents/SharedSupport</code></li>
    </ul>

    <p>For more info, and Linux paths, view <a href="https://github.com/cemu-project/Cemu/pull/316" target="_blank">#316</a>.</p>

    <h1>Updating MoltenVK</h1>

    <p>Cemu is now bundled with the latest version MoltenVK included, so an installation of the library is not required. This does not automatically update however, and you would otherwise need to wait for a new Cemu release to get the latest version.</p>
    <p>If your Cemu application is stored anywhere other that <code>/Applications/Cemu.app</code>, please replace that path with whichever path your bundle is stored at instead in the commands below.</p>

    <div class="tab-container">
        <section>
            <input id="x86" type="radio" :checked="cpuType == 'x86'">
            <label for="x86" class="tab-link" v-on:click="cpuType = 'x86'">
                Intel (x86)
            </label>
            <div class="tab" style="overflow-x: auto;">
                <ol>
                    <li>Open the Terminal application</li>
                    <li>Install brew (if you haven't already) by running <code>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code></li>
                    <li>Install moltenvk by running <code>brew install molten-vk</code></li>
                    <ul><li>Run <code>brew install molten-vk --HEAD</code> to grab the latest commit, but note that this may be unstable</li></ul>
                    <li>Run <code>mv /Applications/Cemu.app/Contents/Frameworks/libMoltenVK.dylib /Applications/Cemu.app/Contents/Frameworks/libMoltenVK.dylib.bak</code></li>
                    <li>Run <code>cp /usr/local/lib/libMoltenVK.dylib /Applications/Cemu.app/Contents/Frameworks/libMoltenVK.dylib</code></li>
                </ol>
            </div>
        </section>
        <section>
            <input id="ARM" type="radio" :checked="cpuType == 'ARM'">
            <label for="ARM" class="tab-link"  v-on:click="cpuType = 'ARM'">
                Apple (ARM)
            </label>
            <div class="tab tab-last" style="overflow-x: auto;">
                <p style="margin-top: .5em;">To update Cemu's MoltenVK, you must also install the x86 (Intel) versions of brew and moltenvk. This is necessary as Cemu is an x86 app and runs through Rosetta 2. This installation of brew will not conflict with a pre-existing ARM brew installation.</p>
                <ol>
                    <li>Open the Terminal application and run <code>arch --x86_64 zsh</code> to enter an x86 shell</li>
                    <li>Install the x86 version of brew by running <code>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code></li>
                    <li>Install the x86 version of moltenvk by running <code>/usr/local/Homebrew/bin/brew install molten-vk</code></li>
                    <ul><li>Run <code>/usr/local/Homebrew/bin/brew install molten-vk --HEAD</code> to grab the latest commit, but note that this may be unstable</li></ul>
                    <li>Run <code>mv /Applications/Cemu.app/Contents/Frameworks/libMoltenVK.dylib /Applications/Cemu.app/Contents/Frameworks/libMoltenVK.dylib.bak</code></li>
                    <li>Run <code>cp /usr/local/lib/libMoltenVK.dylib /Applications/Cemu.app/Contents/Frameworks/libMoltenVK.dylib</code></li>
                </ol>
            </div>
        </section>
    </div>

    <br>
  </div>
</template>

<style scoped>
@-moz-keyframes spin {
    from { -moz-transform: rotate(0deg); }
    to { -moz-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
    from { -webkit-transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
}
</style>

<script>
import cachedReleases from '../../cachedReleases.json'

export default {
    data() {
        return {
            cpuType: 'x86',
            releases: cachedReleases,
            loading: true
        }
    },
    async created() {
        document.title = 'macOS Cemu Installation Guide'

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
    mounted() {
        window.scrollTo(0, 0)
        document.title = 'macOS Cemu Installation Guide'
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
