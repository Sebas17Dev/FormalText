const feedbackDiv = document.getElementById("feedback");
const documentInput = document.getElementById('document-input');
const checkRepeatedWords = document.getElementById("check-repeated-words");
const clearButton = document.getElementById("btn-clear");
const reviewButton = document.getElementById("btn-review");
const wordCountDisplay = document.getElementById("word-count");
const charCountDisplay = document.getElementById("char-count");
const paragraphCountDisplay = document.getElementById("paragraph-count");

// Custom message
const consoleStyles = `
    background: linear-gradient(to bottom, #87ceeb, #1e90ff);
    border: 1px solid #87ceeb;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5em;
    font-weight: bold;
`;

const customMessage = "Welcome! This site was built with HTML, CSS, and JavaScript. We hope you have a great experience.";
console.log("%c" + customMessage, consoleStyles);


const commonWords = new Set(['el', 'la', 'y', 'en', 'de', 'a', 'que', 'los', 'las', 'un', 'una', 'por', 'con', 'para', 'del', 'al', 'se', 'es', 'no', 'su', 'más', 'como', 'pero', 'sus', 'esta', 'sin', 'lo', 'han', 'vez', 'ser', 'ha']);

// Función para normalizar el texto eliminando acentos y caracteres especiales
function normalizeWord(word) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, ""); // Elimina los acentos
}

// Función para limpiar el documento
const clearDocument = () => {
    documentInput.innerText = '';
    feedbackDiv.classList.add('hidden');
    charCountDisplay.innerText = 'Caracteres: 0';
    wordCountDisplay.innerText = 'Palabras: 0'; 
    paragraphCountDisplay.innerText = 'Párrafos: 0';
}

// Función para revisar el documento, resaltar palabras no formales y mostrar explicaciones
function checkDocument() {
    const documentText = documentInput.innerText.trim();

    if (documentText === '') {
        feedbackDiv.innerHTML = `<i class="fa-solid fa-exclamation-circle"></i> El campo está vacío. Por favor ingresa algún texto.`;
        feedbackDiv.classList.remove("hidden", "success", "error");
        feedbackDiv.classList.add("warning");
        return; // Salir si el documento está vacío
    }

    // Limpiar el contenido actual antes de procesar el nuevo texto
    documentInput.innerHTML = '';

    let foundInformalWords = false;
    let wordCounter = 0; // Para generar IDs únicos
    let wordOccurrences = {}; // Para almacenar las ocurrencias de cada palabra
    let repeatedWordsPerParagraph = {}; // Para almacenar palabras repetidas por párrafo

    // Dividir el texto en párrafos
    const paragraphs = documentText.split(/\n+/); 

    paragraphs.forEach((paragraph, paragraphIndex) => {
        let wordCount = {};

        // Procesar el texto de cada párrafo
        const highlightedText = paragraph.split(/([^\p{L}\p{N}]+)/gu).map(word => {
            const lowerCaseWord = normalizeWord(word.toLowerCase()); // Normalizar la palabra y convertirla a minúsculas

            // Verificar si la palabra es común
            if (commonWords.has(lowerCaseWord)) {
                return word; // Si es una palabra común, no contarla ni resaltarla
            }

            if (informalWordsData[lowerCaseWord]) {
                foundInformalWords = true;
                const wordId = `word-${wordCounter++}`; 
                if (!wordOccurrences[lowerCaseWord]) {
                    wordOccurrences[lowerCaseWord] = []; // Inicializar lista de ocurrencias
                }
                wordOccurrences[lowerCaseWord].push(wordId); // Almacenar el ID de esta ocurrencia
                const titleText = informalWordsData[lowerCaseWord].explanation;
                return `<a href="#${wordId}" id="${wordId}" class="highlight" title="${titleText}">${word}</a>`;
            }

            // Contar las repeticiones de palabras (excepto palabras comunes)
            if (lowerCaseWord.match(/[a-z]/) && lowerCaseWord.length > 1) { // Ignorar palabras muy cortas o no alfabéticas
                wordCount[lowerCaseWord] = (wordCount[lowerCaseWord] || 0) + 1;
            }

            return word;
        }).join('');

        // Actualizar el texto del párrafo con las palabras resaltadas
        documentInput.innerHTML += highlightedText + '<br>'; // Agregar cada párrafo procesado al documento

        // Verificar si hay palabras repetidas en este párrafo, si el usuario lo eligió
        if (checkRepeatedWords.checked) {
            let repeatedWords = [];
            Object.entries(wordCount).forEach(([word, count]) => {
                if (count > 1) {
                    repeatedWords.push(`${word}: ${count} veces`);
                }
            });

            if (repeatedWords.length > 0) {
                repeatedWordsPerParagraph[`Párrafo ${paragraphIndex + 1}`] = repeatedWords;
            }
        }
    });

    // Crear la lista de explicaciones sin duplicar y agregar enlaces a cada ocurrencia
    let explanations = '';
    Object.keys(wordOccurrences).forEach((word) => {
        const substitutes = informalWordsData[word].substitutes.length > 0 ?
            `Posibles sustitutos: ${informalWordsData[word].substitutes.join(', ')}` : '';
        const occurrencesLinks = wordOccurrences[word].map(id => `<a href="#${id}" class="word-link">${word}</a>`).join(', ');

        // Crear un div para cada explicación
        explanations += `<div class="explanation">${occurrencesLinks}: ${informalWordsData[word].explanation}${substitutes}</div>`;
    });

    // Actualizar feedbackDiv con explicaciones y enlaces
    if (foundInformalWords) {
        feedbackDiv.innerHTML = `<i class="fa-solid fa-exclamation-circle"></i> Se han encontrado palabras no formales en el documento:<br>${explanations}`;
        feedbackDiv.classList.remove("hidden", "success", "warning");
        feedbackDiv.classList.add("error");
    } else {
        feedbackDiv.innerHTML = `<i class="fa-solid fa-check-circle"></i> El documento está correcto.`;
        feedbackDiv.classList.remove("hidden", "error", "warning");
        feedbackDiv.classList.add("success");
    }

    // Mostrar palabras repetidas por párrafo, si la opción está activada
    if (checkRepeatedWords.checked) {
        showRepeatedWordsByParagraph(repeatedWordsPerParagraph);
    }
}

