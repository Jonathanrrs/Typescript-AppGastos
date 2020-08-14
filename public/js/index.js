"use strict";
var bAdd = document.querySelector("#bAdd");
var inputTitle = document.querySelector("#title");
var inputCost = document.querySelector("#cost"); /* esta forma se le hace el casting del valor que se recibe, es lo mismo */
var inputCurrency = document.querySelector("#currency"); /* otra forma */
/* Sin un import module o algo porque en el index.js se indica que primero va el exponses y después el index */
var expenses = new Expenses('USD');
render();
/* se añade el ? como un optional, nos permite que el objeto puede estar vacio o no */
/* bAdd?.addEventListener() */
/* con ! es para indicarle que no será null */
bAdd.addEventListener("click", function (e) {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) { /* marca error el .value porque tsc no sabe que el elemento es de un elemento html es por eso que debemos indicar a las variables que extraemos su tipo */
        var title = inputTitle.value;
        var cost = parseFloat(inputCost.value);
        var currency = inputCurrency.value;
        expenses.add({ title: title, cost: { number: cost, currency: currency } });
        render();
    }
    else {
        alert('Completa los datos correctamente');
    }
});
function render() {
    var html = '';
    expenses.getItems().forEach(function (item) {
        var id = item.id, title = item.title, cost = item.cost;
        var number = cost.number, currency = cost.currency;
        html += "\n        <div class=\"item\">\n            <div><span class=\"currency\">" + currency + "</span> " + number + " </div>\n            <div>" + title + "</div>\n            <div><button class=\"bEliminar\" data-id=\"" + id + "\">Eliminar</button></div>\n        </div>\n        ";
    });
    $("#items").innerHTML = html;
    $("#display").textContent = expenses.getTotal();
    $$(".bEliminar").forEach(function (bEliminar) {
        bEliminar.addEventListener("click", function (e) {
            var id = e.target.getAttribute("data-id");
            expenses.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
