INSERT INTO user (username, password) VALUES ('piotrek', '$2y$12$g9Jm1i0Gd0yo2bx53ppRs.OqA9owuD7Gjecum5PsGDViM6NQ1Oniu')

INSERT INTO authority (name) VALUES ('USER')
INSERT INTO authority (name) VALUES ('ADMIN')

INSERT INTO users_authorities (user_id, authority_id) VALUES (1, 1)

INSERT INTO recipe_book (fk_user_id) VALUES (1)

INSERT INTO category (name, icon_name, sort_index, url_suffix) VALUES ('Main Dish', 'icofont-culinary', 1, 'main-dishes')
INSERT INTO category (name, icon_name, sort_index, url_suffix) VALUES ('Small Dish', 'icofont-fast-food', 2, 'small-dishes')
INSERT INTO category (name, icon_name, sort_index, url_suffix) VALUES ('Soup', 'icofont-soup-bowl', 3, 'soups')
INSERT INTO category (name, icon_name, sort_index, url_suffix) VALUES ('Dessert', 'icofont-cup-cake', 4, 'desserts')
INSERT INTO category (name, icon_name, sort_index, url_suffix) VALUES ('Drink', 'icofont-cocktail', 5, 'drinks')
INSERT INTO category (name, icon_name, sort_index, url_suffix) VALUES ('Liqueur', 'icofont-glass', 6, 'liqueurs')

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time, servings) VALUES ('Shakshuka','Chorizo pokroić na 4, podsmażyć. Dodać pomidory, przyprawić. Wbić jajka i smażyć pod przykryciem około 5-7 minut na dużej mocy kuchenki. Podać z pokrojoną fetą i szczypiorkiem.','https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/12/Shakshuka-19.jpg',1, 3, '15min', 2);

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time, servings) VALUES ('Big Tuna','Tuńczyka odsączyć. Ugotowane jajka i cebulę pokroić w drobną kostkę. Wszystko wymieszać, doprawić solą i pieprzem do smaku. Podawać na podpieczonej bagietce lub grzance z kiełkami.','https://dinnerthendessert.com/wp-content/uploads/2019/01/Tuna-Salad.jpg',1, 3, '15min', 8)

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time, servings) VALUES ('Kurczak Curry','Kurczaka pokroić w paski, cebulę w piórka. Wymieszać z czosnkiem, vegetą i wstawić do lodówki na 3h. Z pozostałych składników zrobić sos. Cały sos wymieszać z mięskiem z lodówki. Włożyć do naczynia żaroodpornego. Piec 90 minut w 180 stopniach C. Od czasu do czasu przemieszać, a ostatnie pół godziny piec bez przykrywki.','https://s3.przepisy.pl/przepisy3ii/img/variants/767x0/curry-z-kurczaka.jpg',1, 2, '5h', 5)

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time) VALUES ('Pasztet soczewicowy z żurawiną','Cebulę pokroić w kostkę, na patelni rozgrzać olej i dodać cebulę razem z liściem laurowym zielem angielskim oraz goździkami. Smażyć na niedużym ogniu do czasu, aż cebula się zeszkli, wtedy wyjąć przyprawy i wyrzucić.
Cebulę dodać do ugotowanej soczewicy razem z kaszą jaglaną, olejem, sosem sojowym, szczyptą soli i resztą przypraw. Zmiksować przy pomocy ręcznego blendera na gładką masę, spróbować i doprawić do smaku większą ilością soli, jeśli jest taka potrzeba. Dodać żurawinę i wmieszać ją łyżką w masę.
Piekarnik rozgrzać do 180 stopni. Masę przełożyć do foremki (keksówka 20x11cm) wyłożonej papierem do pieczenia, wyrównać i piec przez 40 – 45 minut. Piec do momentu aż będzie miał złotą skorupkę, pasztet po upieczeniu jest płynny, należy studzić przez całą noc w foremce, a rano wyjąć pasztet z formy i podawać.','https://static.gotujmy.pl/ZDJECIE_PRZEPISU_ETAP/pasztet-z-zurawina-387035.jpg',1, 3, '1h')

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time) VALUES ('Ciasto marchewkowe','Mąkę przesiewamy z proszkiem i sodą. Orzechy prażymy na suchej patelni. Jajka miksujemy z solą na białą masę. Następnie na niskich obrotach miksujemy i dodajemy mąkę, olej, cukier i wanilię. Marchewkę, daktyle i orzechy mieszamy z 1 łyżeczką mąki. Dodajemy do ciasta i delikatnie mieszamy.
Pieczemy w blaszce 10x20 cm około 50-55 minut w 175 stopniach C do suchego patyczka.','https://static.smaker.pl/photos/a/0/1/a01ad418f17b38f5646f498bff68877d_362117_582af6e47e565_wm.jpg',1, 5, '1h')

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time) VALUES ('Soczysta pierś z indyka','Cebulę pokroić w drobną kostkę, dodać składniki marynaty, wymieszać. Natrzeć mięso i zostawić w naczyniu do pieczenia (na dno którego wlać łyżkę oleju) na całą noc.
Pieczenie: najpierw przykryte mięso pieczemy w 180 stopniach C bez termoobiegu, około 40 minut do zarumienienia. Następnie odkrywamy i polewamy sosem. Pieczemy dalej odkryte około 30 minut.
Upieczone mięso wyjąć z piekarnika, przykryć i zostawić na około 10 minut. Podawać pokrojone z sosem z pieczenia.','https://static.smaker.pl/photos/a/1/9/a1953f96295237c0ce6d9c8e08910084_289369_527fe60936379_wm.jpg',1, 2, '2h')

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time) VALUES ('Ciastka owsiane','Masło wyjąć z lodówki około godzinę przed rozpoczęciem pracy.
Masło przełożyć do miski, dodać cukier i ucierać mikserem 2-3 minuty. Następnie dodawać po jednym jajku, po każdym dodaniu wymieszać mikserem do połączenia składników.
Mąkę wymieszać z sodą i solą. Do maślanej masy dodać mąkę, ekstrakt waniliowy i wymieszać mikserem na niskich obrotach.
Do ciasta dodać płatki owsiane, wiórki, rodzynki (lub pokrojone daktyle, suszone owoce, żurawinę) posiekane orzechy, wymieszać łyżką lub rękoma.
Z ciasta uformować kuleczki i rozgnieść je na płasko na blaszce wyłożonej papierem do pieczenia.
Piec 15-17 minut w 170 stopniach z termoobiegiem.','https://d3iamf8ydd24h9.cloudfront.net/pictures/articles/2018/02/38319-v-900x556.jpg',1, 5, '1h')

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time, servings, kcal) VALUES ('Kurczak po meksykańsku','1. Wstawiamy ryż do gotowania
2. Kurczaka kroimy w kostkę, przekładamy do osobnej miski, zalewamy olejem, dodajemy jedną łyżkę papryki słodkiej i jedną łyżeczkę papryki ostrej, dokładnie mieszamy. Odkładamy na bok
3. Czerwoną cebulę kroimy w drobną kostkę, odkładamy osobno
4. Ząbki czosnku, miażdżymy i szatkujemy, odkładamy osobno
5. Paprykę kroimy w kostkę, odkładamy osobno
6. Odsączamy kukurydzę i fasolę i odmierzamy połowę
7. Dobrze nagrzać patelnię, wrzucamy kurczaka, smażymy, na koniec dodajemy soli i pieprzu dla smaku, przekładamy do osobnej miski
8. Na tę samą patelnię wlewamy oliwę oraz wrzucamy cebulę do zeszklenia
9. Następnie dorzucamy czosnek na max minutę
10. Dorzucam na moment kumin
11. Wrzucamy kolorowe papryki i smażymy dwie minuty
12. Dosypujemy łyżkę papryki słodkiej, łyżeczkę papryki ostrej i wlewamy przecier pomidorowy
13. Redukujemy ok. 7 minut, mieszamy od czasu do czasu
14. Dwie minuty przed końcem wrzucamy kukurydzę i fasolę
15. Po tym czasie wrzucamy ryż i dokładnie mieszamy
16. Dorzucamy kurczaka i dzielimy na 4 porcję
17. Po wierzchu posypać pietruszką/kolendrą
1 porcja: 862 kcal (B: 45g, W: 74g, T: 40g (w tym nienasycone 38g))','https://cdn.katalogsmakow.pl/2018/10/15/0x600/kurczak-po-meksykansku.741420.jpg',1, 2, '45min', 4, 862)

INSERT INTO recipe (name, description, image_path, recipe_book_id, category_id, preparation_time, servings) VALUES ('Chowder kukurydziany','Przygotowanie:
Każdą kolbę kukurydzy oskrobać z nasion przy pomocy ostrego noża, suszone pomidory posiekać w kostkę, kalafiora pokroić na bardzo małe różyczki, a pora w talarki. Na dnie dużego garnka rozgrzać kilka łyżek oleju z suszonych pomidorów, dodać tam pokrojone warzywa razem ze wszystkimi przyprawami poza gałką. Dusić na oleju przez 10 minut co jakiś czas mieszając.
W międzyczasie posiekać szczypior razem z cebulkami. Do podduszonych warzyw wlać mleko i gotować na małym ogniu przez około 15 – 20 minut do czasu, aż kalafior będzie miękki.
Jeśli gotowa zupa jest za gęsta, wlać bulion w całości lub tylko część. Doprawić szczyptą świeżo startej gałki, dodać sól i czarny pieprz do smaku, wsypać ¾ posiekanego szczypioru i dokładnie zamieszać. Podawać z łyżką świeżego szczypioru i ulubionym pieczywem.
Porady:

Bulion można też (i naprawdę warto) ugotować samemu na kolbach kukurydzy, dzięki temu zupa ma dużo więcej smaku i różnych, kukurydzianych aromatów.','https://www.jadlonomia.com/wp-content/uploads/2014/07/MG_85571-592x460.jpg',1, 4, '1,5h', 5)

INSERT INTO recipe (description, image_path, name, recipe_book_id, category_id, preparation_time, servings) VALUES ('Składniki wymieszać. Z podanej ilości wyjdzie około 4 szt małych naleśników.', 'https://4.bp.blogspot.com/-nP0vlmdvWvU/WrS3xZxo9rI/AAAAAAAALsI/YzSyp2rEcmArysxpJIPMITeRY2hqJad8wCLcBGAs/s1600/DSC_0102.JPG', 'Naleśniki owsiane', 1, 3, '15min', 4)

INSERT INTO recipe (description, image_path, name, recipe_book_id, category_id, preparation_time) VALUES ('1.	Wiśnie umyj i usuń z nich pestki.
2.	Spirytus wymieszaj z wodą, aby uzyskać alkohol o mocy ok. 70%
3.	Wiśnie przełóż do słoja i zalej je spirytusem, a następnie odstaw w ciemne i raczej ciepłe miejsce na ok. 6 tygodni. Co kilka dni wstrząśnij słojem, aby zamieszać jego zawartością.
4.	Po 6 tygodniach zlej nalew (płyn) ze słoja do butelki i zasyp pozostałe w słoju owoce cukrem.
5.	Przez kolejne dni cukier będzie się rozpuszczał w owocach, tworząc syrop – czyli drugą część naszej nalewki. Warto co jakiś czas potrząsnąć zawartością słoja z owocami i cukrem. Kiedy cały cukier się rozpuści, połącz powstały z niego syrop z uzyskanym wcześniej nalewem.
6.	Rozlej nalewkę do butelek i odstaw na minimum miesiąc. Po tym czasie możesz zlać klarowną część płynu do osobnych butelek – nalewki bez osadu i zanieczyszczeń są najbardziej cenione. Mi oczywiście smakują w każdej postaci i nie przeszkadza mi odrobina osadu na dnie butelki ;)
7.	Nalewka z wiśni pełne walory uzyskuje po ok. roku leżakowania, jednak degustować można ją już po kilku tygodniach.
', 'https://1.bp.blogspot.com/-L740jQDG8Hc/VOW9mL3gKpI/AAAAAAAAER8/qTR4jFASnx8/s1600/wisniowa.jpg', 'Wiśniówka', 1, 7, '3 miesiące')

INSERT INTO recipe (description, image_path, name, recipe_book_id, category_id, preparation_time, servings) VALUES ('1. Składniki wlać w podanych proporcjach do shakera
2. Wymieszać w shakerze i rozlać do szklanek', 'https://www.ballantines.com/wp-content/uploads/2020/09/ballantines-finest-whisky-sour-drink.jpg', 'Whisky Sour', 1, 6, '5min', 1)

INSERT INTO recipe (description, image_path, name, recipe_book_id, category_id, preparation_time, servings, kcal) VALUES ('1. Przygotować marynatę do mięsa (2 łyżki ciemnego sosu sojowego i 2 łyżki białego wina)
2. Wołowinę pokroić w cienkie plastry, mieszamy z marynatą i odstawiamy na bok
3. Cebulę kroimy w dosyć duże kawałki, podobnie paprykę i fasolę szparagową
4. Czosnek i imbir obieramy i szatkujemy, chili i dymkę kroimy w cienkie plasterki
5. Przygotować sos: 50ml wody, 2 łyżki jasnego sosu sojowego, 1 łyżka ciemnego sosu
6. Makaron wrzucamy do gorącej i osolonej wody, gotujemy zgodnie z czasem na opakowaniu
7. Nagrzewamy woka bardzo mocno, aż zacznie dymić, wlewamy ok. 20ml oleju, ręką wrzucamy mięso, aby nie wlać na patelnię marynaty, przesmażamy 1,5-2 minuty, odkładamy na bok
8. Wlewamy 20ml oleju i wsypujemy imbir, czosnek, chili i dymkę, podsmażyć kilkanaście-kilkadziesiąt sekund
9. Wrzucamy fasolę szparagową, przesmażamy 1-1,5min
10. Wrzucamy paprykę, przesmażamy 1-1,5min
11. Wrzucamy cebulę, przesmażamy 1-1,5min
12. Wlewamy sos, gotujemy 1min
13. Wrzucamy nudle
14. Dorzucamy mięso i mieszamy wszystko
15. Przełożyć na talerz, ozdobić zieloną cebulką i sezamem
789 kcal (B: 42g, W: 59g, T: 43g (w tym roślinne: 38g))', 'https://i.ytimg.com/vi/OgfbU2BEk2E/maxresdefault.jpg', 'Wołowina Stir Fry', 1, 2, '45min', 1, 789)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'pomidory w puszce', 'szt', 1)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (5, 'jajka', 'szt', 1)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (3, 'chleb', 'kromki', 1)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (4, 'chorizo', 'cm', 1)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'feta', null, 1)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'szczypiorek', 'łyżka', 1)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (150, 'tuńczyk', 'g', 2)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (50, 'cebula', 'g', 2)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (3, 'jajka', 'szt', 2)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'ketchup', 'łyżeczki', 2)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'musztarda', 'łyżeczki', 2)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'majonez', 'łyżeczki', 2)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'kiełki rzodkiewki', 'garść', 2)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'pierś z kurczaka', 'kg', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'cebula', 'szt', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'czosnek', 'szt', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'vegeta', 'łyżki', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'rodzynki', 'szklanka', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'ketchup pikantny', 'szklana', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5, 'miód', 'szklanki', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5, 'olej', 'szklanki', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (3, 'curry', 'łyżki', 3)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (4, 'sos sojowy', 'łyżki', 3)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2,'cebula','szt', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2,'liście laurowe','szt', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2,'ziele angielskie','ziarna', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2,'goździki','szt', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (100,'olej','ml', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (200,'soczewica (brązowa lub zielona) ','g', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (100,'kasza jaglana','g', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2,'sos sojowy','łyzki', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.7,'majeranek ','łyżeczka', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5,'cząbr ','łyżeczka', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.3,'lubczyk ','łyżeczka', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'gałka muszkatołowa','szczypta', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'sól','do smaku', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'pieprz czarny','do smaku', 4)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (4,'suszona żurawina','łyżki', 4)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.2,'cukier ','szklanki', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'mąka tortowa','szklanka', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5,'proszek do pieczenia ','łyżeczki', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5,'soda oczyszczona ','łyżeczki', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2,'jajka','szt', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'ekstrakt z wanilii','łyżeczka', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5,'olej rzepakowy ','szklanki', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'marchewka tarta','szklanka', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'daktyle pokrojone','szklanka', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5,'orzechy włoskie pokrojone ','szklanki', 5)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'sól','szczypta', 5)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'oliwa z oliwek','łyżka', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'ocet balsamiczny (ciemny)','łyżka', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'słodka papryka czerwona','łyżeczka', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'pieprz ziołowy','łyżeczka', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'sól','łyżeczka', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'musztarda ','łyżeczka', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(2,'majonez','łyżeczki', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'cebula (nieduża)','szt', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(2,'czosnek','ząbki', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'olej (na dno naczynia do pieczenia)','łyżka', 6)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(80,'pierś z indyka','dkg', 6)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (200,'Masło','g', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (180,'Cukier brązowy','g', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2,'Jajka','szt', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2,'ekstrakt waniliowy','łyżeczki', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (70,'Orzechy włoskie','g', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (100,'wiórki kokosowe','g', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (300,'mąka pszenna','g', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'soda','łyżeczka', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1,'sól','szczypta', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (210,'płatki owsiane','g', 7)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (130,'rodzynki','g', 7)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(600,'pierś z kurczaka','g', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(0.5,'puszka czerwonej fasoli','puszki', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(0.5,'puszka kukurydzy','puszki', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(500,'przecier pomidorowy','g', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(100,'czerwona cebula','g', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(3,'ryż paraboiled','torebki', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(2,'słodka papryka (przyprawa)','łyżki', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(2,'ostra papryka (przyprawa)','łyżeczki', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1.5,'kumin (przyprawa)','łyżki', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(350,'papryka (różne rodzaje)','g', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(3,'czosnek','ząbki', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(40,'olej','ml', 8)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(40,'oliwa','ml', 8)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(2,'kolby kukurydzy','szt', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(0.5,'mały kalafior','szt', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'młody por','szt', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(5,'suszone pomidory z oleju','szt', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(2,'liść laurowy','szt', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'ziele angielskie','szt', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(0.25,'chili','łyżeczki', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(0.25,'wędzona papryka','łyżeczki', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(3,'olej z pomidorów','łyżki', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'szczypiorek z cebulkami','pęczek', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'mleko roślinne niesłodzone','litr', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'bulion warzywny','szklanka', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'gałka muszkatałowa','spora szczypta', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'sól','szczypta', 9)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES(1,'czarny pieprz','szczypta', 9)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (50, 'mąka owsiana', 'g', 10)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'jajko', 'szt', 10)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (100, 'mleko', 'ml', 10)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'dojrzałe wiśnie', 'kg', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (500, 'spirytus 95%', 'ml', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (200, 'przegotowana woda', 'ml', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5, 'cukier', 'kg', 11)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (40, 'whisky', 'ml', 12)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (20, 'sok z cytryny', 'ml', 12)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (10, 'syrop cukrowy', 'ml', 12)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'lód', 'kostki', 12)

INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (150, 'wołowina', 'g', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (0.5, 'papryka', 'szt', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (80, 'cebula', 'g', 11)
INSERT INTO ingredient (name, unit, recipe_id) VALUES ('fasola szparagowa', '""', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'dymka', 'szt', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (1, 'papryczka chili', 'szt', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'czosnek', 'ząbki', 11)
INSERT INTO ingredient (name, unit, recipe_id) VALUES ('imbir', 'kawałek', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'białe wino półwytrawne', 'łyżki', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (2, 'jasny sos sojowy', 'łyżki', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (3, 'ciemny sos sojowy', 'łyżki', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (40, 'olej', 'ml', 11)
INSERT INTO ingredient (amount, name, unit, recipe_id) VALUES (70, 'makaron nudle', 'g', 11)






