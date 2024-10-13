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

// Lista de palabras informales con explicación y posibles sustitutos
const informalWordsData = {
    'guay': {
        explanation: 'Es una palabra coloquial que no es adecuada para contextos formales.',
        substitutes: ['genial', 'excelente', 'maravilloso']
    },
    'chévere': {
        explanation: 'Es un término coloquial usado principalmente en Latinoamérica, que no es adecuado en textos formales.',
        substitutes: ['genial', 'fantástico', 'excelente']
    },
    'tío': {
        explanation: 'Es una palabra coloquial para referirse a una persona, pero su uso es muy informal.',
        substitutes: ['persona', 'individuo', 'señor/señora']
    },
    'flipar': {
        explanation: 'Es un término muy coloquial que expresa sorpresa, pero no es adecuado en escritura formal.',
        substitutes: ['sorprenderse', 'asombrarse']
    },
    'currar': {
        explanation: 'Es una palabra coloquial para trabajar. No debe usarse en situaciones formales.',
        substitutes: ['trabajar', 'laborar']
    },
    'chungo': {
        explanation: 'Es una palabra coloquial que significa difícil o malo, pero no es adecuada en textos formales.',
        substitutes: ['difícil', 'complicado', 'desafiante']
    },
    'rollo': {
        explanation: 'Es un término coloquial que se usa para referirse a algo aburrido o tedioso.',
        substitutes: ['tema', 'asunto', 'situación']
    },
    'mogollón': {
        explanation: 'Es una expresión coloquial que indica una gran cantidad, pero es demasiado informal.',
        substitutes: ['mucho', 'gran cantidad', 'abundancia']
    },
    'pasota': {
        explanation: 'Es una palabra coloquial que describe una actitud indiferente, no adecuada en escritos formales.',
        substitutes: []
    }
};

// Función para revisar el documento, resaltar palabras no formales y mostrar explicaciones
// Función para revisar el documento, resaltar palabras no formales y mostrar explicaciones
function checkDocument() {
    const documentText = documentInput.innerText.toLowerCase().trim(); // Obtener el texto del div editable

    if (documentText === '') {
        feedbackDiv.innerHTML = `<i class="fa-solid fa-exclamation-circle"></i> El documento está vacío. Por favor ingresa algún texto.`;
        feedbackDiv.classList.remove("hidden", "success", "error");
        feedbackDiv.classList.add("warning");
        return; // Salir si el documento está vacío
    }

    let foundInformalWords = false;
    let wordCounter = 0; // Para generar IDs únicos
    let wordOccurrences = {}; // Para almacenar las ocurrencias de cada palabra

    // Resaltar palabras informales en el texto y crear enlaces
    const highlightedText = documentText.split(/\b/).map(word => {
        if (informalWordsData[word]) {
            foundInformalWords = true;
            const wordId = `word-${wordCounter++}`; // Crear un ID único para cada palabra
            if (!wordOccurrences[word]) {
                wordOccurrences[word] = []; // Inicializar lista de ocurrencias
            }
            wordOccurrences[word].push(wordId); // Almacenar el ID de esta ocurrencia
            const titleText = informalWordsData[word].explanation;
            return `<a href="#${wordId}" id="${wordId}" class="highlight" title="${titleText}">${word}</a>`;
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

    // Añadir funcionalidad de scroll a las palabras no formales en el feedback
    document.querySelectorAll('.word-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Evitar el comportamiento predeterminado del enlace
            const targetWord = document.getElementById(link.getAttribute('href').substring(1)); // Obtener el ID de destino
            if (targetWord) {
                targetWord.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}


// Función para actualizar el div de retroalimentación
function updateFeedbackDiv(hasInformalWords) {
    if (hasInformalWords) {
        feedbackDiv.innerHTML = `<i class="fa-solid fa-exclamation-circle"></i> El documento contiene palabras no formales.`;
        feedbackDiv.classList.remove("hidden", "success", "warning");
        feedbackDiv.classList.add("error");
    } else {
        feedbackDiv.innerHTML = `<i class="fa-solid fa-check-circle"></i> El documento está correcto.`;
        feedbackDiv.classList.remove("hidden", "error", "warning");
        feedbackDiv.classList.add("success");
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

// Escucha el evento 'input' para contar palabras, caracteres y párrafos en tiempo real
documentInput.addEventListener('input', updateCounts);

// Agregar el evento al botón de revisar
reviewButton.addEventListener("click", checkDocument);
