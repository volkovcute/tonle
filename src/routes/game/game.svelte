<script>
    import { fly } from 'svelte/transition'
    import { onMount, onDestroy } from 'svelte'
    import data from '../../data.js'
    import Input from './Input.svelte'
    import Start from './start.svelte'
    import ArtistCard from './ArtistCard.svelte'
    import WinnerModal from './WinnerModal.svelte'
    import LoserModal from './LoserModal.svelte'
    import { timeStore } from './timeStore.js'

    let timeLeft;
    let items = data;
    let inputVal = '';
    let picked = [];
    let count = 0;
    let win = false;
    let gameOver = false;
    let currentDate = new Date().toDateString();

    const artistsSchedule = [
        'пропаганда',
        'иван дорн',
        'дора',
        'смоки мо',
        'сплин',
        'toxi$',
        'машина времени',
        'михаил круг',
        'скриптонит',
        'надежда бабкина'
    ];

    function generateSecretPlace() {
        const today = new Date();
        const startDate = new Date(2024, 10, 23); // November 23, 2024
        const dayIndex = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        const artistName = artistsSchedule[(dayIndex + artistsSchedule.length) % artistsSchedule.length];
        return items.find(
            (item) => item.name.trim().toLowerCase() === artistName
        ) || null;
    }

    let secretPlace = generateSecretPlace();

    const unsubscribe = timeStore.subscribe((value) => {
        timeLeft = value;
    });

    function onItemClicked(item) {
        if (win || gameOver) return;

        if (item.name === secretPlace?.name) {
            win = true;
            gameOver = true;
            winner_modal.showModal();
            preview_player.play();
            localStorage.setItem('lastPlayDate', currentDate);
        }

        picked = [item, ...picked];
        inputVal = '';
        document.activeElement.blur();
        count = picked.length;

        // Store IDs as strings to ensure consistency
        const pickedIds = picked.map(i => String(i.sz_id));
        localStorage.setItem('guesses', JSON.stringify(pickedIds));

        if (!win && count >= 10) {
            gameOver = true;
            localStorage.setItem('lastPlayDate', currentDate);
            preview_player.play();
            loser_modal.showModal();
        }
    }

    $: filteredItems = items.filter((item) => {
        const itemName = item.name.trimStart().toLowerCase();
        const input = inputVal.trimStart().toLowerCase();
        const nameParts = itemName.split(/\s+|&|-|_/);

        return (
            !picked.find((i) => i && i.name.toLowerCase() === itemName) &&
            nameParts.some((part) => part.includes(input))
        );
    });

    function checkLastPlayDate() {
        const lastPlayDate = localStorage.getItem('lastPlayDate');

        if (lastPlayDate !== currentDate) {
            localStorage.setItem('lastPlayDate', currentDate);
            localStorage.setItem('guesses', JSON.stringify([]));
            // Reset game state
            picked = [];
            count = 0;
            win = false;
            gameOver = false;
        } else {
            // Load previous game state
            let guesses = localStorage.getItem('guesses');

            if (guesses) {
                const pickedIds = JSON.parse(guesses);

                // Ensure IDs are strings and filter out invalid IDs
                const pickedIdsValid = pickedIds
                    .map(id => {
                        if (id === null || id === undefined) return null;
                        return String(id);
                    })
                    .filter(Boolean);

                // Reconstruct picked items from IDs
                picked = pickedIdsValid
                    .map(id => items.find(item => String(item.sz_id) === id))
                    .filter(Boolean); // Remove any null or undefined entries

                count = picked.length;

                if (picked.some((res) => res.name === secretPlace?.name)) {
                    win = true;
                    gameOver = true;
                    winner_modal.showModal();
                    preview_player.play();
                } else if (count >= 10) {
                    // Game over, user has lost
                    gameOver = true;
                    loser_modal.showModal();
                    preview_player.play();
                }
            }
        }
    }

    onMount(() => {
        checkLastPlayDate();
    });

    onDestroy(() => {
        unsubscribe();
    });
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
    <Start />
{:else}
    <div
        class="container mx-auto flex flex-col items-center justify-center mt-5">
        {#each picked as i (i.sz_id)}
            <div
                in:fly|global={{ duration: 700, x: 200 }}
                class="w-full flex justify-center mb-4">
                <ArtistCard {i} {secretPlace} />
            </div>
        {/each}
    </div>
{/if}
<WinnerModal {win} {secretPlace} {count} {timeLeft} />
<LoserModal  {count} {secretPlace} {win} {timeLeft} />
