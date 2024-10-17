//Mi código es como un bebe, flexible pero fragil :D

const feedbackDiv = document.getElementById("feedback");
const documentInput = document.getElementById('document-input');
const checkRepeatedWords = document.getElementById("check-repeated-words");
const checkMarkRepeatedWords = document.getElementById("mark-repeated-words");
const checkThirdPerson = document.getElementById("check-third-person");
const checkParagraphLength = document.getElementById("check-paragraph-length");
const checkNumberFormat = document.getElementById('check-number-format');
const checkAllConnectives = document.getElementById("check-all-connectives");
const clearButton = document.getElementById("btn-clear");
const reviewButton = document.getElementById("btn-review");
const wordCountDisplay = document.getElementById("word-count");
const charCountDisplay = document.getElementById("char-count");
const paragraphCountDisplay = document.getElementById("paragraph-count");
const avgWordsInParagraphsDisplay = document.getElementById("avg-words-in-paragraphs");
const avgSentencesInParagraphsDisplay = document.getElementById("avg-sentences-in-paragraphs");
const exampleButtons = document.querySelectorAll('.btn.show-example');
const checkboxes = [
    { element: checkRepeatedWords, key: "checkRepeatedWords" },
    { element: checkMarkRepeatedWords, key: "checkMarkPepeatedWords" },
    { element: checkThirdPerson, key: "checkThirdPerson" },
    { element: checkParagraphLength, key: "checkParagraphLength" },
    { element: checkNumberFormat, key: "checkNumberFormat" },
    { element: checkAllConnectives, key: "checkAllConnectives" },
];
const maxWordsPerParagraph = 170;
const commonWords = new Set(['el', 'la', 'y', 'en', 'de', 'a', 'que', 'los', 'las', 'un', 'una', 'por', 'con', 'para', 'del', 'al', 'se', 'es', 'no', 'su', 'más', 'como', 'pero', 'sus', 'esta', 'sin', 'lo', 'han', 'vez', 'ser', 'ha']);
const connectives = new Set([
    "otra vez", "de nuevo", "también", "y", "igualmente", "de igual importancia",
    "así mismo", "además", "por otra parte", "de la misma forma", "al lado de",
    "aunque", "pero", "a la inversa", "recíprocamente", "a pesar de", "sino",
    "sino que", "no obstante", "al contrario", "por otra parte", "de otra manera",
    "hasta ahora", "sobre", "a través de", "después", "antes", "alrededor de",
    "a la vez", "por encima de", "eventualmente", "finalmente", "entonces",
    "por último", "en primer lugar", "entre tanto", "ahora", "después de esto",
    "por tanto", "por lo tanto", "por lo que", "porque", "pues", "con que",
    "por consiguiente", "luego", "tanto que", "por ejemplo", "de hecho",
    "en otras palabras", "esto es", "mejor dicho", "es decir", "en conclusión",
    "en resumen", "para concluir", "sea", "en general", "en suma", "así",
    "de este modo", "de la misma forma", "de la misma manera", "de forma similar",
    "de igual forma", "como", "al contrario", "después de todo", "en cambio",
    "por el contrario", "por otra parte", "a pesar de", "sin embargo"
]);
let isReviewing = false;

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

const customMessage = "¡Hola! Esta aplicación web fue hecha con HTML, CSS, y JavaScript. Espero que te sea de mucha utilidad ★•`‿↼";
console.log("%c" + customMessage, consoleStyles);


// Función para limpiar el documento
const clearDocument = () => {
    documentInput.innerText = '';
    feedbackDiv.classList.add('hidden');
    charCountDisplay.innerText = 'Caracteres: 0';
    wordCountDisplay.innerText = 'Palabras: 0';
    paragraphCountDisplay.innerText = 'Párrafos: 0';
    avgWordsInParagraphsDisplay.innerText = 'Promedio de palabras en párrafos: 0';
    avgSentencesInParagraphsDisplay.innerText = 'Promedio de oraciones en párrafos: 0';
}

// Función para normalizar el texto eliminando acentos y caracteres especiales
function normalizeWord(word) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); // Elimina acentos
}

