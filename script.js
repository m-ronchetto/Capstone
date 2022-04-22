//dynamic text inputs
document.getElementById("name-input").addEventListener("input", function(){
    let name = document.getElementsByClassName("dynamic-letter-name");
    text = document.getElementById("name-input").value;

    Array.from(name).forEach(function(element) {
        element.classList.add("selected");
        element.classList.remove("unselected");
        element.innerText = text;

    });
    if (text.length === 0){
        text = "(name)";
        Array.from(name).forEach(function(element) {
            element.classList.add("unselected");
            element.classList.remove("selected");
            element.innerText = text;
        });
    }
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
    story.innerText = text;
});
document.getElementById("custom-cta").addEventListener("click", function(event){
    event.preventDefault();
    event.stopPropagation();
});
document.getElementById("custom-cta").addEventListener("input", function(){
    let name = document.getElementById("action-4-li");
    name.classList.add("selected");
    name.classList.remove("unselected");
    text = document.getElementById("custom-cta").value;
    if (text.length === 0){
        name.classList.add("unselected");
        name.classList.remove("selected");
    }
    name.innerText = text;
});

//radio actions
document.getElementById("radio-button").addEventListener("click", function(event){
    //find which radio is active
    //if none are active, tip asking to choose an option
    //if option 1 is active, send to step 4 and use current text and show "share your story" on preview
    //if option 2 is active, send to step 4 and use option 2 text and show "share your story" on preview
    //if option 3 is active, send to step 5 and hide "share your story" on preview


    // determine which radio button is checked
    let checked = -1;
    let divs = document.getElementsByClassName('radio');
    Array.from(divs).forEach(function(element,index){
        if (element.classList.contains('clicked')){
            checked = index;
        }
    });
    // if nothing selected, do nothing
    if (checked == -1){
        event.preventDefault();
    // if one of the first two options is selected, go to step 4 (update <a> parent to go to step 4, allow event to propagate to parent)
    } else if (checked == 0) {
        document.getElementById("radio-button").parentElement.setAttribute("href", "#step-4");
        document.getElementsByClassName("step-4-ul")[0].classList.remove("hidden");
        document.getElementsByClassName("step-4-ul")[1].classList.add("hidden");
        document.getElementById("step-4-prompt").innerText = "is important to you";
    // if "skip" option selected, update parent to go to step 5 instead of step 4
    } else if (checked == 1) {
        document.getElementsByClassName("step-4-ul")[1].classList.remove("hidden");
        document.getElementsByClassName("step-4-ul")[0].classList.add("hidden");
        document.getElementById("step-4-prompt").innerText = "has impacted your life";
    } else {
        document.getElementById("radio-button").parentElement.setAttribute("href", "#step-5");
    }

})


//dynamnic checkbox inputs
function updateAction(el, divId){
    if (el.checked){
        document.getElementById(divId).classList.remove("hidden");
    }
    else{
        document.getElementById(divId).classList.add("hidden");
    }
}
function updateRadioAction(radioId, divId){
    let el = document.getElementById(radioId);
    if (el.checked){
        document.getElementById(divId).classList.remove("hidden");
    }
    else{
        document.getElementById(divId).classList.add("hidden");
    }
}

//checkbox click selection
// must stop propagation to prevent the event from also triggering the surrounding div event listener (below)
function checkClickFunction(event, el){
    event.stopPropagation();
    let parent = el.parentElement;
    if (parent.classList.contains("clicked")){
        parent.classList.remove("clicked");
    }
    else{
        parent.classList.add("clicked");
    }
    el.setAttribute("checked", !el.getAttribute("checked"));
}
function checkRadioFunction(event, el){
    event.stopPropagation();
    let parent = el.parentElement;
    if (parent.classList.contains("clicked")){
        parent.classList.remove("clicked");
        el.removeAttribute("checked");
    }
    else{
        Array.from(document.getElementsByClassName("radio")).forEach(
            (pars) => {
                pars.classList.remove("clicked")
                pars.firstElementChild.removeAttribute("checked");
        });
        parent.classList.add("clicked");
        el.setAttribute("checked", true);
    }
}

