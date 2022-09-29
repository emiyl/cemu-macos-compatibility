<template>
    <div class="navbarWrapper">
        <div
            v-for="navbarItem in navbar"
            :key="navbarItem.label"
            :class="(this.$route.path == navbarItem.url) ? 'activeItem navbarItem' : 'navbarItem'"
        >
            <template v-if="navbarItem.url">
                <a v-if="navbarItem.url.startsWith('http')" :href="navbarItem.url" target="_blank">
                    <navbarLabel :label="navbarItem.label" :icon="navbarItem.icon" :collapseTo="navbarItem.collapseTo"/>
                </a>
                <router-link v-else :to="navbarItem.url">
                    <navbarLabel :label="navbarItem.label" :icon="navbarItem.icon" :collapseTo="navbarItem.collapseTo"/>
                </router-link>
            </template>
            <template v-else>
                <navbarLabel :label="navbarItem.label" :icon="navbarItem.icon" :collapseTo="navbarItem.collapseTo"/>
            </template>
        </div>
    </div>
</template>

<script>
const comp = `Hello`

export default {
    data() {
        return {
            navbar: [
                {
                    label: 'Home',
                    url: '/',
                    collapseTo: 'label'
                },
                {
                    icon: 'far fa-download',
                    label: 'Installation',
                    url: '/installation',
                    collapseTo: 'label'
                },
                {
                    icon: 'fab fa-discord',
                    label: 'Discord',
                    url: 'https://discord.gg/5psYsup',
                    collapseTo: 'icon'
                },
                {
                    icon: 'fab fa-github',
                    label: 'GitHub',
                    url: 'https://github.com/emiyl/cemu-macos-compatibility',
                    collapseTo: 'icon'
                }
            ]
        }
    },
    components: {
        comp
    }
}
</script>

<style scoped>
.navbarWrapper {
    border-bottom: 1px solid var(--c-border);
    padding: 1em;
    box-shadow: var(--shadow);
    display: flex;
}

.navbarItem {
    margin-inline: .7em;
    white-space: nowrap;
}

a {
    color: var(--c-text);
    transition: color 150ms;
    font-weight: 500;
}

a:hover {
    color: var(--c-brand);
}

.activeItem a {
    color: var(--c-brand);
}
</style>