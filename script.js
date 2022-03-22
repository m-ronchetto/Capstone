//dynamic text inputs
document.getElementById("name-input").addEventListener("input", function(){
    let name = document.getElementById("dynamic-letter-name");
    name.classList.add("selected");
    name.classList.remove("unselected");
    text = document.getElementById("name-input").value;
    if (text.length === 0){
        text = "(name)";
        name.classList.add("unselected");
        name.classList.remove("selected");
    }
    document.getElementById("dynamic-letter-name").innerText = text;
});
document.getElementById("story-input").addEventListener("input", function(){
    let story = document.getElementById("dynamic-letter-story");
    story.classList.add("selected");
    story.classList.remove("unselected");
    text = document.getElementById("story-input").value;
    if (text.length === 0){
        text = "(Share your story)";
        story.classList.add("unselected");
        story.classList.remove("selected");
    }
    document.getElementById("dynamic-letter-story").innerText = text;
});

//dynamnic checkbox inputs
function updateAction(step){
    let el = document.getElementById("action-"+step);
    if (el.checked){
        document.getElementById("action-"+step+"-li").classList.remove("hidden");
    }
    else{
        document.getElementById("action-"+step+"-li").classList.add("hidden");
    }
}
//checkbox click selection
// must stop propagation to prevent the event from also triggering the surrounding div event listener (below)
Array.from(document.getElementsByClassName("check")).forEach((el, index, fullArray) => el.addEventListener("click", function(event){
    event.stopPropagation();
    let step = index + 1;
    let parent = el.parentElement;
    if (parent.classList.contains("clicked")){
        parent.classList.remove("clicked");
        updateAction(step);
    }
    else{
        parent.classList.add("clicked");
        updateAction(step);
    }
    el.setAttribute("checked", !el.getAttribute("checked"));
}));
// if parent of checkbox clicked, pass event on to child
// preventDefault to account for clicking on the label - 
// clicking on the label checks the box without calling the above event listener
// however, it will call this event listener, which will then call the above listener
// which would un-check the box
// preventDefault prevents the initial checking of the box
Array.from(document.getElementsByClassName("checks")).forEach((el) => el.addEventListener("click", function(event){
    event.preventDefault();
    let child = el.firstElementChild;
    child.click();
}));

//current step in nav bar
function currentStep(step){
    Array.from(document.getElementsByClassName("current-step")).forEach((el) => el.classList.remove("current-step"));
        document.getElementById("step-"+step+"-header").classList.add("current-step");
    Array.from(document.getElementsByClassName("step-subtitle")).forEach(function(el){
        el.classList.remove("step-subtitle");
        el.classList.add("step-subtitle-hidden");
    });
    document.getElementById("step-" + step + "-subtitle").classList.remove("step-subtitle-hidden");
    document.getElementById("step-" + step + "-subtitle").classList.add("step-subtitle");
}

["DOMContentLoaded", "scroll"].forEach((event) => document.addEventListener(event, function(){
    let step = 1;
    let min_value = Number.POSITIVE_INFINITY;
    for (let i=1; i<=5; i++){
        let element = document.getElementById("step-"+i+"-div");
        if (Math.abs(element.getBoundingClientRect().top)<min_value){
            step = i;
            min_value = Math.abs(element.getBoundingClientRect().top);
        }
    } 
    currentStep(step);
}));

//preview toggling
document.getElementById("close").addEventListener("click", function(){
    let sidebar = document.getElementById("right-column");
    let left = document.getElementById("left-column");
    if (sidebar.classList.contains("hide")){
        sidebar.classList.remove("hide");
        sidebar.classList.add("show");
        setTimeout(()=>{
            if (sidebar.classList.contains("show")){
                sidebar.classList.remove("show");
            }
        }, 1000);
        sidebar.style.display = "block";
        document.getElementById("close").innerText = "Close Preview";
        left.classList.remove("wide"); 
    }
    else{
        sidebar.classList.remove("show");
        sidebar.classList.add("hide");       
        setTimeout(() => {
            if (sidebar.classList.contains("hide")){
                sidebar.style.display = "none";
            }
        }, 900);
        document.getElementById("close").innerText = "Show Preview";
        console.log(sidebar.style.display);
        left.classList.add("wide");
    }
});