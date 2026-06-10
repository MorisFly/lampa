(function () {
    'use strict';

    function startPlugin() {
        // Баннер работает железно — оставляем
        if (Lampa.Noty) {
            Lampa.Noty.show('Добро пожаловать! Связь с плагином стабильна. 🎉');
        }

        // Включаем сканер панели настроек
        try {
            var settingsType = typeof Lampa.Settings;
            var addMethodType = Lampa.Settings ? typeof Lampa.Settings.add : 'none';
            
            // Выводим диагностическое окно
            alert('Сканирование настроек:\nПанель Settings: ' + settingsType + '\nМетод add: ' + addMethodType);

            // Если метод всё-таки существует, принудительно создаем кнопку
            if (Lampa.Settings && typeof Lampa.Settings.add === 'function') {
                Lampa.Settings.add({
                    title: 'Приветствие 👋',
                    type: 'click',
                    name: 'welcome_plugin_mobile',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>',
                    onSelect: function () {
                        if (Lampa.Noty) Lampa.Noty.show('Рад тебя видеть! 🍿');
                    }
                });
            }
        } catch (e) {
            alert('Сбой сканера: ' + e.message);
        }
    }

    var checkLampa = setInterval(function() {
        if (typeof Lampa !== 'undefined' && window.appready) {
            clearInterval(checkLampa);
            startPlugin();
        }
    }, 300);
})();