// Función para verificar el formato de los números en el documento
const validateNumberFormat = (paragraphText, paragraphIndex) => {
    const numberIssues = [];
    const words = paragraphText.split(/\s+/); // Dividir el párrafo en palabras

    words.forEach((word, wordIndex) => {
        const lowerWord = normalizeWord(word); // Normalizar palabra

        // Verificar si es un número escrito en palabras
        if (numberWords[lowerWord] !== undefined) {
            const numValue = numberWords[lowerWord];
            const nextWord = words[wordIndex + 1] ? words[wordIndex + 1].trim() : null;

            // Si la siguiente palabra no es el número en paréntesis
            if (nextWord !== `(${numValue})`) {
                numberIssues.push(`El número en palabras "${word}" en el párrafo ${paragraphIndex + 1} debe redactarse como "${word} (${numValue})".`);
            }
        }
        // Verificar si es un número en formato dígito
        else if (!isNaN(word)) {
            const numValue = parseInt(word, 10);
            const numberAsWord = numberToWord(numValue);
            const previousWord = words[wordIndex - 1] ? words[wordIndex - 1].toLowerCase() : null;
            const nextWord = words[wordIndex + 1] ? words[wordIndex + 1].trim() : null;

            // Si no tiene el formato correcto con la palabra antes y el número en paréntesis después
            if (previousWord !== numberAsWord || nextWord !== `(${numValue})`) {
                numberIssues.push(`El número "${word}" en el párrafo ${paragraphIndex + 1} debe redactarse como "${numberAsWord} (${word})".`);
            }
        }
    });

    return numberIssues;
}

// Función auxiliar para convertir números a palabras en español (simplificada)
const numberToWord = num => {
    // Verificamos si el número está dentro del rango y lo devolvemos
    return num <= 1001 ? words[num] : num.toString();
}

// Función para buscar pronombres de primera y segunda persona y verificar el uso de tercera persona
const checkPronounsUsage = documentText => {
    const firstAndSecondPersonPronouns = [
        'yo', 'me', 'mi', 'mis', 'nosotros', 'nos', 'nuestro', 'nuestra', 'nuestros', 'nuestras',
        'tú', 'te', 'tu', 'tus', 'usted', 'ustedes', 'vos', 'vuestra', 'vuestros'
    ];

    const paragraphs = documentText.split(/\n+/);
    const foundPronouns = {};
    let hasPronouns = false;
    let feedbackMessage = "";

    paragraphs.forEach((paragraph, paragraphIndex) => {
        const wordsInParagraph = normalizeWord(paragraph).split(/\s+/);
        foundPronouns[paragraphIndex + 1] = []; // Crear una lista para el párrafo actual

        // Buscar pronombres de primera y segunda persona en el párrafo
        wordsInParagraph.forEach(word => {
            if (firstAndSecondPersonPronouns.includes(word)) {
                foundPronouns[paragraphIndex + 1].push(word); // Agregar pronombre encontrado a la lista del párrafo
                hasPronouns = true; // Marcar que se han encontrado pronombres
            }
        });
    });

    if (hasPronouns) {
        Object.entries(foundPronouns).forEach(([paragraphIndex, pronouns]) => {
            if (pronouns.length > 0) {
                feedbackMessage += `En el párrafo ${paragraphIndex}: ${pronouns.join(', ')}. <br>`;
            }
        });
        feedbackDiv.innerHTML += `<i class="fa-solid fa-exclamation-circle"></i> El texto contiene pronombres de primera o segunda persona: ${feedbackMessage} Asegúrese de escribir en tercera persona.<br>`;
        feedbackDiv.classList.remove("hidden", "success");
        feedbackDiv.classList.add("error");
    } else {
        feedbackDiv.innerHTML += `<i class="fa-solid fa-check-circle"></i> El texto está correctamente escrito en tercera persona.<br>`;
    }
}

