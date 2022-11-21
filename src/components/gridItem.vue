<template>
    <div
        class="gridItem"
    >
        <div class="gridWrapper iconGrid">
        <div><picture v-if="showImg">
                <source :srcset="`icons/${title.titleID}.avif`" type="image/avif">
                <source :srcset="`icons/${title.titleID}.webp`" type="image/webp">
                <img :src="`icons/${title.titleID}.jpeg`" :style="{
                    'width': '64px',
                    'margin': '4px',
                    'vertical-align': 'middle',
                    'border-radius': '8px',
                    'filter': `grayscale(${title.outdated ? '100%' : '0%'})`
                }" @error="this.showImg = false">
        </picture><div v-else
            style="
                width: 64px;
                height: 64px;
                margin: 4px;
                border-radius: 8px;
                vertical-align: middle;
                border: 1px solid var(--c-border);
            "
        /></div>
        <div>
            <div style="font-weight: 600;">
            <i 
                v-if="ratingBool"
                :class="[
                    'fas',
                    'fa-circle',
                    'compatIndicatorGrid',
                    ratingArr[title.tests[0].rating-1].name.toLowerCase()
                ]"
                :style="{ 'filter': `grayscale(${title.outdated ? '80%' : '0%'})` }"
            ></i>
            <span :style="{
                'color': `${title.outdated ? 'var(--c-text-grey)' : 'var(--c-text)'}`,
                'margin-left': ratingBool ? '4px' : '0',
            }">{{title.name}}<template v-if="title.region"> ({{title.region}})</template></span>
            </div>
            <div v-if="title.tests" class="gridComment" :id="`${title.titleID}-comment`" v-html="title.tests[0].adjustedComment ? title.tests[0].adjustedComment : ( title.tests[0].setComment ? title.tests[0].setComment : title.tests[0].comment )"/>
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
    },
    data() {
        return {
            showImg: true
        }
    }
}
</script>

<style>

</style>