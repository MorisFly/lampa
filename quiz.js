(function () {
    'use strict';

    // НАСТРОЙКА ВИКТОРИНЫ: Ты можешь менять текст прямо здесь!
    var quizData = {
        question: "Кто срежиссировал культовый фильм «Начало» (Inception)?",
        answers: [
            "Квентин Тарантино",
            "Кристофер Нолан",
            "Стивен Спилберг",
            "Джеймс Кэмерон"
        ],
        correctIndex: 1 // Индекс правильного ответа (0 — первый, 1 — второй, 2 — третий и т.д.)
    };

    function startQuizGate() {
        // Защита от повторного создания
        if (document.getElementById('lampa-quiz-gate')) return;

        // 1. Создаем полноэкранный блокировщик
        var overlay = document.createElement('div');
        overlay.id = 'lampa-quiz-gate';
        
        // Стилизуем стену под дизайн Лампы
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = '#141414'; // Фирменный темный цвет
        overlay.style.zIndex = '9999999'; // Максимальный слой: перекроет ВСЁ
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.padding = '30px';
        overlay.style.boxSizing = 'border-box';
        overlay.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

        // 2. Контейнер для карточки с вопросом
        var card = document.createElement('div');
        card.style.maxWidth = '400px';
        card.style.width = '100%';
        card.style.textAlign = 'center';

        // Иконка замка
        var lockIcon = document.createElement('div');
        lockIcon.innerHTML = '🔒';
        lockIcon.style.fontSize = '40px';
        lockIcon.style.marginBottom = '15px';
        card.appendChild(lockIcon);

        // Заголовок
        var title = document.createElement('h2');
        title.innerText = 'Интеллектуальный доступ';
        title.style.color = '#ffffff';
        title.style.margin = '0 0 10px 0';
        title.style.fontSize = '22px';
        card.appendChild(title);

        // Подзаголовок
        var subtitle = document.createElement('p');
        subtitle.innerText = 'Ответьте правильно, чтобы разблокировать Лампу:';
        subtitle.style.color = '#a0a0a0';
        subtitle.style.fontSize = '14px';
        subtitle.style.margin = '0 0 30px 0';
        card.appendChild(subtitle);

        // Сам вопрос
        var questionElement = document.createElement('div');
        questionElement.innerText = quizData.question;
        questionElement.style.color = '#ffffff';
        questionElement.style.fontSize = '18px';
        questionElement.style.fontWeight = '600';
        questionElement.style.marginBottom = '25px';
        questionElement.style.lineHeight = '1.4';
        card.appendChild(questionElement);

        // Контейнер для вариантов ответов
        var answersContainer = document.createElement('div');
        answersContainer.style.display = 'flex';
        answersContainer.style.flexDirection = 'column';
        answersContainer.style.gap = '12px';
        answersContainer.style.width = '100%';

        // Рендерим кнопки ответов
        quizData.answers.forEach(function (answerText, index) {
            var btn = document.createElement('button');
            btn.innerText = answerText;
            btn.style.width = '100%';
            btn.style.padding = '15px';
            btn.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            btn.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            btn.style.borderRadius = '12px';
            btn.style.color = '#ffffff';
            btn.style.fontSize = '16px';
            btn.style.fontWeight = '500';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.2s ease';
            btn.style.webkitTapHighlightColor = 'transparent';

            // Обработка клика по ответу
            btn.addEventListener('click', function () {
                if (index === quizData.correctIndex) {
                    // ПРАВИЛЬНО!
                    btn.style.backgroundColor = '#2ecc71'; // Зеленеет
                    btn.style.borderColor = '#2ecc71';
                    if (Lampa.Noty) Lampa.Noty.show('Доступ разрешен! Приятного просмотра. 🍿');
                    
                    // Красиво убираем стену через полсекунды
                    setTimeout(function () {
                        overlay.style.opacity = '0';
                        overlay.style.transition = 'opacity 0.4s ease';
                        setTimeout(function () {
                            overlay.remove();
                        }, 400);
                    }, 600);
                } else {
                    // НЕПРАВИЛЬНО
                    btn.style.backgroundColor = '#e74c3c'; // Краснеет
                    btn.style.borderColor = '#e74c3c';
                    if (Lampa.Noty) Lampa.Noty.show('Неверно! Лампа остается заблокированной. 🚫');
                    
                    // Возвращаем исходный цвет кнопке через секунду, давая шанс исправиться
                    setTimeout(function () {
                        btn.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                        btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }, 1000);
                }
            });

            answersContainer.appendChild(btn);
        });

        card.appendChild(answersContainer);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
    }

    // Запуск строго при готовности приложения
    var checkLampa = setInterval(function () {
        if (typeof Lampa !== 'undefined' && window.appready) {
            clearInterval(checkLampa);
            startQuizGate();
        }
    }, 300);
})();
