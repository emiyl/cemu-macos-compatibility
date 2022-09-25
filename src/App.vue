<script>
    import compatListObj from '../titles.json'
    
    var compatList = []
    for (var i in compatListObj) {
      var o = compatListObj[i]
      o.titleID = i
    
      if (!Array.isArray(o.author)) o.author = [o.author]
      o.author = o.author.join(', ')
      compatList.push(o)
    }
    
    export default {
      data() {
        return {
          compatList: compatList,
          showEUR: true,
          showUSA: true,
          showJPN: true,
          sortBy: "name",
          direction: false,
          searchStr: ''
        }
      }
    }
    </script>
    
    <template>
      <div class="main">
        <h1>Cemu macOS Compatibility</h1>
        <p>Unofficial list of compatibility with the macOS builds of Cemu.</p>
        <p><b>Want to contribute?</b> Make a pull request on the <a href="https://github.com/emiyl/cemu-macos-compatibility/blob/main/titles.json" target="_blank">GitHub repository</a>.</p>
        
        <hr>
    
        <p>
          <input 
            class="search"
            type='text'
            placeholder='Search'
            v-model='searchStr'
          />
          <span class="regionCheckbox">
            <label><b>Regions:</b></label>
            <input type="checkbox" v-model="showEUR" id="showEURCheckbox">
            <label for="showEURCheckbox">EUR</label>
            <input type="checkbox" v-model="showUSA" id="showUSACheckbox">
            <label for="showUSACheckbox">USA</label>
            <input type="checkbox" v-model="showJPN" id="showJPNCheckbox">
            <label for="showJPNCheckbox">JPN</label>
          </span>
    
          <span class="githubBtn">
            <a href="https://github.com/emiyl/cemu-macos-compatibility" target="_blank"><i class="fab fa-github"></i></a>
          </span>
    
        </p>
    
        <div id="list" class="tableContainer">
          <table>
            <tr>
              <th></th>
              <th>Name <i style="float: right; cursor: pointer;" v-on:click="(sortBy == 'name') ? direction = !direction : sortBy = 'name'" class="fas fa-sort"></i></th>
              <!--<th>Title ID <i style="float: right; cursor: pointer;" v-on:click="(sortBy == 'titleID') ? direction = !direction : sortBy = 'titleID'" class="fas fa-sort"></i></th>
              <th>Region</th>-->
              <th>Comment</th>
              <th>Rating</th>
            </tr>
            <tr v-for="title in compatList.filter(x => 
              (
                (x.region == 'EUR') && showEUR ||
                (x.region == 'USA') && showUSA ||
                (x.region == 'JPN') && showJPN
              ) && (
                !searchStr ||
                searchStr == '' ||
                x.name.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchStr.toLowerCase().replace(/[^a-z0-9]/g, '')) ||
                x.titleID.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchStr.toLowerCase().replace(/[^a-z0-9]/g, ''))
              )
            ).sort(function(a,b) {
              var m = (direction) ? -1 : 1
              return (a[sortBy] < b[sortBy]) ? -1*m : 1*m
            })" :key="title">
              <td style="width: 2.4em; padding: 0;"><img :src="`icons/${title.titleID}.png`" onerror='this.src="icons/fallback.png"' style="width: 2.4em; vertical-align: middle;"></td>
              <td class="tableMinWidth">{{title.name}} ({{title.region}})</td>
              <!--<td class="centerText">{{title.titleID}}</td>
              <td class="centerText">{{title.region}}</td>-->
              <td v-html="title.comment"/>
              <td class="centerText">{{title.rating}}</td>
            </tr>
          </table>
        </div>
      </div>
    
      <p></p>
    
      <footer>
        <p>Created by <a href="https://github.com/emiyl" target="_blank">emiyl</a>.</p>
        <p>If you need further help, ask on the official Cemu <a href="https://discord.gg/5psYsup" target="_blank">Discord Server</a> for assistance.</p>
      </footer>
      
    </template>
    
    <style>
    @import '@/assets/base.css';
    </style>