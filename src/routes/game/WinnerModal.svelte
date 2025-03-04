<script>
    export let secretPlace
    export let win
    export let count
    export let timeLeft
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

<dialog id="winner_modal" class="modal modal-bottom sm:modal-middle">
    {#if win === true}
        <div class="modal-box text-center">
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
    <audio id="preview_player" class="hidden">
        <source
            src="https://cdn66.zvuk.com/track/{secretPlace.track}/preview"
            type="audio/mpeg" />
        Your browser does not support the audio element.
    </audio>
</dialog>
