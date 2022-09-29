<template>
    <i v-if="icon" :class="[icon,(collapse.element != 'icon' ? 'collapse' : ''),(collapse.side == 'right' ? 'collapseRight' : '')]"/>
    <span class="spacer" v-if="icon && label"></span>
    <span v-if="label" :class="[(collapse.element != 'label' ? 'collapse' : ''),(collapse.side == 'right' ? 'collapseRight' : '')]">{{label}}</span>
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