<template>
    <div>
        <ul>
            <li
                v-for="navbarItem in navbar"
                :key="navbarItem.label"
                :class="(this.$route.path == navbarItem.url) ? 'activeItem' : ''"
            >
                <template v-if="navbarItem.url">
                    <a v-if="navbarItem.url.startsWith('http')" :href="navbarItem.url" target="_blank">{{navbarItem.label}}</a>
                    <router-link v-else :to="navbarItem.url">{{navbarItem.label}}</router-link>
                </template>
                <template v-else>{{navbarItem.label}}</template>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navbar: [
                {
                    label: 'Home',
                    url: '/'
                },
                {
                    label: 'Installation',
                    url: '/installation'
                },
                {
                    label: 'Discord',
                    url: 'https://discord.gg/5psYsup'
                },
                {
                    label: 'GitHub',
                    url: 'https://github.com/emiyl/cemu-macos-compatibility'
                }
            ]
        }
    }
}
</script>

<style scoped>
div {
    border-bottom: 1px solid var(--c-border);
    padding: 1em;
    box-shadow: var(--shadow);
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: scroll;
}

li {
  display: inline;
  padding-inline: .7em;
}

li a {
    color: var(--c-text);
    transition: color 150ms;
    font-weight: 500;
}

li a:hover {
    color: var(--c-brand);
}

.activeItem a {
    color: var(--c-brand);
}
</style>