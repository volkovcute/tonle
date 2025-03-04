<script>
    //@ts-nocheck
    export let data
    export let changePage

    import { fly, fade, blur, slide, scale, draw } from 'svelte/transition'
    import { goto } from '$app/navigation'
    import { onMount, afterUpdate } from 'svelte'
    import { pushState } from '$app/navigation'
    import artistsData from '../../data.js'

    import Input from './Input.svelte'
    import ArtistCard from './ArtistCard.svelte'
    import WinnerModal from './WinnerModal.svelte'
    import LoserModal from './LoserModal.svelte'
    import { timeStore } from './timeStore.js'

    if (data && Object.keys(data).length === 0) {
        throw redirect(307, '/')
    }

    $: secretPlace = null
    let selectedItem = null
    let inputVal = ''
    let picked = []
    let count = 0
    let win = false
    let winner_modal = false

    const decodeBase64Unicode = (base64) => {
        try {
            let binaryString = atob(base64)
            let bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i)
            }
            let utf8String = new TextDecoder('utf-8').decode(bytes)
            return utf8String
        } catch (e) {
            return ''
        }
    }

    onMount(() => {
        if (data.message === null) {
            data.message = ''
        }
        if (secretPlace === null) {
            let artist = artistsData.filter(
                (res) => res.name === decodeBase64Unicode(data.artist),
            )

            if (artist.length === 0) {
                goto(`?`)
                changePage('home')
            }
            secretPlace = artist[0]
        }
    })

    afterUpdate(() => {
        if (count >= 10 && !win) {
            preview_player.play()
            loserModalCustom.showModal()
        }
    })

    let onItemClicked = (item) => {
        if (item.name === secretPlace.name) {
            win = true
            winnerModalCustom.showModal()
            preview_player.play()
        }
        const itemg = artistsData.find((i) => i.name === item.name)
        picked = [itemg, ...picked]
        inputVal = ''
        document.activeElement.blur()
        count++
    }

    $: filteredItems = artistsData.filter((item) => {
        const itemName = item.name.trimStart().toLowerCase()
        const input = inputVal.trimStart().toLowerCase()

        const nameParts = itemName.split(/\s+|&|-|_/)

        return (
            !picked.find((i) => i.name.toLowerCase() === itemName) &&
            nameParts.some((part) => part.includes(input))
        )
    })

    const strings = {
        1: [
            'Вау! Ты угадал с первой попытки!',
            'Это настоящее везение!',
            'Невероятно! Как ты это сделал?',
            'Ты, наверное, большой фанат!',
        ],
        2: [
            'Две попытки? Ты просто гений!',
            'Такое случается раз в жизни.',
            'Великолепно!',
            'Это было быстро!',
        ],
        3: [
            'Ты профи!',
            'Потрясающе! Три попытки.',
            'Безупречно!',
            'Ты отлично знаешь этих артистов.',
        ],
        4: [
            'Четыре попытки? Невероятно!',
            'Ты мастер угадывания!',
            'Отличный результат!',
            'Ты действительно хорош в этом!',
        ],
        5: [
            'Пять попыток! Впечатляет.',
            'Отлично!',
            'Прекрасно справился!',
            'Так держать!',
        ],
        6: [
            'Поделись этим с друзьями!',
            'Ещё одна победа!',
            'Достойное выступление!',
            'Молодец, что довёл дело до конца!',
        ],
        7: [
            'Поздравляем с победой!',
            'Отличная работа!',
            'Неплохо!',
            'Ты справился, молодец!',
        ],
        8: [
            'Восемь попыток, но ты справился!',
            'Довольно хорошо!',
            'Поздравляем!',
            'Немного тревожно, но ты справился.',
        ],
        9: [
            'Это было близко!',
            'Могло быть и хуже.',
            'Победа есть победа!',
            'Ты нервничал, но справился!',
        ],
        10: [
            'Успел на последних секундах!',
            'Мы всегда в тебя верили!',
            'Ты справился, когда это было важно!',
            'Настоящее хладнокровие!',
        ],
    }

    const getRandomElement = (array) => {
        const randomIndex = Math.floor(Math.random() * array.length)
        return array[randomIndex]
    }

    $: randomMessage = strings[count]
        ? getRandomElement(strings[count])
        : 'Поздравляем!'

    $: playStop = () => {
        preview_player.pause()
    }
