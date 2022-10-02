<template>
    <div class="navbarWrapper"><div class="flexWrapper">
        <div
            v-for="navbarItem in navbar"
            :key="navbarItem.label"
            :class="(this.$route.path == navbarItem.url) ? 'activeItem' : ''"
        >
            <template v-if="navbarItem.url">
                <a v-if="navbarItem.url.startsWith('http')" :href="navbarItem.url" target="_blank">
                    <navbarLabel :label="navbarItem.label" :icon="navbarItem.icon" :collapse="navbarItem.collapse"/>
                </a>
                <router-link v-else :to="navbarItem.url">
                    <navbarLabel :label="navbarItem.label" :icon="navbarItem.icon" :collapse="navbarItem.collapse"/>
                </router-link>
            </template>
            <template v-else>
                <navbarLabel :label="navbarItem.label" :icon="navbarItem.icon" :collapse="navbarItem.collapse"/>
            </template>
        </div>
    </div></div>
</template>

<script>
const comp = `Hello`

export default {
    data() {
        return {
            navbar: [
                {
                    icon: 'fas fa-code',
                    label: 'Home',
                    url: '/',
                    collapse: {
                        element: 'label',
                        side: 'left'
                    }
                },
                {
                    icon: 'fas fa-download',
                    label: 'Installation',
                    url: '/installation',
                    collapse: {
                        element: 'label',
                        side: 'left'
                    }
                },
                {
                    icon: 'fab fa-discord',
                    label: 'Discord',
                    url: 'https://discord.gg/5psYsup',
                    collapse: {
                        element: 'icon',
                        side: 'right'
                    }
                },
                {
                    icon: 'fab fa-github',
                    label: 'GitHub',
                    url: 'https://github.com/emiyl/cemu-macos-compatibility',
                    collapse: {
                        element: 'icon',
                        side: 'right'
                    }
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
    background-color: var(--c-bg);
    box-shadow: var(--shadow);
    height: var(--navbar-height);
    width: 100%;
    position: sticky;
    top: 0;
}

@media (prefers-color-scheme: dark) {
    .navbarWrapper {
        border-bottom: 1px solid var(--c-border);
    }
}

.flexWrapper {
    display: flex;
    padding-top: .5em;
    margin-inline: 1em;
}

a {
    color: var(--c-text);
    font-weight: 500;
}

.activeItem a {
    color: var(--c-brand);
}
</style>
