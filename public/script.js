let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.querySelectorAll(".slide");
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    slideIndex++;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 4000); // Altera a imagem a cada 2 segundos (2000ms)
}
function calcular() {
    var preco = parseFloat(document.querySelector(".preco").textContent);
    var qtd = parseInt(document.getElementById("Qtd").textContent);
    var totalElement = document.getElementById("total");
    var total = parseFloat(totalElement.textContent);
    total = preco * qtd;
    totalElement.textContent = total;
}
function aumentar(x, index) {
    var qtdElement = document.querySelector('.Qtd' + index);
    var qtd = parseInt(qtdElement.textContent);

    if (x === 1) {
        qtd += 1;
    } else if (x === 2) {
        qtd -= 1;
    }
    qtd = Math.max(qtd, 0); // Impede quantidade negativa
    qtdElement.textContent = qtd;
    calcular();
}