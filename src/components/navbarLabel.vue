<template>
    <div class="navbarItem">
        <i v-if="icon" :class="[icon,(collapse.element != 'icon' ? 'collapse' : ''),(collapse.side == 'right' ? 'collapseRight' : '')]"/>
        <span class="spacer" v-if="icon && label"></span>
        <span v-if="label" :class="[(collapse.element != 'label' ? 'collapse' : ''),(collapse.side == 'right' ? 'collapseRight' : '')]">{{label}}</span>
    </div>
</template>

<script>
export default {
    props: {
        icon: String,
        label: String,
        collapse: Object
    }
}
</script>

<style scoped>
.navbarItem {
    white-space: nowrap;
    padding: .5em .7em;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0);
    font-weight: 600;
}

.navbarItem:hover {
    background: var(--c-bg-navbar-item);
    border-radius: 5px;
    transition: background 150ms;
    color: var(--c-navbar-hover);
}

.spacer {
    margin-inline: 4px;
}
@media (max-width: 500px) {
    .collapse {
        display: none;
    }
    .collapseRight {
        margin-left: auto;
        flex: 1;
    }
    .spacer {
        margin-inline: 0;
    }
}
</style>