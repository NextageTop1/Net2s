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
function calcularTotal() {
    var total = 0;
    var qtdProdutos = document.querySelectorAll('[class^="Qtd"]');
    var precos = document.querySelectorAll('.preco');

    qtdProdutos.forEach((element, index) => {
        var qtd = parseInt(element.textContent);
        var preco = parseFloat(precos[index].textContent);
        total += qtd * preco;
    });

    // Atualiza o elemento que exibe o total no carrinho
    var totalElement = document.querySelector('.total');
    if (totalElement) {
        totalElement.textContent = total;
    }
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
    return calcularTotal()
}
function remove_item(item_id)
{
    if(confirm("Certeza?"))
    {
        window.location.href = `/remove_item?id=${item_id}`;
    }
}