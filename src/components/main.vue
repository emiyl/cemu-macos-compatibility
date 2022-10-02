<template>
      <h1>Cemu macOS Compatibility</h1>
      <p>Unofficial list of compatibility with the macOS builds of Cemu. <b>Want to contribute?</b> Make a pull request on the <a href="https://github.com/emiyl/cemu-macos-compatibility/blob/main/titles.json" target="_blank">GitHub repository</a> or contact me on Discord @Emma#1024.</p>
      <p>To run Cemu on macOS, I recommend you follow my <router-link to="/installation">installation guide</router-link>. To discuss macOS Cemu development, there is a dedicated macOS thread on the <a href="https://discord.gg/5psYsup" target="_blank">Cemu Discord Server</a> under #cemu_dev_public.</p>
      <h5>Ratings</h5>
      <div class="flexWrapper compatWrapper">
        <div
          v-for="i in 5" :key="i"
          :class="['flexWrapper','flexItem','compatItem',showRatings.find(x => x.rating == 6-i).show ? `container-${ratingArr[5-i].name.toLowerCase()}` : [`container-${ratingArr[5-i].name.toLowerCase()}-hidden`,'compatItemHidden']]"
          style="flex: 1 1 100%"
          v-on:click="showRatings.find(x => x.rating == 6-i).show = !showRatings.find(x => x.rating == 6-i).show"
        >
          <div>
            <b>{{ ratingArr[5-i].name }}</b><br>
            <span style="color: var(--c-text-grey)">{{ ratingArr[5-i].description }} - {{getRatingPercentage(6-i)}}%</span>
          </div>
        </div>
      </div>

      <h5>Titles</h5>
  
      <div class="flexWrapper searchAndFilterWrapper">
        <input 
          class="search"
          type='text'
          placeholder='Search'
          v-model='searchStr'
          style="flex: 1;"
        />
        <!--<a class="filterElement" v-on:click="showFilters = !showFilters"><i class="fas fa-filter"></i> <b>Filter</b> <i style="margin-left: 2px;" :class="['fas',showFilters ? 'fa-caret-down' : 'fa-caret-right']"></i></a>-->
      </div>

      <!--<div class="customContainer" v-if="showFilters">
        <ul style="padding-left: 0; list-style: none;">
          <li class="filterCheckbox">
            <label><b>Regions:</b></label>
            <template v-for="region in Array.from(new Set(compatList.map(x => x.region)))" :key="region">
              <input type="checkbox" v-model="showRegions.find(x => x.region == region).show" :id="`show${region}Checkbox`">
              <label :for="`show${region}Checkbox`">{{region}} ({{compatList.filter(x => x.region == region).length}})</label>
            </template>
          </li>
        </ul>
      </div>-->

      <div style="margin-bottom: 1em;"></div>

      <div class="gridWrapper titleGrid">
        <div
          class="gridItem"
          v-for="title in compatList.filter(x => 
            //showRegions.find(y => y.region == x.region).show && 
            showRatings.find(y => y.rating == x.tests[0].rating).show && (
              !searchStr ||
              searchStr == '' ||
              `${x.name} (${x.region})`.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchStr.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
              x.titleID.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchStr.toLowerCase().replace(/[^a-z0-9]/g, ''))
            )
          ).sort(function(a,b) {
            let bool = false
            if (a.hasOwnProperty(sortBy) && b.hasOwnProperty) bool = a[sortBy] < b[sortBy]
            else if (a.tests[0].hasOwnProperty(sortBy) && b.tests[0].hasOwnProperty(sortBy)) bool = a.tests[0][sortBy] < b.tests[0][sortBy]
            
            var m = (direction) ? -1 : 1
            return bool ? -1*m : 1*m
          })"
          :key="title.titleID"
        >
          <div class="gridWrapper iconGrid">
            <div><router-link :to="`/titleid/${title.titleID}`"><picture>
                  <source :srcset="`icons/${title.titleID}.avif`" type="image/avif">
                  <source :srcset="`icons/${title.titleID}.webp`" type="image/webp">
                  <img :src="`icons/${title.titleID}.jpeg`" style="width: 64px; margin: 4px; vertical-align: middle; border-radius: 8px;">
            </picture></router-link></div>
            <div>
              <div style="font-weight: 600;">
                <i :class="['fas','fa-circle','compatIndicatorGrid',ratingArr[title.tests[0].rating-1].name.toLowerCase()]"></i>
                <router-link :to="`/titleid/${title.titleID}`" style="color: var(--c-text); margin-left: 4px;">{{title.name}} ({{title.region}})</router-link>
              </div>
              <div class="gridComment" :id="`${title.titleID}-comment`">
                {{ title.tests[0].adjustedComment ? title.tests[0].adjustedComment : title.tests[0].comment }}
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
  import compatListObj from '../../titles.json'
    
  var compatList = []
  for (var i in compatListObj) {
    var o = compatListObj[i]
    o.titleID = i
  
    if (o.tests) o.tests = o.tests.map(test => {
      if (!Array.isArray(test.author)) test.author = [test.author]
      test.author = test.author.join(', ')
      return test
    })

    compatList.push(o)
  }

  compatList = compatList.map(x => {
    if (x.tests.length) x.tests = x.tests.sort((a,b) => {
      const date = [a,b].map(y => new Date(y.date))
      if (date[0] > date[1]) return -1
      if (date[0] < date[1]) return 1
      return 0
    })
    else x.tests[0] = {
      rating: 0,
      comment: 'Unknown',
      fakeEntry: true
    }
    return x
  }).sort((a,b) => {
    if (a.name > b.name) return -1
    if (a.name < b.name) return 1
    return 0
  })
  
  export default {
    data() {
      return {
        compatList: compatList,
        /*showFilters: false,
        showRegions: Array.from(new Set(compatList.map(x => x.region))).map(x => {
          return {
            region: x,
            show: true
          }
        }),*/
        showRatings: Array.from(new Set(compatList.map(x => x.tests[0].rating))).map(x => {
          return {
            rating: x,
            show: true
          }
        }),
        sortBy: "rating",
        direction: true,
        showComments: true,
        searchStr: '',
        out: 'asdasd',
        ratingArr: [
          {
            name: 'Unplayable',
            description: 'Title crashes or does not boot'
          },
          {
            name: 'Loads',
            description: 'Title loads but crashes in title screen or menu'
          },
          {
            name: 'Runs',
            description: 'Major issues prevent title from being completed'
          },
          {
            name: 'Playable',
            description: 'Minor audio or graphical glitches'
          },
          {
            name: 'Perfect',
            description: 'Title can be played with no issues'
          }
        ]
      }
    },
    methods: {
      getRatingPercentage(i) {
        return parseInt(this.compatList.filter(x => x.tests[0].rating == i).length / this.compatList.length * 100)
      }
    },
    mounted() {
      document.title = 'Cemu macOS Compatibility Chart'

      function getLineCount(e) {
        const elementHeight = e.clientHeight
        const lineHeight = parseInt(window.getComputedStyle(e).getPropertyValue('line-height'))
        return elementHeight / lineHeight
      }

      const maxLineCount = 2

      for (let titleID of this.compatList.map(x => x.titleID)) {
        let commentElement = document.getElementById(`${titleID}-comment`)
        this.compatList.find(x => x.titleID).tests[0].adjustedComment = commentElement.innerHTML
        if (getLineCount(commentElement) <= maxLineCount) continue

        commentElement.innerHTML += '...'
        let commentText = commentElement.innerHTML
        while (getLineCount(commentElement) > maxLineCount) {
          commentText = commentText.slice(0,-4)
          if (commentText[commentText.length-1] == ' ') commentText = commentText.slice(0,-1)
          commentText += '...'
          commentElement.innerHTML = commentText
        }
        commentElement.innerHTML = this.compatList.find(y => y.titleID == titleID).tests[0].comment
        this.compatList.find(y => y.titleID == titleID).tests[0].adjustedComment = commentText
      }

      if (window.innerWidth <= 700) this.showComments = false
      else this.showComments = true

      window.onresize = () => {
        if (window.innerWidth <= 700) this.showComments = false
        else this.showComments = true
      }
    }
  }
</script>

<style scoped>
  label, input {
    margin-right: .5em;
    user-select: none;
  }
</style>