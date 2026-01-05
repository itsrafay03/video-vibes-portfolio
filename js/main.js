// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


// --- PASTE THE NEW CODE HERE (REPLACING THE OLD ONE) ---
// --- NEW PING-PONG AUTO SCROLL CODE ---
document.querySelectorAll('.auto-scroll').forEach(row => {
    let direction = 1; // 1 = Moving Forward, -1 = Moving Backward
    let isPaused = false;

    // Pause on hover
    row.addEventListener('mouseenter', () => isPaused = true);
    row.addEventListener('mouseleave', () => isPaused = false);

    setInterval(() => {
        // SAFETY CHECK: If content fits on screen, don't scroll
        if (row.scrollWidth <= row.clientWidth) return;

        if (!isPaused) {
            // Move the scroll bar
            row.scrollLeft += direction;

            // LOGIC: Check boundaries to flip direction

            // 1. Did we hit the End? (Right side)
            // We use a tiny buffer (-1) to make sure it catches the edge reliably
            if (Math.ceil(row.scrollLeft + row.clientWidth) >= row.scrollWidth - 1) {
                direction = -1; // Reverse -> Go Left
            }

            // 2. Did we hit the Start? (Left side)
            else if (row.scrollLeft <= 0) {
                direction = 1; // Reverse -> Go Right
            }
        }
    }, 20); // 25ms speed (Lower number = Faster)
});
// -------------------------------------------------------

// Thumbnail modal preview
const modal = document.getElementById("thumbnailModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".thumbnail-item").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
    });
});

closeModal.onclick = () => modal.style.display = "none";

modal.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
};

document.addEventListener("keydown", e => {
    if (e.key === "Escape") modal.style.display = "none";
});