// if parent of checkbox clicked, pass event on to child
// preventDefault to account for clicking on the label - 
// clicking on the label checks the box without calling the above event listener
// however, it will call this event listener, which will then call the above listener
// which would un-check the box
// preventDefault prevents the initial checking of the box
function checksClickFunction(event, el){
    event.preventDefault();
    let child = el.firstElementChild;
    child.click();
}

Array.from(document.getElementsByClassName("check")).forEach((el, index) => el.addEventListener("click", function(event){
    checkClickFunction(event, el);
    if(document.getElementById("action-4").parentElement.classList.contains("clicked")){
        document.getElementById("custom-cta").classList.remove("hidden");
    }else{
        document.getElementById("custom-cta").classList.add("hidden");
    }
    updateAction(el, "action-"+(index+1)+"-li");
}));
Array.from(document.getElementsByClassName("checks")).forEach((el) => el.addEventListener("click", function(event){
    checksClickFunction(event, el);
}));
Array.from(document.getElementsByClassName("radio")).forEach((el, index) => el.addEventListener("click", function(event){
    event.preventDefault();
    let child = el.firstElementChild;
    checkRadioFunction(event, child);    
}));

//current step in nav bar
function currentStep(step){
    let progress = document.getElementById("percent-done");
    progress.style.width = (20*step + "%");
    Array.from(document.getElementsByClassName("current-step")).forEach((el) => el.classList.remove("current-step"));
        document.getElementById("step-"+step+"-header").classList.add("current-step");
    // Array.from(document.getElementsByClassName("step-subtitle")).forEach(function(el){
    //     el.classList.remove("step-subtitle");
    //     el.classList.add("step-subtitle-hidden");
    // });
    // document.getElementById("step-" + step + "-subtitle").classList.remove("step-subtitle-hidden");
    // document.getElementById("step-" + step + "-subtitle").classList.add("step-subtitle");
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
    let submit = document.getElementById("submit-button");
    if (sidebar.classList.contains("hide")){
        submit.style.display = "none";
        sidebar.style.visibility = "visible";
        sidebar.classList.remove("hide");
        sidebar.classList.add("show");
        document.getElementById("close").innerText = "Close Preview";
        left.classList.remove("wide"); 
    }
    else if (sidebar.classList.contains("full-preview")){
        submit.style.display = "none";
        sidebar.classList.remove("full-preview");
        sidebar.classList.add("show");
        document.getElementById("close").innerText = "Close Preview";
        left.classList.remove("hide-left"); 
    }  else {
        submit.style.display = "none";
        sidebar.classList.remove("show");
        sidebar.classList.add("hide"); 
        // hide from DOM after animation finishes, if the button hasn't been clicked again      
        setTimeout(() => {
            if (sidebar.classList.contains("hide")){
                sidebar.style.visibility = "hidden";
            }
        }, 1000);
        document.getElementById("close").innerText = "Show Preview";
        console.log(sidebar.style.display);
        left.classList.add("wide");
    }
});

document.getElementById("preview-button").addEventListener("click", function(){
    let sidebar = document.getElementById("right-column");
    let left = document.getElementById("left-column");
    let submit = document.getElementById("submit-button");
    //make full screen
    if(window.matchMedia("(max-width: 992px)").matches){
        //
        sidebar.scrollIntoView({behavior: 'smooth'});
        submit.style.display = "block";
    }
    else{
        sidebar.classList.remove("hide");
        sidebar.classList.remove("show");
        sidebar.classList.add("full-preview");
        submit.style.display = "block";
        sidebar.style.visibility = "visible";
        left.classList.remove("wide");
        left.classList.add("hide-left"); 
        document.getElementById("close").innerText = "Minimimze Preview";
    }
});

function validateForm(){
    let reps = document.querySelectorAll("#representative-form>.checks.clicked");
    if (reps.length == 0){
        return [false, "Error: Must select at least one representative."];
    }
    let name = document.getElementById("name-input").value;
    if (name.trim().length == 0){
        return [false, "Error: Must enter your name."];
    }
    let calls = document.querySelectorAll("#form-5>.checks.clicked");
    if (calls.length == 0){
        return [false, "Error: must choose at least one call to action."];
    }
    if (calls.length == 1 && calls[0].lastChild.tagName.toUpperCase() == "INPUT" && calls[0].lastChild.value.trim().length == 0){
        return [false, "Error: custom call to action cannot be empty."];
    }
        
    return [true, ""];
}

