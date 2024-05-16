import { defineStore } from "pinia";

export const useDarkModeStore = defineStore('darkMode', {

  state: () => ({
      theme: JSON.parse(localStorage.getItem('theme') || '{"darkMode": false}')
  }),

  actions: {
    toggle() {
      this.theme.darkMode = !this.theme.darkMode
      localStorage.setItem('theme', JSON.stringify(this.theme))
    }
  }
})
