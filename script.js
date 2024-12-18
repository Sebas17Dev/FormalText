const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('[data-section]');
const sections = {
    inicio: document.getElementById('inicio'),
    reglas: document.getElementById('reglas'),
    conectivos: document.getElementById('conectivos'),
    citas: document.getElementById('citas'),
    palabras: document.getElementById('palabras'),
    textos: document.getElementById('textos'),
    diccionario: document.getElementById('diccionario')
};
const feedbackDiv = document.getElementById("feedback");
const documentInput = document.getElementById('document-input');
const checkRepeatedWords = document.getElementById("check-repeated-words");
const checkMarkRepeatedWords = document.getElementById("mark-repeated-words");
const checkThirdPerson = document.getElementById("check-third-person");
const checkMarkNonThirdPerson = document.getElementById("mark-non-third-person");
const checkReadability = document.getElementById("check-readability");
const checkParagraphLength = document.getElementById("check-paragraph-length");
const checkNumberFormat = document.getElementById('check-number-format');
const checkMarkNumberFormatErrors = document.getElementById("mark-number-format-errors");
const checkAllConnectives = document.getElementById("check-all-connectives");
const pasteBtn = document.getElementById("paste-btn");
const audioBtn = document.getElementById("audio-btn");
const audioIcon = audioBtn.querySelector("i");
const clearButton = document.getElementById("btn-clear");
const reviewButton = document.getElementById("btn-review");
const fileInput = document.getElementById('file-input');
const shortcutClearText = document.getElementById("shortcut-clear-text");
const shortcutReviewText = document.getElementById("shortcut-review-text");
const shortcutUploadText = document.getElementById('shortcut-upload-text');
const wordCountDisplay = document.getElementById("word-count");
const charCountDisplay = document.getElementById("char-count");
const paragraphCountDisplay = document.getElementById("paragraph-count");
const avgWordsInParagraphsDisplay = document.getElementById("avg-words-in-paragraphs");
const avgSentencesInParagraphsDisplay = document.getElementById("avg-sentences-in-paragraphs");
const exampleButtons = document.querySelectorAll('.btn.show-example');
const btnDiccionarioRae = document.getElementById("btn-diccionario-rae");
const palabraBuscarRae = document.getElementById("palabra-buscar-rae");
const scrollTopBtn = document.getElementById("scroll-top-btn");
const checkboxes = [
    { element: checkRepeatedWords, key: "checkRepeatedWords" },
    { element: checkMarkRepeatedWords, key: "checkMarkPepeatedWords" },
    { element: checkThirdPerson, key: "checkThirdPerson" },
    { element: checkMarkNonThirdPerson, key: "checkMarkNonThirdPerson" },
    { element: checkReadability, key: "checkReadability" },
    { element: checkParagraphLength, key: "checkParagraphLength" },
    { element: checkNumberFormat, key: "checkNumberFormat" },
    { element: checkMarkNumberFormatErrors, key: "checkMarkNumberFormatErrors" },
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
const firstAndSecondPersonPronouns = [
    // Primera persona
    'yo', 'me', 'mi', 'mis',
    'nosotros', 'nosotras', 'nos', 'nuestro', 'nuestra', 'nuestros', 'nuestras',

    // Segunda persona
    'tú', 'te', 'tu', 'tus',
    'usted', 'ustedes', 'vos',
    'vosotros', 'vosotras', 'vuestra', 'vuestros', 'vuestras'
];

const firstAndSecondPersonVerbs = [
    // Verbos de primera persona
    'soy', 'estoy', 'tengo', 'vamos', 'hacemos', 'hablo', 'escribo', 'pienso', 'creo',
    'tenemos', 'veo', 'vengo', 'digo', 'cuento', 'pido', 'sigo', 'conozco', 'entiendo',
    'aprendo', 'corro', 'camino', 'leo', 'espero', 'llego', 'salgo', 'pongo', 'dejo',
    'empiezo', 'quiero', 'puedo', 'debo', 'siento',
    'escucho', 'muevo', 'subo', 'bajo', 'cierro', 'abro',

    // Verbos de segunda persona
    'eres', 'estás', 'tienes', 'haces', 'vas', 'piensas', 'crees', 'escribes', 'hablas',
    'vienes', 'dices', 'pides', 'sigues', 'conoces', 'entiendes', 'aprendes', 'corres',
    'caminas', 'lees', 'esperas', 'llegas', 'sales', 'pones', 'dejas', 'llevas', 'trabajas',
    'empiezas', 'terminas', 'usas', 'necesitas', 'quieres', 'puedes', 'debes', 'sientes',
    'buscas', 'escuchas', 'mueves', 'subes', 'bajas', 'cierras', 'abres'
];

const inclusiveLanguage = ['todas', 'todos', 'nosotras', 'nosotros', 'ustedes'];
let isReviewing = false;
let hasErrors = false; // Inicializar con la suposición de que no hay errores
let isPlaying = false; // Variable para rastrear si está reproduciendo el texto

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

// Función para detectar el sistema operativo
const getOperatingSystem = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes("windows")) return "Windows";
    if (userAgent.includes("mac")) return "MacOS";
    if (userAgent.includes("linux")) return "Linux";
    if (userAgent.includes("android")) return "Android";
    if (/iphone|ipad|ipod/.test(userAgent)) return "iOS";
    return "Other";
}

