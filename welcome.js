(function () {
    'use strict';

    function startPlugin() {
        // 1. Стартовый баннер (он работает через ядро уведомлений, тут всё супер)
        if (Lampa.Noty) {
            Lampa.Noty.show('Добро пожаловать! Плагин успешно обошел ограничения CUB. 🚀');
        }

        // 2. Внедряем свою плавающую кнопку напрямую в интерфейс айфона
        try {
            // Проверяем, чтобы кнопка не создалась дважды
            if (document.getElementById('lampa-custom-pwa-button')) return;

            // Создаем HTML-элемент кнопки
            var button = document.createElement('div');
            button.id = 'lampa-custom-pwa-button';
            
            // Стильная кастомизация под темную тему iOS/Lampa с эффектом размытия заднего плана
            button.style.position = 'fixed';
            button.style.bottom = '90px'; // Высота調整, чтобы кнопка была прямо над нижней панелью
            button.style.right = '20px';
            button.style.width = '55px';
            button.style.height = '55px';
            button.style.backgroundColor = 'rgba(20, 20, 20, 0.75)';
            button.style.backdropFilter = 'blur(15px)';
            button.style.webkitBackdropFilter = 'blur(15px)'; // Поддержка Safari/iOS
            button.style.borderRadius = '50%';
            button.style.border = '1px solid rgba(255, 255, 255, 0.15)';
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
            button.style.zIndex = '999999'; // Поднимаем на самый верхний слой, поверх всех меню
            button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
            button.style.fontSize = '26px';
            button.style.cursor = 'pointer';
            button.style.transition = 'transform 0.1s ease';

            // Иконка попкорна внутри
            button.innerHTML = '🍿';

            // Эффект микро-нажатия для тактильного отклика на смартфоне
            button.addEventListener('touchstart', function() {
                button.style.transform = 'scale(0.9)';
            });
            button.addEventListener('touchend', function() {
                button.style.transform = 'scale(1)';
            });

            // Главное действие при нажатии на кнопку
            button.addEventListener('click', function (e) {
                e.preventDefault();
                if (Lampa.Noty) {
                    Lampa.Noty.show('Ура! Наш собственный плагин полностью интерактивен! 🎬🍿🎉');
                }
            });

            // Физически добавляем кнопку на экран айфона
            document.body.appendChild(button);

        } catch (domError) {
            console.log('Не удалось внедрить HTML-кнопку:', domError);
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
