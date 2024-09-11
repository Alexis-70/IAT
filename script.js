let stimuliIo = ["Il mio nome", "Io", "Me stesso"];
let stimuliNonIo = ["Nome di un altro", "Lui", "Lei"];
let stimuliVergogna = ["Vergogna", "Umiliazione"];
let stimuliAnsia = ["Ansia", "Preoccupazione"];

let currentStimulus = '';
let startTime = 0;
let block = 1;
let correctResponse = '';
let trialsCompleted = 0;
let results = [];  // Array per memorizzare i risultati
const trialsPerBlock = 20;  // Numero di prove per blocco

document.getElementById('instructions').textContent = "Premi la barra spaziatrice per iniziare il test.";

document.addEventListener('keydown', function(e) {
    if (e.code === 'Space') {
        if (block <= 5) {
            startTest();
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

    // Memorizza i risultati
    results.push({
        stimulus: currentStimulus,
        response: response,
        correctResponse: correctResponse,
        reactionTime: reactionTime
    });

    if (response === correctResponse) {
        document.getElementById('feedback').textContent = '';
        trialsCompleted++;
        console.log('Prove completate:', trialsCompleted);
        if (trialsCompleted >= trialsPerBlock) {
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
    
    // Visualizza i risultati nella console e sulla pagina
    console.log('Risultati del test:', results);
    
    // Visualizzazione dei risultati sulla pagina
    let resultsDiv = document.createElement('div');
    resultsDiv.id = 'results';
    resultsDiv.innerHTML = `<h2>Risultati del Test</h2><pre>${JSON.stringify(results, null, 2)}</pre>`;
    document.body.appendChild(resultsDiv);

    // Aggiungi un bottone per scaricare i risultati
    const downloadButton = document.createElement('button');
    downloadButton.textContent = "Scarica Risultati";
    downloadButton.onclick = downloadResults;
    document.body.appendChild(downloadButton);
}

function downloadResults() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "results.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

