(function () {
    'use strict';

    function startPlugin() {
        // 1. БАННЕР — запускаем сразу, он проверен и точно работает
        try {
            if (typeof Lampa !== 'undefined' && Lampa.Noty) {
                Lampa.Noty.show('Добро пожаловать! Плагин снова в строю. 🎉');
            }
        } catch (e) {
            console.log('Ошибка баннера:', e);
        }

        // 2. КНОПКА МЕНЮ — пытаемся добавить аккуратно
        function tryAddButton() {
            if (Lampa.Menu && typeof Lampa.Menu.add === 'function') {
                Lampa.Menu.add({
                    id: 'welcome_plugin_button',
                    title: 'Приветствие 👋',
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
                    onSelect: function () {
                        if (Lampa.Noty) Lampa.Noty.show('Рад тебя видеть! Приятного просмотра. 🍿');
                    }
                });
                return true;
            }
            return false;
        }

        try {
            // Пробуем добавить кнопку сразу
            if (!tryAddButton()) {
                // Если не вышло, делаем еще одну попытку через 2 секунды (специально для профилей CUB)
                setTimeout(function() {
                    if (!tryAddButton()) {
                        // Если и так не вышло, покажем безопасное окно с подсказкой для нас
                        var menuType = typeof Lampa.Menu;
                        var hasAdd = Lampa.Menu ? typeof Lampa.Menu.add : 'none';
                        alert('Диагностика: Меню имеет тип ' + menuType + ', метод add: ' + hasAdd);
                    }
                }, 2000);
            }
        } catch (menuError) {
            alert('Сбой меню: ' + menuError.message);
        }
    }

    // Возвращаем старый проверенный таймер, который запускает баннер без задержек
    var checkLampa = setInterval(function() {
        if (typeof Lampa !== 'undefined' && window.appready) {
            clearInterval(checkLampa);
            startPlugin();
        }
    }, 300);
})();
