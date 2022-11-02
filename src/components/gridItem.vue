<template>
    <div
        class="gridItem"
    ><router-link :to="`/titleid/${title.titleID}`">
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
            <i :class="[
                'fas',
                'fa-circle',
                'compatIndicatorGrid',
                ratingArr[title.tests[0].rating-1].name.toLowerCase()
            ]" :style="{
                'filter': `grayscale(${title.outdated ? '80%' : '0%'})`
            }"></i>
            <span :style="{
                'color': `${title.outdated ? 'var(--c-text-grey)' : 'var(--c-text)'}`,
                'margin-left': '4px',
            }">{{title.name}} ({{title.region}})</span>
            </div>
            <div class="gridComment" :id="`${title.titleID}-comment`">
            {{ title.tests[0].adjustedComment ? title.tests[0].adjustedComment : title.tests[0].setComment }}
            </div>
        </div>
        </div>
    </router-link></div>
</template>

<script>
export default {
    props: {
        title: Object,
        ratingArr: Array
    }
}
</script>

<style>

</style>