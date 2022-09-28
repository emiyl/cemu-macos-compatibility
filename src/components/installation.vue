<template>
  <div class="smallerMain">
    <h1><router-link to="/"><i class="fas fa-chevron-left" style="font-size: 0.8em; vertical-align: middle; padding-bottom: 5px;"></i></router-link> Installing Cemu (macOS)</h1>

    <div class="tab-container">
        <section>
            <input id="x86" type="radio" :checked="cpuType == 'x86'">
            <label for="x86" class="tab-link" v-on:click="cpuType = 'x86'">
                Intel (x86)
            </label>
            <div class="tab" style="overflow-x: scroll;">
                <ol>
                    <li>Download the <a :href="latestReleaseUrl" :target="dlLinkTarget">latest release of Cemu</a></li>
                    <li>Extract the contents of the <code>.zip</code> file to its own folder</li>
                    <li>Open a terminal and run <code>chmod +x /path/to/Cemu</code></li>
                    <li>Install brew (if you haven't already) by running <code>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code></li>
                    <li>Install moltenvk by running <code>brew install molten-vk</code></li>
                    <li>Right click the Cemu executable and click "Open"</li>
                    <ul><li>This is only necessary on first launch, on subsequent launches you can just double click the executable</li></ul>
                </ol>
            </div>
        </section>
        <section>
            <input id="ARM" type="radio" :checked="cpuType == 'ARM'">
            <label for="ARM" class="tab-link"  v-on:click="cpuType = 'ARM'">
                Apple (ARM)
            </label>
            <div class="tab tab-last" style="overflow-x: scroll;">
                <p style="margin-top: .5em;">To install Cemu on macOS, you must also install the x86 (Intel) versions of brew and moltenvk. This is necessary as Cemu is an x86 app and runs through Rosetta 2. This installation of brew will not conflict with a pre-existing ARM brew installation.</p>
                <ol>
                    <li>Download the <a :href="latestReleaseUrl" :target="dlLinkTarget">latest release of Cemu</a></li>
                    <li>Extract the contents of the <code>.zip</code> file to its own folder</li>
                    <li>Open a terminal and run <code>chmod +x /path/to/Cemu</code></li>
                    <li>Install the x86 version of brew by running <code>arch --x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"</code></li>
                    <li>Install the x86 version of moltenvk by running <code>arch --x86_64 /usr/local/Homebrew/bin/brew install molten-vk</code></li>
                    <li>Right click the Cemu executable and click "Open"</li>
                    <ul><li>This is only necessary on first launch, on subsequent launches you can just double click the executable</li></ul>
                </ol>
            </div>
        </section>
    </div>

    <p>I recommend that you move the Cemu binary into a folder of its own, as it will then generate a bunch of extra folders and files necessary for Cemu.</p>


    <h2 style="margin-bottom: 0;">Troubleshooting</h2>
    <hr>

    <p><b>No sound:</b> By default, Cemu on macOS sets audio output to 0%. Go into the audio settings and turn up the volume.</p>
    <p><b>Illegal hardware instruction</b>: Make you installed moltenvk as described above. Check graphics settings and ensure the rendering API is set to Vulkan.</p>

    <br>
  </div>
</template>

<script>
export default {
    data() {
        return {
            cpuType: 'x86',
            latestReleaseUrl: 'https://github.com/cemu-project/Cemu/releases',
            dlLinkTarget: '_blank'
        }
    },
    async created() {
        document.title = 'macOS Cemu Installation Guide'

        let response = await this.getLatestRelease()
        if (response[0]) this.latestReleaseUrl = response[0].html_url
        else return

        let macosAsset = response[0].assets.find(x => x.name.includes('macos'))
        if (!macosAsset) return
        
        this.latestReleaseUrl = macosAsset.browser_download_url
        this.dlLinkTarget = ''
    },
    mounted() {
        document.title = 'macOS Cemu Installation Guide'
    },
    methods: {
        getLatestRelease() {
            const url = 'https://api.github.com/repos/cemu-project/Cemu/releases'

            return fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
            .then((response) => response.text())
            .then((response) => JSON.parse(response))
        }
    }
}
</script>