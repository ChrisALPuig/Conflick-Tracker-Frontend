import { defineStore } from "pinia"
import { apiFetch } from "../services/api"

export const useConflictStore = defineStore("conflicts", {

  state: () => ({
    conflicts: [],
    loading: false
  }),

  actions: {

    async fetchConflicts() {
      this.loading = true
      try {
        this.conflicts = await apiFetch("/conflicts")
      } finally {
        this.loading = false
      }
    },

    async fetchConflictById(id) {
      return await apiFetch(`/conflicts/${id}`)
    },

    async createConflict(conflict) {

      const newConflict = await apiFetch("/conflicts", {
        method: "POST",
        body: JSON.stringify(conflict)
      })

      this.conflicts.push(newConflict)
    },

    async updateConflict(id, conflict) {

      const updated = await apiFetch(`/conflicts/${id}`, {
        method: "PUT",
        body: JSON.stringify(conflict)
      })

      const index = this.conflicts.findIndex(c => c.id === id)
      if (index !== -1) {
        this.conflicts[index] = updated
      }

    },

    async deleteConflict(id) {

      await apiFetch(`/conflicts/${id}`, {
        method: "DELETE"
      })

      this.conflicts = this.conflicts.filter(c => c.id !== id)

    },

    async fetchByCountry(code) {
    return await apiFetch(`/conflicts/country/${code}`)
    }

  }

})