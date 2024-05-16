import { defineStore } from "pinia";

export const useContactStore = defineStore('contacts', {

  state: () => ({
    contacts: JSON.parse(localStorage.getItem('contacts') || '{}'),
    contact: JSON.parse(localStorage.getItem('contact') || '{}')
  }),

  getters: {
    contactList: (state) => {
      return state.contacts.map((p: any) => {
        return {
          label: p.name,
          value: p.id,
        }
      })
    }
  },

  actions: {
    async all() {
      const { data, error } = await useApiFetch('contacts/all');

      if (data?.value) {
        this.save('contacts', data.value)
      }
    },

    async browse(currentPage: number = 1) {
      const options = {
        pageSize: 10,
        searchKey: ''
      }

      const url = `contacts/browse?
        page=${currentPage}
        &per_page=${options.pageSize}
        &search=${options.searchKey}
        &search_by=name
        &sort=[]
        &filters={}
      `

      const { data, error } = await useApiFetch(url);

      if (data?.value) {
        this.save('contacts', data.value)
      }
    },

    async view(pid: number) {
      const { data, error } = await useApiFetch(`contacts/${pid}/view`);

      if (data?.value) {
        this.save('contact', data.value)
      }
    },

    async add(payload: any) {
      const { data, error } = await useApiFetch('contacts/add', {
        method: 'POST',
        body: payload
      })

      if (data?.value) {
        this.addPush(data.value)
      }
    },

    async edit(payload: any, id: number) {
      const { data, error } = await useApiFetch(`contacts/${id}/edit`, {
        method: 'PUT',
        body: payload
      })

      if (data?.value) {
        this.save('contacts', data.value)
      }
    },

    addPush(contact: any) {
      this.save('contacts', contact, true)
    },

    save(persistType: string, value: any, push: boolean = false) {
      if (push) {
        this[persistType].push(value)
      } else {
        this[persistType] = value
      }

      localStorage.setItem(persistType, JSON.stringify(value))
    }
  },
})
