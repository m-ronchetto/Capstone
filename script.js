document.getElementById("name-input").addEventListener("input", function(){
    text = document.getElementById("name-input").value;
    if (text.length === 0){
        text = "(name)";
    }
    document.getElementById("dynamic-letter-name").innerText = text;
});
document.getElementById("story-input").addEventListener("input", function(){
    text = document.getElementById("story-input").value;
    if (text.length === 0){
        text = "(Share your story)";
    }
    document.getElementById("dynamic-letter-story").innerText = text;
});
// let topic = document.querySelectorAll('input[name="topic"]');




// let i = 0;
// doucment.addEventListener("scroll", function(){
//     if (document.body.scrollTop > 500) {
//         //remove ith buttons selection
//         // document.getElementById()
//         // a:nth-child(i)
//         // i++;
//         //add new i's selection
//       }
// });