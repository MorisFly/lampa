(function () {
    'use strict';

    function startJokeGate() {
        if (document.getElementById('lampa-joke-gate')) return;

        // 1. Полноэкранный блокирующий слой
        var overlay = document.createElement('div');
        overlay.id = 'lampa-joke-gate';
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
        card.style.maxWidth = '450px';
        card.style.width = '100%';
        card.style.textAlign = 'center';
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Переменные для контроля шагов и ТВ-пульта
        var currentStep = 0;
        var buttonElements = [];
        var currentFocusIndex = 0;

        // Функция обновления фокуса (подсветка кнопок и ссылок для ТВ)
        function updateFocus() {
            buttonElements.forEach(function (btn, idx) {
                var isFocused = (idx === currentFocusIndex);
                if (btn.isLink) {
                    // Специальный стиль фокуса для текстовой ссылки «сюда»
                    if (isFocused) {
                        btn.style.color = '#ffffff';
                        btn.style.fontWeight = '700';
                        btn.style.transform = 'scale(1.1)';
                    } else {
                        btn.style.color = '#3498db';
                        btn.style.fontWeight = '500';
                        btn.style.transform = 'scale(1)';
                    }
                } else {
                    // Стандартный стиль фокуса для блочных кнопок
                    if (isFocused) {
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
                }
            });
        }

        // Вспомогательная функция для создания кнопок
        function createButton(text, onClick) {
            var btn = document.createElement('button');
            btn.innerText = text;
            btn.style.width = '100%';
            btn.style.padding = '15px';
            btn.style.borderRadius = '12px';
            btn.style.fontSize = '16px';
            btn.style.fontWeight = '500';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.2s ease';
            btn.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            btn.style.webkitTapHighlightColor = 'transparent';

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                onClick();
            });
            return btn;
        }

        // Главный движок шагов квиза
        function renderStep(step) {
            currentStep = step;
            card.innerHTML = ''; // Очищаем предыдущий шаг
            buttonElements = [];
            currentFocusIndex = 0; // Сбрасываем фокус на первую кнопку нового шага

            // Заголовок шага
            var title = document.createElement('h2');
            title.style.color = '#ffffff';
            title.style.fontSize = '22px';
            title.style.fontWeight = '600';
            title.style.marginBottom = '30px';
            title.style.lineHeight = '1.4';

            // Контейнер для кнопок
            var btnsContainer = document.createElement('div');
            btnsContainer.style.display = 'flex';
            btnsContainer.style.flexDirection = 'column';
            btnsContainer.style.gap = '12px';

            // ШАГ 0: Приветствие
            if (step === 0) {
                title.innerText = 'Докажи ка, что ты не гей! Осилишь?! 😁';
                
                var btnStart = createButton('Попробую', function () {
                    renderStep(1);
                });
                btnsContainer.appendChild(btnStart);
                buttonElements.push(btnStart);
            }
            // ШАГ 1: Главный вопрос
            else if (step === 1) {
                title.innerText = 'Итак, ты гей?';
                
                var btnYes = createButton('ДА', function () {
                    renderStep(2);
                });
                var btnNo = createButton('НЕТ', function () {
                    renderStep(3);
                });
                
                btnsContainer.appendChild(btnYes);
                btnsContainer.appendChild(btnNo);
                buttonElements.push(btnYes, btnNo);
            }
            // ШАГ 2: Выход (выбран ДА)
            else if (step === 2) {
                title.innerText = 'Ну и проваливай нахуй отсюда!';
                
                var btnExit = createButton('Выйти из Lampa', function () {
                    // Пытаемся закрыть приложение всеми доступными способами платформ
                    if (typeof Lampa !== 'undefined' && Lampa.Platform && typeof Lampa.Platform.exit === 'function') {
                        Lampa.Platform.exit();
                    } else if (window.tizen) {
                        window.tizen.application.getCurrentApplication().exit();
                    } else if (window.webOS && window.webOS.platformBack) {
                        window.webOS.platformBack();
                    } else {
                        // Для ПК/смартфонов перенаправляем на пустую страницу и закрываем вкладку
                        window.location.href = 'about:blank';
                        window.close();
                    }
                });
                btnsContainer.appendChild(btnExit);
                buttonElements.push(btnExit);

                // Добавляем блок текста: «Или тебе сюда.»
                var textBlock = document.createElement('div');
                textBlock.style.color = '#a0a0a0';
                textBlock.style.fontSize = '16px';
                textBlock.style.marginTop = '25px';
                textBlock.style.display = 'block';
                textBlock.appendChild(document.createTextNode('Или тебе '));

                var link = document.createElement('a');
                link.href = 'https://www.ivi.ru';
                link.target = '_blank';
                link.innerText = 'сюда';
                link.style.color = '#3498db';
                link.style.textDecoration = 'underline';
                link.style.cursor = 'pointer';
                link.style.display = 'inline-block';
                link.style.transition = 'all 0.2s ease';
                link.isLink = true; // Маркер для функции подсветки updateFocus

                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    window.open('https://www.ivi.ru', '_blank');
                });

                textBlock.appendChild(link);
                textBlock.appendChild(document.createTextNode('.'));
                btnsContainer.appendChild(textBlock);
                buttonElements.push(link); // Добавляем ссылку в пульт управления

                // Добавляем QR-код ниже
                var qrContainer = document.createElement('div');
                qrContainer.style.marginTop = '20px';
                qrContainer.style.display = 'block';

                var qrImg = document.createElement('img');
                // Генерируем контрастный QR-код (220х220) со ссылкой на ivi.ru
                qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https%3A%2F%2Fwww.ivi.ru';
                qrImg.style.width = '220px';
                qrImg.style.height = '220px';
                qrImg.style.borderRadius = '12px';
                qrImg.style.border = '6px solid #ffffff'; // Белая рамка для беспроблемного сканирования камерой с ТВ
                qrImg.style.boxShadow = '0 6px 25px rgba(0,0,0,0.6)';
                qrImg.style.display = 'inline-block';

                qrContainer.appendChild(qrImg);
                btnsContainer.appendChild(qrContainer);
            }
            // ШАГ 3: Успешный вход (выбран НЕТ)
            else if (step === 3) {
                title.innerText = 'Да? В Пентагоне считают иначе. Ладно, заходи. Но я слежу за тобой!';
                
                var btnEnter = createButton('Вход для натуралов', function () {
                    // Отключаем перехват кнопок пульта
                    window.removeEventListener('keydown', handleKeyDown, true);
                    
                    // Эффект красивого исчезновения
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.4s ease';
                    setTimeout(function () {
                        overlay.remove();
                    }, 400);
                });
                btnsContainer.appendChild(btnEnter);
                buttonElements.push(btnEnter);
            }

            card.appendChild(title);
            card.appendChild(btnsContainer);
            updateFocus(); // Принудительно подсвечиваем активный элемент
        }

        // Обработчик нажатий пульта (ТВ)
        function handleKeyDown(e) {
            e.preventDefault();
            e.stopPropagation();

            if (e.keyCode === 38 || e.key === 'ArrowUp') { // Нажатие ВВЕРХ
                currentFocusIndex = (currentFocusIndex - 1 + buttonElements.length) % buttonElements.length;
                updateFocus();
            } else if (e.keyCode === 40 || e.key === 'ArrowDown') { // Нажатие ВНИЗ
                currentFocusIndex = (currentFocusIndex + 1) % buttonElements.length;
                updateFocus();
            } else if (e.keyCode === 13 || e.key === 'Enter') { // Нажатие ОК
                if (buttonElements[currentFocusIndex]) {
                    buttonElements[currentFocusIndex].click();
                }
            }
        }

        // Перехватываем управление пультом на самом верхнем уровне
        window.addEventListener('keydown', handleKeyDown, true);

        // Инициализируем стартовый шаг
        renderStep(0);
    }

    var checkLampa = setInterval(function () {
        if (typeof Lampa !== 'undefined' && window.appready) {
            clearInterval(checkLampa);
            startJokeGate();
        }
    }, 300);
})();
