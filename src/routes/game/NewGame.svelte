<script>
    // @ts-nocheck
    import items from '../../data.js'
    import Input from './Input.svelte'
    import ArtistCard from './ArtistCard.svelte'

    let picked = []
    let inputVal = ''
    let count = 0
    let win = false
    let message = ''

    let selectedArtist = null

    const onItemClicked = (item) => {
        console.log(item)
        let artist;
        // if (artist.length === 0) {
        //     return alert('Артист не найден!')
        // }
        //
        inputVal = ''
        artist = item

        selectedArtist = artist

        document.activeElement.blur()
    }

    $: filteredItems = items.filter((item) => {
        const itemName = item.name.trimStart().toLowerCase()
        const input = inputVal.trimStart().toLowerCase()

        const nameParts = itemName.split(/\s+|&|-|_/)

        return (
            !picked.find((i) => i.name.toLowerCase() === itemName) &&
            nameParts.some((part) => part.includes(input))
        )
    })

    let buttonText = 'Скопировать ссылку'

    const encodeBase64Unicode = (str) => {
        let utf8Array = new TextEncoder().encode(str)
        let binaryString = Array.from(utf8Array)
            .map((byte) => String.fromCharCode(byte))
            .join('')
        return btoa(binaryString)
    }

    $: copyLink = () => {
        if (selectedArtist && Object.keys(selectedArtist).length !== 0) {
            let artist = encodeBase64Unicode(selectedArtist.name)
            let msg = encodeBase64Unicode(message)

            let link = `Этот тонл для тебя! Попробуй отгадать с 10 попыток. https://tonle.io/?artist=${artist}&message=${msg}`

            if (navigator.clipboard) {
                navigator.clipboard.writeText(link).then(function () {
                    buttonText = 'Скопировано!'
                    setTimeout(() => {
                        buttonText = 'Скопировать ссылку'
                    }, 3000)
                })
            } else {
                const textarea = document.createElement('textarea')
                textarea.value = link
                document.body.appendChild(textarea)
                textarea.select()
                try {
                    document.execCommand('copy')
                    buttonText = 'Скопировано!'
                    setTimeout(() => {
                        buttonText = 'Скопировать ссылку'
                    }, 3000)
                } catch (error) {
                    console.error(error)
                }
                document.body.removeChild(textarea)
            }
        }
    }
</script>

<div class="container mx-auto flex flex-col items-center justify-center mt-5">
    <div
        class="tooltip tooltip-open w-full"
        data-tip="Выберите артиста, которого хотите загадать">
        <Input bind:inputVal {filteredItems} {onItemClicked} {count} {win} />
    </div>
    {#if selectedArtist && Object.keys(selectedArtist).length !== 0}
        <div
            class="container mx-auto flex flex-col items-center justify-center mt-5 px-4">
            <ArtistCard i={selectedArtist} secretPlace={selectedArtist} />
        </div>
        <div class="w-full px-4 xl:w-2/4 mt-10">
            <div
                class="tooltip tooltip-open w-full"
                data-tip="Укажите сообщение, которое будет показано игроку">
                <input
                    class="input input-bordered w-full"
                    placeholder="это что-то схожее с Бутыркой"
                    bind:value={message} />
            </div>
            <div class="mx-auto flex items-center justify-center mt-4">
                <button class="btn btn-accent" on:click={copyLink}
                    >{buttonText}</button>
            </div>
        </div>
    {/if}
</div>
