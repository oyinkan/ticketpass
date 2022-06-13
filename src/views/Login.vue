<template>
  <main>
    <section class="sm:w-96 mx-8 sm:mx-auto mt-36 text-center">
      <div class="flex justify-center mb-20">
        <router-link to="/">
          <img src="../assets/logo.svg" class="h-10" alt="comapny's logo" />
        </router-link>
      </div>
      <p class="text-lg text-red-500 pb-4 font-semibold">{{ error }}</p>
      <form @submit.prevent="handleSubmit()" novalidate="true">
        <input
          type="email"
          class="block border-2 border-gray-300 w-full p-3 px-5 rounded-full text-lg mb-2"
          name="email"
          id="email"
          v-model="email"
          placeholder="Email address"
          required
        />
        <input
          type="password"
          class="block border-2 border-gray-300 w-full p-3 px-5 rounded-full text-lg mb-2"
          name="password"
          id="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          class="btn-primary w-full sm:w-52 inline-block py-3 px-9 rounded-full text-white text-base uppercase ml-2 text-center mt-10"
        >
          Log in
          <div v-if="loading" class="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full" role="status"></div>
        </button>
      </form>
    </section>
  </main>
</template>

<script>
import axios from '@/util/axiosConfig';
export default {
  name: 'LoginPage',

  data: () => ({
    loading: false,
    email: '',
    password: '',
    error: ''
  }),

  methods: {
    async handleSubmit() {
      try {
        if (!this.email) {
          this.error = 'Please add email address';
          return;
        } 
        if (!this.password) {
          this.error = 'Please add password';
          return;
        }

        this.loading = true
        const loginData = {
          username: this.email,
          password: this.password,
          grant_type: 'password',
          client_id: '966c01ba-31b1-40a2-8f4c-fab8b1373bd7',
        };

        const response = await axios.post('/api/login', 
          loginData,
        );

        if(response.status === 200) {
          this.storeToken(response.data?.access_token)
          this.$router.push('/')
        }
        this.loading = false;
      } catch (err) {
        this.loading = false
        if (err.response.status === 400) {
          this.error = err.response.data.error_description;
        }
        console.log(err.response.data.error_description);
      }
    },

    storeToken(token){
      localStorage.setItem('token', token)
    }
  },
};
</script>
