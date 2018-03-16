window.onload = function(){
    var lzbk = document.getElementsByClassName("lzbk")[0];
    var ldbk = document.getElementsByClassName("ldbk")[0];
    var zhang = document.getElementById("zhang");
    var die = document.getElementById("die");

    zhang.onclick = function(){
        zhang.className = "onfocus";
        die.className = "";
        lzbk.style.display = "block";
        ldbk.style.display = "none";
    }
    die.onclick = function(){
        die.className = "onfocus";
        zhang.className = "";
        ldbk.style.display = "block";
        lzbk.style.display = "none";
    }
}