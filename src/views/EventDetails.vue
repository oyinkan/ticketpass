<template>
  <main>
    <div v-if="loading">LOADING....</div>
    <div>
      <img :src="details.image" class="w-full" alt="event's image" />
    </div>
    <h3 class="font-bold text-2xl text-center p-6">{{details.name}}</h3>
    <div class="p-20 pt-8">
      <p class="text-base font-light">{{formatDate(details.startDate)}} - {{formatDate(details.endDate)}}</p>
      <p class="text-base font-light">{{details.description}}</p>
    </div>
  </main>
</template>

<script>
import axios from '@/util/axiosConfig';
import dayjs from 'dayjs';

export default {
  name: 'EventDetails',

  data: () => ({
    loading: false,
    details: {}
  }),

  mounted() {
    this.getEventDetail()
  },

  methods: {
    async getEventDetail() {
      try {
        this.loading = true;

        const response = await axios.get(
          `/api/events/${this.$route.params.id}`
        );

        if(response.status === 200){
          this.details = response.data?.data
        }
        this.loading = false;
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
    formatDate(value) {
      if (!value) return;
      return dayjs.unix(value).format("DD/MM/YYYY");
    }
  },
};
</script>
<style scoped>
  @media screen and (min-width: 768px) {
    img {
      height: 500px;
    } 
  }
</style>