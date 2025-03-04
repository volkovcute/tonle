<script>
    export let i
    export let secretPlace

    function getBadgeClass(number, targetNumber, threshold) {
        return Math.abs(number - targetNumber) <= threshold
            ? 'bg-customBg'
            : 'bg-gray-700'
    }
</script>

<div
    class="artist-card p-6 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-gray-400 bg-opacity-5 mb-5 rounded-xl">
    <div class="flex items-center mb-4">
        <img
            src="https://{i.cover.replace('%%', '200x200')}"
            alt={i.name}
            class="w-24 h-24 rounded-full mr-4" />
        <div>
            <h2 class="text-3xl font-bold">{i.name}</h2>
        </div>
    </div>

    <div class="grid grid-cols-2 gap-2 mt-4">
        <div
            class="{secretPlace.genres[0] === i.genres[0]
                ? 'bg-success'
                : 'bg-gray-700'} p-2 rounded-lg text-center">
            <p class="text-sm">Жанр</p>
            <p class="font-bold">{i.genres[0]}</p>
        </div>
        <div
            class="{Number(secretPlace.debut) === Number(i.debut)
                ? 'bg-success'
                : getBadgeClass(
                      i.debut,
                      secretPlace.debut,
                      4,
                  )} flex flex-col items-center p-2 rounded-lg text-center text-white">
            <p class="text-sm">Дебют</p>
            <div class="flex items-center">
                <div class="font-bold">
                    {i.debut}
                </div>
                {#if Number(secretPlace.debut) > Number(i.debut)}
                    <div>
                        {@html `<svg focusable="false" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="white"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"></path></svg>`}
                    </div>
                {/if}
                {#if Number(secretPlace.debut) < Number(i.debut)}
                    <div>
                        {@html `<svg
                            focusable="false"
                            width="1.5rem"
                            height="1.5rem"
                            viewBox="0 0 24 24"
                            fill="white"
                        ><path
                            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                        ></path></svg>`}
                    </div>
                {/if}
            </div>
        </div>

        <div
            class="{Number(secretPlace.size) === Number(i.size)
                ? 'bg-success'
                : getBadgeClass(
                      i.size,
                      secretPlace.size,
                      1,
                  )} flex flex-col items-center p-2 rounded-lg text-center text-white">
            <p class="text-sm">Количество</p>
            <div class="flex items-center">
                <div class="font-bold">
                    {i.size}
                </div>
                {#if Number(secretPlace.size) > Number(i.size)}
                    <div>
                        {@html `<svg focusable="false" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="white"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"></path></svg>`}
                    </div>
                {/if}
                {#if Number(secretPlace.size) < Number(i.size)}
                    <div>
                        {@html `<svg
                            focusable="false"
                            width="1.5rem"
                            height="1.5rem"
                            viewBox="0 0 24 24"
                            fill="white"
                        ><path
                            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                        ></path></svg>`}
                    </div>
                {/if}
            </div>
        </div>
        <div
            class="{secretPlace.sex === i.sex
                ? 'bg-success'
                : 'bg-gray-700'} p-2 rounded-lg text-center">
            <p class="text-sm">Пол</p>
            <p class="font-bold">{i.sex}</p>
        </div>
        <div
            class="{secretPlace.nationality === i.nationality
                ? 'bg-success'
                : 'bg-gray-700'} p-2 rounded-lg text-center">
            <p class="text-sm">Страна</p>
            <p class="font-bold">{i.nationality}</p>
        </div>
        <div
            class="{Number(secretPlace.top) === Number(i.top)
                ? 'bg-success'
                : getBadgeClass(
                      Number(i.top),
                      Number(secretPlace.top),
                      49,
                  )} flex flex-col items-center p-2 rounded-lg text-center text-white">
            <p class="text-sm">Популярность</p>
            <div class="flex items-center">
                <div class="font-bold">
                    #{i.top}
                </div>
                {#if Number(secretPlace.top) < Number(i.top)}
                    <div>
                        {@html `<svg focusable="false" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="white"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"></path></svg>`}
                    </div>
                {/if}
                {#if Number(secretPlace.top) > Number(i.top)}
                    <div>
                        {@html `<svg
                            focusable="false"
                            width="1.5rem"
                            height="1.5rem"
                            viewBox="0 0 24 24"
                            fill="white"
                        ><path
                            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
                        ></path></svg>`}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
