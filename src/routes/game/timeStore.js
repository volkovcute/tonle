//@ts-nocheck
import { writable } from 'svelte/store'

function createTimeStore() {
    const { subscribe, set } = writable(timeUntilMidnight())

    function timeUntilMidnight() {
        const now = new Date()

        const midnight = new Date(now)
        midnight.setHours(24, 0, 0, 0)

        const timeDifference = midnight - now

        const hours = Math.floor(timeDifference / (1000 * 60 * 60))
        const minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        )
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

        return { hours, minutes, seconds }
    }

    function update() {
        set(timeUntilMidnight())
    }

    return {
        subscribe,
        update,
    }
}

export const timeStore = createTimeStore()

setInterval(() => {
    timeStore.update()
}, 1000)
