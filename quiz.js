(function () {
    'use strict';

    var quizData = {
        question: "Кто срежиссировал культовый фильм «Начало» (Inception)?",
        answers: [
            "Квентин Тарантино",
            "Кристофер Нолан",
            "Стивен Спилберг",
            "Джеймс Кэмерон"
        ],
        correctIndex: 1
    };

    function startQuizGate() {
        if (document.getElementById('lampa-quiz-gate')) return;

        var overlay = document.createElement('div');
        overlay.id = 'lampa-quiz-gate';
        
        // Стили оверлея
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.backgroundColor = '#141414';
        overlay.style.zIndex = '9999999';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.padding = '30px';
        overlay.style.boxSizing = 'border-box';
        overlay.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

        var card = document.createElement('div');
        card.style.maxWidth = '400px';
        card.style.width = '100%';
        card.style.textAlign = 'center';

        var lockIcon = document.createElement('div');
        lockIcon.innerHTML = '🔒';
        lockIcon.style.fontSize = '40px';
        lockIcon.style.marginBottom = '15px';
        card.appendChild(lockIcon);

        var title = document.createElement('h2');
        title.innerText = 'Интеллектуальный доступ';
        title.style.color = '#ffffff';
        title.style.margin = '0 0 10px 0';
        card.appendChild(title);

        var questionElement = document.createElement('div');
        questionElement.innerText = quizData.question;
        questionElement.style.color = '#ffffff';
        questionElement.style.fontSize = '18px';
        questionElement.style.fontWeight = '600';
        questionElement.style.marginBottom = '25px';
        card.appendChild(questionElement);

        var answersContainer = document.createElement('div');
        answersContainer.style.display = 'flex';
        answersContainer.style.flexDirection = 'column';
        answersContainer.style.gap = '12px';

        var buttonElements = [];
        var currentFocusIndex = 0; // Индекс кнопки, на которой сейчас фокус пульта

        // Функция обновления визуального фокуса (для ТВ)
        function updateFocus() {
            buttonElements.forEach(function (btn, idx) {
                if (idx === currentFocusIndex) {
                    btn.style.backgroundColor = '#ffffff';
                    btn.style.color = '#141414';
                    btn.style.borderColor = '#ffffff';
                    btn.style.transform = 'scale(1.03)';
                } else {
                    btn.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    btn.style.color = '#ffffff';
                    btn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    btn.style.transform = 'scale(1)';
                }
            });
        }

        // Проверка ответа
        function checkAnswer(index, btn) {
            if (index === quizData.correctIndex) {
                btn.style.backgroundColor = '#2ecc71';
                btn.style.color = '#ffffff';
                if (Lampa.Noty) Lampa.Noty.show('Доступ разрешен! 🍿');
                
                window.removeEventListener('keydown', handleKeyDown); // Отключаем пульт
                
                setTimeout(function () {
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.4s ease';
                    setTimeout(function () { overlay.remove(); }, 400);
                }, 600);
            } else {
                btn.style.backgroundColor = '#e74c3c';
                btn.style.color = '#ffffff';
                if (Lampa.Noty) Lampa.Noty.show('Неверно! 🚫');
                setTimeout(function () { updateFocus(); }, 1000);
            }
        }

        // Рендерим варианты
        quizData.answers.forEach(function (answerText, index) {
            var btn = document.createElement('button');
            btn.innerText = answerText;
            btn.style.width = '100%';
            btn.style.padding = '15px';
            btn.style.borderRadius = '12px';
            btn.style.fontSize = '16px';
            btn.style.fontWeight = '500';
            btn.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.2s ease';

            // Для айфона (нажатие пальцем)
            btn.addEventListener('click', function () {
                currentFocusIndex = index;
                checkAnswer(index, btn);
            });

            answersContainer.appendChild(btn);
            buttonElements.push(btn);
        });

        // Управление пультом (ТВ)
        function handleKeyDown(e) {
            // Предотвращаем стандартные действия Лампы на фоне
            e.preventDefault();
            e.stopPropagation();

            if (e.keyCode === 38 || e.key === 'ArrowUp') { // Стрелка ВВЕРХ
                currentFocusIndex = (currentFocusIndex - 1 + buttonElements.length) % buttonElements.length;
                updateFocus();
            } else if (e.keyCode === 40 || e.key === 'ArrowDown') { // Стрелка ВНИЗ
                currentFocusIndex = (currentFocusIndex + 1) % buttonElements.length;
                updateFocus();
            } else if (e.keyCode === 13 || e.key === 'Enter') { // Кнопка ОК / ENTER
                checkAnswer(currentFocusIndex, buttonElements[currentFocusIndex]);
            }
        }

        // Слушаем пульт
        window.addEventListener('keydown', handleKeyDown, true);

        card.appendChild(answersContainer);
        overlay.appendChild(card);
        document.body.appendChild(overlay);
        
        // Инициализируем первый фокус
        updateFocus();
    }

    var checkLampa = setInterval(function () {
        if (typeof Lampa !== 'undefined' && window.appready) {
            clearInterval(checkLampa);
            startQuizGate();
        }
    }, 300);
})();