// Función para ajustar los textos de los botones
const updateButtonText = () => {
    const os = getOperatingSystem();

    if (os === "Windows" || os === "Linux") {
        shortcutClearText.innerHTML = "(Ctrl + L)";
        shortcutReviewText.innerHTML = "(Ctrl + Enter)";
        shortcutUploadText.innerHTML = "(Ctrl + U)";
    } else if (os === "MacOS") {
        shortcutClearText.innerHTML = "(Cmd + L)";
        shortcutReviewText.innerHTML = "(Cmd + Enter)";
        shortcutUploadText.innerHTML = "(Cmd + U)";
    } else if (os === "Android" || os === "iOS") {
        shortcutClearText.innerHTML = "";
        shortcutReviewText.innerHTML = "";
        shortcutUploadText.innerHTML = "";
    }
}

//Funciones para mostrar u ocultar navbar
const showSidebar = () => sidebar.classList.add('active');
const hideSidebar = () => sidebar.classList.remove('active');

// Evento click para todos los enlaces de navegación
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();

        const sectionId = link.dataset.section;

        // Ocultar todas las secciones
        Object.values(sections).forEach(section => {
            section.classList.remove('active');
        });

        // Mostrar la sección seleccionada
        sections[sectionId].classList.add('active');

        const sectionTop = sections[sectionId].offsetTop; // Desplazar la vista hacia la parte superior de la sección seleccionada
        const headerOffset = 100; //Ajustar valor según navbar
        const elementPosition = sectionTop - headerOffset;

        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });

        // Eliminar clase active de todos los enlaces
        navLinks.forEach(link => {
            link.parentElement.classList.remove('active');
        });

        // Añadir clase active al enlace actual y su equivalente en el otro navbar
        navLinks.forEach(navLink => {
            if (navLink.dataset.section === sectionId) {
                navLink.parentElement.classList.add('active');
            }
        });
    });
});

// Función para limpiar el documento
const clearDocument = () => {
    documentInput.innerText = '';
    feedbackDiv.classList.add('hidden');
    charCountDisplay.innerText = 'Caracteres: 0';
    wordCountDisplay.innerText = 'Palabras: 0';
    paragraphCountDisplay.innerText = 'Párrafos: 0';
    avgWordsInParagraphsDisplay.innerText = 'Promedio de palabras en párrafos: 0';
    avgSentencesInParagraphsDisplay.innerText = 'Promedio de oraciones en párrafos: 0';
    documentInput.classList.remove('has-content');
}

// Función para normalizar el texto eliminando acentos y caracteres especiales
const normalizeWord = word => {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); // Elimina acentos
}

// Función para verificar si una secuencia de palabras es un número compuesto (ej: "ochenta y nueve")
const getNumberFromWords = (words, startIndex) => {
    let fullNumberWord = words[startIndex]; // Inicializar con la primera palabra
    let numValue = numberWords[fullNumberWord.toLowerCase()]; // Buscar el valor del primer número
    let i = startIndex + 1;

    let lastWasThousand = false; // Para controlar cuando encontramos "mil"

    // Mientras se encuentren más palabras numéricas, continuar formando el número
    while (i < words.length && (words[i].toLowerCase() === 'y' || numberWords[words[i].toLowerCase()] !== undefined)) {
        fullNumberWord += ' ' + words[i]; // Concatenar la palabra actual

        // Caso especial: Si encontramos "mil", multiplicamos el valor actual por 1000
        if (words[i].toLowerCase() === 'mil') {
            numValue = (numValue === 0 ? 1 : numValue) * 1000;
            lastWasThousand = true; // Indicamos que encontramos "mil"
        } else if (numberWords[words[i].toLowerCase()] !== undefined) {
            if (lastWasThousand) {
                // Después de "mil", simplemente sumamos el siguiente número
                numValue += numberWords[words[i].toLowerCase()];
                lastWasThousand = false; // Reiniciar la bandera
            } else {
                // De lo contrario, seguimos sumando como antes
                numValue += numberWords[words[i].toLowerCase()];
            }
        }

        i++;
    }

    // Si es un número compuesto válido, devolver el número y el índice final
    return { fullNumberWord, numValue, endIndex: i - 1 };
};

