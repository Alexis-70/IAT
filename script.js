let stimuliIo = ["Il mio nome", "Io", "Me stesso"];
let stimuliNonIo = ["Nome di un altro", "Lui", "Lei"];
let stimuliVergogna = ["Vergogna", "Umiliazione"];
let stimuliAnsia = ["Ansia", "Preoccupazione"];

let currentStimulus = '';
let startTime = 0;
let block = 1;
let correctResponse = '';
let trialsCompleted = 0;  // Contatore delle prove completate per il blocco corrente

document.getElementById('instructions').textContent = "Premi la barra spaziatrice per iniziare il test.";

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        if (block === 1) {
            startTest();
        } else {
            startTest();  // Avvia il test per i blocchi successivi
        }
    } else if (e.code === 'ArrowLeft') {
        handleResponse('Io');
    } else if (e.code === 'ArrowRight') {
        handleResponse('Non Io');
    }
});

function startTest() {
    console.log('Avvio del test per il blocco:', block);
    document.getElementById('instructions').textContent = '';
    trialsCompleted = 0;
    showNextStimulus();
}

function showNextStimulus() {
    let stimulusArray;
    
    console.log('Mostrare il prossimo stimolo per il blocco:', block);

    // Determina l'array di stimoli e la risposta corretta in base al blocco
    if (block === 1 || block === 4) {
        stimulusArray = (Math.random() < 0.5) ? stimuliIo : stimuliNonIo;
        correctResponse = (stimulusArray === stimuliIo) ? 'Io' : 'Non Io';
    } else if (block === 2) {
        stimulusArray = (Math.random() < 0.5) ? stimuliVergogna : stimuliAnsia;
        correctResponse = (stimulusArray === stimuliVergogna) ? 'Io' : 'Non Io';
    } else if (block === 3 || block === 5) {
        stimulusArray = (Math.random() < 0.5) ? stimuliIo.concat(stimuliVergogna) : stimuliNonIo.concat(stimuliAnsia);
        correctResponse = (stimulusArray === stimuliIo.concat(stimuliVergogna)) ? 'Io' : 'Non Io';
    }

    // Mostra uno stimolo casuale dall'array
    currentStimulus = stimulusArray[Math.floor(Math.random() * stimulusArray.length)];
    document.getElementById('stimulus').textContent = currentStimulus;
    startTime = performance.now();
}

function handleResponse(response) {
    let reactionTime = performance.now() - startTime;
    console.log('Risposta:', response, 'Risposta corretta:', correctResponse);

    if (response === correctResponse) {
        document.getElementById('feedback').textContent = '';
        trialsCompleted++;
        console.log('Prove completate:', trialsCompleted);
        if (trialsCompleted >= 20) {  // Supponendo che ci siano 20 prove per blocco
            changeBlock();
        } else {
            showNextStimulus();
        }
    } else {
        document.getElementById('feedback').textContent = 'Errore! X';
    }
}

function changeBlock() {
    console.log('Cambio al blocco:', block);
    block++;
    if (block > 5) {
        endTest();
    } else {
        // Mostra un messaggio e avvia il prossimo blocco
        document.getElementById('instructions').textContent = 'Blocco ' + block + ' in corso. Premi la barra spaziatrice per continuare.';
        document.addEventListener('keydown', function(e) {
            if (e.code === 'Space') {
                startTest();
            }
        }, { once: true });  // Usa { once: true } per rimuovere il listener dopo il primo click
    }
}

function endTest() {
    document.getElementById('stimulus').textContent = 'Test completato!';
    console.log('Test completato');
}
