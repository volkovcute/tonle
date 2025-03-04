<script>
    export let inputVal
    export let filteredItems
    export let onItemClicked
    export let count
    export let win
</script>

<div class='dropdown w-full px-4 xl:w-2/4'>
    <input
        disabled={count >= 10 || win === true}
        class='input input-bordered w-full xl:w-full'
        placeholder='Напишите исполнителя'
        bind:value={inputVal} />
    <!--{#if inputVal.length > 0 && filteredItems.length > 0}-->
        <ul
            tabindex='0'
            class='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-auto max-h-80 flex-nowrap overflow-auto'>
            {#each filteredItems as item}
                <li>
                    <a on:click|preventDefault={() => onItemClicked(item)}
                    >{item.name}</a>
                </li>
            {/each}
        </ul>
    <!--{/if}-->
</div>