// Función para verificar el formato de los números en el documento
const validateNumberFormat = (paragraphText, paragraphIndex) => {
    const numberIssues = [];
    const words = paragraphText.split(/\s+/); // Dividir el párrafo en palabras
    let i = 0;

    while (i < words.length) {
        const originalWord = words[i].replace(/[.,;:!?{}]/g, ''); // Eliminar puntuación para la comparación

        // Verificar si es un número compuesto (ej: "ochenta y nueve")
        if (numberWords[originalWord.toLowerCase()] !== undefined) {
            const { fullNumberWord, numValue, endIndex } = getNumberFromWords(words, i);
            let nextWord = words[endIndex + 1] ? words[endIndex + 1].trim() : null;

            // Normalizar la siguiente palabra para ignorar signos de puntuación comunes
            if (nextWord) {
                nextWord = nextWord.replace(/[.,;:!?{}]/g, ''); // Elimina caracteres de puntuación
            }

            // Si la siguiente palabra no es el número en paréntesis
            if (nextWord !== `(${numValue})`) {
                numberIssues.push(`El número en palabras "${fullNumberWord}" en el párrafo ${paragraphIndex + 1} debe redactarse como "${fullNumberWord} (${numValue})".`);
            }

            i = endIndex; // Saltar a la última palabra del número compuesto
        }
        // Verificar si es un número en formato dígito
        else if (!isNaN(originalWord)) {
            const numValue = parseInt(originalWord, 10);
            const numberAsWord = numberToWord(numValue); // Convertir el número en dígito a su forma en palabras
            const previousWord = words[i - 1] ? words[i - 1].toLowerCase().replace(/[.,;:!?{}]/g, '') : null; // Normalizar la palabra anterior
            let nextWord = words[i + 1] ? words[i + 1].trim() : null;

            // Normalizar la siguiente palabra para ignorar signos de puntuación comunes
            if (nextWord) {
                nextWord = nextWord.replace(/[.,;:]/g, ''); // Elimina caracteres de puntuación
            }

            // Si no tiene el formato correcto con la palabra antes y el número en paréntesis después
            if (previousWord !== numberAsWord || nextWord !== `(${numValue})`) {
                numberIssues.push(`El número "${originalWord}" en el párrafo ${paragraphIndex + 1} debe redactarse como "${numberAsWord} (${originalWord})".`);
            }
        }

        i++; // Avanzar a la siguiente palabra
    }

    return numberIssues;
}

// Función auxiliar para convertir números a palabras en español (simplificada)
const numberToWord = num => {
    // Verificamos si el número está dentro del rango y lo devolvemos
    return num <= 10000 ? words[num] : num.toString();
}

// Función para verificar el uso de tercera persona
const checkPronounsUsage = documentText => {
    const paragraphs = documentText.split(/\n+/);
    const foundPronouns = {};
    const foundVerbs = {};
    const foundInclusiveTerms = {};
    let hasPronouns = false;
    let hasVerbs = false;
    let hasInclusiveLanguage = false;
    let feedbackMessage = "";

    paragraphs.forEach((paragraph, paragraphIndex) => {
        const wordsInParagraph = normalizeWord(paragraph).split(/\s+/);
        foundPronouns[paragraphIndex + 1] = [];
        foundVerbs[paragraphIndex + 1] = [];
        foundInclusiveTerms[paragraphIndex + 1] = [];

        wordsInParagraph.forEach(word => {
            if (firstAndSecondPersonPronouns.includes(word)) {
                foundPronouns[paragraphIndex + 1].push(word);
                hasPronouns = true;
            }
            if (firstAndSecondPersonVerbs.includes(word)) {
                foundVerbs[paragraphIndex + 1].push(word);
                hasVerbs = true;
            }
            if (inclusiveLanguage.includes(word)) {
                foundInclusiveTerms[paragraphIndex + 1].push(word);
                hasInclusiveLanguage = true;
            }
        });
    });

    if (hasPronouns || hasVerbs || hasInclusiveLanguage) {
        if (hasPronouns) {
            Object.entries(foundPronouns).forEach(([paragraphIndex, pronouns]) => {
                if (pronouns.length > 0) {
                    feedbackMessage += `<div class="feedback-pronoun"><b>En el párrafo ${paragraphIndex}:</b> ${pronouns.join(', ')} (pronombres).</div>`;
                }
            });
        }
        if (hasVerbs) {
            Object.entries(foundVerbs).forEach(([paragraphIndex, verbs]) => {
                if (verbs.length > 0) {
                    feedbackMessage += `<div class="feedback-verb"><b>En el párrafo ${paragraphIndex}:</b> ${verbs.join(', ')} (verbos).</div>`;
                }
            });
        }
        if (hasInclusiveLanguage) {
            Object.entries(foundInclusiveTerms).forEach(([paragraphIndex, terms]) => {
                if (terms.length > 0) {
                    feedbackMessage += `<div class="feedback-inclusive"><b>En el párrafo ${paragraphIndex}:</b> ${terms.join(', ')} (términos inclusivos).</div>`;
                }
            });
        }

        feedbackDiv.innerHTML += `<div class='error'><i class="fa-solid fa-exclamation-circle"></i> El texto contiene elementos de primera o segunda persona o lenguaje inclusivo: ${feedbackMessage} Asegúrese de escribir en tercera persona y evitar el lenguaje inclusivo.</div>`;
        hasErrors = true;
    } else {
        feedbackDiv.innerHTML += `<div class='success'><i class="fa-solid fa-check-circle"></i> El texto está correctamente escrito en tercera persona.</div>`;
    }
}

