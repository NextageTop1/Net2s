const ratingContainer = document.querySelector(".rating");
const ratingValue = document.getElementById("ratingValue");

ratingContainer.addEventListener("click", (event) => {
    if (event.target.type === "radio") {
        ratingValue.textContent = event.target.value;
    }
});