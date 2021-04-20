//글귀 입력.
const passages = [
    "Day by day, in every way, I'm getting better and better.",
    "Day by day, in every way, I'm getting better and better.",
    "Day by day, in every way, I'm getting better and better.",
    "Day by day, in every way, I'm getting better and better.",
    "Day by day, in every way, I'm getting better and better."
];
function doRandomPassage() {
    const randomIndex = Math.floor(Math.random() * passages.length);
    $('#passage').text(passages[randomIndex]);
}
