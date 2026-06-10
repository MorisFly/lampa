(function () {
    'use strict';

    try {
        function startPlugin() {
            try {
                if (typeof Lampa === 'undefined') return;

                // Уведомление срабатывает сразу
                if (Lampa.Noty) {
                    Lampa.Noty.show('Добро пожаловать! Плагин на iPhone работает идеально. 🎉');
                }

                // А добавление кнопки мы откладываем на 1 секунду, чтобы меню точно прогрузилось
                setTimeout(function() {
                    if (Lampa.Menu && typeof Lampa.Menu.add === 'function') {
                        Lampa.Menu.add({
                            id: 'welcome_plugin_button',
                            title: 'Приветствие 👋',
                            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
                            onSelect: function () {
                                if (Lampa.Noty) Lampa.Noty.show('Рад тебя видеть! Приятного просмотра. 🍿');
                            }
                        });
                    } else {
                        // Если меню не нашлось, айфон выдаст окно, и мы поймем почему
                        alert('Внимание: Меню Lampa еще не готово для добавления кнопки.');
                    }
                }, 1000);

            } catch (innerError) {
                alert('Сбой внутри: ' + innerError.message);
            }
        }

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
