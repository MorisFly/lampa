(function () {
    'use strict';

    function startPlugin() {
        try {
            // Раз мы зашли сюда, значит Lampa.Menu уже гарантированно существует и готово к работе

            // 1. Показываем приветствие
            if (Lampa.Noty) {
                Lampa.Noty.show('Добро пожаловать! Плагин на iPhone работает идеально. 🎉');
            }

            // 2. Добавляем кнопку в меню
            Lampa.Menu.add({
                id: 'welcome_plugin_button',
                title: 'Приветствие 👋',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
                onSelect: function () {
                    if (Lampa.Noty) Lampa.Noty.show('Рад тебя видеть! Приятного просмотра. 🍿');
                }
            });

        } catch (error) {
            alert('Ошибка внутри плагина: ' + error.message);
        }
    }

    // Железобетонная проверка: ждем, пока прогрузится и ядро, и само Меню
    var checkLampaReady = setInterval(function() {
        if (typeof Lampa !== 'undefined' && Lampa.Menu && typeof Lampa.Menu.add === 'function' && window.appready) {
            clearInterval(checkLampaReady); // Останавливаем проверку
            startPlugin(); // Запускаем плагин
        }
    }, 200); // Проверяем каждые 200 миллисекунд (это быстро и незаметно для процессора)
})();
