<template>
  <nav
    class="flex justify-between items-center py-2 px-10 border-b-2 border-gray-400"
  >
    <div>
      <router-link to="/">
        <img
          src="../assets/logo.svg"
          class="h-10"
          alt="company's logo"
        />
      </router-link>
    </div>
    <div>
      <button class="block md:hidden"  @click="isOpen = !isOpen">
        <img
          src="../assets/bars.svg" 
          class="h-8" 
          alt="hamburger icon"
        />
      </button>
      <div class="hidden md:block">
        <button
          class="inline-block btn-primary py-3 px-9 rounded-full text-white text-base uppercase ml-2 w-52 text-center"
          @click="handleEvent"
        >
          Create Event
        </button>
        <button
          class="inline-block py-3 px-9 rounded-full text-base uppercase ml-2 border-2 border-solid border-black w-52 text-center"
          @click="handleSession"
        >
          {{ isLoggedIn ? 'log out' : 'Log in' }}
        </button>
      </div>
    </div>
  </nav>
  <div v-if="isOpen" class="bg-white h-screen absolute left-0 py-16 px-8 shadow">
    <button
      class="block btn-primary py-3 px-9 rounded-full text-white text-base uppercase ml-2 w-52 text-center"
      @click="handleEvent"
    >
      Create Event
    </button>
    <button
      class="block py-3 px-9 rounded-full text-base uppercase ml-2 border-2 border-solid border-black w-52 text-center mt-4"
      @click="handleSession"
    >
      {{ isLoggedIn ? 'log out' : 'Log in' }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',

  data: () => ({
    isOpen: false,
  }),

  computed: {
    isLoggedIn() {
      const session = localStorage.getItem('token');
      if (session) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    handleSession() {
      if (this.isLoggedIn) {
        this.clearSession();
      } else {
        this.$router.push('/login');
      }
    },

    clearSession() {
      location.reload()
      this.$router.push('/');
      localStorage.removeItem('token');
      
    },

    handleEvent() {
      if (!this.isLoggedIn) {
        this.$router.push('/login');
      } else {
        this.$router.push('/create');
      }
    },
  },
};
</script>
