const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button")
const fromText = document.querySelector(".from")
const toText = document.querySelector(".to");
const exchangeButton = document.getElementById("exchangeIcon");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id)=>{
    for (const countryCode in countries) {
        let selected;
        if( id===0 && countryCode=="en-GB"){
            selected="selected";
        }
        else if(id===1 && countryCode=="ur-PA"){
            selected = "selected"
        }
        let option = `<option value="${countryCode}" ${selected}>${countries[countryCode]}</option>` 
        tag.insertAdjacentHTML("beforeend", option)    
    }
})

translateBtn.addEventListener("click",()=>{
    let text = fromText.value,
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    let api = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(api).then(res=> res.json()).then(data=>{
        toText.value = data.responseData.translatedText
    })
   
    
})

exchangeButton.addEventListener('click',()=>{
    let tempText = fromText.value;
    fromText.value = toText.value;
    toText.value = tempText;

    let tempSelect = selectTag[0].value;
    selectTag[0].value = selectTag[1].value;
    selectTag[1].value = tempSelect

})

icons.forEach(icon=>{
    icon.addEventListener('click',({target})=>{
        if(target.classList.contains("fa-copy")){
            if(target.id==="from"){
                navigator.clipboard.writeText(fromText.value)
            }
            else{
                navigator.clipboard.writeText(toText.value)
            }
        }
        else{
            let utterance;
            if(target.id==="from"){
                utterance = new SpeechSynthesisUtterance(fromText.value)
                utterance.lang = selectTag[0].value       
            }
            else{
                utterance = new SpeechSynthesisUtterance(toText.value)
                utterance.lang = selectTag[1].value
            } 
            const voices = speechSynthesis.getVoices();
            utterance.voice = voices[2];
            speechSynthesis.speak(utterance) 
        }

    })
})