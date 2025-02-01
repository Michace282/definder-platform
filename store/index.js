
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
    state: () => ({
        user: null,
        settings: {}
    }),
    actions: {
        setUser(user) {
            this.user = user;
        },
        setSettings(settings) {
            this.settings = settings;
        }
    }
});
