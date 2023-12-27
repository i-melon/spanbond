
document.addEventListener('DOMContentLoaded', function() {
    function showModal(){
        document.getElementById("numberForm").style.display="flex";
    }
    document.getElementById("mainButton1").addEventListener("click", showModal)
    document.getElementById("mainButton2").addEventListener("click", showModal)
    document.getElementById("mainButton3").addEventListener("click", showModal)
    document.getElementById("mainButton4").addEventListener("click", showModal)
    document.getElementById("mainButton5").addEventListener("click", showModal)
    document.getElementById("mainButton6").addEventListener("click", showModal)
    document.getElementById("mainButton7").addEventListener("click", showModal)
    document.getElementById("mainButton8").addEventListener("click", showModal)
    document.getElementById("mainButton9").addEventListener("click", showModal)
    document.getElementById("closeModal").addEventListener("click", function (){
        document.getElementById("numberForm").style.display="none"
    })





    spanbondButton = document.getElementById("spanbond").addEventListener("click", doSpanbond);
    plenkaButton = document.getElementById("plenka").addEventListener("click", doPlenka);
    prosButton = document.getElementById("pros").addEventListener("click", doPros);
    document.getElementById("spanbond").style.color = "#FFF";
    document.getElementById("spanbond").style.backgroundColor = "#6EB762";
    function doSpanbond(){
        document.getElementById("spanbond").style.color = "#FFF";
        document.getElementById("spanbond").style.backgroundColor = "#6EB762";
        document.getElementById("plenka").style.color = "";
        document.getElementById("plenka").style.backgroundColor = "";
        document.getElementById("pros").style.color = "";
        document.getElementById("pros").style.backgroundColor = "";
        document.getElementById("spanbondUse").style.display = "grid"
        document.getElementById("puzyriUse").style.display = "none"
        document.getElementById("prostynUse").style.display = "none"
    }
    function doPlenka(){
        document.getElementById("spanbond").style.color = "";
        document.getElementById("spanbond").style.backgroundColor = "";
        document.getElementById("plenka").style.color = "#FFF";
        document.getElementById("plenka").style.backgroundColor = "#6EB762";
        document.getElementById("pros").style.color = "";
        document.getElementById("pros").style.backgroundColor = "";
        document.getElementById("spanbondUse").style.display = "none"
        document.getElementById("puzyriUse").style.display = "grid"
        document.getElementById("prostynUse").style.display = "none"
    }
    function doPros(){
        document.getElementById("spanbond").style.color = "";
        document.getElementById("spanbond").style.backgroundColor = "";
        document.getElementById("plenka").style.color = "";
        document.getElementById("plenka").style.backgroundColor = "";
        document.getElementById("pros").style.color = "#FFF";
        document.getElementById("pros").style.backgroundColor = "#6EB762";
        document.getElementById("spanbondUse").style.display = "none"
        document.getElementById("puzyriUse").style.display = "none"
        document.getElementById("prostynUse").style.display = "grid"
    }

    document.getElementById("mySelect").addEventListener("change", function () {
        // Получаем выбранное значение внутри обработчика события change
        var selectedValue = document.getElementById("mySelect").value;

        // Преобразуем selectedValue в число, так как сравниваем с числами
        selectedValue = parseInt(selectedValue);

        if (selectedValue === 1) {
            doSpanbond();
        } else if (selectedValue === 2) {
            doPlenka();
        } else {
            doPros();
        }
    });





});