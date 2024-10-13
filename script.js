const feedbackDiv = document.getElementById("feedback");
const documentInput = document.getElementById('document-input');
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


const commonWords = new Set(['el', 'la', 'y', 'en', 'de', 'a', 'que', 'los', 'las', 'un', 'una', 'por', 'con', 'para', 'del', 'al', 'se', 'es', 'no', 'su', 'más', 'como', 'pero']);

// Función para revisar el documento, resaltar palabras no formales y mostrar explicaciones
function checkDocument() {
    const documentText = documentInput.innerText.trim(); // Obtener el texto del div editable

    if (documentText === '') {
        feedbackDiv.innerHTML = `<i class="fa-solid fa-exclamation-circle"></i> El campo está vacío. Por favor ingresa algún texto.`;
        feedbackDiv.classList.remove("hidden", "success", "error");
        feedbackDiv.classList.add("warning");
        return; // Salir si el documento está vacío
    }

    let foundInformalWords = false;
    let wordCounter = 0; // Para generar IDs únicos
    let wordOccurrences = {}; // Para almacenar las ocurrencias de cada palabra
    let wordCount = {}; // Para contar las repeticiones de palabras

    // Resaltar palabras informales en el texto y crear enlaces
    const highlightedText = documentText.split(/\b/).map(word => {
        const lowerCaseWord = word.toLowerCase(); // Convertir la palabra a minúsculas

        // Verificar si la palabra es común
        if (commonWords.has(lowerCaseWord)) {
            return word; // Si es una palabra común, no contarla ni resaltarla
        }

        if (informalWordsData[lowerCaseWord]) {
            foundInformalWords = true;
            const wordId = `word-${wordCounter++}`; // Crear un ID único para cada palabra
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

    documentInput.innerHTML = highlightedText;

    // Crear la lista de explicaciones sin duplicar y agregar enlaces a cada ocurrencia
    let explanations = '';
    Object.keys(wordOccurrences).forEach((word) => {
        const substitutes = informalWordsData[word].substitutes.length > 0 ?
            ` Posibles sustitutos: ${informalWordsData[word].substitutes.join(', ')}` : '';
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

    // Mostrar palabras repetidas
    showRepeatedWords(wordCount);

    // Añadir funcionalidad de scroll a las palabras no formales en el feedback
    document.querySelectorAll('.word-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const targetWord = document.getElementById(link.getAttribute('href').substring(1)); // Obtener el ID de destino
            if (targetWord) {
                targetWord.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
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
