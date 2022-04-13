//current step in nav bar
function currentStep(step){
    Array.from(document.getElementsByClassName("current")).forEach((el) => el.classList.remove("current"));
        document.getElementById(step+"-header").classList.add("current");
}

["DOMContentLoaded", "scroll"].forEach((event) => document.addEventListener(event, function(){
	let array = ["air-pollution-choose", "safe-water-choose", "mold-choose", "food-access-choose"];
    let step = 0;
    let min_value = Number.POSITIVE_INFINITY;
    for (let i=0; i<4; i++){
        let element = document.getElementById(array[i]);
        if (Math.abs(element.getBoundingClientRect().top)<min_value){
            step = i +1;
            min_value = Math.abs(element.getBoundingClientRect().top);
        }
    } 
    currentStep(step);
}));