// Función para contar las sílabas en una palabra en español
const countSyllables = word => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    const syllableMatches = word.match(/[aeiouáéíóúü]+/g);
    return syllableMatches ? syllableMatches.length : 1;
};

// Función para interpolar colores
const interpolateColor = (color1, color2, factor) => {
    const result = color1.slice(1).match(/.{1,2}/g).map((val, index) => {
        const color1Val = parseInt(val, 16);
        const color2Val = parseInt(color2.slice(1).match(/.{1,2}/g)[index], 16);
        return Math.round(color1Val + factor * (color2Val - color1Val)).toString(16).padStart(2, '0');
    });
    return `#${result.join('')}`;
};

// Función para obtener el color de la barra según el puntaje
const getReadabilityColor = score => {
    if (score > 100) {
        return "#4caf50"; // Color verde oscuro para puntuaciones superiores a 100
    } else if (score >= 80) {
        return interpolateColor("#8bc34a", "#4caf50", (score - 80) / 20); // Gradiente de verde claro a verde
    } else if (score >= 60) {
        return interpolateColor("#ffeb3b", "#8bc34a", (score - 60) / 20); // Gradiente de amarillo a verde claro
    } else if (score >= 40) {
        return interpolateColor("#ff9800", "#ffeb3b", (score - 40) / 20); // Gradiente de naranja a amarillo
    } else {
        return interpolateColor("#f44336", "#ff9800", score / 40); // Gradiente de rojo a naranja
    }
};

// Función para actualizar la barra de legibilidad
const updateReadabilityBar = (score, feedbackContainer) => {
    // Crear y agregar el contenedor si no existe
    const readabilityContainer = document.createElement('div');
    readabilityContainer.classList.add('readability-container');

    // Crear la barra de legibilidad y el texto de puntaje
    const readabilityBar = document.createElement('div');
    readabilityBar.classList.add('readability-bar');
    readabilityBar.id = 'readability-bar';

    const readabilityScoreText = document.createElement('span');
    readabilityScoreText.id = 'readability-score-text';

    // Agregar barra y texto al contenedor
    readabilityContainer.appendChild(readabilityBar);
    readabilityContainer.appendChild(readabilityScoreText);

    // Agregar el contenedor de legibilidad al feedback general
    feedbackContainer.appendChild(readabilityContainer);

    // Ajustar la longitud de la barra según la puntuación de legibilidad
    const width = Math.min(score, 100);

    readabilityBar.style.width = `${width}%`;
    readabilityScoreText.innerText = `Legibilidad: ${score.toFixed(2)}`;

    // Cambiar el color de la barra según el nivel de legibilidad, de manera gradual
    readabilityBar.style.backgroundColor = getReadabilityColor(score);
}

// Función para calcular el índice de legibilidad de Flesch-Szigriszt para español
const calculateReadability = text => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const words = text.split(/\s+/).filter(word => word.length > 1);
    const syllableCount = words.reduce((count, word) => count + countSyllables(word), 0);

    const sentenceCount = sentences.length || 1;
    const wordCount = words.length || 1;

    // Cálculo del índice de Flesch-Szigriszt ajustado para español
    const readabilityScore = 206.84 - (1.02 * (wordCount / sentenceCount)) - (60 * (syllableCount / wordCount));
    return readabilityScore;
};