// Función para mostrar palabras repetidas por párrafo
function showRepeatedWordsByParagraph(repeatedWordsPerParagraph) {
    let repeatedWordsHtml = `
        <div class="repeated-words-section">
            <i class="fa-solid fa-info-circle"></i> <strong>Palabras repetidas:</strong>
            <ul class="repeated-words-list">`;

    let hasRepeatedWords = false;

    Object.entries(repeatedWordsPerParagraph).forEach(([paragraph, repeatedWords]) => {
        hasRepeatedWords = true;

        repeatedWordsHtml += `
            <li class="repeated-words-paragraph">
                <h4>${paragraph}:</h4>
                <ul class="repeated-word-items">`;

        repeatedWords.forEach(wordCount => {
            repeatedWordsHtml += `<li class="repeated-word">
                <span class="word-highlight">${wordCount.split(":")[0]}</span> 
                <span class="word-count">(${wordCount.split(":")[1].trim()} veces)</span>
            </li>`;
        });

        repeatedWordsHtml += `</ul></li>`;
    });

    repeatedWordsHtml += '</ul></div>';

    if (hasRepeatedWords) {
        feedbackDiv.innerHTML += repeatedWordsHtml;
    }
}

// Función para mostrar palabras repetidas
function showRepeatedWords(wordCount) {
    let repeatedWordsHtml = '<i class="fa-solid fa-info-circle"></i> Palabras repetidas:<br>';
    let hasRepeatedWords = false;

    Object.entries(wordCount).forEach(([word, count]) => {
        if (count > 1) {
            hasRepeatedWords = true;
            repeatedWordsHtml += `${word}: ${count} veces<br>`;
        }
    });

    if (hasRepeatedWords) {
        feedbackDiv.innerHTML += `<div class="repeated-words">${repeatedWordsHtml}</div>`;
    }
}

// Función para contar palabras
const countWords = text => {
    const words = text.trim().split(/\s+/);
    return words.filter(word => word.length > 0).length;
}

// Función para contar caracteres
const countCharacters = text => {
    return text.length;
}

// Función para contar párrafos
const countParagraphs = text => {
    const paragraphs = text.split(/\n+/);
    return paragraphs.filter(paragraph => paragraph.trim().length > 0).length; // Cuenta solo los párrafos no vacíos
}

// Actualiza el contador de palabras, caracteres y párrafos
function updateCounts() {
    const text = documentInput.innerText || documentInput.textContent;
    const wordCount = countWords(text);
    const charCount = countCharacters(text);
    const paragraphCount = countParagraphs(text);

    wordCountDisplay.textContent = `Palabras: ${wordCount}`;
    charCountDisplay.textContent = `Caracteres: ${charCount}`; // Actualiza el conteo de caracteres
    paragraphCountDisplay.textContent = `Párrafos: ${paragraphCount}`; // Actualiza el conteo de párrafos
}

documentInput.addEventListener('input', updateCounts);

function cleanText(text) {
    return text
        .replace(/\r?\n|\r/g, '\n')
        .replace(/<[^>]*>/g, '')
        .trim();
}

// Escucha el evento 'input' para contar palabras, caracteres y párrafos en tiempo real
documentInput.addEventListener('paste', function (event) {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData('text');
    const cleanedText = cleanText(text);
    document.execCommand('insertText', false, cleanedText);
});

// Agregar el evento al botón de revisar
reviewButton.addEventListener("click", checkDocument);

// Escucha el evento de teclado
document.addEventListener('keydown', event => {
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        checkDocument();
    }
});

// Agregar evento para guardar la selección en localStorage
checkRepeatedWords.addEventListener("change", function() {
    localStorage.setItem("checkRepeatedWords", checkRepeatedWords.checked);
});

// Cargar el estado guardado del checkbox al iniciar la aplicación
window.addEventListener("load", function() {
    const savedValue = localStorage.getItem("checkRepeatedWords");
    checkRepeatedWords.checked = savedValue === "true"; 
});

// Evento del botón de limpiar
clearButton.addEventListener("click", clearDocument);

// Escucha el evento de teclado
document.addEventListener('keydown', event => {
    if (event.ctrlKey && event.key === 'l') {
        event.preventDefault();
        clearDocument();
    }
});
