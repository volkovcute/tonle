<script>
    export let secretPlace
    export let count
    export let win
    export let timeLeft
    $: playStop = () => {
        preview_player.pause()
    }
</script>

<dialog id="loser_modal" class="modal modal-bottom sm:modal-middle">
    {#if count >= 10 && win === false}
        <div class="modal-box text-center">
            <p class="py-3 text-xl font-bold">Не повезло...</p>
            <div class="py-4 avatar">
                <div class="w-32 rounded-xl">
                    <img
                        src="https://{secretPlace.cover.replace(
                            '%%',
                            '400x400',
                        )}" />
                </div>
            </div>
            <div class="py-3 text-xl">
                <p>{secretPlace.name}</p>
            </div>
            <p class="py-4">
                {secretPlace.desc === null ? '' : secretPlace.desc}
            </p>
            <div>
                <p>Следующий тонл</p>
                <span class="countdown font-mono text-2xl mt-3">
                    <span style="--value:{timeLeft.hours};"></span>
                    ч
                    <span style="--value:{timeLeft.minutes};"></span>
                    м
                    <span style="--value:{timeLeft.seconds};"></span>
                    с
                </span>
            </div>
            <div class="modal-action">
                <form method="dialog" on:submit={playStop}>
                    <button class="btn">Закрыть</button>
                </form>
            </div>
        </div>
    {/if}
</dialog>