// Función para verificar legibilidad de texto
const checkTextReadability = text => {
    // Cálculo de la legibilidad
    const readabilityScore = calculateReadability(text);

    // Crear el feedback según el puntaje de legibilidad
    let readabilityFeedback = '';
    if (readabilityScore >= 80) {
        readabilityFeedback = `<div class="success"><i class="fa-solid fa-check-circle"></i> El índice de legibilidad es ${readabilityScore.toFixed(2)}, lo cual es excelente para un público académico y técnico. El texto es claro y preciso. Mantenga este estilo para garantizar que el contenido sea accesible incluso para lectores de nivel intermedio.</div>`;
    } else if (readabilityScore >= 60) {
        readabilityFeedback = `<div class="success"><i class="fa-solid fa-check-circle"></i> El índice de legibilidad es ${readabilityScore.toFixed(2)}, adecuado para un público académico y técnico avanzado. No obstante, podría simplificar algunos términos técnicos o dividir párrafos largos para mejorar la accesibilidad, especialmente si la audiencia incluye lectores con menos experiencia técnica.</div>`;
    } else if (readabilityScore >= 50) {
        readabilityFeedback = `<div class="success"><i class="fa-solid fa-check-circle"></i> El índice de legibilidad es ${readabilityScore.toFixed(2)}, apropiado para un público universitario. Se recomienda revisar la longitud de las oraciones y eliminar repeticiones. Asegúrese de que las ideas principales sean claras y respalden las ideas secundarias.</div>`;
    } else if (readabilityScore >= 40) {
        readabilityFeedback = `<div class="success"><i class="fa-solid fa-check-circle"></i> El índice de legibilidad es ${readabilityScore.toFixed(2)}, adecuado para lectores universitarios, aunque podría resultar complejo para algunos. Considere utilizar conectores para mejorar la cohesión, y revise que los términos técnicos sean necesarios y claros.</div>`;
    } else if (readabilityScore >= 30) {
        readabilityFeedback = `<div class="warning"><i class="fa-solid fa-info-circle"></i> El índice de legibilidad es ${readabilityScore.toFixed(2)}, lo cual es comprensible para lectores con experiencia en textos técnicos, pero podría dificultar la comprensión general. Podría mejorar la claridad evitando estructuras de oraciones demasiado complejas y asegurando precisión en los términos especializados.</div>`;
    } else if (readabilityScore >= 20) {
        readabilityFeedback = `<div class="warning"><i class="fa-solid fa-info-circle"></i> El índice de legibilidad es ${readabilityScore.toFixed(2)}, lo que indica un nivel de dificultad elevado. Revise la estructura de las oraciones, reduzca la longitud de los párrafos y considere simplificar algunos términos técnicos para mejorar la comprensión.</div>`;
    } else {
        readabilityFeedback = `<div class="error"><i class="fa-solid fa-exclamation-circle"></i> El índice de legibilidad es ${readabilityScore.toFixed(2)}, lo que sugiere un nivel de dificultad alto, posiblemente excesivo para la mayoría de lectores. Reescriba el texto con oraciones más cortas y directas, y evite términos técnicos complejos que no sean necesarios para la precisión científica. Utilice sinónimos más accesibles y divida el contenido en bloques de ideas más claros. Intente expresar las mismas ideas con menos palabras.</div>`;
        hasErrors = true;
    }

    // Añadir el feedback al contenedor de feedback
    feedbackDiv.innerHTML += readabilityFeedback;

    // Actualizar la barra de legibilidad
    updateReadabilityBar(readabilityScore, feedbackDiv);
}

