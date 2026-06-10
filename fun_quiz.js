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
        card.style.maxWidth = '480px';
        card.style.width = '100%';
        card.style.textAlign = 'center';
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        // Состояния квиза
        var currentStep = 0;
        var buttonElements = [];
        var currentFocusIndex = 0;
        var isTransitioning = false; // Блокировка спам-кликов во время анимаций

        // Функция обновления фокуса пульта/клавиатуры
        function updateFocus() {
            buttonElements.forEach(function (btn, idx) {
                var isFocused = (idx === currentFocusIndex);
                if (btn.isLink) {
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
                    if (btn.isCorrectHighlight) return;

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
            btn.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            btn.style.color = '#ffffff';
            btn.style.webkitTapHighlightColor = 'transparent';

            btn.addEventListener('click', function (e) {
                e.preventDefault();
                if (isTransitioning) return;
                onClick(btn);
            });
            return btn;
        }

        // Движок шагов
        function renderStep(step) {
            currentStep = step;
            card.innerHTML = ''; 
            buttonElements = [];
            currentFocusIndex = 0; 
            isTransitioning = false;

            var title = document.createElement('h2');
            title.style.color = '#ffffff';
            title.style.fontSize = '22px';
            title.style.fontWeight = '600';
            title.style.marginBottom = '30px';
            title.style.lineHeight = '1.4';

            var btnsContainer = document.createElement('div');
            btnsContainer.style.display = 'flex';
            btnsContainer.style.flexDirection = 'column';
            btnsContainer.style.gap = '12px';

            // ШАГ 0: Старт
            if (step === 0) {
                title.innerText = 'Докажи ка, что ты не гей! Осилишь?! 😁';
                var btnStart = createButton('Попробую', function () {
                    renderStep(1);
                });
                btnsContainer.appendChild(btnStart);
                buttonElements.push(btnStart);
            }
            // ШАГ 1: Проверка
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
            // ШАГ 2: Экран изгнания (Исправлен QR и Выход)
            else if (step === 2) {
                title.innerText = 'Ну и проваливай нахуй отсюда!';
                var btnExit = createButton('Выйти из Lampa', function () {
                    // 1. Родной метод Lampa (если прописан в платформе)
                    if (typeof Lampa !== 'undefined' && Lampa.Platform && typeof Lampa.Platform.exit === 'function') {
                        try { Lampa.Platform.exit(); } catch(e) {}
                    }
                    // 2. Для различных Android APK оберток (официальных и кастомных)
                    if (window.Android && typeof window.Android.exit === 'function') {
                        try { window.Android.exit(); } catch(e) {}
                    }
                    if (window.LampaApp && typeof window.LampaApp.exit === 'function') {
                        try { window.LampaApp.exit(); } catch(e) {}
                    }
                    // 3. Для Cordova/PhoneGap сред (частые обертки под ТВ)
                    if (navigator.app && typeof navigator.app.exitApp === 'function') {
                        try { navigator.app.exitApp(); } catch(e) {}
                    }
                    // 4. Для Samsung Tizen Smart TV
                    if (window.tizen && window.tizen.application) {
                        try { window.tizen.application.getCurrentApplication().exit(); } catch(e) {}
                    }
                    // 5. Для LG webOS Smart TV
                    if (window.webOS && window.webOS.platformBack) {
                        try { window.webOS.platformBack(); } catch(e) {}
                    }
                    // 6. Универсальный фоллбек для браузеров / MSX
                    try {
                        window.location.href = 'about:blank';
                        window.close();
                    } catch(e) {}
                });
                btnsContainer.appendChild(btnExit);
                buttonElements.push(btnExit);

                var textBlock = document.createElement('div');
                textBlock.style.color = '#a0a0a0';
                textBlock.style.fontSize = '16px';
                textBlock.style.marginTop = '25px';
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
                link.isLink = true;
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    window.open('https://www.ivi.ru', '_blank');
                });
                textBlock.appendChild(link);
                textBlock.appendChild(document.createTextNode('.'));
                btnsContainer.appendChild(textBlock);
                buttonElements.push(link);

                // Динамическая генерация QR-кода без зависимостей от GitHub
                var qrContainer = document.createElement('div');
                qrContainer.style.marginTop = '20px';
                var qrImg = document.createElement('img');
                qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent('https://www.ivi.ru');
                qrImg.style.width = '200px';
                qrImg.style.height = '200px';
                qrImg.style.borderRadius = '12px';
                qrImg.style.border = '6px solid #ffffff';
                qrImg.style.boxShadow = '0 6px 25px rgba(0,0,0,0.5)';
                qrContainer.appendChild(qrImg);
                btnsContainer.appendChild(qrContainer);
            }
            // ШАГ 3: Проверка на понт
            else if (step === 3) {
                title.innerText = 'Думал, просто нажмёшь НЕТ и всё? Кого ты пытаешься наебать?! Сейчас мы тебя проверим.';
                var btnBlyaa = createButton('Бляяя…', function () {
                    renderStep(4);
                });
                btnsContainer.appendChild(btnBlyaa);
                buttonElements.push(btnBlyaa);
            }
            // ШАГ 4: Прорыв Сперанского
            else if (step === 4) {
                title.innerText = 'Что такое Прорыв Сперанского?';
                
                var handleSperanskyClick = function (clickedBtn) {
                    isTransitioning = true;
                    clickedBtn.isCorrectHighlight = true;
                    clickedBtn.style.backgroundColor = '#2ecc71';
                    clickedBtn.style.borderColor = '#2ecc71';
                    clickedBtn.style.color = '#ffffff';
                    clickedBtn.style.transform = 'scale(1.05)';
                    
                    setTimeout(function () {
                        renderStep(5);
                    }, 800);
                };

                var btnRef = createButton('Реформы XIX века', handleSperanskyClick);
                var btnEggs = createButton('Удар по яйцам', handleSperanskyClick);
                
                btnsContainer.appendChild(btnRef);
                btnsContainer.appendChild(btnEggs);
                buttonElements.push(btnRef, btnEggs);
            }
            // ШАГ 5: Переход дальше
            else if (step === 5) {
                title.innerText = 'Это была разминка. А теперь перейдём к делу, капишь?';
                var btnLetsGo = createButton('Погнали!', function () {
                    renderStep(6);
                });
                var btnImGay = createButton('Нахуй это всё, я гей!', function () {
                    renderStep(2);
                });
                
                btnsContainer.appendChild(btnLetsGo);
                btnsContainer.appendChild(btnImGay);
                buttonElements.push(btnLetsGo, btnImGay); 
            }
            // ШАГ 6: Сабёрбан
            else if (step === 6) {
                title.innerText = 'Commendatore, моё почтение! Я же знаю, что ты зашёл сюда, чтобы посмотреть Клан Сопрано. Ответь тогда на такой вопрос: Какой автомобиль был у Тони в первом сезоне сериала?';
                
                var btnTahoe = createButton('Chevrolet Tahoe', function () { renderStep(2); });
                var btnSuburban = createButton('Chevrolet Suburban', function (clickedBtn) {
                    isTransitioning = true;
                    clickedBtn.isCorrectHighlight = true;
                    clickedBtn.style.backgroundColor = '#2ecc71';
                    clickedBtn.style.borderColor = '#2ecc71';
                    clickedBtn.style.color = '#ffffff';
                    setTimeout(function () {
                        renderStep(7);
                    }, 800);
                });
                var btnEscalade = createButton('Cadillac Escalade', function () { renderStep(2); });
                var btnYukon = createButton('GMC Yukon', function () { renderStep(2); });

                btnsContainer.appendChild(btnTahoe);
                btnsContainer.appendChild(btnSuburban);
                btnsContainer.appendChild(btnEscalade);
                btnsContainer.appendChild(btnYukon);
                
                buttonElements.push(btnTahoe, btnSuburban, btnEscalade, btnYukon);
            }
            // ШАГ 7: Финал
            else if (step === 7) {
                title.innerText = 'Поздравляю! Ты достоин! Добро пожаловать! 🎉';
                var btnBadaBing = createButton('Вход в Bada Bing!', function () {
                    window.removeEventListener('keydown', handleKeyDown, true);
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.4s ease';
                    setTimeout(function () {
                        overlay.remove();
                    }, 400);
                });
                btnsContainer.appendChild(btnBadaBing);
                buttonElements.push(btnBadaBing);
            }

            card.appendChild(title);
            card.appendChild(btnsContainer);
            updateFocus();
        }

        // Обработка пульта / клавиатуры
        function handleKeyDown(e) {
            var keys = [38, 40, 13];
            var isNavKey = keys.indexOf(e.keyCode) > -1 || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter';

            if (isNavKey) {
                e.preventDefault();
                e.stopPropagation();
            }

            if (isTransitioning || !isNavKey) return; 

            if (e.keyCode === 38 || e.key === 'ArrowUp') { 
                currentFocusIndex = (currentFocusIndex - 1 + buttonElements.length) % buttonElements.length;
                updateFocus();
            } else if (e.keyCode === 40 || e.key === 'ArrowDown') { 
                currentFocusIndex = (currentFocusIndex + 1) % buttonElements.length;
                updateFocus();
            } else if (e.keyCode === 13 || e.key === 'Enter') { 
                if (buttonElements[currentFocusIndex]) {
                    buttonElements[currentFocusIndex].click();
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown, true);
        renderStep(0);
    }

    var checkLampa = setInterval(function () {
        if (typeof Lampa !== 'undefined' && window.appready) {
            clearInterval(checkLampa);
            startJokeGate();
        }
    }, 300);
})();
