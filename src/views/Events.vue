<template>
  <main>
    <div class="w-9/12 mx-auto py-14 px-6">
      <div>
        <!-- loading State -->
        <div v-if="loading">LOADING....</div>
        <div v-else-if="events.length">
          <div class="flex flex-col sm:flex-row flex-wrap">
            <div v-for="event in events" :key="event.id" class="sm:w-1/2 md:w-1/3 lg:w-1/4">
              <div class="event-wrapper border-2 border-gray-400 rounded-3xl rounded-tr-2xl rounded-tl-2xl m-2">
                <div>
                  <img :src="event.image" class="rounded-tr-2xl rounded-tl-2xl" alt="event's image" />
                </div>
                <div class="p-4">
                  <p class="text-base text-ellipsis overflow-hidden whitespace-nowrap"> {{event.name}} </p>
                  <p class="text-base">{{ formatDate(event.startDate)  }} - {{ formatDate(event.endDate ) }}</p>
                  <div class="text-center mt-6">
                    <button
                      type="button"
                      class="btn-primary py-1 px-9 rounded-full text-white text-sm"
                      @click="$router.push(`/events/${event.id}`)"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>NO RECORDS FOUND</div>
      </div>
      <div v-show="events.length" class="pagination flex justify-between items-center mt-12">
        <div class="flex">
          <button
            v-for="link in paginationMeta.links" 
            :key="link.label"
            class="flex justify-center items-center h-6 border border-black p-4 mr-4"
            :class="link.active ? 'active' : ''"
          >
            {{link.label}}
          </button>
        </div>
        <div>
          <p class="text-xl"><span class="font-medium">{{paginationMeta.per_page}}</span> of <span class="font-medium">{{paginationMeta.total}}</span> events</p>
        </div>
      </div>
    </div>
</main>
</template>

<script>
import axios from '@/util/axiosConfig';
import dayjs from "dayjs"

export default {
  name: 'EventsList',

  data:() => ({
    loading: false,
    events: [],
    paginationMeta: {}
  }),

  mounted() {
    this.getAllEvents()
  },

  methods: {
    async getAllEvents(){
      try{
        this.loading = true

        const response = await axios.get('/api/events')

        if(response.status === 200){
          this.events = response.data?.data
          this.paginationMeta = response.data?.meta
        }
        this.loading = false
      } catch(err){
        this.loading = false
        console.log(err)
      }
    }, 

    formatDate(value) {
      if (!value) return;
      return dayjs.unix(value).format("DD/MM/YYYY");
    }
  }
}
</script>
<style scoped>
  img {
    height: 100px;
    width: 100%;
  }
  .active {
    background: #000;
    color: #fff;
  }
</style>