<script>
    export let changePage
</script>

<header class="bg-base-100 py-2 top-0 z-50">
    <div class="container">
        <div class="navbar px-0">
            <div class="navbar-start">
                <button
                    type="button"
                    class="btn btn-ghost normal-case text-2xl"
                    on:click={() => changePage('home')}
                    >tonle
                </button>
            </div>
            <div class="navbar-end">
                <button type="button" class="btn" onclick="rules_1.showModal()">
                    Правила игры
                </button>
            </div>
        </div>
    </div>
</header>

<dialog id="rules_1" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box text-center">
        <form method="dialog">
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >✕
            </button>
        </form>
        <h3 class="text-lg font-bold">Отгадай исполнителя за 10 попыток.</h3>
        <p class="py-4">
            Каждая попытка раскрывает характеристики загаданного исполнителя или
            группы. Цвет плашек будет меняться, показывая, насколько близка ваша
            догадка.
        </p>
        <div class="flex flex-col gap-5 mt-2 px-5">
            <div class="">
                <div class="text-xl">Дебютный альбом</div>
                <div class="flex text-sm flex-col justify-center items-center">
                    Год выхода дебютного альбома артиста. Если у артиста нет
                    альбомов, то первый микстейп или EP.
                    <div
                        class="flex flex-row items-center justify-center gap-3 mt-3 mb-3">
                        <button class="btn btn-sm">Неправильно</button>

                        <button class="btn btn-sm btn-accent"
                            >В пределах 5 лет
                        </button>

                        <button class="btn btn-sm btn-success"
                            >Правильно
                        </button>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="text-xl">Участники</div>
                <div class="flex text-sm flex-col justify-center items-center">
                    Количество участников в группе. Если количество участников
                    менялось, будет указан самый известный состав.
                    <div
                        class="flex flex-row items-center justify-center gap-3 mt-3 mb-3">
                        <button class="btn btn-sm">Неправильно</button>
                        <button class="btn btn-sm btn-success"
                            >Правильно
                        </button>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="text-xl">Популярность</div>
                <div class="flex text-sm flex-col justify-center items-center">
                    Насколько популярен исполнитель по сравнению с другими по
                    количеству слушателей.
                    <div
                        class="flex flex-row items-center justify-center gap-3 mt-3 mb-3">
                        <button class="btn btn-sm">Неправильно</button>

                        <button class="btn btn-sm btn-accent"
                            >В пределах 50 мест
                        </button>

                        <button class="btn btn-sm btn-success"
                            >Правильно
                        </button>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="text-xl">Пол</div>
                <div class="flex text-sm flex-col justify-center items-center">
                    Пол артиста. Если это группа с мужчинами и женщинами, будет
                    указано "Смешанный".
                    <div
                        class="flex flex-row items-center justify-center gap-3 mt-3 mb-3">
                        <button class="btn btn-sm">Неправильно</button>

                        <button class="btn btn-sm btn-success"
                            >Правильно
                        </button>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="text-xl">Жанр</div>
                <div class="flex text-sm flex-col justify-center items-center">
                    Жанры исполнителя. Есть следующие варианты: поп, рок, рэп,
                    электроника, шансон, инди, классическая, народная.
                    <div
                        class="flex flex-row items-center justify-center gap-3 mt-3 mb-3">
                        <button class="btn btn-sm">Неправильно</button>

                        <button class="btn btn-sm btn-success"
                            >Правильно
                        </button>
                    </div>
                </div>
            </div>
            <div class="">
                <div class="text-xl">Страна</div>
                <div class="flex text-sm flex-col justify-center items-center">
                    Национальность исполнителя.
                    <div
                        class="flex flex-row items-center justify-center gap-3 mt-3 mb-3">
                        <button class="btn btn-sm">Неправильно</button>

                        <button class="btn btn-sm btn-success"
                            >Правильно
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</dialog>