// Función para mostrar palabras repetidas por párrafo
const showRepeatedWordsByParagraph = repeatedWordsPerParagraph => {
    let repeatedWordsHtml = `
        <div class="repeated-words-section">
        <div><i class="fa-solid fa-info-circle"></i> <strong>Palabras repetidas:</strong></div>
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
    let allParagraphsWithinLimit = true;
    let numberFormatIssues = [];
    const informalPhrases = Object.keys(informalWordsData); // Palabras informales que pueden ser frases
    let highlightedText = documentText;

    // Buscar y resaltar palabras informales compuestas y simples
    informalPhrases.forEach(phrase => {
        const regex = new RegExp(`\\b${phrase}\\b`, 'gi');
        if (highlightedText.match(regex)) {
            foundInformalWords = true;
            const phraseId = `word-${wordCounter++}`;
            wordOccurrences[phrase] = (wordOccurrences[phrase] || []).concat([phraseId]); // Almacenar ID
            const titleText = informalWordsData[phrase].explanation;
            highlightedText = highlightedText.replace(regex, `<a href="#${phraseId}" id="${phraseId}" class="informal-highlight" title="${titleText}">${phrase}</a>`);
        }
    });


    // Crear la lista de explicaciones sin duplicar y agregar enlaces a cada ocurrencia
    let explanations = '';
    Object.keys(wordOccurrences).forEach((word) => {
        const substitutes = informalWordsData[word].substitutes.length > 0
            ? `<div class="substitutes">Posibles sustitutos: <span>${informalWordsData[word].substitutes.join(', ')}</span></div>`
            : '';
        const occurrencesLinks = wordOccurrences[word]
            .map(id => `<a href="#${id}" class="word-link">${word}</a>`)
            .join(', ');

        explanations += `
            <div class="explanation">
                <div class="occurrences">${occurrencesLinks}</div>
                <div class="description">${informalWordsData[word].explanation}</div>
                ${substitutes}
            </div>
        `;
    });

    // Dividir el texto en párrafos
    const paragraphs = documentText.split(/\n+/);
    paragraphs.forEach((paragraph, paragraphIndex) => {
        let wordCount = {};
        let originalWordsMap = {};
        const wordsInParagraph = paragraph.trim().split(/\s+/).length;

        // Verificar si el párrafo excede el límite de palabras
        if (checkParagraphLength.checked && wordsInParagraph > maxWordsPerParagraph) {
            tooLongParagraphs.push(`Párrafo ${paragraphIndex + 1} (${wordsInParagraph} palabras)`);
            allParagraphsWithinLimit = false;
        }

        // Procesar el texto de cada párrafo
        let highlightedParagraph = paragraph.split(/([^\p{L}\p{N}]+)/gu).map(word => {
            const lowerCaseWord = normalizeWord(word); // Normalizar la palabra
            originalWordsMap[lowerCaseWord] = word; // Almacenar la palabra original

            // Verificar si es un conector
            if (checkAllConnectives.checked && connectives.has(lowerCaseWord)) {
                return `<span class="connective-highlight">${word}</span>`;
            }

            // Verificar si la palabra es común
            if (commonWords.has(lowerCaseWord)) {
                return word; // Si es común, no resaltar
            }

            // Contar palabras repetidas
            if (lowerCaseWord.match(/[a-záéíóú]/i) && lowerCaseWord.length > 1) {
                wordCount[lowerCaseWord] = (wordCount[lowerCaseWord] || 0) + 1;
            }

            // Verificar el formato de números si el checkbox está marcado
            if (checkThirdPerson.checked && checkMarkNonThirdPerson.checked && (firstAndSecondPersonPronouns.includes(lowerCaseWord) || (firstAndSecondPersonVerbs.includes(lowerCaseWord)) || (inclusiveLanguage.includes(lowerCaseWord)))) {
                return `<span class="non-third-person-highlight">${word}</span>`;
            }

            return word;
        }).join('');

        // Resaltar palabras repetidas solo en este párrafo
        if (checkRepeatedWords.checked) {
            let repeatedWords = [];

            Object.entries(wordCount).forEach(([word, count]) => {
                if (count > 1) {
                    repeatedWords.push(`${word}: ${count} veces`);

                    if (checkMarkRepeatedWords.checked) {
                        const regex = new RegExp(`\\b${originalWordsMap[word]}\\b`, 'gi');
                        highlightedParagraph = highlightedParagraph.replace(regex, `<span class="repeated-word-highlight" title="Se repite ${count} veces">${word}</span>`);
                    }
                }
            });

            if (repeatedWords.length > 0) {
                repeatedWordsPerParagraph[`Párrafo ${paragraphIndex + 1}`] = repeatedWords;
            }
        }

        highlightedText = highlightedText.replace(paragraph, highlightedParagraph);


        // Verificar formato de números, si la opción está activada
        if (checkNumberFormat.checked) {
            const numberIssuesInParagraph = validateNumberFormat(paragraph, paragraphIndex);
            numberFormatIssues = numberFormatIssues.concat(numberIssuesInParagraph);
        }
    });

    documentInput.innerHTML = highlightedText.replace(/\n/g, '<br>');


    let feedbackContent = ""; // Variable temporal para acumular el contenido

    // Condiciones finales para palabras no formales
    if (foundInformalWords) {
        feedbackContent += `<div class="error"><i class="fa-solid fa-exclamation-circle"></i> Se han encontrado palabras no formales en el documento:<br><div class='explanations-container'>${explanations}</div></div>`;
        hasErrors = true;
    } else {
        feedbackContent += `<div class="success"><i class="fa-solid fa-check-circle"></i> El texto no contiene palabras informales.<br></div>`;
    }


    // Verificar longitud de los párrafos
    if (checkParagraphLength.checked) {
        if (tooLongParagraphs.length > 0) {
            feedbackContent += `<div class="error"><i class="fa-solid fa-exclamation-circle"></i> Los siguientes párrafos exceden el límite recomendado de ${maxWordsPerParagraph} palabras:<br><ul>`;
            tooLongParagraphs.forEach(paragraph => {
                feedbackContent += `<li>${paragraph}</li>`;
            });
            feedbackContent += `</ul></div>`;
            hasErrors = true;
        } else {
            feedbackContent += `<div class="success"><i class="fa-solid fa-check-circle"></i> La longitud de todos los párrafos es adecuada.</div>`;
        }
    }

    // Verificar errores de formato de numeros
    if (checkNumberFormat.checked) {
        // Verificar si hubo problemas con el formato de los números
        if (numberFormatIssues.length > 0) {
            feedbackContent += `<div class="error"><i class="fa-solid fa-exclamation-circle"></i> Los siguientes números no siguen la regla de redacción (esta regla no aplica en las fuentes o subtítulos de tablas, gráficos o figuras):<br><ul>`;
            numberFormatIssues.forEach(issue => {
                feedbackContent += `<li>${issue}</li>`;
            });
            feedbackContent += `</ul></div>`;
            hasErrors = true;
        } else {
            feedbackContent += `<div class="success"><i class="fa-solid fa-check-circle"></i> El formato de los números es correcto.</div>`;
        }
    }

    // Actualizar el contenido del feedbackDiv
    feedbackDiv.innerHTML = feedbackContent;

    // Verificar la legibilidad del texto
    if (checkReadability.checked) {
        checkTextReadability(documentText);
    }

    //Verificar el uso de tercera persona
    if (checkThirdPerson.checked) {
        checkPronounsUsage(documentText);
    }

    // Mostrar palabras repetidas por párrafo, si la opción está activada
    if (checkRepeatedWords.checked) {
        showRepeatedWordsByParagraph(repeatedWordsPerParagraph);
    }

    // Actualizar el estado final del feedbackDiv basado en si hubo errores o no
    if (hasErrors) {
        feedbackDiv.classList.remove('hidden', "success", 'warning',);
        feedbackDiv.classList.add("error");
    } else {
        feedbackDiv.classList.remove("hidden", "error", "warning");
        feedbackDiv.classList.add("success");
    }

    // Mostrar mensaje si no hay ningún error
    if (!hasErrors) {
        feedbackDiv.insertAdjacentHTML('afterbegin', `<i class="fa-solid fa-star"></i> El texto no contiene errores de redacción. ¡Buen trabajo!`);
    }

    hasErrors = false;
}

// Función para contar palabras
const countWords = text => {
    const words = text.trim().split(/\s+/);
    return words.filter(word => word.length > 0).length;
}

// Función para contar caracteres
const countCharacters = text => {
    return text.trim().length; // Retorna 0 si el texto está vacío o solo contiene espacios
};

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

// Función para alternar la visibilidad del ejemplo
const toggleExample = button => {
    const exampleParagraph = button.closest('li').querySelector('.example');
    exampleParagraph.classList.toggle('show');
    button.textContent = exampleParagraph.classList.contains('show') ? 'Ocultar ejemplo' : 'Ver ejemplo';
}

// Función que procesa el archivo en función de su tipo
const handleFile = (file) => {
    if (!file) return;

    const reader = new FileReader();

    if (file.type === "text/plain") {
        reader.onload = e => {
            documentInput.innerText = e.target.result;
            updateCounts();
            updateAverages();
            documentInput.classList.add("has-content");
        };
        reader.readAsText(file);

    } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        reader.onload = e => {
            const arrayBuffer = e.target.result;
            mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
                .then(result => {
                    documentInput.innerHTML = result.value;
                    updateCounts();
                    updateAverages();
                    documentInput.classList.add("has-content");
                })
                .catch(err => {
                    console.error("Error al convertir el archivo .docx: ", err);
                    alert("No se pudo procesar el archivo .docx");
                });
        };
        reader.readAsArrayBuffer(file);

    } else if (file.type === "application/pdf") {
        reader.onload = e => {
            const typedArray = new Uint8Array(e.target.result);
            pdfjsLib.getDocument(typedArray).promise.then(pdf => {
                let textContent = "";
                let promises = [];

                for (let i = 1; i <= pdf.numPages; i++) {
                    promises.push(
                        pdf.getPage(i).then(page => {
                            return page.getTextContent().then(text => {
                                text.items.forEach(item => {
                                    textContent += item.str + " ";
                                });
                            });
                        })
                    );
                }

                Promise.all(promises).then(() => {
                    documentInput.innerText = textContent;
                    updateCounts();
                    updateAverages();
                    documentInput.classList.add("has-content");
                });
            }).catch(err => {
                console.error("Error al procesar el archivo PDF: ", err);
                alert("No se pudo procesar el archivo PDF");
            });
        };
        reader.readAsArrayBuffer(file);

    } else {
        alert("Por favor, sube un archivo válido (.txt, .docx, .pdf).");
    }
};

// Mostrar el botón al desplazarse hacia abajo si la pantalla ha bajado un poco
window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

// Función para volver al inicio de la página
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Escucha el evento 'input' para actualizar en tiempo real
documentInput.addEventListener('input', () => {
    updateCounts();
    updateAverages();

    // Ajustar opacidad del botón de pegar cuando hay contenido en el área de texto
    if (documentInput.innerText.trim() !== "") {
        documentInput.classList.add("has-content");
    } else {
        documentInput.classList.remove("has-content");
    }
});

// Escucha el evento 'input' para contar palabras, caracteres y párrafos en tiempo real
documentInput.addEventListener('paste', event => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData('text');
    const cleanedText = cleanText(text);
    document.execCommand('insertText', false, cleanedText);
});

// Permitir que se pueda arrastrar el archivo en el div
documentInput.addEventListener("dragover", event => {
    event.preventDefault();
    documentInput.classList.add("dragging");
});

documentInput.addEventListener("dragleave", () => {
    documentInput.classList.remove("dragging");
});

// Manejar el evento de soltar archivos en el input de ingresar texto
documentInput.addEventListener("drop", event => {
    event.preventDefault();
    documentInput.classList.remove("dragging");
    handleFile(event.dataTransfer.files[0]);
});

fileInput.addEventListener('change', event => {
    handleFile(event.target.files[0]);
});

// Función para pegar el texto del portapapeles
pasteBtn.addEventListener("click", async () => {
    try {
        const text = await navigator.clipboard.readText();

        if (text.trim() === "") {
            alert("El portapapeles está vacío. Copia algo primero.");
        } else {
            documentInput.innerText = text;
            documentInput.classList.add("has-content");
        }
    } catch (err) {
        console.error("Error al pegar el texto:", err);
    }
});

// Agregar el evento al botón de revisar
reviewButton.addEventListener('click', () => {
    isReviewing = true;
    checkDocument();
    isReviewing = false;
});

// Evento del botón de limpiar
clearButton.addEventListener("click", clearDocument);

// Escucha el evento de teclado
document.addEventListener('keydown', event => {
    const isCtrlOrCmd = event.ctrlKey || event.metaKey;

    if (isCtrlOrCmd && event.key === 'Enter') {
        event.preventDefault();
        checkDocument();
    }

    if (isCtrlOrCmd && event.key.toLowerCase() === 'u') {
        event.preventDefault();
        fileInput.click();
    }

    if (isCtrlOrCmd && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        clearDocument();
    }

    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        event.preventDefault();
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
        "checkMarkNonThirdPerson": checkMarkNonThirdPerson,
        "checkReadability": checkReadability,
        "checkParagraphLength": checkParagraphLength,
        "checkNumberFormat": checkNumberFormat,
        "checkMarkNumberFormatErrors": checkMarkNumberFormatErrors,
        "checkAllConnectives": checkAllConnectives,
    };

    for (const [key, checkbox] of Object.entries(checkboxes)) {
        const savedValue = localStorage.getItem(key);
        checkbox.checked = savedValue === "true";
    }
});

btnDiccionarioRae.addEventListener("click", () => {
    const palabra = palabraBuscarRae.value.trim();
    if (palabra) {
        const url = `https://dle.rae.es/${palabra}`;
        window.open(url, "_blank");
    } else {
        alert("Por favor, ingrese una palabra para buscar en el diccionario de la RAE.");
    }
});

