<template>
  <div>
    <h1> Create an event </h1>
    <div class="form-container">
      <form @submit.prevent="createEvent">
        <label> Select a category: </label>
        <select v-model="event.category">
          <option
            v-for="option in categories"
            :value="option"
            :key="option"
            :selected="option === event.category"
          >
            {{ option }}
          </option>
        </select>

        <h3> Name & describe your event </h3>

        <label> Title </label>
        <input 
          v-model="event.title"
          type="text"
          placeholder="Title"  
        />

        <label> Description </label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Description"
        />

        <h3>Where is your event?</h3>

        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Location"
        />

        <h3>When is your event?</h3>

        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />

        <label> Select a Time </label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time"> {{ time }} </option>
        </select>

        <input type="submit" class="button -fill-gradient" value="Submit" />

      </form>  
    </div>
  </div>
</template>

<script>
import datepicker from 'vuejs-datepicker';
import NProgress from 'nprogress';

export default {
  components: {
    datepicker
  },
  data() {
    const times = [];
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }

    return {
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject()
    }
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.$store.dispatch('event/createEvent', this.event).then((returnedEvent) => {
        this.$router.push({
          name: 'event-show',
          params: { id: returnedEvent.id}
        })
        this.event = this.createFreshEventObject();
      }).catch(() => {
        NProgress.done()
      })
    },
    createFreshEventObject() {
      const user = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }

    } 
  }
  }
</script>

<style>

</style>