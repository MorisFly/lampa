(function () {
    'use strict';

    try {
        function startPlugin() {
            try {
                // Если Лампа еще не создалась, мягко выходим, не вызывая ошибку
                if (typeof Lampa === 'undefined') return;

                // Проверяем, готова ли система уведомлений
                if (Lampa.Noty) {
                    Lampa.Noty.show('Добро пожаловать! Плагин на iPhone работает идеально. 🎉');
                }

                // Проверяем, готово ли меню, прежде чем добавлять кнопку
                if (Lampa.Menu && typeof Lampa.Menu.add === 'function') {
                    Lampa.Menu.add({
                        id: 'welcome_plugin_button',
                        title: 'Приветствие 👋',
                        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
                        onSelect: function () {
                            if (Lampa.Noty) Lampa.Noty.show('Рад тебя видеть! Приятного просмотра. 🍿');
                        }
                    });
                }
            } catch (innerError) {
                // Если что-то пойдет не так внутри, мы увидим текст, а не "Script error"
                alert('Сбой внутри плагина: ' + innerError.message);
            }
        }

        // Проверяем готовность приложения
        if (window.appready) {
            startPlugin();
        } else {
            var checkLampa = setInterval(function() {
                if (typeof Lampa !== 'undefined' && window.appready) {
                    clearInterval(checkLampa);
                    startPlugin();
                }
            }, 500);
        }

    } catch (globalError) {
        alert('Глобальный сбой: ' + globalError.message);
    }
})();