// Función para revisar el documento, resaltar palabras no formales y mostrar explicaciones
function checkDocument() {
    const documentText = documentInput.innerText.trim();

    // Si no se está revisando y el documento está vacío, no hacer nada
    if (documentText === '' && !isReviewing) return;

    // Si el campo está vacío y se está intentando revisar, mostrar el mensaje de campo vacío
    if (documentText === '' && isReviewing) {
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
    let tooLongParagraphs = [];
    let numberFormatIssues = [];

    // Dividir el texto en párrafos
    const paragraphs = documentText.split(/\n+/);

    paragraphs.forEach((paragraph, paragraphIndex) => {
        let wordCount = {};
        let originalWordsMap = {};
        const wordsInParagraph = paragraph.trim().split(/\s+/).length;

        // Verificar si el párrafo excede el límite de palabras
        if (checkParagraphLength.checked && wordsInParagraph > maxWordsPerParagraph) {
            tooLongParagraphs.push(`Párrafo ${paragraphIndex + 1} (${wordsInParagraph} palabras)`);
        }

        // Procesar el texto de cada párrafo
        const highlightedText = paragraph.split(/([^\p{L}\p{N}]+)/gu).map(word => {
            const lowerCaseWord = normalizeWord(word); // Normalizar la palabra
            originalWordsMap[lowerCaseWord] = word; // Almacenar la palabra original

            // Verificar si es un conector
            if (checkAllConnectives.checked && connectives.has(lowerCaseWord)) {
                return `<span class="connective">${word}</span>`;
            }

            // Verificar si la palabra es común
            if (commonWords.has(lowerCaseWord)) {
                return word; // Si es común, no resaltar
            }

            // Verificar si es una palabra informal
            if (informalWordsData[lowerCaseWord]) {
                foundInformalWords = true;
                const wordId = `word-${wordCounter++}`;
                if (!wordOccurrences[lowerCaseWord]) {
                    wordOccurrences[lowerCaseWord] = []; // Inicializar ocurrencias
                }
                wordOccurrences[lowerCaseWord].push(wordId); // Almacenar ID
                const titleText = informalWordsData[lowerCaseWord].explanation;
                return `<a href="#${wordId}" id="${wordId}" class="highlight" title="${titleText}">${word}</a>`;
            }

            // Contar palabras repetidas
            if (lowerCaseWord.match(/[a-záéíóú]/i) && lowerCaseWord.length > 1) {
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
                    const originalWord = originalWordsMap[word]; // Recuperar la palabra original
                    repeatedWords.push(`${word}: ${count} veces`);

                    if (checkMarkRepeatedWords.checked) {
                        const regex = new RegExp(`\\b${originalWord}\\b`, 'gi');
                        documentInput.innerHTML = documentInput.innerHTML.replace(regex, `<span class="repeated-word-highlight">${originalWord}</span>`);
                    }
                }
            });

            if (repeatedWords.length > 0) {
                repeatedWordsPerParagraph[`Párrafo ${paragraphIndex + 1}`] = repeatedWords;
            }
        }

        // Verificar formato de números, si la opción está activada
        if (checkNumberFormat.checked) {
            const numberIssuesInParagraph = validateNumberFormat(paragraph, paragraphIndex);
            numberFormatIssues = numberFormatIssues.concat(numberIssuesInParagraph);
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

    let feedbackContent = ""; // Variable temporal para acumular el contenido

    // Condiciones finales combinadas
    if (foundInformalWords || (checkParagraphLength.checked && tooLongParagraphs.length > 0)) {
        if (foundInformalWords) {
            feedbackContent += `<i class="fa-solid fa-exclamation-circle"></i> Se han encontrado palabras no formales en el documento:<br>${explanations}`;
        }

        if (checkParagraphLength.checked && tooLongParagraphs.length > 0) {
            feedbackContent += `<i class="fa-solid fa-exclamation-circle"></i> Los siguientes párrafos exceden el límite recomendado de ${maxWordsPerParagraph} palabras:<br><ul>`;
            tooLongParagraphs.forEach(paragraph => {
                feedbackContent += `<li>${paragraph}</li>`;
            });
            feedbackContent += `</ul>`;
        }

        feedbackDiv.classList.remove("hidden", "success", "warning");
        feedbackDiv.classList.add("error");
    } else {
        feedbackContent += `<i class="fa-solid fa-check-circle"></i> El documento está correcto.`;
        feedbackDiv.classList.remove("hidden", "error", "warning");
        feedbackDiv.classList.add("success");
    }

    // Verificar si hubo problemas con el formato de los números
    if (numberFormatIssues.length > 0) {
        feedbackContent += `<i class="fa-solid fa-exclamation-circle"></i> Los siguientes números no siguen la regla de redacción (esta regla no aplica en las fuentes o subtítulos de tablas, gráficos o figuras):<br><ul>`;
        feedbackDiv.classList.remove("hidden", "success", "warning");
        feedbackDiv.classList.add("error");
        numberFormatIssues.forEach(issue => {
            feedbackContent += `<li>${issue}</li>`;
        });
        feedbackContent += `</ul>`;
    }

    // Actualizar el contenido del feedbackDiv
    feedbackDiv.innerHTML = feedbackContent;

    //Verificar el uso de tercera persona
    if (checkThirdPerson.checked) {
        checkPronounsUsage(documentText);
    }

    // Mostrar palabras repetidas por párrafo, si la opción está activada
    if (checkRepeatedWords.checked) {
        showRepeatedWordsByParagraph(repeatedWordsPerParagraph);
    }
}

// Función para mostrar palabras repetidas por párrafo
const showRepeatedWordsByParagraph = repeatedWordsPerParagraph => {
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

// Función para contar las oraciones en un texto
const countSentences = text => {
    const sentences = text.split(/[.!?]+\s*/); // Divide por los caracteres que suelen marcar el fin de una oración
    return sentences.filter(sentence => sentence.trim().length > 0).length; // Filtra oraciones no vacías
}

// Función para calcular el promedio de palabras por párrafo
const calculateAvgWordsInParagraphs = text => {
    const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0); // Divide el texto en párrafos no vacíos
    const totalWords = paragraphs.reduce((total, paragraph) => total + countWords(paragraph), 0); // Suma el total de palabras en los párrafos
    return paragraphs.length > 0 ? (totalWords / paragraphs.length).toFixed(2) : 0; // Calcula el promedio
}

// Función para calcular el promedio de oraciones por párrafo
const calculateAvgSentencesInParagraphs = text => {
    const paragraphs = text.split(/\n+/).filter(paragraph => paragraph.trim().length > 0); // Divide el texto en párrafos no vacíos
    const totalSentences = paragraphs.reduce((total, paragraph) => total + countSentences(paragraph), 0); // Suma el total de oraciones en los párrafos
    return paragraphs.length > 0 ? (totalSentences / paragraphs.length).toFixed(2) : 0; // Calcula el promedio
}

// Actualiza el promedio de palabras y oraciones por párrafo
const updateAverages = () => {
    const text = documentInput.innerText || documentInput.textContent;
    const avgWords = calculateAvgWordsInParagraphs(text);
    const avgSentences = calculateAvgSentencesInParagraphs(text);

    avgWordsInParagraphsDisplay.textContent = `Promedio de palabras en párrafos: ${avgWords}`;
    avgSentencesInParagraphsDisplay.textContent = `Promedio de oraciones en párrafos: ${avgSentences}`;
}

// Actualiza el contador de palabras, caracteres y párrafos
const updateCounts = () => {
    const text = documentInput.innerText || documentInput.textContent;
    const wordCount = countWords(text);
    const charCount = countCharacters(text);
    const paragraphCount = countParagraphs(text);

    wordCountDisplay.textContent = `Palabras: ${wordCount}`;
    charCountDisplay.textContent = `Caracteres: ${charCount}`;
    paragraphCountDisplay.textContent = `Párrafos: ${paragraphCount}`;
}

const cleanText = text => {
    return text
        .replace(/\r?\n|\r/g, '\n')
        .replace(/<[^>]*>/g, '')
        .trim();
}

// Función para marcar conectivos en el texto
const markConnectives = () => {
    const documentText = documentInput.innerText.trim();
    if (documentText === '') return;

    documentInput.innerHTML = '';

    const highlightedText = documentText.split(/([^\p{L}\p{N}]+)/gu).map(word => {
        const lowerCaseWord = word.toLowerCase(); // Normalizar la palabra a minúsculas

        if (checkAllConnectives.checked && connectives.has(lowerCaseWord)) {
            return `<span class="connective">${word}</span>`;
        }

        return word; // Retornar la palabra original si no es un conectivo
    }).join('');

    documentInput.innerHTML = highlightedText;
}

// Función para alternar la visibilidad del ejemplo
const toggleExample = button => {
    const exampleParagraph = button.closest('li').querySelector('.example');
    exampleParagraph.classList.toggle('show');
    button.textContent = exampleParagraph.classList.contains('show') ? 'Ocultar ejemplo' : 'Ver ejemplo';
}

// Escucha el evento 'input' para actualizar en tiempo real
documentInput.addEventListener('input', () => {
    updateCounts();
    updateAverages();
});

// Escucha el evento 'input' para contar palabras, caracteres y párrafos en tiempo real
documentInput.addEventListener('paste', event => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData('text');
    const cleanedText = cleanText(text);
    document.execCommand('insertText', false, cleanedText);
});

// Agregar el evento al botón de revisar
reviewButton.addEventListener('click', () => {
    isReviewing = true;
    checkDocument();
    isReviewing = false;
});

// Escucha el evento de teclado
document.addEventListener('keydown', event => {
    if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        checkDocument();
    }
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

// Asignar el evento de click a cada botón
exampleButtons.forEach(button => {
    button.addEventListener('click', function () {
        toggleExample(this);
    });
});

// Función para manejar cambios en los checkboxes
const handleCheckboxChange = (checkbox) => {
    localStorage.setItem(checkbox.key, checkbox.element.checked);
    checkDocument();
};

// Cargar el estado guardado de los checkboxes al iniciar la aplicación
window.addEventListener("load", () => {
    const checkboxes = {
        "checkRepeatedWords": checkRepeatedWords,
        "checkMarkPepeatedWords": checkMarkRepeatedWords,
        "checkThirdPerson": checkThirdPerson,
        "checkParagraphLength": checkParagraphLength,
        "checkNumberFormat": checkNumberFormat,
        "checkAllConnectives": checkAllConnectives,
    };

    for (const [key, checkbox] of Object.entries(checkboxes)) {
        const savedValue = localStorage.getItem(key);
        checkbox.checked = savedValue === "true";
    }
});

// Agregar eventos para guardar la selección y actualizar el análisis
checkboxes.forEach(({ element, key }) => {
    element.addEventListener("change", () => handleCheckboxChange({ element, key }));
});