function submitForm(){
    // validate form
    let [valid, msg] = validateForm();
    if (!valid){
        alert(msg);
        return false;
    }
    let mailto = 'mailto:?';
    // construct address list
    let email_list = selectedRepresentatives.map((el) => emails[el]).join(",");
    mailto += "bcc=" + encodeURIComponent(email_list);
    // add subject line
    mailto += "&subject=" + encodeURIComponent("Addressing " + sessionStorage.getItem("topic") + " in St. Louis");
    // construct message body
    let body = document.getElementById("intro").innerText;
    body += "\n\n" + document.getElementById("location").innerText;
    body += "\n\n" + document.getElementById("topic-paragraph").innerText;
    let shared_story = document.getElementById("story-input").value;
    if (shared_story.trim().length > 0){
        body += "\n\n" + shared_story.trim();
    }
    let calls_to_action = document.querySelectorAll("#form-5>.checks.clicked");
    if (calls_to_action.length == 1){
        body += "\n\nThis is how I would like you to commit to taking action:";
    }else{
        body += "\n\nThese are the steps I would like you to commit to to take action:"
    }
    let calls_text = Array.from(calls_to_action).map(function(el){
        if (el.lastChild.tagName.toUpperCase() == "LABEL"){
            return el.lastChild.textContent.trim();
        }else{
            return el.lastChild.value.trim();
        }
    });
    console.log(calls_text);
    let calls_filtered = calls_text.filter((el) => el.length > 0);
    let calls_joined = calls_filtered.join("\n - ")
    body += "\n - " + calls_joined;
    body += "\n\nSincerely,";
    body += "\n" + document.getElementById("name-input").value.trim();

    mailto += "&body=" + encodeURIComponent(body);
    const form = document.getElementById("submission");
    form.setAttribute("action", mailto);
    form.submit();

    return true;
}

document.getElementById("submit-button").addEventListener("click", function(event){
    if (submitForm()){
        document.getElementById("close").style.display = "none";
        document.getElementById("submit").classList.remove("hidden");
        const right = document.getElementById("right-column");
        let submit = document.getElementById("submit-button");
        right.classList.add("hide");
        submit.style.display = "none";
        right.classList.remove("full-preview");
    }else{
        event.preventDefault();
    }
});

//zipcode matching user to representative:
//step 1: detect input and validate it as a zipcode, and particularly one covered by my table
//step 2: find the zipcode the user entered in my table and return a list of representatives
//step 3: create a checkbox element for each representative in list
//step 4: update right text with list of representatives and county text appropriately
//step 5: delete all checkboxes if new zipcode is submitted
const re = /^\d{5}$/;
// structure: zipdata is a dict. keys are zip codes. values are dicts with keys:
// County, US Senate 1, US Senate 2, US House, MO Senate, Governor, Mayor
let selectedRepresentatives = [];

function updateRepresentatives(){
    //update right column with selected representative and user's county
    let rep = document.getElementById("dynamic-letter-rep");
    // if nothing, filler is (representative)
    if (selectedRepresentatives.length === 0){
        rep.innerText = "(representative)";
        rep.classList.add("unselected");
        rep.classList.remove("selected");
    }else{
        // if one rep selected, just the rep name
        if (selectedRepresentatives.length === 1){
            rep.innerText = selectedRepresentatives[0];
        }else{
            // otherwise, join all but last rep with commas
            const remainder = selectedRepresentatives.slice(0, selectedRepresentatives.length-1);
            rep.innerText = remainder.join(", ");
            // oxford comma if > 2 things in the list
            if (remainder.length > 1){
                rep.innerText += ","
            }
            // add final representative with "and" 
            rep.innerText += " and " + selectedRepresentatives[selectedRepresentatives.length-1];
        }
        rep.classList.add("selected");
        rep.classList.remove("unselected");
    }
}

