<template>
  <main>
    <p class="text-lg text-red-500 text-center pb-4 font-semibold">{{ error }}</p>
    <div class="mx-10 md:w-2/5 lg:w-1/3 md:mx-auto py-6">
      <form @submit.prevent="handleSubmit()">
        <div>
          <label for="" class="text-base font-medium ml-2">Event Name</label>
          <input
            type="text"
            class="block border-2 border-gray-500 w-full p-3 px-5 rounded-full text-base mb-2"
            name="event-name"
            id="event-name"
            v-model="payload.name"
            placeholder="Event Name"
          />
        </div>
        <div class="flex flex-col lg:flex-row justify-between">
          <div class="w-full lg:w-1/2 lg:pr-6">
            <label for="" class="text-base font-medium ml-2">Start Date</label>
            <input
              type="date"
              class="block border-2 border-gray-500 w-full p-3 px-5 rounded-full text-lg mb-2"
              name="event-start-date"
              id="event-start-date"
              v-model="payload.startDate"
              placeholder="Select"
            />
          </div>
          <div class="w-full lg:w-1/2 lg:pl-6">
            <label for="" class="text-base font-medium ml-2">End Date</label>
            <input
              type="date"
              class="block border-2 border-gray-500 w-full p-3 px-5 rounded-full text-base mb-2"
              name="event-end-date"
              id="event-end-date"
              v-model="payload.endDate"
              placeholder="Select"
            />
          </div>
        </div>
        <div class="mb-8">
          <label for="" class="text-base font-medium ml-2">Event Description</label>
          <textarea
            class="block border-2 border-gray-500 w-full p-3 px-5 rounded-md text-base mb-2 resize-none"
            id="event-desc"
            name="event-desc"
            v-model="payload.description"
            placeholder="About your event"
          ></textarea>
        </div>
        <div class="mb-10">
          <label for="" class="text-base font-medium ml-2">Event Image</label>
          <input
            type="file"
            class="block border-2 border-gray-500 w-full"
            id="event-image"
            name="event-image"
            @change="handleChange"
            accept="image/*"
          />
        </div>
        <div class="text-center">
          <button
            type="submit" 
            class="btn-primary w-full sm:w-52 inline-block py-3 px-9 rounded-full text-white text-base uppercase"
          >
            Submit
            <div v-if="loading" class="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full" role="status"></div>
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "@/util/axiosConfig";
import dayjs from "dayjs";

export default {
  name: 'CreateEvent',

  data: () => ({
    loading: false,
    error: '',
    payload: {
      name: '',
      startDate: '',
      endDate: '',
      description: '',
      image: null
    }
  }),
  computed: {
    formattedStartDate() {
      return Math.floor(new Date(this.payload.startDate).getTime() / 1000);
    },
    formattedEndDate() {
      return Math.floor(new Date(this.payload.endDate).getTime() / 1000);
    }
  },
  methods: {
    handleChange(e) {
      this.payload.image = e.target.files[0];
    },
    async handleSubmit() {
      try {
        if (!this.payload.name) {
          this.error = 'Please add a name';
          return;
        }
        if (!this.payload.startDate) {
          this.error = 'Please choose a start date';
          return;
        }
        if (!this.payload.endDate) {
          this.error = 'Please choose a end date';
          return;
        }
        if (!this.payload.description) {
          this.error = 'Please add a description';
          return;
        }
        if (!this.payload.image) {
          this.error = 'Please upload an image';
          return;
        }
        if (dayjs(this.payload.startDate).diff(dayjs()) < 0 || dayjs(this.payload.endDate).diff(dayjs()) < 0) {
          this.error = 'Please choose a date greater than today';
          return;
        }
        if (dayjs(this.payload.endDate).diff(dayjs(this.payload.startDate)) <= 0) {
          this.error = 'End date should be greater than start date';
          return;
        }
        this.error = '';

        this.loading = true

        this.payload.startDate = this.formattedStartDate;
        this.payload.endDate = this.formattedEndDate;
        const formData = new FormData();

        Object.entries(this.payload).forEach(([key, value]) => {
          formData.append(key, value);
        });
        const response = await axios.post('/api/events', 
         formData
        );
        if(response.status === 201) {
          alert(response.statusText);
          this.payload = {};
          this.payload.image = null;
        }
        this.loading = false;
      } catch (err) {
        this.loading = false
        if (err.response.status === 400) {
          this.error = err.response.data.error_description;
        }
      }
    },
  }
}
</script>
