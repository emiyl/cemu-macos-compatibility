<template>
    <div
        class="gridItem"
    >
        <div class="gridWrapper iconGrid">
        <div><picture>
                <source :srcset="`icons/${title.titleID}.avif`" type="image/avif">
                <source :srcset="`icons/${title.titleID}.webp`" type="image/webp">
                <img :src="`icons/${title.titleID}.jpeg`" :style="{
                'width': '64px',
                'margin': '4px',
                'vertical-align': 'middle',
                'border-radius': '8px',
                'filter': `grayscale(${title.outdated ? '100%' : '0%'})`
                }">
        </picture></div>
        <div>
            <div style="font-weight: 600;">
            <i 
                :class="[
                    'fas',
                    'fa-circle',
                    'compatIndicatorGrid',
                    ratingArr[title.tests[0].rating-1].name.toLowerCase()
                ]"
                :style="{ 'filter': `grayscale(${title.outdated ? '80%' : '0%'})` }"
                v-if="ratingBool"
            ></i>
            <span :style="{
                'color': `${title.outdated ? 'var(--c-text-grey)' : 'var(--c-text)'}`,
                'margin-left': ratingBool ? '4px' : '0',
            }">{{title.name}}<template v-if="title.region"> ({{title.region}})</template></span>
            </div>
            <div class="gridComment" :id="`${title.titleID}-comment`" v-html="title.tests[0].adjustedComment ? title.tests[0].adjustedComment : ( title.tests[0].setComment ? title.tests[0].setComment : title.tests[0].comment )"/>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: Object,
        ratingArr: Array,
        ratingBool: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style>

</style>