document.getElementById("zip-submit").addEventListener("click", function(event){
    event.preventDefault();
    let text = document.getElementById("zip-input").value;
    //checks if it is zip code length
    let county = document.getElementById("dynamic-letter-county");
    const formTarget = document.getElementById("representative-form");
    const error = document.getElementById("error");
    formTarget.innerHTML = "";
    selectedRepresentatives = [];
    updateRepresentatives();

    if(re.test(text)){
        //checks if it is in the table 
        if (text in zipdata){
            // zip code is valid
            // attributes: "County", "US Senate 1", "US Senate 2", "US House", "MO Senate", "Governor", "Mayor"
            error.classList.add("hidden");
            const data = zipdata[text];
            let i = 0;

            county.innerText = data["County"];
            county.classList.add("selected");
            county.classList.remove("unselected");
            for (const [key, value] of Object.entries(data)) {
                const currentI = i;
                if (key === "County"){
                    continue;
                }
                // key: their title, value: the value in the dictionary
                const container = document.createElement("div");  
                container.classList.add("checks");
    
                const container_input = document.createElement("input");
                container_input.classList.add("check");
                container_input.id = "representative-form-option-" + i;
                container_input.setAttribute("name", "");
                container_input.setAttribute("type", "checkbox");
    
                const container_label = document.createElement("label");
                container_label.setAttribute("for", "representative-form-option-" + i);
                container_label.innerText = key + ": " + value;
    
                container.addEventListener("click", function(event){
                    checksClickFunction(event, container);
                });
                container_input.addEventListener("click", function(event){
                    checkClickFunction(event, container_input);
                    if (selectedRepresentatives.includes(value)){
                        selectedRepresentatives = selectedRepresentatives.filter((x) => x !== value);
                    }else{
                        selectedRepresentatives.push(value);
                    }
                    updateRepresentatives();
                });
                container.appendChild(container_input);
                container.appendChild(container_label);

                formTarget.appendChild(container);
                i = i+1;
            }
            location.hash = "#";
            location.hash = "#select-representatives";
           

        } else{
            // handle case if zip not in list of zips
            // error: not a supported zip code
            error.classList.remove("hidden");

            error.firstChild.innerText = "Error: Your zip code is not currently supported at this time. Write change has data for St. Louis County and St. Louis City County only.";
            
            county.innerText = "(location)";
            county.classList.add("unselected");
            county.classList.remove("selected");

        }
    } else{
        // error: invalid zip code format
        error.classList.remove("hidden");

        error.firstChild.innerText = "Error: Please enter a 5 digit zip code.";
        
        county.innerText = "(location)";
        county.classList.add("unselected");
        county.classList.remove("selected");
    }
});

//tooltips
Array.from(document.getElementsByClassName("highlighting")).forEach((el, index, fullArray) => el.addEventListener("mouseover", function(event){
    document.getElementById("tip-"+(index+1)).classList.add("visible");
}));

Array.from(document.getElementsByClassName("highlighting")).forEach((el, index, fullArray) => el.addEventListener("mouseout", function(event){
    console.log(document.getElementById('tip-'+(index+1)).classList);
    document.getElementById("tip-"+(index+1)).classList.remove("visible");
}));

//carousel?
let liEls = document.querySelectorAll('ul li');
let index = 0;
window.show = function(increase) {
  index = index + increase;
  index = Math.min(Math.max(index,0), liEls.length-1);
  liEls[index].scrollIntoView({behavior: 'smooth'});
}

if (sessionStorage.getItem('topic') == null){
    sessionStorage.setItem('topic', 'air pollution');
}
const topic_string = sessionStorage.getItem('topic');

Array.from(document.getElementsByClassName("topic")).forEach((element) => element.innerText = topic_string);

const topic_paragraphs = {
    'air pollution': '<a class="selected" href="#step-1">Air pollution</a> contributes to premature death, heart attacks, aggravated asthma, and reduced lung function. St. Louis has been in violation of the federal health-based air standard for ozone since 1979.',
    'safe water': 'There is no safe level of exposure to lead in our <a class="selected" href="#step-1">drinking water.</a> Lead poisoning has been occurring much longer and the rates continue to be higher in the northern section of the city and southern along highway 55.',
    'mold': '<a class="selected" href="#step-1">Mold</a> is expensive to remove, there are no legal standards for mold exposure, and landlords often refuse to do anything about it. Addressing mold is out of reach for many who are most affected by it.',
    'food access': '<a class="selected" href="#step-1">Access to healthy food</a> is associated with lower risk for obesity and other diet-related chronic diseases. Access to a car allows people to leave the food desert and shop at supermarkets and large grocery stores outside of their neighborhoods.'
};

document.getElementById("topic-paragraph").innerHTML = topic_paragraphs[topic_string];