<script>
    import { onMount } from 'svelte'
    const themes = ['dracula', 'light']
    let currentTheme = 'dracula'

    let checked

    onMount(() => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme === 'light') {
            checked = true
        } else if (savedTheme === 'dracula') {
            checked = false
        }
        if (savedTheme && themes.includes(savedTheme)) {
            currentTheme = savedTheme
            document.documentElement.setAttribute('data-theme', currentTheme)
        } else {
            document.documentElement.setAttribute('data-theme', currentTheme)
        }
    })

    // Функция для смены темы
    function toggleTheme() {
        currentTheme = currentTheme === 'dracula' ? 'light' : 'dracula'
        document.documentElement.setAttribute('data-theme', currentTheme)
        localStorage.setItem('theme', currentTheme)
    }
</script>

<input type="checkbox" class="toggle" on:click={toggleTheme} {checked} />
