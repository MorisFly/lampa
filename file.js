(function () {
    'use strict';

    // ==========================================
    // БАЗА ДАННЫХ ВОПРОСОВ
    // ==========================================
    const QUESTIONS_BASE = [
        // --- Теория большого взрыва ---
        { show: 'tbbt', difficulty: 'easy', question: 'На каком музыкальном инструменте играет Шелдон Купер в моменты стресса?', answers: ['Терменвокс', 'Арфа', 'Флейта', 'Барабаны'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Какая профессия у Пенни в первых сезонах?', answers: ['Актриса', 'Официантка Cheesecake Factory', 'Ученый', 'Фармацевт'], correct: 1 },
        { show: 'tbbt', difficulty: 'medium', question: 'В каком университете работают главные герои?', answers: ['Гарвард', 'Стэнфорд', 'Калтех (Caltech)', 'МТИ (MIT)'], correct: 2 },
        { show: 'tbbt', difficulty: 'hard', question: 'Какое отчество у Шелдона Купера?', answers: ['Ли', 'Линус', 'Корнелиус', 'Франклин'], correct: 0 },
        { show: 'tbbt', difficulty: 'nerd', question: 'Какое число Шелдон считает идеальным?', answers: ['42', '73', '0', '13'], correct: 1 },

        // --- Офис ---
        { show: 'office', difficulty: 'easy', question: 'Как называется компания, в которой работают герои сериала?', answers: ['Dunder Mifflin', 'Initech', 'Sabre', 'Paper Co.'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кем Майкл Скотт приходится сотрудникам?', answers: ['Региональным менеджером', 'Бухгалтером', 'Секретарем', 'Владельцем здания'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'В какой предмет Джим запек степлер Дуайта в пилотной серии?', answers: ['В торт', 'В бетон', 'В желе', 'В лед'], correct: 2 },
        { show: 'office', difficulty: 'hard', question: 'Какое второе имя у Майкла Скотта?', answers: ['Гэри', 'Джордж', 'Эдвард', 'Чарльз'], correct: 0 },
        { show: 'office', difficulty: 'nerd', question: 'Как назывался недописанный боевик Майкла Скотта?', answers: ['Уровень тревоги: Полночь', 'Смертельное оружие 7', 'Угроза уровню: Ночь', 'Агент Скотт во всеоружии'], correct: 0 },

        // --- Отчаянные домохозяйки ---
        { show: 'housewives', difficulty: 'easy', question: 'На какой вымышленной улице живут главные героини?', answers: ['Вистерия Лейн', 'Бейкер Стрит', 'Сансет Бульвар', 'Гроув Стрит'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Самоубийство какой героини запускает сюжет первого сезона?', answers: ['Мэри Элис Янг', 'Бри Ван де Камп', 'Габриэль Солис', 'Иди Бритт'], correct: 0 },

        // --- Бруклин 99 ---
        { show: 'b99', difficulty: 'easy', question: 'Какая любимая еда и бренд у детектива Джейка Перальта?', answers: ['Пицца и мармеладные мишки', 'Бургеры', 'Китайская лапша', 'Пончики'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут любимого пса (корги) капитана Холта?', answers: ['Чеддер', 'Честер', 'Флаффи', 'Барни'], correct: 0 }
    ];

    // Игровое состояние
    let gameState = {
        selectedShow: '',
        selectedDifficulty: '',
        quizQuestions: [],
        currentIndex: 0,
        correctCount: 0,
        incorrectCount: 0,
        canAnswer: true
    };

    let focusableElements = [];
    let focusIndex = 0;

    // Функция для честного случайного перемешивания массива (Алгоритм Фишера-Йетса)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    function init() {
        const overlayHtml = `
            <div id="lampa-quiz-gate-overlay">
                <div class="quiz-gate-card" id="quiz-gate-content"></div>
            </div>
        `;
        $('body').append(overlayHtml);
        injectStyles();
        registerTvController();
        renderIntroScreen();
    }

    // ==========================================
    // ТЕЛЕВИЗИОННОЕ УПРАВЛЕНИЕ
    // ==========================================
    function registerTvController() {
        Lampa.Controller.add('quiz_gate', {
            toggle: function () {},
            up: function () {
                if (focusableElements.length > 0) {
                    focusIndex = (focusIndex - 1 + focusableElements.length) % focusableElements.length;
                    applyTvFocus();
                }
            },
            down: function () {
                if (focusableElements.length > 0) {
                    focusIndex = (focusIndex + 1) % focusableElements.length;
                    applyTvFocus();
                }
            },
            left: function () {},
            right: function () {},
            enter: function () {
                if (focusableElements[focusIndex]) {
                    focusableElements[focusIndex].click();
                }
            },
            back: function () {
                const backBtn = $('#quiz-gate-content').find('.back-to-start');
                if (backBtn.length > 0) {
                    backBtn.click();
                }
            }
        });
        Lampa.Controller.toggle('quiz_gate');
    }

    function updateFocusMap() {
        focusableElements = $('#quiz-gate-content').find('.quiz-focusable').toArray();
        focusIndex = 0;
        applyTvFocus();
    }

    function applyTvFocus() {
        $('#quiz-gate-content').find('.quiz-focusable').removeClass('focus');
        if (focusableElements[focusIndex]) {
            const currentEl = $(focusableElements[focusIndex]);
            currentEl.addClass('focus');
            if (currentEl.length) {
                currentEl[0].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
        }
    }

    // ==========================================
    // ЭКРАНЫ КВИЗА
    // ==========================================

    // 1. Интро
    function renderIntroScreen() {
        const content = $('#quiz-gate-content');
        content.html(`
            <h2>Вход ограничен! 🛑</h2>
            <p>Чтобы получить доступ к Lampa, вы должны подтвердить, что являетесь истинным фанатом сериалов.</p>
            <p>Вам предстоит ответить на случайные вопросы по выбранной теме. Для успешного входа нужно дать минимум <b>60% правильных ответов</b>.</p>
            <button class="quiz-btn primary-btn quiz-focusable init-quiz-start">Начать проверку</button>
        `);

        content.find('.init-quiz-start').on('click', renderThemeScreen);
        updateFocusMap();
    }

    // 2. Выбор темы
    function renderThemeScreen() {
        const content = $('#quiz-gate-content');
        content.html(`
            <h2>Шаг 1: Выберите тематику</h2>
            <div class="quiz-options-list">
                <button class="quiz-btn option-btn quiz-focusable select-theme" data-theme="tbbt">Теория большого взрыва</button>
                <button class="quiz-btn option-btn quiz-focusable select-theme" data-theme="office">Офис (США)</button>
                <button class="quiz-btn option-btn quiz-focusable select-theme" data-theme="housewives">Отчаянные домохозяйки</button>
                <button class="quiz-btn option-btn quiz-focusable select-theme" data-theme="b99">Бруклин 99</button>
            </div>
        `);

        content.find('.select-theme').on('click', function() {
            gameState.selectedShow = $(this).data('theme');
            renderDifficultyScreen();
        });
        updateFocusMap();
    }

    // 3. Выбор сложности
    function renderDifficultyScreen() {
        const content = $('#quiz-gate-content');
        content.html(`
            <h2>Шаг 2: Выберите сложность</h2>
            <div class="quiz-options-list">
                <button class="quiz-btn option-btn quiz-focusable select-diff" data-diff="easy">Легко</button>
                <button class="quiz-btn option-btn quiz-focusable select-diff" data-diff="medium">Средне</button>
                <button class="quiz-btn option-btn quiz-focusable select-diff" data-diff="hard">Сложно</button>
                <button class="quiz-btn link-btn quiz-focusable back-to-start" style="margin-top:10px;">↩ К выбору темы</button>
            </div>
        `);

        content.find('.select-diff').on('click', function() {
            gameState.selectedDifficulty = $(this).data('diff');
            startQuizLogic();
        });

        content.find('.back-to-start').on('click', renderThemeScreen);
        updateFocusMap();
    }

    // Сборка пула вопросов с глубоким перемешиванием
    function startQuizLogic() {
        let pool = QUESTIONS_BASE.filter(q => q.show === gameState.selectedShow && q.difficulty === gameState.selectedDifficulty);
        // Если по конкретной сложности вопросов нет или мало, берем все вопросы этого сериала
        if (pool.length === 0) {
            pool = QUESTIONS_BASE.filter(q => q.show === gameState.selectedShow);
        }

        // Делаем глубокую копию пула, чтобы не испортить оригинальный массив QUESTIONS_BASE при перемешивании ответов
        let copiedPool = JSON.parse(JSON.stringify(pool));
        
        // Перемешиваем сам список вопросов
        copiedPool = shuffleArray(copiedPool);

        // Перемешиваем варианты ответов КНУТРИ каждого выбранного вопроса
        copiedPool.forEach(q => {
            let correctText = q.answers[q.correct]; // Запоминаем текст правильного ответа
            q.answers = shuffleArray(q.answers);    // Перемешиваем кнопки
            q.correct = q.answers.indexOf(correctText); // Находим новый индекс правильного ответа
        });

        // Берем максимум 5 вопросов (или сколько есть всего, если база маленькая)
        gameState.quizQuestions = copiedPool.slice(0, Math.min(5, copiedPool.length));
        gameState.currentIndex = 0;
        gameState.correctCount = 0;
        gameState.incorrectCount = 0;
        gameState.canAnswer = true;

        renderQuestionScreen();
    }

    // 4. Экран вопроса
    function renderQuestionScreen() {
        gameState.canAnswer = true;
        const content = $('#quiz-gate-content');
        const currentQ = gameState.quizQuestions[gameState.currentIndex];
        const totalQuestions = gameState.quizQuestions.length;

        let answersHtml = '';
        currentQ.answers.forEach((ans, idx) => {
            answersHtml += `<button class="quiz-btn answer-btn quiz-focusable select-answer" data-idx="${idx}">${ans}</button>`;
        });

        content.html(`
            <div class="quiz-header-nav">
                <button class="quiz-btn link-btn quiz-focusable back-to-start">↩ Начать сначала</button>
                <span class="quiz-step-indicator">Вопрос ${gameState.currentIndex + 1} из ${totalQuestions}</span>
            </div>
            
            <div class="quiz-question-text">${currentQ.question}</div>
            
            <div class="quiz-options-list">
                ${answersHtml}
            </div>

            <div class="quiz-live-score">
                <span class="score-green">Правильно: ${gameState.correctCount}</span>
                <span class="score-red">Неправильно: ${gameState.incorrectCount}</span>
            </div>
        `);

        content.find('.back-to-start').on('click', renderThemeScreen);

        content.find('.select-answer').on('click', function() {
            if (!gameState.canAnswer) return;
            gameState.canAnswer = false;

            const chosenIdx = parseInt($(this).data('idx'));
            const correctIdx = currentQ.correct;

            content.find('.select-answer').each(function(idx) {
                if (idx === correctIdx) {
                    $(this).addClass('btn-correct');
                } else if (idx === chosenIdx && chosenIdx !== correctIdx) {
                    $(this).addClass('btn-incorrect');
                }
            });

            if (chosenIdx === correctIdx) {
                gameState.correctCount++;
            } else {
                gameState.incorrectCount++;
            }

            content.find('.quiz-live-score').html(`
                <span class="score-green">Правильно: ${gameState.correctCount}</span>
                <span class="score-red">Неправильно: ${gameState.incorrectCount}</span>
            `);

            setTimeout(() => {
                gameState.currentIndex++;
                if (gameState.currentIndex < totalQuestions) {
                    renderQuestionScreen();
                } else {
                    renderFinalResultScreen();
                }
            }, 1500);
        });

        updateFocusMap();
        focusIndex = 1; // Фокус на первый вариант ответа
        applyTvFocus();
    }

    // 5. Результат
    function renderFinalResultScreen() {
        const content = $('#quiz-gate-content');
        const totalQuestions = gameState.quizQuestions.length;
        
        // Победа, если ответил правильно хотя бы на 60% вопросов
        const isWin = gameState.correctCount >= Math.ceil(totalQuestions * 0.6);

        if (isWin) {
            content.html(`
                <h2>Поздравляем! 🎉</h2>
                <p class="final-status-msg">Вы успешно прошли верификацию фаната!</p>
                <div class="final-score-box">Результат: ${gameState.correctCount} из ${totalQuestions} верных</div>
                <button class="quiz-btn success-btn quiz-focusable unlock-lampa-btn">Welcome to Lampa</button>
            `);

            content.find('.unlock-lampa-btn').on('click', function() {
                $('#lampa-quiz-gate-overlay').remove();
                Lampa.Controller.toggle('main');
            });
        } else {
            content.html(`
                <h2>Game Over 💀</h2>
                <p class="final-status-msg">Вход заблокирован. Вы ответили правильно всего на ${gameState.correctCount} вопр.</p>
                <div class="quiz-options-list">
                    <button class="quiz-btn primary-btn quiz-focusable retry-same">Попробовать снова</button>
                    <button class="quiz-btn option-btn quiz-focusable back-to-start">Вернуться к выбору темы</button>
                </div>
            `);

            content.find('.retry-same').on('click', startQuizLogic);
            content.find('.back-to-start').on('click', renderThemeScreen);
        }

        updateFocusMap();
    }

    // ==========================================
    // СТИЛИ
    // ==========================================
    function injectStyles() {
        const css = `
            #lampa-quiz-gate-overlay {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background-color: #141414;
                z-index: 9999999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Roboto', Helvetica, Arial, sans-serif;
                color: #fff;
            }
            .quiz-gate-card {
                background: #1f1f1f;
                padding: 30px;
                border-radius: 12px;
                width: 90%;
                max-width: 600px;
                text-align: center;
                box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                border: 1px solid #333;
                max-height: 90vh;
                overflow-y: auto;
            }
            .quiz-gate-card h2 { font-size: 26px; margin-bottom: 15px; color: #e50914; }
            .quiz-gate-card p { font-size: 15px; line-height: 1.5; color: #cccccc; margin-bottom: 20px; }
            .quiz-options-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 15px; }
            .quiz-btn {
                background: #2b2b2b;
                color: #fff;
                border: 2px solid transparent;
                padding: 12px 20px;
                font-size: 16px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.15s ease;
                outline: none;
                text-align: center;
            }
            .quiz-btn.focus { 
                background: #ffffff !important; 
                color: #000000 !important; 
                border-color: #e50914 !important;
                transform: scale(1.03);
                box-shadow: 0 0 15px rgba(255,255,255,0.3);
                font-weight: bold;
            }
            .primary-btn { background: #e50914; font-weight: bold; }
            .success-btn { background: #2e7d32; font-weight: bold; font-size: 18px; padding: 16px; width: 100%; }
            .link-btn { background: transparent; color: #aaaaaa; font-size: 14px; padding: 5px 10px; }
            .btn-correct { background: #2e7d32 !important; border-color: #4caf50 !important; color: #fff !important; }
            .btn-incorrect { background: #c62828 !important; border-color: #ef5350 !important; color: #fff !important; }
            .quiz-header-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 8px; }
            .quiz-step-indicator { font-size: 14px; color: #888; }
            .quiz-question-text { font-size: 18px; font-weight: 500; text-align: left; margin: 15px 0; line-height: 1.4; }
            .quiz-live-score { display: flex; justify-content: center; gap: 20px; font-weight: bold; margin-top: 15px; font-size: 14px; }
            .score-green { color: #4caf50; }
            .score-red { color: #f44336; }
            .final-status-msg { font-size: 17px !important; margin-bottom: 15px !important; }
            .final-score-box { background: rgba(255,255,255,0.05); padding: 12px; border-radius: 6px; margin-bottom: 25px; font-size: 18px; font-weight: bold; }
        `;
        $('<style>').text(css).appendTo('head');
    }

    if (window.appready) {
        init();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') init();
        });
    }
})();
