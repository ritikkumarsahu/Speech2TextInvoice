const SpeechRecognition = window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

const speakbtn = document.querySelector('a')
const question = document.querySelector('#question')
const answer = document.querySelector('#answer')
let content = ''

const qestionList = 
[
    'Talgo Name',
    'Country Code',
    'Document Type',
    'Software Certificate',
    'Supplier NIF Number',
    'Supplier Name',
    'Invoice Number',
    'Invoice Date',
    'Due Date',
    'Buyer NIF Number',
    'Software Certificate Hash',
    'Base Amount',
    'Tax Amount'
    ]
let questionIndex = 0

// DOM elements fields
const Talgo_Name = document.querySelector('#formTalgoname');
const Country_Code = document.querySelector('#formCountryCode');
const Document_Type = document.querySelector('#formDocumentType');
const Software_Certificate = document.querySelector('#certificateNumber');
const Supplier_NIF_Number = document.querySelector('#supplier_nif_number');
const Supplier_Name = document.querySelector('#supplierName');
const Invoice_Number = document.querySelector('#InvoiceNumber');
const Invoice_Date = document.querySelector('#Invoice-Date');
const Due_Date = document.querySelector('#Due-Date');
const Buyer_NIF_Number = document.querySelector('#buyer');
const Software_Certificate_Hash = document.querySelector('#certprogramhasg');
const Base_Amount = document.querySelector('#BaseAmount');
const Tax_Amount = document.querySelector('#TaxAmount');
const Total_Amount = document.querySelector('#TotalAmount');

const DomList = [Talgo_Name,Country_Code,Document_Type,Software_Certificate,Supplier_NIF_Number,Supplier_Name,Invoice_Number,Invoice_Date,Due_Date,Buyer_NIF_Number,Software_Certificate_Hash,Base_Amount,Tax_Amount]

recognition.continuous = true

recognition.onstart = () => {
    let start_speak_btn = document.querySelector('a#start_speak')
    start_speak_btn.querySelector('span').innerText = 'Stop';
    start_speak_btn.classList.replace('btn-info','btn-danger');
    start_speak_btn.classList.add('wave-btn');
    start_speak_btn.id = "stop_speak";

    question.innerText = 'Say ' + qestionList[questionIndex];
}

recognition.onend = () =>{
    let stop_speak_btn = document.querySelector('a#stop_speak')
    stop_speak_btn.querySelector('span').innerText = 'Start';
    stop_speak_btn.classList.replace('btn-danger','btn-info');
    stop_speak_btn.classList.remove('wave-btn');
    stop_speak_btn.id = "start_speak";
}

recognition.onerror = (event) =>{
    console.error(event)
    answer.innerText = "Try Again!";
}

recognition.onresult = function(event){
    var curIndex = event.resultIndex;
    var transcript = event.results[curIndex][0].transcript;
    content = transcript;
    answer.innerText = content;
    DomList[questionIndex].value = content;
    questionIndex += 1;
    question.innerText = 'Say ' + qestionList[questionIndex];
}

speakbtn.addEventListener('click', function(){
    content = ''
    if (speakbtn.id === 'start_speak'){
       recognition.start();
    }
    else{
        recognition.stop();
    }
});