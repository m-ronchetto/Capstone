//dynamic text inputs
document.getElementById("name-input").addEventListener("input", function(){
    let name = document.getElementById("dynamic-letter-name");
    let active = document.getElementsByClassName("active-text");
    name.classList.add("selected");
    name.classList.remove("unselected");
    text = document.getElementById("name-input").value;
    Array.from(active).forEach((el) => el.classList.remove("active-text"));
    name.classList.add("active-text");
    if (text.length === 0){
        text = "(name)";
        name.classList.add("unselected");
        name.classList.remove("selected");
    }
    name.innerText = text;
});
document.getElementById("story-input").addEventListener("input", function(){
    let story = document.getElementById("dynamic-letter-story");
    let active = document.getElementsByClassName("active-text");
    story.classList.add("selected");
    story.classList.remove("unselected");
    text = document.getElementById("story-input").value;
    Array.from(active).forEach((el) => el.classList.remove("active-text"));
    story.classList.add("active-text");
    if (text.length === 0){
        text = "(Share your story)";
        story.classList.add("unselected");
        story.classList.remove("selected");
    }
    story.innerText = text;
});

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
    sidebar.classList.remove("hide");
    sidebar.classList.remove("show");
    sidebar.classList.add("full-preview");
    submit.style.display = "block";
    sidebar.style.visibility = "visible";
    document.getElementById("close").innerText = "Minimimze Preview";
    left.classList.remove("wide");
    left.classList.add("hide-left"); 
});

document.getElementById("submit-button").addEventListener("click", function(){
    document.getElementById("close").style.display = "none";
    const right = document.getElementById("right-column");
    let submit = document.getElementById("submit-button");
    right.classList.add("hide");
    submit.style.display = "none";
    right.classList.remove("full-preview");
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