</script>

<div class="container mx-auto flex flex-col items-center justify-center mt-5">
    <Input bind:inputVal {filteredItems} {onItemClicked} {count} {win} />
    <div class="mt-3 w-full m-0 text-center">
        <progress
            class="progress progress-primary w-3/4 xl:w-1/4"
            value={count * 10}
            max="100"></progress>
        <p>
            Попытка
            {#if count === 0}
                0
            {:else}
                <span class="countdown">
                    <span style="--value:{count};"></span>
                </span>
            {/if}
            из 10
        </p>
    </div>
</div>

{#if count === 0}
    <div
        class="container mx-auto flex flex-col items-center justify-center mt-5">
        {#if decodeBase64Unicode(data.message) !== ''}
            <div class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 text-center">
                Подсказка для тебя: {decodeBase64Unicode(data.message)}
            </div>
        {/if}
    </div>
{:else}
    <div
        class="container mx-auto flex flex-col items-center justify-center mt-5">
        {#each picked as i (i.sz_id)}
            <div
                in:fly|global={{
                    duration: 700,
                    x: 200,
                }}
                class="w-full flex justify-center mb-4">
                <ArtistCard {i} {secretPlace} />
            </div>
        {/each}
    </div>
{/if}

<dialog id="winnerModalCustom" class="modal">
    {#if win === true}
        <div class="modal-box text-center">
            <form method="dialog" on:submit={playStop}>
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >✕</button>
            </form>
            <p class="py-3 text-xl font-bold">
                {randomMessage}
            </p>
            <div class="py-4 avatar">
                <div class="w-32 rounded-xl">
                    <img
                        src="https://{secretPlace.cover.replace(
                            '%%',
                            '400x400',
                        )}"
                        alt="preview" />
                </div>
            </div>
            <p class="py-3 text-xl">
                {secretPlace.name}
            </p>
            <p class="py-4">
                {secretPlace.desc === null ? 'Поздравляем!' : secretPlace.desc}
            </p>
            <button
                class="btn btn-accent"
                on:click={() => {
                    goto(`?`)
                    changePage('newgame')
                }}>Создать игру</button>
        </div>
    {/if}
</dialog>

<dialog id="loserModalCustom" class="modal modal-bottom sm:modal-middle">
    {#if count >= 10 && win === false}
        <div class="modal-box text-center">
            <form method="dialog" on:submit={playStop}>
                <button
                    class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    >✕</button>
            </form>
            <p class="py-3 text-xl font-bold">
                Скажи своему другу, что это было слишком просто...
            </p>
            <div class="py-4 avatar">
                <div class="w-32 rounded-xl">
                    <img
                        src="https://{secretPlace.cover.replace(
                            '%%',
                            '400x400',
                        )}"
                        alt="preview" />
                </div>
            </div>
            <p class="py-3 text-xl">
                {secretPlace.name}
            </p>
            <p class="py-4">
                {secretPlace.desc === null ? '' : secretPlace.desc}
            </p>
            <button
                class="btn btn-accent"
                on:click={() => {
                    goto(`?`)
                    changePage('newgame')
                }}>Создать игру</button>
        </div>
    {/if}
</dialog>

{#if secretPlace?.track !== undefined}
    <audio id="preview_player" class="hidden">
        <source
            src="https://cdn66.zvuk.com/track/{secretPlace.track}/preview"
            type="audio/mpeg" />
        Your browser does not support the audio element.
    </audio>
{/if}
