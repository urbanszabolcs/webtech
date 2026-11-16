$(document).ready(function() {

    // 1. Elemek kiválasztása HTML tag név, osztály és azonosító alapján + Animáció
    $("#animacio-gomb").click(function() {
        // ID alapján kiválasztott elem animálása (slideToggle)
        $("#animalt-doboz").slideToggle(600);
    });

    // 2. Meglévő HTML elem módosítása (ID és HTML tag alapján)
    $("#cim-modosito-gomb").click(function() {
        $("#tablazat-cim").text("Frissített lista: Gazdira váró kutyusok (2026)");
        $("table.adat-tablazat th").css("background-color", "#0288d1");
    });

    // 3. Új HTML elem készítése és beszúrása a DOM-ba
    $("#hozzaad-gomb").click(function() {
        var nev = $("#uj-tamogato-nev").val().trim();
        if (nev !== "") {
            // Új <li> elem létrehozása és hozzáfűzése az #tamogatok-listaja elemhez
            var ujElem = $("<li></li>").text(nev + " - Köszönjük a támogatást!").hide();
            $("#tamogatok-listaja").append(ujElem);
            ujElem.fadeIn(500); // Animált megjelenítés
            $("#uj-tamogato-nev").val("").css("border", "2px solid #ccc");
        } else {
            $("#uj-tamogato-nev").css("border", "2px solid red");
        }
    });

    // 4. Form ellenőrzés (Validáció) hibaüzenetekkel és dinamikus CSS kerettel
    $("#orokbefogil-form").submit(function(event) {
        event.preventDefault(); // Megakadályozzuk az oldal újratöltését
        var vanHiba = false;

        // Minden korábbi hibaüzenet törlése
        $(".hiba-uzenet").text("");
        $("input, textarea").css("border", "2px solid #ccc");

        // Név ellenőrzése (ID alapján)
        var nev = $("#nev").val().trim();
        if (nev === "") {
            $("#hiba-nev").text("Hiba: A név megadása kötelező!");
            $("#nev").css("border", "2px solid red");
            vanHiba = true;
        } else {
            $("#nev").css("border", "2px solid #2e7d32");
        }

        // Email ellenőrzése
        var email = $("#email").val().trim();
        var emailMinta = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === "") {
            $("#hiba-email").text("Hiba: Az e-mail cím nem maradhat üresen!");
            $("#email").css("border", "2px solid red");
            vanHiba = true;
        } else if (!emailMinta.test(email)) {
            $("#hiba-email").text("Hiba: Érvénytelen e-mail formátum (pl. nev@domain.hu)!");
            $("#email").css("border", "2px solid red");
            vanHiba = true;
        } else {
            $("#email").css("border", "2px solid #2e7d32");
        }

        // Dátum ellenőrzése
        var datum = $("#datum").val();
        if (datum === "") {
            $("#hiba-datum").text("Hiba: Kérjük, válassz látogatási dátumot!");
            $("#datum").css("border", "2px solid red");
            vanHiba = true;
        } else {
            $("#datum").css("border", "2px solid #2e7d32");
        }

        // Rádiógomb ellenőrzése (Attribútum szelektorral)
        if ($("input[name='lakas']:checked").length === 0) {
            $("#hiba-lakas").text("Hiba: Kérjük, válaszd ki a lakókörnyezet típusát!");
            vanHiba = true;
        }

        // Többsoros szöveg (textarea) ellenőrzése
        var bemutatkozas = $("#bemutatkozas").val().trim();
        if (bemutatkozas.length < 10) {
            $("#hiba-bemutatkozas").text("Hiba: A bemutatkozásnak legalább 10 karakternek kell lennie!");
            $("#bemutatkozas").css("border", "2px solid red");
            vanHiba = true;
        } else {
            $("#bemutatkozas").css("border", "2px solid #2e7d32");
        }

        // Checkbox ellenőrzése
        if (!$("#aszf").is(":checked")) {
            $("#hiba-aszf").text("Hiba: Az örökbefogadási feltételek elfogadása kötelező!");
            vanHiba = true;
        }

        // Ha minden hibátlan, sikeres üzenet megjelenítése animációval
        if (!vanHiba) {
            var valasztottSzin = $("#nyakorv-szin").val();
            $("#sikeres-kuldes")
                .html("<strong>Sikeres jelentkezés!</strong> Köszönjük, " + nev + "! Hamarosan keresünk. (Választott nyakörv színkódja: " + valasztottSzin + ")")
                .fadeIn(600);
        } else {
            $("#sikeres-kuldes").hide();
        }
    });

});
