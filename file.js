(function () {
    'use strict';

    // ==========================================
    // БАЗА ДАННЫХ ВОПРОСОВ (Без дубликатов)
    // ==========================================
    const QUESTIONS_BASE = [
        // --- Теория большого взрыва ---
        { show: 'tbbt', difficulty: 'easy', question: 'На каком музыкальном инструменте играет Шелдон Купер в моменты стресса?', answers: ['Терменвокс', 'Арфа', 'Флейта', 'Барабаны'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Какая профессия у Пенни в первых сезонах?', answers: ['Актриса', 'Официантка Cheesecake Factory', 'Ученый', 'Фармацевт'], correct: 1 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут соседа Шелдона по квартире?', answers: ['Говард', 'Радж', 'Леонард', 'Стюарт'], correct: 2 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут соседку Шелдона и Леонарда?', answers: ['Эми', 'Пенни', 'Бернадетт', 'Лесли'], correct: 1 },
        { show: 'tbbt', difficulty: 'easy', question: 'Где работают Шелдон и Леонард?', answers: ['MIT', 'Harvard', 'Caltech', 'Stanford'], correct: 2 },
        { show: 'tbbt', difficulty: 'easy', question: 'Кем работает Пенни в начале сериала?', answers: ['Официанткой', 'Актрисой', 'Учёным', 'Продавцом'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут девушку Шелдона?', answers: ['Бернадетт', 'Эми', 'Пенни', 'Лесли'], correct: 1 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут инженера из компании друзей?', answers: ['Радж', 'Говард', 'Леонард', 'Стюарт'], correct: 1 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как называется магазин комиксов?', answers: ['Comic Center', 'The Comic Center', 'Comic Store', 'Geek Shop'], correct: 1 },
        { show: 'tbbt', difficulty: 'easy', question: 'Кто владелец магазина комиксов?', answers: ['Зак', 'Стюарт', 'Барри', 'Дэйв'], correct: 1 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут мать Шелдона?', answers: ['Мэри', 'Сьюзан', 'Линда', 'Элис'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут лучшего друга Шелдона?', answers: ['Радж', 'Говард', 'Леонард', 'Зак'], correct: 2 },
        { show: 'tbbt', difficulty: 'easy', question: 'В каком университете работают герои?', answers: ['MIT', 'Harvard', 'Caltech', 'Yale'], correct: 2 },
        { show: 'tbbt', difficulty: 'easy', question: 'Какой напиток чаще всего пьёт Шелдон?', answers: ['Чай', 'Кофе', 'Сок', 'Молоко'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Что друзья чаще всего заказывают на ужин?', answers: ['Суши', 'Китайскую еду', 'Бургеры', 'Пиццу'], correct: 1 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут астрофизика в компании?', answers: ['Радж', 'Говард', 'Леонард', 'Стюарт'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут жену Говарда?', answers: ['Пенни', 'Эми', 'Бернадетт', 'Лесли'], correct: 2 },
        { show: 'tbbt', difficulty: 'easy', question: 'Какой инструмент иногда использует Шелдон?', answers: ['Гитара', 'Скрипка', 'Терменвокс', 'Флейта'], correct: 2 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут отца Леонарда?', answers: ['Альфред', 'Джон', 'Майкл', 'Роберт'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Кто из героев летал в космос?', answers: ['Леонард', 'Шелдон', 'Говард', 'Радж'], correct: 2 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут девушку Раджа?', answers: ['Люси', 'Клэр', 'Эмили', 'Анна'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как называется любимая игра друзей?', answers: ['Monopoly', 'Chess', 'D&D', 'Poker'], correct: 2 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут коллегу Шелдона?', answers: ['Леонард', 'Говард', 'Радж', 'Стюарт'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Как зовут девушку Леонарда?', answers: ['Пенни', 'Эми', 'Бернадетт', 'Прия'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Где происходит действие сериала?', answers: ['Нью-Йорк', 'Пасадена', 'Чикаго', 'Бостон'], correct: 1 },
        { show: 'tbbt', difficulty: 'easy', question: 'Кто боится женщин при знакомстве?', answers: ['Радж', 'Говард', 'Шелдон', 'Леонард'], correct: 0 },
        { show: 'tbbt', difficulty: 'easy', question: 'Какой супергерой нравится Шелдону?', answers: ['Флэш', 'Бэтмен', 'Супермен', 'Железный человек'], correct: 0 }, 
        
        { show: 'tbbt', difficulty: 'medium', question: 'В каком университете работают главные герои?', answers: ['Гарвард', 'Стэнфорд', 'Калтех (Caltech)', 'МТИ (MIT)'], correct: 2 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как называется соглашение Шелдона и Леонарда о совместном проживании?', answers: ['Apartment Rules', 'Roommate Agreement', 'Living Contract', 'Friendship Pact'], correct: 1 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут сестру Шелдона?', answers: ['Мисси', 'Молли', 'Мэри', 'Лиза'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Почему Радж долго не мог разговаривать с женщинами?', answers: ['Страх сцены', 'Избирательный мутизм', 'Заикание', 'Социальная фобия'], correct: 1 },
        { show: 'tbbt', difficulty: 'medium', question: 'Кем работает Бернадетт после получения PhD?', answers: ['Фармацевт', 'Учёный-исследователь', 'Хирург', 'Преподаватель'], correct: 1 },
        { show: 'tbbt', difficulty: 'medium', question: 'Кто познакомил Шелдона с Эми?', answers: ['Пенни и Радж', 'Леонард', 'Говард', 'Бернадетт'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут мать Говарда?', answers: ['Дебби', 'Сьюзан', 'Карен', 'Хелен'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут девушку Раджа, которая не любила физический контакт?', answers: ['Люси', 'Эмили', 'Клэр', 'Дженни'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут девушку Леонарда до Пенни, которая была юристом?', answers: ['Прия', 'Стефани', 'Лесли', 'Эмили'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Кем работает Пенни после ухода из ресторана?', answers: ['Фармацевтика', 'IT', 'Маркетинг', 'Наука'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Кто из друзей первым женился?', answers: ['Леонард', 'Шелдон', 'Говард', 'Радж'], correct: 2 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут отца Леонарда?', answers: ['Альфред', 'Артур', 'Адам', 'Алекс'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут девушку Шелдона до Эми (эпизодически)?', answers: ['Лесли', 'Пенни', 'Бернадетт', 'Прия'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Какой предмет Шелдон считал "своим местом" на диване?', answers: ['Кресло', 'The Spot', 'The Chair', 'The Corner'], correct: 1 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как называется игра, в которую часто играют герои?', answers: ['Dungeons & Dragons', 'Monopoly', 'Chess', 'Risk'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут первую дочь Говарда и Бернадетт?', answers: ['Хейли', 'Ханна', 'Хелен', 'Хлоя'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут президента Caltech в сериале?', answers: ['Зиберт', 'Купер', 'Хокинг', 'Стивенс'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Кто такой Профессор Протон?', answers: ['Телеведущий научного шоу', 'Ректор университета', 'Учёный NASA', 'Комик'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут актёра, играющего Профессора Протона?', answers: ['Боб Ньюхарт', 'Билл Най', 'Уил Уитон', 'Джордж Такеи'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Какой университет окончил Леонард?', answers: ['Princeton', 'MIT', 'Harvard', 'Stanford'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут девушку Раджа-астронома в поздних сезонах?', answers: ['Эмили', 'Люси', 'Клэр', 'Алекс'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут сына Говарда и Бернадетт?', answers: ['Майкл', 'Нил', 'Джордж', 'Сэм'], correct: 1 },
        { show: 'tbbt', difficulty: 'medium', question: 'Какой супергерой чаще всего ассоциируется с Шелдоном?', answers: ['Флэш', 'Бэтмен', 'Супермен', 'Железный человек'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как зовут бывшую девушку Леонарда, сестру Раджа?', answers: ['Прия', 'Эмили', 'Стефани', 'Лесли'], correct: 0 },
        { show: 'tbbt', difficulty: 'medium', question: 'Как называется любимый магазин комиксов героев?', answers: ['Comic Center', 'The Comic Center', 'Geek Store', 'Hero Shop'], correct: 1 },
        { show: 'tbbt', difficulty: 'medium', question: 'Какой персонаж в сериале постоянно конфликтует с Шелдоном?', answers: ['Барри Крипке', 'Стюарт', 'Зак', 'Уил Уитон'], correct: 0 },
        
        { show: 'tbbt', difficulty: 'hard', question: 'Какое отчество у Шелдона Купера?', answers: ['Ли', 'Линус', 'Корнелиус', 'Франклин'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Какое число Шелдон считает идеальным?', answers: ['42', '73', '0', '13'], correct: 1 },
        { show: 'tbbt', difficulty: 'hard', question: 'Какое число Шелдон считает «своим идеальным числом»?', answers: ['42', '73', '11', '137'], correct: 1 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как называется соглашение Шелдона и Эми о научном сотрудничестве и отношениях?', answers: ['Relationship Agreement', 'Love Contract', 'Scientific Pact', 'Couple Rules'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут актёра, играющего самого себя и часто спорящего с Шелдоном?', answers: ['Уил Уитон', 'Натан Филлион', 'Джордж Такеи', 'Брент Спайнер'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как называется любимое место Шелдона на диване?', answers: ['The Spot', 'The Seat', 'The Chair', 'The Corner'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Кто из учёных вдохновил Шелдона и Эми на исследования нейробиологии любви?', answers: ['Стивен Хокинг', 'Карл Саган', 'Ричард Фейнман', 'Альберт Эйнштейн'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут первого ребёнка Говарда и Бернадетт?', answers: ['Хейли', 'Майкл', 'Лео', 'Сэм'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут второго ребёнка Говарда и Бернадетт?', answers: ['Нил', 'Майкл', 'Джордж', 'Адам'], correct: 1 },
        { show: 'tbbt', difficulty: 'hard', question: 'Какой университет является главным местом работы героев?', answers: ['Caltech', 'MIT', 'Harvard', 'Stanford'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как называется комикс-магазин Стюарта официально?', answers: ['The Comic Center', 'Comic Universe', 'Geek World', 'Hero Comics'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Кто из друзей первым получил Нобелевскую премию?', answers: ['Шелдон и Эми', 'Леонард', 'Говард', 'Радж'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'В каком сезоне Шелдон и Эми расстаются ненадолго?', answers: ['9 сезон', '5 сезон', '7 сезон', '11 сезон'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут президента Caltech в поздних сезонах?', answers: ['Зиберт', 'Купер', 'Хокинг', 'Барнс'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как называется научная область, в которой работает Шелдон?', answers: ['Теоретическая физика', 'Астрофизика', 'Химия', 'Биология'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут актрису, играющую Пенни?', answers: ['Кейли Куоко', 'Майим Бялик', 'Мелисса Рауш', 'Сара Гилберт'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут актрису, играющую Эми Фарра Фаулер?', answers: ['Майим Бялик', 'Кейли Куоко', 'Мелисса Рауш', 'Лиза Кудроу'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут актрису, играющую Бернадетт?', answers: ['Мелисса Рауш', 'Кейли Куоко', 'Майим Бялик', 'Дженнифер Энистон'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут актёра, играющего Говарда?', answers: ['Саймон Хелберг', 'Джонни Галэки', 'Кунал Найяр', 'Марк Хэмилл'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут актёра, играющего Раджа?', answers: ['Кунал Найяр', 'Саймон Хелберг', 'Джонни Галэки', 'Стивен Йон'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как называется эпизод, где Шелдон впервые признаётся в любви Эми?', answers: ['The Love Car Displacement', 'The Agreement Dissection', 'The Emotional Algorithm', 'The Big Reveal'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут отца Леонарда?', answers: ['Альфред Хофстедтер', 'Дэвид Купер', 'Ричард Ли', 'Алан Купер'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут мать Леонарда?', answers: ['Беверли Хофстедтер', 'Мэри Купер', 'Сьюзан Ли', 'Линда Грей'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Какой персонаж часто говорит «Bazinga!»?', answers: ['Шелдон', 'Леонард', 'Говард', 'Радж'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как зовут собаку Холта, часто упоминаемую фанатами кроссоверов?', answers: ['Чеддер', 'Бисквит', 'Орео', 'Рекс'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Как называется финальный эпизод сериала?', answers: ['The Stockholm Syndrome', 'The Final Theory', 'The Last Equation', 'The Big Bang End'], correct: 0 },
        { show: 'tbbt', difficulty: 'hard', question: 'Что Шелдон и Эми получают в конце сериала?', answers: ['Нобелевскую премию', 'Премию Хокинга', 'Медаль Фейнмана', 'Премию Тьюринга'], correct: 0 },
        
        // --- Офис ---
        { show: 'office', difficulty: 'easy', question: 'Как называется компания, в которой работают герои сериала?', answers: ['Dunder Mifflin', 'Initech', 'Sabre', 'Paper Co.'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кем Майкл Скотт приходится сотрудникам офиса?', answers: ['Региональным менеджером', 'Бухгалтером', 'Секретарем', 'Владельцем здания'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'В каком городе происходит действие сериала The Office (US)?', answers: ['Скрэнтон', 'Нью-Йорк', 'Чикаго', 'Филадельфия'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Какое домашнее животное было у Анжелы, которое Дуайт засунул в морозилку?', answers: ['Кот', 'Собака', 'Попугай', 'Хомяк'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кто в сериале является главным шутником и постоянно разыгрывает Дуайта?', answers: ['Джим Халперт', 'Райан', 'Кевин', 'Тоби'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут секретаршу в офисе?', answers: ['Пэм Бизли', 'Эрин Хэннон', 'Анжела Мартин', 'Келли Капур'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут продавца с любовью к порядку и оружию?', answers: ['Дуайт Шрут', 'Стэнли Хадсон', 'Оскар Мартинес', 'Кевин Мэлоун'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кто часто разыгрывает Дуайта?', answers: ['Джим Халперт', 'Райан Ховард', 'Тоби Флендерсон', 'Крид Брэттон'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут документалистов, снимающих офис?', answers: ['Не называются в сериале', 'PBS', 'BBC', 'NBC'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как называется отдел продаж Пэм и Джима?', answers: ['Отдел продаж', 'Бухгалтерия', 'HR', 'Логистика'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кто часто говорит "That’s what she said"?', answers: ['Майкл Скотт', 'Дуайт Шрут', 'Стэнли Хадсон', 'Оскар'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут HR-менеджера, которого никто не любит?', answers: ['Тоби Флендерсон', 'Райан Ховард', 'Майкл Скотт', 'Крид Брэттон'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Какой продукт продаёт Dunder Mifflin?', answers: ['Бумага', 'Принтеры', 'Книги', 'Канцелярия'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кто становится временным менеджером после Майкла?', answers: ['Дуайт Шрут', 'Пэм Бизли', 'Джим Халперт', 'Кевин Мэлоун'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут бухгалтера с любовью к математике?', answers: ['Оскар Мартинес', 'Крид Брэттон', 'Стэнли Хадсон', 'Райан Ховард'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кто управляет складом?', answers: ['Дэррил Филбин', 'Дуайт Шрут', 'Майкл Скотт', 'Тоби'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут девушку Джима?', answers: ['Пэм Бизли', 'Эрин Хэннон', 'Анжела Мартин', 'Келли Капур'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Какой стиль юмора у Майкла?', answers: ['Неловкий и неуместный', 'Сухой', 'Саркастичный', 'Черный юмор'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кто женится на Дуайте в финале сериала?', answers: ['Анжела Мартин', 'Пэм Бизли', 'Келли Капур', 'Мередит Палмер'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут продавца, который постоянно спит на работе?', answers: ['Стэнли Хадсон', 'Оскар', 'Дуайт', 'Райан'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как называется филиал компании?', answers: ['Скрэнтон', 'Бостон', 'Даллас', 'Сиэтл'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кто временно работает в корпоративном офисе в Нью-Йорке?', answers: ['Райан Ховард', 'Джим Халперт', 'Стэнли', 'Дэррил'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут девушку из отдела HR в поздних сезонах?', answers: ['Эрин Хэннон', 'Пэм Бизли', 'Келли Капур', 'Анжела Мартин'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как называется любимая закуска Майкла?', answers: ['Йогурт', 'Пицца', 'Бургеры', 'Салат'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Кто носит бейдж с "Assistant to the Regional Manager"?', answers: ['Дуайт Шрут', 'Джим', 'Оскар', 'Стэнли'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Как зовут оператора склада и друга Майкла?', answers: ['Дэррил Филбин', 'Крид Брэттон', 'Райан Ховард', 'Тоби'], correct: 0 },
        { show: 'office', difficulty: 'easy', question: 'Какой жанр у сериала?', answers: ['Мокьюментари', 'Ситком', 'Драма', 'Триллер'], correct: 0 },
        
        { show: 'office', difficulty: 'medium', question: 'В какой предмет Джим запек степлер Дуайта в пилотной серии?', answers: ['В торт', 'В бетон', 'В желе', 'В лед'], correct: 2 },
        { show: 'office', difficulty: 'medium', question: 'Как называется первая серия сериала?', answers: ['Pilot', 'Diversity Day', 'The Dundies', 'Office Introduction'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Кто пишет большинство "странных" фраз и историй в офисе?', answers: ['Крид Брэттон', 'Майкл Скотт', 'Дуайт', 'Оскар'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как называется ежегодная церемония наград Майкла?', answers: ['The Dundies', 'Office Awards', 'Scranton Night', 'Paper Awards'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'В кого влюблён Дуайт большую часть сериала?', answers: ['Анжела Мартин', 'Пэм', 'Келли', 'Мередит'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как называется компания-конкурент Dunder Mifflin?', answers: ['Staples', 'Sabre', 'Office Depot', 'Hammermill'], correct: 1 },
        { show: 'office', difficulty: 'medium', question: 'Кто становится CEO Sabre?', answers: ['Джо Беннет', 'Майкл Скотт', 'Райан Ховард', 'Джим Халперт'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как зовут актёра, играющего Майкла Скотта?', answers: ['Стив Карелл', 'Рейн Уилсон', 'Джон Красински', 'Б. Дж. Новак'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как называется серия с расовыми стереотипами в офисе?', answers: ['Diversity Day', 'The Dundies', 'Branch Wars', 'Conflict Resolution'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Кто является «помощником регионального менеджера»?', answers: ['Дуайт Шрут', 'Джим Халперт', 'Стэнли', 'Оскар'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Кто является главным антагонистом Майкла в HR?', answers: ['Тоби Флендерсон', 'Крид Брэттон', 'Райан Ховард', 'Дэррил'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как называется свадьба Джима и Пэм?', answers: ['Niagara', 'Scranton Wedding', 'The Office Wedding', 'Lake Day'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как зовут первого босса Майкла?', answers: ['Ян Левинсон', 'Джо Беннет', 'Дэвид Уоллес', 'Тоби'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как зовут босса корпорации Dunder Mifflin?', answers: ['Дэвид Уоллес', 'Райан', 'Дуайт', 'Стэнли'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как называется компания после поглощения Sabre?', answers: ['Sabre', 'Dunder Sabre', 'Mifflin Co.', 'Scranton Corp'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Кто становится временным директором филиала после Майкла?', answers: ['Дуайт', 'Пэм', 'Джим', 'Дэррил'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Какой инструмент чаще всего использует Дуайт?', answers: ['Ножи и оружие', 'Ноутбук', 'Телефон', 'Фотоаппарат'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Кто часто нарушает офисную этику, но остаётся любимым?', answers: ['Майкл Скотт', 'Тоби', 'Оскар', 'Анжела'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как зовут девушку Райана?', answers: ['Келли Капур', 'Пэм', 'Анжела', 'Эрин'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Кто ведёт складскую команду?', answers: ['Дэррил Филбин', 'Дуайт', 'Райан', 'Стэнли'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как называется корпоративное приложение Sabre?', answers: ['Suck It', 'WUPHF', 'Scranton App', 'PaperCloud'], correct: 1 },
        { show: 'office', difficulty: 'medium', question: 'Как зовут актёра, играющего Джима?', answers: ['Джон Красински', 'Стив Карелл', 'Рейн Уилсон', 'Эд Хелмс'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как называется эпизод с пожарной тревогой, устроенной Дуайтом?', answers: ['Stress Relief', 'Fire Drill', 'Dwight Fire', 'Alarm'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Кто уходит работать в другую компанию в начале сериала?', answers: ['Джен Левинсон', 'Пэм', 'Дуайт', 'Оскар'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Как зовут начальника склада?', answers: ['Дэррил', 'Крид', 'Тоби', 'Райан'], correct: 0 },
        { show: 'office', difficulty: 'medium', question: 'Какой стиль съёмки используется в сериале?', answers: ['Документальный', 'Реалити-шоу', 'Ситком с аудиторией', 'Драма'], correct: 0 },
        
        { show: 'office', difficulty: 'hard', question: 'Какое второе имя у Майкла Скотта?', answers: ['Гэри', 'Джордж', 'Эдвард', 'Чарльз'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как назывался недописанный боевик Майкла Скотта?', answers: ['Уровень тревоги: Полночь', 'Смертельное оружие 7', 'Угроза уровню: Ночь', 'Агент Скотт во всеоружии'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Какой настоящий офисный продукт продаёт Dunder Mifflin помимо бумаги?', answers: ['Никакой', 'Принтеры', 'Канцелярия', 'Книги'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут актёра, играющего Крида Брэттона (который играет самого себя)?', answers: ['Крид Брэттон', 'Б. Дж. Новак', 'Стив Карелл', 'Эд Хелмс'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется реальный документальный стиль съёмки сериала?', answers: ['Mockumentary', 'Docudrama', 'Reality Sitcom', 'Pseudo-doc'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут компанию, которая покупает Dunder Mifflin в финальных сезонах?', answers: ['Sabre', 'Enron', 'Staples', 'Microsoft'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Кто является создателем сериала (US версия)?', answers: ['Грег Дэниелс', 'Рики Джервейс', 'Стив Карелл', 'Майкл Шур'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут персонажа, который ведёт "Confessions" стену?', answers: ['Джим Халперт', 'Майкл Скотт', 'Дуайт Шрут', 'Оскар'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется знаменитая серия с огненной тревогой Дуайта?', answers: ['Stress Relief', 'Fire Alarm', 'Dwight Fire Drill', 'Office Panic'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут женщину, с которой Майкл переезжает в Колорадо?', answers: ['Холли Флакс', 'Ян Левинсон', 'Келли', 'Анжела'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется стартап Райана в Нью-Йорке?', answers: ['WUPHF.com', 'PaperNet', 'OfficeHub', 'Scranton App'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут актёра, играющего Дуайта Шрута?', answers: ['Рейн Уилсон', 'Стив Карелл', 'Джон Красински', 'Эд Хелмс'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут персонажа, который становится президентом Sabre?', answers: ['Джо Беннет', 'Ян Левинсон', 'Дэвид Уоллес', 'Райан'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется эпизод с поездкой в Ниагару?', answers: ['Niagara', 'Wedding Trip', 'Lake House', 'Scranton Falls'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут настоящего писателя, играющего Райана?', answers: ['Б. Дж. Новак', 'Грег Дэниелс', 'Стив Карелл', 'Рейн Уилсон'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется метод управления Майкла?', answers: ['Неформальное лидерство', 'Авторитарный стиль', 'Демократический стиль', 'Хаотичный стиль'], correct: 3 },
        { show: 'office', difficulty: 'hard', question: 'Кто написал большинство эпизодов сериала?', answers: ['Б. Дж. Новак и Грег Дэниелс', 'Стив Карелл', 'Джон Красински', 'Рейн Уилсон'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут персонажа, который уходит в HR конфликт-менеджмент?', answers: ['Тоби Флендерсон', 'Оскар', 'Дэррил', 'Крид'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется финальная серия сериала?', answers: ['Finale', 'Goodbye Scranton', 'The Office Ends', 'Last Day'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут сына Пэм и Джима?', answers: ['Сесилия и Филип', 'Бен и Ли', 'Тим и Эми', 'Нет точного имени'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется компания-конкурент в ранних сезонах?', answers: ['Staples', 'Sabre', 'Enron', 'Walmart'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Какой жанр определяет сериал?', answers: ['Mockumentary sitcom', 'Sitcom', 'Drama', 'Reality show'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут персонажа, который постоянно нарушает закон и мораль?', answers: ['Крид Брэттон', 'Дуайт', 'Райан', 'Тоби'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется компания в британской версии сериала?', answers: ['Wernham Hogg', 'Dunder Mifflin', 'Staples', 'Sabre'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Кто является продюсером сериала вместе с Грегом Дэниелсом?', answers: ['Рики Джервейс', 'Стив Карелл', 'Б. Дж. Новак', 'Джон Красински'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как называется стиль юмора сериала?', answers: ['Ситуативная комедия с неловкостью', 'Стендап', 'Чёрная комедия', 'Абсурдизм'], correct: 0 },
        { show: 'office', difficulty: 'hard', question: 'Как зовут персонажа, который стал CEO и потерял всё?', answers: ['Райан Ховард', 'Дуайт', 'Майкл', 'Дэррил'], correct: 0 },
        
        // --- Отчаянные домохозяйки ---
        { show: 'housewives', difficulty: 'easy', question: 'На какой вымышленной улице живут главные героини?', answers: ['Вистерия Лейн', 'Бейкер Стрит', 'Сансет Бульвар', 'Гроув Стрит'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто из героинь в прошлом была профессиональной фотомоделью?', answers: ['Габриэль Солис', 'Бри Ван де Камп', 'Сьюзан Майер', 'Линетт Скаво'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'С чего начинается сериал (смерть рассказчицы)?', answers: ['Самоубийство Мэри Элис', 'Убийство Сьюзан', 'Пожар', 'Авария'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Как зовут рыжеволосую главную героиню?', answers: ['Сьюзан Майер', 'Бри Ван де Камп', 'Габриэль Солис', 'Линетт Скаво'], correct: 1 },
        { show: 'housewives', difficulty: 'easy', question: 'Какая героиня идеально одержима порядком и этикетом?', answers: ['Бри Ван де Камп', 'Сьюзан', 'Габриэль', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто бывшая модель в сериале?', answers: ['Габриэль Солис', 'Сьюзан', 'Бри', 'Эди'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'У кого много детей и хаотичная жизнь?', answers: ['Линетт Скаво', 'Бри', 'Сьюзан', 'Мэри Элис'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Как зовут рассказчицу сериала?', answers: ['Мэри Элис Янг', 'Сьюзан', 'Габриэль', 'Бри'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'В каком жанре выполнен сериал?', answers: ['Драмеди', 'Триллер', 'Ситком', 'Фэнтези'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто часто попадает в нелепые ситуации из-за любви?', answers: ['Сьюзан', 'Бри', 'Габриэль', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто из героинь чаще всего изменяла мужу?', answers: ['Габриэль Солис', 'Бри', 'Линетт', 'Сьюзан'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Как называется улица, где живут героини?', answers: ['Wisteria Lane', 'Oak Street', 'Pine Avenue', 'Elm Street'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто домохозяйка-идеалистка с кулинарным перфекционизмом?', answers: ['Бри', 'Сьюзан', 'Габриэль', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто из героинь дизайнер интерьеров (в начале)?', answers: ['Бри', 'Сьюзан', 'Габриэль', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто воспитывает много детей-близнецов?', answers: ['Линетт', 'Бри', 'Сьюзан', 'Эди'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто часто становится жертвой несчастной любви?', answers: ['Сьюзан', 'Бри', 'Габриэль', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто самая саркастичная соседка?', answers: ['Эди Бритт', 'Сьюзан', 'Бри', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Какой основной сеттинг сериала?', answers: ['Пригородный район', 'Большой город', 'Школа', 'Больница'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто бывшая топ-модель и жена богатого мужчины?', answers: ['Габриэль', 'Сьюзан', 'Бри', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто чаще всего контролирует семью?', answers: ['Бри', 'Сьюзан', 'Габриэль', 'Эди'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Какой жанр ближе всего сериалу?', answers: ['Драма с элементами комедии', 'Боевик', 'Хоррор', 'Фантастика'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто является центральной группой героинь?', answers: ['Домохозяйки Wisteria Lane', 'Полицейские', 'Учителя', 'Врачи'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто часто попадает в романтические истории?', answers: ['Сьюзан', 'Бри', 'Линетт', 'Эди'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто из героинь самая организованная?', answers: ['Бри', 'Сьюзан', 'Габриэль', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Кто из героинь переживает семейный хаос?', answers: ['Линетт', 'Бри', 'Сьюзан', 'Габриэль'], correct: 0 },
        { show: 'housewives', difficulty: 'easy', question: 'Какой элемент есть почти в каждой серии?', answers: ['Секреты и драмы', 'Сражения', 'Космос', 'Судебные процессы'], correct: 0 },
        
        { show: 'housewives', difficulty: 'medium', question: 'Самоубийство какой героини запускает сюжет первого сезона?', answers: ['Мэри Элис Янг', 'Бри Ван де Камп', 'Габриэль Солис', 'Иди Бритт'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто создатель сериала?', answers: ['Марк Черри', 'Райан Мёрфи', 'Шонда Раймс', 'Аарон Соркин'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'На каком телеканале выходил сериал в США?', answers: ['ABC', 'NBC', 'CBS', 'FOX'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут мужа Бри в начале сериала?', answers: ['Рекс Ван де Камп', 'Карл Майер', 'Карлос Солис', 'Том Скаво'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут первого (бывшего) мужа Сьюзан и отца Джули?', answers: ['Карл Майер', 'Рекс', 'Карлос', 'Том'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут мужа Габриэль?', answers: ['Карлос Солис', 'Карл Майер', 'Рекс', 'Том'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут мужа Линетт?', answers: ['Том Скаво', 'Карлос', 'Рекс', 'Карл'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как называется главный таймлайн сериала?', answers: ['Wisteria Lane', 'Fairview', 'Maple Town', 'Sunnydale'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто погибает в самом начале сериала?', answers: ['Мэри Элис Янг', 'Сьюзан', 'Бри', 'Эди'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут актрису, играющую Сьюзан?', answers: ['Тери Хэтчер', 'Марсия Кросс', 'Ева Лонгория', 'Фелисити Хаффман'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут актрису, играющую Бри?', answers: ['Марсия Кросс', 'Тери Хэтчер', 'Ева Лонгория', 'Фелисити Хаффман'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут актрису, играющую Габриэль?', answers: ['Ева Лонгория', 'Марсия Кросс', 'Тери Хэтчер', 'Фелисити Хаффман'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут актрису, играющую Линетт?', answers: ['Фелисити Хаффман', 'Ева Лонгория', 'Тери Хэтчер', 'Марсия Кросс'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут соседку-сплетницу?', answers: ['Эди Бритт', 'Мэри Элис', 'Сьюзан', 'Бри'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как называется стиль повествования?', answers: ['Ненадёжный рассказчик (voice-over)', 'Документалка', 'Реалити-шоу', 'Антология'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто чаще всего хранит секреты?', answers: ['Все героини', 'Только Бри', 'Только Сьюзан', 'Только Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут сына Линетт, который болен в ранних сезонах?', answers: ['Портер/Паркеры (двойня)', 'Карл', 'Рекс', 'Майкл'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как называется город, где происходит действие?', answers: ['Fairview', 'Westview', 'Brookfield', 'Riverdale'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Какой основной канал транслировал сериал?', answers: ['ABC', 'NBC', 'CBS', 'FOX'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто из героинь самая богатая в начале?', answers: ['Габриэль', 'Сьюзан', 'Бри', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто чаще всего попадает в криминальные истории?', answers: ['Все героини', 'Только Бри', 'Только Сьюзан', 'Только Эди'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Как зовут подругу, которая умерла в первой серии?', answers: ['Мэри Элис', 'Эди', 'Сьюзан', 'Бри'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто известен как идеальная домохозяйка?', answers: ['Бри', 'Сьюзан', 'Габриэль', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто из героинь имеет модельное прошлое?', answers: ['Габриэль', 'Сьюзан', 'Бри', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто из героинь постоянно сталкивается с финансовыми проблемами?', answers: ['Сьюзан', 'Бри', 'Габриэль', 'Эди'], correct: 0 },
        { show: 'housewives', difficulty: 'medium', question: 'Кто из героинь самая прагматичная в семье?', answers: ['Линетт', 'Сьюзан', 'Габриэль', 'Эди'], correct: 0 },
        
        { show: 'housewives', difficulty: 'hard', question: 'Кто является создателем сериала?', answers: ['Марк Черри', 'Шонда Раймс', 'Райан Мёрфи', 'Аарон Соркин'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как называется жанр сериала точнее всего?', answers: ['Драмеди / мыльная опера с мистикой', 'Ситком', 'Процедурал', 'Фантастика'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут актрису, играющую Сьюзан Майер?', answers: ['Тери Хэтчер', 'Ева Лонгория', 'Марсия Кросс', 'Фелисити Хаффман'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут актрису, играющую Бри Ван де Камп?', answers: ['Марсия Кросс', 'Тери Хэтчер', 'Ева Лонгория', 'Фелисити Хаффман'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут актрису, играющую Габриэль Солис?', answers: ['Ева Лонгория', 'Марсия Кросс', 'Тери Хэтчер', 'Фелисити Хаффман'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут актрису, играющую Линетт Скаво?', answers: ['Фелисити Хаффман', 'Ева Лонгория', 'Тери Хэтчер', 'Марсия Кросс'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как называется центральная улица сериала?', answers: ['Wisteria Lane', 'Fairview Street', 'Maple Lane', 'Oak Avenue'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут мужа Бри в первом сезоне?', answers: ['Рекс Ван де Камп', 'Карл Майер', 'Карлос Солис', 'Том Скаво'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Какой приём используется в сериале для повествования?', answers: ['Voice-over мёртвой героини', 'Третье лицо', 'Реалити камера', 'Флешмобы'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут создателя, известного также по другим драмеди?', answers: ['Марк Черри', 'Шонда Раймс', 'Райан Мёрфи', 'Дж. Дж. Абрамс'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как называется город действия сериала?', answers: ['Fairview', 'Westfield', 'Brookfield', 'Riverdale'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Кто из героинь является самой стабильной эмоционально?', answers: ['Линетт', 'Сьюзан', 'Габриэль', 'Бри'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Кто чаще всего скрывает преступления в сериале?', answers: ['Все главные героини', 'Только Бри', 'Только Сьюзан', 'Только Габриэль'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут подругу, чья смерть запускает сюжет?', answers: ['Мэри Элис Янг', 'Эди Бритт', 'Сьюзан', 'Бри'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как называется стиль сериала?', answers: ['Mysterious suburban drama', 'Sitcom', 'Crime procedural', 'Fantasy drama'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Какой канал производил сериал?', answers: ['ABC', 'NBC', 'CBS', 'FOX'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Кто из героинь имеет наиболее “идеальный” фасад жизни?', answers: ['Бри', 'Сьюзан', 'Габриэль', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Кто из героинь чаще всего попадает в юридические проблемы?', answers: ['Сьюзан', 'Габриэль', 'Бри', 'Линетт'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как называется формат сериала по структуре сезонов?', answers: ['Мыльная опера с сезонными тайнами', 'Антология', 'Процедурал', 'Ситком'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут актрису, играющую Эди Бритт?', answers: ['Николетт Шеридан', 'Ева Лонгория', 'Марсия Кросс', 'Тери Хэтчер'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как называется основной нарративный приём сериала?', answers: ['Секреты и тайны пригорода', 'Полицейские расследования', 'Фантастические элементы', 'Судебные драмы'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Кто из героинь чаще всего оказывается в центре интриг?', answers: ['Все главные героини', 'Только Бри', 'Только Сьюзан', 'Только Габриэль'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут мужа Габриэль?', answers: ['Карлос Солис', 'Карл Майер', 'Рекс', 'Том'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как зовут мужа Линетт?', answers: ['Том Скаво', 'Карлос', 'Рекс', 'Карл'], correct: 0 },
        { show: 'housewives', difficulty: 'hard', question: 'Как называется ключевая тема сериала?', answers: ['Секреты пригородной жизни', 'Криминальные расследования', 'Фантастика', 'Политика'], correct: 0 },       
        
        // --- Бруклин 99 ---
        { show: 'b99', difficulty: 'easy', question: 'Какая любимая еда и бренд у детектива Джейка Перальта?', answers: ['Пицца и мармеладные мишки', 'Бургеры', 'Китайская лапша', 'Пончики'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'В каком участке полиции работает команда?', answers: ['99-й участок', '12-й участок', 'Brooklyn Central', 'NY Precinct 5'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут главного детектива?', answers: ['Джейк Перальта', 'Чарльз Бойл', 'Рэймонд Холт', 'Терри Джеффордс'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Кто капитан участка?', answers: ['Рэймонд Холт', 'Дуг Джуди', 'Гина Линетти', 'Хичкок'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут напарницу Джейка?', answers: ['Эми Сантьяго', 'Роза Диаз', 'Гина', 'Кейт Перкинс'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут лучшего друга Джейка?', answers: ['Чарльз Бойл', 'Терри Джеффордс', 'Хичкок', 'Скалли'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут сильного сержанта участка?', answers: ['Терри Джеффордс', 'Холт', 'Бойл', 'Джуди'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут саркастичную ассистентку капитана?', answers: ['Джина Линетти', 'Эми', 'Роза', 'Кейт'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут детектива с любовью к еде?', answers: ['Чарльз Бойл', 'Джейк', 'Терри', 'Холт'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Кто из персонажей любит йогурт?', answers: ['Терри Джеффордс', 'Холт', 'Джейк', 'Бойл'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут холодную и серьёзную детектива?', answers: ['Роза Диаз', 'Эми', 'Гина', 'Кейт'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как называется участок полиции?', answers: ['99-й участок', 'Brooklyn 12', 'NY Police HQ', 'Central Precinct'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут начальника отдела в начале сериала?', answers: ['Рэймонд Холт', 'Терри', 'Джейк', 'Гина'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут персонажа с любовью к романтике и еде?', answers: ['Чарльз Бойл', 'Джейк', 'Роза', 'Холт'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Кто часто устраивает странные конкурсы в участке?', answers: ['Джейк Перальта', 'Холт', 'Терри', 'Эми'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут жену Холта?', answers: ['Кевин', 'Дорин', 'Майкл', 'Линда'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Какой жанр у сериала?', answers: ['Полицейский ситком', 'Драма', 'Триллер', 'Документалка'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут персонажа, который любит организованность?', answers: ['Эми Сантьяго', 'Роза', 'Гина', 'Чарльз'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Кто из персонажей любит шутки и розыгрыши?', answers: ['Джейк', 'Холт', 'Терри', 'Эми'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут детектива с жёстким характером?', answers: ['Роза Диаз', 'Эми', 'Гина', 'Чарльз'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут помощника капитана?', answers: ['Гина Линетти', 'Роза', 'Эми', 'Чарльз'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут персонажа, который постоянно ест йогурт?', answers: ['Терри Джеффордс', 'Холт', 'Джейк', 'Чарльз'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут персонажа, который любит фильмы про экшен?', answers: ['Джейк Перальта', 'Чарльз', 'Роза', 'Гина'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут капитана с минимальной эмоциональностью?', answers: ['Рэймонд Холт', 'Терри', 'Джейк', 'Чарльз'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Как зовут персонажа, который становится позже детективом?', answers: ['Эми Сантьяго', 'Гина', 'Роза', 'Линда'], correct: 0 },
        { show: 'b99', difficulty: 'easy', question: 'Где происходит действие сериала?', answers: ['Бруклин, Нью-Йорк', 'Манхэттен', 'Лос-Анджелес', 'Чикаго'], correct: 0 },
        
        { show: 'b99', difficulty: 'medium', question: 'Как зовут любимого пса (корги) капитана Холта?', answers: ['Чеддер', 'Честер', 'Флаффи', 'Барни'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут актёра, играющего Джейка Перальту?', answers: ['Энди Сэмберг', 'Джо Ло Трульо', 'Терри Крюс', 'Андре Брауэр'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как называется первый эпизод сериала?', answers: ['Pilot', 'The Setup', 'Brooklyn Start', 'Case 1'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут преступника, которого Джейк постоянно ловит и отпускает?', answers: ['Дуг Джуди', 'Хичкок', 'Скалли', 'Фрэнк'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут мужа Холта?', answers: ['Кевин Кознер', 'Майкл', 'Джон', 'Стив'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как называется ежегодное соревнование в участке?', answers: ['Halloween Heist', 'Police Games', 'Brooklyn Cup', 'Heist Day'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Кто чаще всего выигрывает Halloween Heist?', answers: ['Джейк', 'Холт', 'Чарльз', 'Роза'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут актёра, играющего капитана Холта?', answers: ['Андре Брауэр', 'Терри Крюс', 'Энди Сэмберг', 'Джо Ло Трульо'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут начальника участка в поздних сезонах?', answers: ['Капитан Холт', 'Джуди', 'Терри', 'Гина'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как называется команда главных детективов?', answers: ['99-й участок', 'Brooklyn Squad', 'NY Detectives', 'Precinct Team'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут сестру-близнеца Джейка (в одном эпизоде)?', answers: ['Джейк не имеет сестры', 'Эми', 'Роза', 'Гина'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Кто становится капитаном после Холта?', answers: ['Виктория Скотт', 'Джейк', 'Терри', 'Эми'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут бывшего напарника Джейка?', answers: ['Эйми не имеет', 'Чарльз', 'Роза', 'Джуди'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как называется эпизод с ограблением в День благодарения?', answers: ['Thanksgiving Heist', 'Turkey Heist', 'Holiday Case', 'Feast Day'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут актёра, играющего Чарльза Бойла?', answers: ['Джо Ло Трульо', 'Энди Сэмберг', 'Терри Крюс', 'Андре Брауэр'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут персонажа, который ведёт отчёты и любит порядок?', answers: ['Эми Сантьяго', 'Роза', 'Гина', 'Чарльз'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут преступника-«друга» Джейка?', answers: ['Дуг Джуди', 'Рэй Фрэнк', 'Майк', 'Стив'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как называется стиль юмора сериала?', answers: ['Ситком с полицейским сеттингом', 'Драма', 'Триллер', 'Документалка'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут персонажа, который часто устраивает вечеринки?', answers: ['Джейк Перальта', 'Чарльз', 'Роза', 'Гина'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут персонажа, который работает в отделе кадров?', answers: ['Дениз', 'Эми', 'Гина', 'Роза'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как называется участок в оригинале?', answers: ['99th Precinct', 'Brooklyn PD', 'NYC 99', 'Brooklyn 9'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Кто чаще всего помогает Джейку в расследованиях?', answers: ['Чарльз Бойл', 'Роза', 'Эми', 'Терри'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут персонажа с минимальной эмоциональностью?', answers: ['Роза Диаз', 'Эми', 'Гина', 'Чарльз'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут персонажа, который любит йогурт?', answers: ['Терри Джеффордс', 'Холт', 'Джейк', 'Чарльз'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как зовут актёра, играющего Терри?', answers: ['Терри Крюс', 'Энди Сэмберг', 'Андре Брауэр', 'Джо Ло Трульо'], correct: 0 },
        { show: 'b99', difficulty: 'medium', question: 'Как называется финальный сезон, посвящённый реформе полиции?', answers: ['Season 8', 'Final Case', 'Brooklyn End', 'Precinct End'], correct: 0 },
        
        { show: 'b99', difficulty: 'hard', question: 'Как зовут создателей сериала Brooklyn Nine-Nine?', answers: ['Дэн Гур и Майкл Шур', 'Грег Дэниелс', 'Рики Джервейс', 'Дэн Хармон'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется продакшн-компания шоу?', answers: ['Fremulon', 'Universal TV', 'NBC Studios', 'Brooklyn Films'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Какой канал транслировал сериал в США?', answers: ['NBC', 'FOX', 'CBS', 'ABC'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут актёра, играющего капитана Холта?', answers: ['Андре Брауэр', 'Терри Крюс', 'Энди Сэмберг', 'Джо Ло Трульо'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется стиль съёмки сериала?', answers: ['Single-camera sitcom', 'Mockumentary', 'Multi-camera sitcom', 'Drama'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут персонажа, который был внедрён в мафию?', answers: ['Джейк Перальта', 'Чарльз', 'Роза', 'Эми'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется эпизод с ограблениями (Heist series)?', answers: ['Halloween Heist episodes', 'Brooklyn Heist', 'Precinct Wars', 'Case Heist'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут мужа капитана Холта?', answers: ['Кевин Кознер', 'Майкл', 'Джон', 'Дэвид'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут актёра, играющего Розу Диаз?', answers: ['Стэфани Беатрис', 'Энди Сэмберг', 'Джо Ло Трульо', 'Терри Крюс'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется структура полиции, показанная в сериале?', answers: ['NYC Police Department', 'Brooklyn PD', 'NYPD Fictional', '99 Division'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Кто чаще всего выигрывает Halloween Heist?', answers: ['Джейк или Холт (в зависимости от сезона)', 'Только Джейк', 'Только Холт', 'Роза'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут создателя шоу вместе с Дэном Гуром?', answers: ['Майкл Шур', 'Грег Дэниелс', 'Стив Карелл', 'Рики Джервейс'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется серия, где Холт притворяется эмоциями?', answers: ['The Box', 'Emotional Holt', 'Fake Captain', 'Feelings'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут персонажа, который работает бухгалтером полиции?', answers: ['Нет постоянного бухгалтера', 'Чарльз', 'Эми', 'Гина'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется последний эпизод сериала?', answers: ['The Last Day', 'Final Case', 'Goodbye 99', 'End of Watch'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут актёра, играющего Джейка Перальту?', answers: ['Энди Сэмберг', 'Джо Ло Трульо', 'Терри Крюс', 'Андре Брауэр'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется основной сеттинг сериала?', answers: ['99-й участок NYPD', 'Brooklyn HQ', 'Manhattan PD', 'NY Precinct 1'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут персонажа, который чаще всего нарушает правила?', answers: ['Джейк Перальта', 'Роза', 'Эми', 'Холт'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется стиль юмора сериала?', answers: ['Комедийный полицейский ситком', 'Чёрная комедия', 'Драма', 'Триллер'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут персонажа, который становится капитаном временно?', answers: ['Джина или Холт в разные сезоны', 'Только Холт', 'Только Эми', 'Только Джейк'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется продюсерский стиль Майкла Шура?', answers: ['Комедийные ансамбли с добрым юмором', 'Ситкомы с аудиторией', 'Драмы', 'Реалити-шоу'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут персонажа, который часто помогает Джейку в расследованиях?', answers: ['Чарльз Бойл', 'Роза', 'Эми', 'Терри'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как зовут актёра, играющего Эми Сантьяго?', answers: ['Мелисса Фумеро', 'Стэфани Беатрис', 'Энди Сэмберг', 'Терри Крюс'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется реальная полиция, на которой основан сериал?', answers: ['NYPD', 'LAPD', 'FBI', 'CIA'], correct: 0 },
        { show: 'b99', difficulty: 'hard', question: 'Как называется основной жанр сериала?', answers: ['Police procedural comedy', 'Drama', 'Thriller', 'Reality show'], correct: 0 }       
                 
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

        // ВАЖНО: Делаем тайм-аут, чтобы ядро Lampa не сбросило активный контроллер обратно на дефолтный ('main') при загрузке
        setTimeout(function() {
            Lampa.Controller.toggle('quiz_gate');
        }, 300);
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
        if (pool.length === 0) {
            pool = QUESTIONS_BASE.filter(q => q.show === gameState.selectedShow);
        }

        let copiedPool = JSON.parse(JSON.stringify(pool));
        copiedPool = shuffleArray(copiedPool);

        copiedPool.forEach(q => {
            let correctText = q.answers[q.correct];
            q.answers = shuffleArray(q.answers);
            q.correct = q.answers.indexOf(correctText);
        });

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
