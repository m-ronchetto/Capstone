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