// Agregar el evento para detectar "Enter" en el input de ingresar la palabra del diccionario
palabraBuscarRae.addEventListener("keypress", event => {
    if (event.key === "Enter") btnDiccionarioRae.click();
});

document.addEventListener('contextmenu', event => {
    event.preventDefault();
});

documentInput.addEventListener('contextmenu', event => {
    event.stopPropagation(); // Evitar que el evento suba a la ventana
});

// Agregar eventos para guardar la selección y actualizar el análisis
checkboxes.forEach(({ element, key }) => {
    element.addEventListener("change", () => handleCheckboxChange({ element, key }));
});

// Restablecer botón e ícono a estado inicial
const resetAudioButton = () => {
    audioBtn.classList.remove("pause-mode");
    audioIcon.classList.replace("fa-stop", "fa-volume-up");
    isPlaying = false;
}

// Event listener para el botón de audio
audioBtn.addEventListener("click", () => {
    const text = documentInput.innerText.trim();

    // Si hay texto para reproducir
    if (text) {
        if (!isPlaying) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = "es-ES";
            speech.rate = 1;

            audioIcon.classList.replace("fa-volume-up", "fa-stop");
            window.speechSynthesis.speak(speech);
            isPlaying = true;

            speech.onend = () => {
                resetAudioButton();
            };
        } else {
            window.speechSynthesis.cancel();
            resetAudioButton();
        }
    }
});

// Detener síntesis de voz si se recarga o cierra la página
window.addEventListener("beforeunload", () => {
    window.speechSynthesis.cancel();
});

updateButtonText();