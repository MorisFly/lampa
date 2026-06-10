(function () {
    'use strict';
    function startPlugin() {
        if (typeof Lampa !== 'undefined') {
            Lampa.Noty.show('Добро пожаловать! Плагин на iPhone работает идеально. 🎉');
            Lampa.Menu.add({
                id: 'welcome_plugin_button',
                title: 'Приветствие 👋',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
                onSelect: function () {
                    Lampa.Noty.show('Рад тебя видеть! Приятного просмотра. 🍿');
                }
            });
        }
    }
    var checkLampa = setInterval(function() {
        if (typeof Lampa !== 'undefined' && window.appready) {
            clearInterval(checkLampa);
            startPlugin();
        }
    }, 500);
})();
