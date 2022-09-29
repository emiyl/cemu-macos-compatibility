<template>
    <i v-if="icon" :class="[icon,(collapseTo != 'icon' ? 'collapse' : '')]"/>
    <span class="spacer" v-if="icon && label"></span>
    <span v-if="label" :class="(collapseTo != 'label' ? 'collapse' : '')">{{label}}</span>
</template>

<script>
export default {
    props: {
        icon: String,
        label: String,
        collapseTo: String
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
    .spacer {
        margin-inline: 0;
    }
}
</style>