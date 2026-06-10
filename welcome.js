(function () {
    'use strict';

    function startPlugin() {
        // 1. Наш проверенный баннер — пусть радует глаз при старте
        if (Lampa.Noty) {
            Lampa.Noty.show('Добро пожаловать! Плагин успешно настроен под iPhone. 🎉');
        }

        // 2. Добавляем кнопку в Настройки (шестеренка внизу справа)
        try {
            if (Lampa.Settings && typeof Lampa.Settings.add === 'function') {
                Lampa.Settings.add({
                    title: 'Приветствие 👋',
                    type: 'click',
                    name: 'welcome_plugin_mobile',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
                    onSelect: function () {
                        if (Lampa.Noty) {
                            Lampa.Noty.show('Рад тебя видеть! Приятного просмотра. 🍿');
                        }
                    }
                });
            }
        } catch (e) {
            console.log('Не удалось добавить кнопку в настройки:', e);
        }
    }

    // Проверенный таймер запуска
    var checkLampa = setInterval(function() {
        if (typeof Lampa !== 'undefined' && window.appready) {
            clearInterval(checkLampa);
            startPlugin();
        }
    }, 300);
})();
