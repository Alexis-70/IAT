// Stimuli arrays
const stimuliIo = ["Il mio nome", "Io", "Me stesso"];
const stimuliNonIo = ["Nome di un altro", "Lui", "Lei"];
const stimuliVergogna = ["Vergogna", "Umiliazione"];
const stimuliAnsia = ["Ansia", "Preoccupazione"];

let currentStimulus = '';
let startTime = 0;
let block = 1;
let correctResponse = '';

// Display the initial instruction
document.getElementById('instructions').textContent = "Premi la barra spaziatrice per iniziare il test.";

// Start the test when spacebar is pressed
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        startBlock();
    }
});

// Start the block
function startBlock() {
    document.getElementById('instructions').textContent = '';
    showNextStimulus();
}

// Function to show the next stimulus
function showNextStimulus() {
    let stimulusArray;
    if (block === 1 || block === 4) {
        stimulusArray = (Math.random() < 0.5) ? stimuliIo : stimuliNonIo;
        correctResponse = (stimulusArray === stimuliIo) ? 'Io' : 'Non Io';
    } else if (block === 2) {
        stimulusArray = (Math.random() < 0.5) ? stimuliVergogna : stimuliAnsia;
        correctResponse = (stimulusArray === stimuliVergogna) ? 'Io' : 'Non Io';
    }
    
    currentStimulus = stimulusArray[Math.floor(Math.random() * stimulusArray.length)];
    document.getElementById('stimulus').textContent = currentStimulus;
    startTime = performance.now();  // Record start time
}

// Button click handlers for mobile users
document.getElementById('left-button').addEventListener('click', function() {
    handleResponse('Io');
});

document.getElementById('right-button').addEventListener('click', function() {
    handleResponse('Non Io');
});

// Listen for responses via keyboard (for desktop users)
document.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowLeft') {
        handleResponse('Io');
    } else if (e.code === 'ArrowRight') {
        handleResponse('Non Io');
    }
});

// Handle the response and calculate the reaction time
function handleResponse(response) {
    let reactionTime = performance.now() - startTime;

    if (response === correctResponse) {
        document.getElementById('feedback').textContent = '';
        console.log('Tempo di reazione: ' + reactionTime + 'ms');
        // Continua con il prossimo stimolo
        showNextStimulus();
    } else {
        document.getElementById('feedback').textContent = 'Errore! X';
    }
}

// Change block and invert categories
function changeBlock() {
    block++;
    if (block > 5) {
        endTest();
    } else {
        showNextStimulus();
    }
}

function endTest() {
    document.getElementById('stimulus').textContent = 'Test completato!';
}
