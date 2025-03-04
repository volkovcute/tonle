<script>
    //@ts-nocheck
    import { goto } from '$app/navigation'
    import { beforeUpdate, onMount } from 'svelte'
    import '../app.css'
    import Header from './header.svelte'
    import Game from './game/game.svelte'
    import NewGame from './game/NewGame.svelte'
    import CustomGame from './game/CustomGame.svelte'

    let pageName = ''

    let changePage = (id) => {
        if (id === 'home') {
            goto(`?`)
        }
        pageName = id
        console.log(id)
    }

    let artist = ''
    let message = ''

    function getParams() {
        const params = new URLSearchParams(window.location.search)
        artist = params.get('artist')
        if (artist) {
            artist = params.get('artist').replace(/ /g, '+')
        }
        message = params.get('message')
        if (message) {
            message = params.get('message').replace(/ /g, '+')
        }
    }

    onMount(() => {
        getParams()
        if (artist !== null && artist !== '') {
            pageName = 'customGame'
        } else {
            pageName = 'home'
        }
    })

    beforeUpdate(() => {
        getParams()
    })
</script>

<body class='flex flex-col min-h-screen'>
<div class='container p-2 mx-auto'>
    {#if pageName === null}
        <Header {changePage} />
    {/if}
    {#if artist !== null && artist !== '' && pageName === 'customGame'}
        <Header {changePage} />
        <CustomGame data={{ artist, message }} {changePage} />
    {/if}
    {#if pageName === 'home'}
        <Header {changePage} />
        <div class='hero mt-24'>
            <div class='hero-content text-center'>
                <div class='max-w-md'>
                    <h1 class='text-5xl font-bold'>tonle</h1>
                    <p class='py-6'>Отгадай исполнителя за 10 попыток.</p>
                    <div class='flex flex-col w-auto gap-3'>
                        <button
                            class='btn btn-primary'
                            on:click={() => changePage('game')}
                        >Начать игру
                        </button>
                        <button
                            class='btn btn-accent'
                            on:click={() => changePage('newgame')}
                        >Создать игру
                        </button>
                    </div>
                </div>
            </div>
        </div>
    {:else if pageName === 'game'}
        <Header {changePage} />
        <Game />
    {:else if pageName === 'newgame'}
        <Header {changePage} />
        <NewGame />
    {/if}
</div>
<div class='flex-grow'></div>
<footer class='w-full p-4 text-center text-white'>
    project by @bzhdm32 and @volkovcutee
</footer>
</body>
