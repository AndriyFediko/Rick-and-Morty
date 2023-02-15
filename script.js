let n = 1;
let fetchLink = "https://rickandmortyapi.com/api/character?page=";
let pagesInfo;
let gender = $("#genderSelect").val();
let species = $("#speciesSelect").val();
let status = $("#statusSelect").val();
let allEpisodesNames = [];
let EPage = 1;
let savedEpisodesArr = [];
$(".readMoreBackground").hide(0);
function getCharacters(page, link) {
    $("#switchInp").val(page);
    fetch(link + page)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            pagesInfo = data.info.pages;
            $("#pageCount").text(pagesInfo)
            $(".cardsContainer").empty();
            for (let el of data.results) {
                $(".cardsContainer").append(`<div id="c${el.id}" class="characterCard charactersPage__characterCard">
                        <div style="background-image: url(${el.image});" class="image"></div>
                        <span class="name info">Name: <span id="name">${el.name}</span></span>
                        <span class="gender info">Gender: <span id="gender">${el.gender}</span></span>
                        <span class="status info">Status: <span id="status">${el.status}</span></span>
                        <button class="readMore">Read more</button>
                        </div>`);
            }
            $(".readMore").click(function (e) {
                let targetId = String(e.target.closest(".charactersPage__characterCard").id).slice(1);
                fetch('https://rickandmortyapi.com/api/character/' + targetId)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        $(".readMoreBackground").show(300);
                        $("body").css("overflow", "hidden");
                        $(".characterImage").css("background-image", `url(${data.image})`);
                        $(".characterName").text(data.name);
                        $("#readMoreGender").text(data.gender);
                        $("#readMoreStatus").text(data.status);
                        $("#readMoreSpecies").text(data.species);
                        $("#readMoreOrigin").text(data.origin.name);
                    });
            });
            $(".close").click(function () {
                $(".readMoreBackground").hide(300);
                $("body").css("overflow", "auto");
            });
        });
}
getCharacters(n, fetchLink);
$(".nextBtn").click(function () {
    if (n < pagesInfo) {
        n++;
        getCharacters(n, fetchLink);
    }
});
$(".prewBtn").click(function () {
    if (n > 1) {
        n--;
        getCharacters(n, fetchLink);
    }
});
$("#switchInp").focus(function () {
    $(document).keyup(function (e) {
        if (e.originalEvent.key == "Enter") {
            n = $("#switchInp").val();
            getCharacters(n, fetchLink);
        }
    });
});
function navbarItamsChange() {
    $(".navbarIteam").css("background-color", "transparent");
    $(".navbarIteam").css("color", "#000");
    $("main").css("display", "none");
    $(".charactersPage").css("display", "none");
    $(".myWatchListPage").css("display", "none");
}
$(".navbarIteam").click(function () {
    if ($(this).text() == "Home") {
        navbarItamsChange();
        $(this).css("background-color", "#333");
        $(this).css("color", "#fff");
        $("main").css("display", "flex");
    }
    if ($(this).text() == "Characters") {
        navbarItamsChange();
        $(this).css("background-color", "#333");
        $(this).css("color", "#fff");
        $(".charactersPage").css("display", "block");
    }
    // if ($(this).text() == "Locations") {
    //     navbarItamsChange();
    //     $(this).css("background-color", "#333");
    //     $(this).css("color", "#fff");
    //     $(".charactersPage").css("display", "block");
    // }
    if ($(this).text() == "My watch list") {
        navbarItamsChange();
        $(this).css("background-color", "#333");
        $(this).css("color", "#fff");
        $(".myWatchListPage").css("display", "flex");
    }
});
function searchCharacter(e) {
    if ($(".searchInp").val() != "") {
        let characterName = $(".searchInp").val();
        fetch('https://rickandmortyapi.com/api/character/?name=' + characterName)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                $(".characterCardNameSearch").css("display", "flex");
                $(".mainRight > img").css("display", "none");
                $(".characterCardNameSearch .image").css("background-image", `url(${data.results[0].image})`);
                $(".characterCardNameSearch .name span").text(data.results[0].name);
                $(".characterCardNameSearch .gender span").text(data.results[0].gender);
                $(".characterCardNameSearch .status span").text(data.results[0].status);
            });
    }
}
$(".searchInp").focus(function () {
    $(document).keyup(function (e) {
        if (e.originalEvent.key == "Enter") {
            searchCharacter(e);
        }
    });
});
$("#glass").click(function (e) {
    searchCharacter(e);
});
$(".characterCardNameSearch__readMore").click(function (e) {
    let characterImg = $(".characterCardNameSearch .image").css("background-image");
    let characterName = $("#name").text();
    $(".characterImage").css("background-image", `${characterImg}`);
    $(".characterName").text(characterName);
    $(".readMoreBackground").show(300);
});
function getAllSpecies(a) {
    let arr = [];
    for (let i = 0; i < 42; i++) {
        fetch(`https://rickandmortyapi.com/api/character?page=${i}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                for (let el of data.results) {
                    if (!arr.includes(el.species)) {
                        arr.push(el.species);
                        $(a).append(`<option value="${el.species}">${el.species}</option>`);
                    }
                }
            });
    }
}
getAllSpecies("#speciesSelect");
function getFilterlink(species = "all", status = "all", gender = "all") {
    if (species != "all" && status != "all" && gender != "all") {
        fetchLink = `https://rickandmortyapi.com/api/character/?gender=${gender}&species=${species}&status=${status}&page=`;
    } else if (species == "all" && status == "all" && gender == "all") {
        fetchLink = "https://rickandmortyapi.com/api/character?page=";
    } else if (species != "all" && status != "all" && gender == "all") {
        fetchLink = `https://rickandmortyapi.com/api/character/?species=${species}&status=${status}&page=`;
    } else if (species != "all" && status == "all" && gender != "all") {
        fetchLink = `https://rickandmortyapi.com/api/character/?gender=${gender}&species=${species}&page=`;
    } else if (species == "all" && status != "all" && gender != "all") {
        fetchLink = `https://rickandmortyapi.com/api/character/?gender=${gender}&status=${status}&page=`;
    } else if (species == "all" && status != "all" && gender == "all") {
        fetchLink = `https://rickandmortyapi.com/api/character/?status=${status}&page=`;
    } else if (species == "all" && status == "all" && gender != "all") {
        fetchLink = `https://rickandmortyapi.com/api/character/?gender=${gender}&page=`;
    } else if (species != "all" && status == "all" && gender == "all") {
        fetchLink = `https://rickandmortyapi.com/api/character/?species=${species}&page=`;
    }
}
$("#genderSelect").change(function () {
    gender = $("#genderSelect").val();
});
$("#speciesSelect").change(function () {
    species = $("#speciesSelect").val();
});
$("#statusSelect").change(function () {
    status = $("#statusSelect").val();
});
$(".filterSelect").change(function () {
    n = 1
    getFilterlink(species, status, gender)
    getCharacters(n, fetchLink)
});
$("#showAll").click(function () {
    $("#genderSelect").val("all");
    $("#speciesSelect").val("all");
    $("#statusSelect").val("all");
    gender = $("#genderSelect").val();
    species = $("#speciesSelect").val();
    status = $("#statusSelect").val();
    getFilterlink(species, status, gender)
    getCharacters(n, fetchLink)
});
function getAllEpisodesNames() {
    fetch('https://rickandmortyapi.com/api/episode/?page=' + EPage)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (let el of data.results) {
                allEpisodesNames.push(el.name);
            }
            if (EPage < 3) {
                EPage++;
                getAllEpisodesNames();
            }
        });
}
getAllEpisodesNames();
function filterEpisodersByName(a) {
    let arr = [];
    for (let el of allEpisodesNames) {
        if (el.indexOf(a) != -1) {
            arr.push(el);
        }
    }
    return arr;
}
function searchHintsDisplay() {
    $(".hintConatiner").css("display", "flex")
    $("#hint1").css("display", "flex");
    $("#hint2").css("display", "flex");
    $("#hint3").css("display", "flex");
}
function searchHint() {
    searchHintsDisplay();
    if (filterEpisodersByName($("#episodeInp").val()).length >= 3) {
        $("#hint1").text(filterEpisodersByName($("#episodeInp").val())[0]);
        $("#hint2").text(filterEpisodersByName($("#episodeInp").val())[1]);
        $("#hint3").text(filterEpisodersByName($("#episodeInp").val())[2]);
    } else if (filterEpisodersByName($("#episodeInp").val()).length == 2) {
        $("#hint1").text(filterEpisodersByName($("#episodeInp").val())[0]);
        $("#hint2").text(filterEpisodersByName($("#episodeInp").val())[1]);
        $("#hint3").css("display", "none");
    } else if (filterEpisodersByName($("#episodeInp").val()).length == 1) {
        $("#hint1").text(filterEpisodersByName($("#episodeInp").val())[0]);
        $("#hint2").css("display", "none");
        $("#hint3").css("display", "none");
    } else {
        $(".hintConatiner").css("display", "none");
    }
}
function saveData(){
    savedEpisodesArr = [];
    for(let Iteam of $(".savedEpisodesIteam")){
        if($(Iteam).css("display") != "none"){
            if(Iteam.classList.contains("done")){
                savedEpisodesArr.push({
                    text: $(Iteam).text(),
                    classList: $(Iteam).attr("class"),
                })
            }else{
                savedEpisodesArr.push({
                    text: $(Iteam).text(),
                    classList: $(Iteam).attr("class"),
                })
            }
        }
        localStorage.savedData = JSON.stringify(savedEpisodesArr);
    }
}
if(localStorage.savedData != null){
    let arr = JSON.parse(localStorage.savedData);
    for(let i = 0; i<arr.length; i++){
        $(".savedEpisodesContainer").prepend(` <div class="${arr[i].classList}">
        <div class="savedEpisodesIteamBox">
            <div class="doneCheckBox">
                <img class="CheckedImg" src="./img/CheckBox.png" alt="o">
            </div>
            <span class="text">${arr[i].text}</span>
        </div>
        <div class="delite">
            <img class="del" src="./img/bin.png" alt="del">
        </div>
    </div>`);
    }
    $(".del").click( function(){
        $(this).closest(".savedEpisodesIteam").css("display", "none");
        saveData();
    });
    $(".doneCheckBox").click( function(){
        $(this).addClass("checked");
        $(this).closest(".savedEpisodesIteam").addClass("done");
        saveData();
    });
}
$("#episodeInp").focus(function () {
    $("#hint1").text(allEpisodesNames[0]);
    $("#hint2").text(allEpisodesNames[1]);
    $("#hint3").text(allEpisodesNames[2]);
    searchHintsDisplay();
    searchHint()
});
$(".hint").click(function () {
    $("#episodeInp").val($(this).text());
    $(".hintConatiner").css("display", "none");
});
$("#episodeInp").on("input", function () {
    searchHint();
});
$("#addBtn").click( function(){
    if($("#episodeInp").val() != ""){
        $(".savedEpisodesContainer").prepend(` <div class="savedEpisodesIteam">
        <div class="savedEpisodesIteamBox">
            <div class="doneCheckBox">
                <img class="CheckedImg" src="./img/CheckBox.png" alt="o">
            </div>
            <span class="text">${$("#episodeInp").val()}</span>
        </div>
        <div class="delite">
            <img class="del" src="./img/bin.png" alt="del">
        </div>
    </div>`);
    $("#episodeInp").val("");
    saveData();
    }
    $(".del").click( function(){
        $(this).closest(".savedEpisodesIteam").css("display", "none");
        saveData();
    });
    $(".doneCheckBox").click( function(){
        $(this).addClass("checked");
        $(this).closest(".savedEpisodesIteam").addClass("done");
        saveData();
    });
});