// https://codepen.io/gromovich/pen/LRzVBa

var items = document.querySelectorAll('.carousel .item');
var currentItem = 0;
var isEnabled = true;

function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

function goToItem(n) {
	if (n < currentItem) {
		hideItem('to-right');
		currentItem = n;
		showItem('from-left');
	} else {
		hideItem('to-left');
		currentItem = n;
		showItem('from-right');
	}
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('nextcar', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('nextcar', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

document.querySelector('.carousel-control.left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.carousel-control.right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});


//current step in nav bar
function currentStep(step){
    Array.from(document.getElementsByClassName("current")).forEach((el) => el.classList.remove("current"));
        document.getElementById(step+"-header").classList.add("current");
}

["DOMContentLoaded", "scroll"].forEach((event) => document.addEventListener(event, function(){
	let array = ["home", "stories", "how", "about"];
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

//tooltips
Array.from(document.getElementsByClassName("highlighting")).forEach((el, index, fullArray) => el.addEventListener("mouseover", function(event){
    document.getElementById("tip-"+(index+1)).classList.add("visible");
}));

Array.from(document.getElementsByClassName("highlighting")).forEach((el, index, fullArray) => el.addEventListener("mouseout", function(event){
    console.log(document.getElementById('tip-'+(index+1)).classList);
    document.getElementById("tip-"+(index+1)).classList.remove("visible");
}));
