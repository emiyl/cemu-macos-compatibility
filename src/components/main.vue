<template>
      <h1>Cemu macOS Compatibility</h1>
      <p>Unofficial list of compatibility with the macOS builds of Cemu. <b>Want to contribute?</b> Make a pull request on the <a href="https://github.com/emiyl/cemu-macos-compatibility/blob/main/titles.json" target="_blank">GitHub repository</a> or contact me on Discord @Emma#1024.</p>
      <p>To run Cemu on macOS, I recommend you follow my <router-link to="/installation">installation guide</router-link>. To discuss macOS Cemu development, there is a dedicated macOS thread on the <a href="https://discord.gg/5psYsup" target="_blank">Cemu Discord Server</a> under #cemu_dev_public.</p>
  
      <h5>Ratings</h5>
      <div class="flexWrapper compatWrapper">
        <div v-for="i in 5" :key="i" class="flexWrapper flexItem" style="flex: 1 1 100%">
          <i :class="['fas','fa-circle','compatIndicator',ratingArr[5-i].name.toLowerCase()]"></i>
          <div>
            <b>{{ ratingArr[5-i].name }}</b><br>
            <span style="color: var(--c-text-grey)">{{ ratingArr[5-i].description }} - {{getRatingPercentage(6-i)}}%</span>
          </div>
        </div>
      </div>
  
      <p>
        <input 
          class="search"
          type='text'
          placeholder='Search'
          v-model='searchStr'
        />
        <span class="regionCheckbox">
          <label><b>Regions:</b></label>
          <template v-for="region in Array.from(new Set(compatList.map(x => x.region)))" :key="region">
            <input type="checkbox" v-model="showRegions.find(x => x.region == region).show" :id="`show${region}Checkbox`">
            <label :for="`show${region}Checkbox`">{{region}} ({{compatList.filter(x => x.region == region).length}})</label>
          </template>
        </span>
      </p>
  
      <div id="list" class="tableContainer">
        <table>
          <tr>
            <th></th>
            <th>Name <i style="float: right; cursor: pointer;" v-on:click="(sortBy == 'name') ? direction = !direction : sortBy = 'name'" class="fas fa-sort"></i></th>
            <!--<th>Title ID <i style="float: right; cursor: pointer;" v-on:click="(sortBy == 'titleID') ? direction = !direction : sortBy = 'titleID'" class="fas fa-sort"></i></th>
            <th>Region</th>-->
            <th v-if="showComments">Comment</th>
            <th style="min-width: 4.5em;">Rating <i style="float: right; cursor: pointer;" v-on:click="(sortBy == 'rating') ? direction = !direction : sortBy = 'rating'" class="fas fa-sort"></i></th>
          </tr>
          <tr v-for="title in compatList.filter(x => 
            showRegions.find(y => y.region == x.region).show && (
              !searchStr ||
              searchStr == '' ||
              x.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchStr.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
              x.titleID.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchStr.toLowerCase().replace(/[^a-z0-9]/g, ''))
            )
          ).sort(function(a,b) {
            let bool = false
            if (a.hasOwnProperty(sortBy) && b.hasOwnProperty) bool = a[sortBy] < b[sortBy]
            else if (a.tests[0].hasOwnProperty(sortBy) && b.tests[0].hasOwnProperty(sortBy)) bool = a.tests[0][sortBy] < b.tests[0][sortBy]
            
            var m = (direction) ? -1 : 1
            return bool ? -1*m : 1*m
          })" :key="title">
            <td style="width: 2.4em; padding: 0;">
              <picture>
                  <source :srcset="`icons/${title.titleID}.avif`" type="image/avif">
                  <source :srcset="`icons/${title.titleID}.webp`" type="image/webp">
                  <img :src="`icons/${title.titleID}.jpeg`" style="width: 2.4em; vertical-align: middle;">
              </picture>
            </td>
            <td class="tableMinWidth"><router-link :to="`/titleid/${title.titleID}`">{{title.name}} ({{title.region}})</router-link></td>
            <td v-if="showComments">
              {{ title.tests[0].comment.slice(0,100) }}<router-link v-if="title.tests[0].comment.length > 100" :to="`/titleid/${title.titleID}`"><b>...</b></router-link>
            </td>
            <td class="centerText">{{ratingArr[title.tests[0].rating-1].name}}</td>
          </tr>
        </table>
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
        showRegions: Array.from(new Set(compatList.map(x => x.region))).map(x => {
          return {
            region: x,
            show: true
          }
        }),
        sortBy: "rating",
        direction: true,
        showComments: true,
        searchStr: '',
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
      if (window.innerWidth <= 700) this.showComments = false
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