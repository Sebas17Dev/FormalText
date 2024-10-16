const feedbackDiv = document.getElementById("feedback");
const documentInput = document.getElementById('document-input');
const checkRepeatedWords = document.getElementById("check-repeated-words");
const checkMarkRepeatedWords = document.getElementById("mark-repeated-words");
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
function validateNumberFormat(paragraphText, paragraphIndex) {
    const numberIssues = [];
    const words = paragraphText.split(/\s+/); // Dividir el párrafo en palabras

    const numberWords = {
        "cero": 0, "uno": 1, "dos": 2, "tres": 3, "cuatro": 4, "cinco": 5, "seis": 6,
        "siete": 7, "ocho": 8, "nueve": 9, "diez": 10, "once": 11, "doce": 12, "trece": 13,
        "catorce": 14, "quince": 15, "dieciséis": 16, "diecisiete": 17, "dieciocho": 18, "diecinueve": 19, "veinte": 20,
        "veintiuno": 21, "veintidós": 22, "veintitrés": 23, "veinticuatro": 24, "veinticinco": 25,
        "veintiséis": 26, "veintisiete": 27, "veintiocho": 28, "veintinueve": 29, "treinta": 30,
        "treinta y uno": 31, "treinta y dos": 32, "treinta y tres": 33, "treinta y cuatro": 34, "treinta y cinco": 35,
        "treinta y seis": 36, "treinta y siete": 37, "treinta y ocho": 38, "treinta y nueve": 39, "cuarenta": 40,
        "cuarenta y uno": 41, "cuarenta y dos": 42, "cuarenta y tres": 43, "cuarenta y cuatro": 44, "cuarenta y cinco": 45,
        "cuarenta y seis": 46, "cuarenta y siete": 47, "cuarenta y ocho": 48, "cuarenta y nueve": 49, "cincuenta": 50,
        "cincuenta y uno": 51, "cincuenta y dos": 52, "cincuenta y tres": 53, "cincuenta y cuatro": 54, "cincuenta y cinco": 55,
        "cincuenta y seis": 56, "cincuenta y siete": 57, "cincuenta y ocho": 58, "cincuenta y nueve": 59, "sesenta": 60,
        "sesenta y uno": 61, "sesenta y dos": 62, "sesenta y tres": 63, "sesenta y cuatro": 64, "sesenta y cinco": 65,
        "sesenta y seis": 66, "sesenta y siete": 67, "sesenta y ocho": 68, "sesenta y nueve": 69, "setenta": 70,
        "setenta y uno": 71, "setenta y dos": 72, "setenta y tres": 73, "setenta y cuatro": 74, "setenta y cinco": 75,
        "setenta y seis": 76, "setenta y siete": 77, "setenta y ocho": 78, "setenta y nueve": 79, "ochenta": 80,
        "ochenta y uno": 81, "ochenta y dos": 82, "ochenta y tres": 83, "ochenta y cuatro": 84, "ochenta y cinco": 85,
        "ochenta y seis": 86, "ochenta y siete": 87, "ochenta y ocho": 88, "ochenta y nueve": 89, "noventa": 90,
        "noventa y uno": 91, "noventa y dos": 92, "noventa y tres": 93, "noventa y cuatro": 94, "noventa y cinco": 95,
        "noventa y seis": 96, "noventa y siete": 97, "noventa y ocho": 98, "noventa y nueve": 99, "cien": 100,
        "ciento uno": 101, "ciento dos": 102, "ciento tres": 103, "ciento cuatro": 104, "ciento cinco": 105,
        "ciento seis": 106, "ciento siete": 107, "ciento ocho": 108, "ciento nueve": 109, "ciento diez": 110,
        "ciento once": 111, "ciento doce": 112, "ciento trece": 113, "ciento catorce": 114, "ciento quince": 115,
        "ciento dieciséis": 116, "ciento diecisiete": 117, "ciento dieciocho": 118, "ciento diecinueve": 119, "ciento veinte": 120,
        "ciento veintiuno": 121, "ciento veintidós": 122, "ciento veintitrés": 123, "ciento veinticuatro": 124, "ciento veinticinco": 125,
        "ciento veintiséis": 126, "ciento veintisiete": 127, "ciento veintiocho": 128, "ciento veintinueve": 129, "ciento treinta": 130,
        "ciento treinta y uno": 131, "ciento treinta y dos": 132, "ciento treinta y tres": 133, "ciento treinta y cuatro": 134, "ciento treinta y cinco": 135,
        "ciento treinta y seis": 136, "ciento treinta y siete": 137, "ciento treinta y ocho": 138, "ciento treinta y nueve": 139, "ciento cuarenta": 140,
        "ciento cuarenta y uno": 141, "ciento cuarenta y dos": 142, "ciento cuarenta y tres": 143, "ciento cuarenta y cuatro": 144, "ciento cuarenta y cinco": 145,
        "ciento cuarenta y seis": 146, "ciento cuarenta y siete": 147, "ciento cuarenta y ocho": 148, "ciento cuarenta y nueve": 149, "ciento cincuenta": 150,
        "ciento cincuenta y uno": 151, "ciento cincuenta y dos": 152, "ciento cincuenta y tres": 153, "ciento cincuenta y cuatro": 154, "ciento cincuenta y cinco": 155,
        "ciento cincuenta y seis": 156, "ciento cincuenta y siete": 157, "ciento cincuenta y ocho": 158, "ciento cincuenta y nueve": 159, "ciento sesenta": 160,
        "ciento sesenta y uno": 161, "ciento sesenta y dos": 162, "ciento sesenta y tres": 163, "ciento sesenta y cuatro": 164, "ciento sesenta y cinco": 165,
        "ciento sesenta y seis": 166, "ciento sesenta y siete": 167, "ciento sesenta y ocho": 168, "ciento sesenta y nueve": 169, "ciento setenta": 170,
        "ciento setenta y uno": 171, "ciento setenta y dos": 172, "ciento setenta y tres": 173, "ciento setenta y cuatro": 174, "ciento setenta y cinco": 175,
        "ciento setenta y seis": 176, "ciento setenta y siete": 177, "ciento setenta y ocho": 178, "ciento setenta y nueve": 179, "ciento ochenta": 180,
        "ciento ochenta y uno": 181, "ciento ochenta y dos": 182, "ciento ochenta y tres": 183, "ciento ochenta y cuatro": 184, "ciento ochenta y cinco": 185,
        "ciento ochenta y seis": 186, "ciento ochenta y siete": 187, "ciento ochenta y ocho": 188, "ciento ochenta y nueve": 189, "ciento noventa": 190,
        "ciento noventa y uno": 191, "ciento noventa y dos": 192, "ciento noventa y tres": 193, "ciento noventa y cuatro": 194, "ciento noventa y cinco": 195,
        "ciento noventa y seis": 196, "ciento noventa y siete": 197, "ciento noventa y ocho": 198, "ciento noventa y nueve": 199, "doscientos": 200,
        "doscientos uno": 201, "doscientos dos": 202, "doscientos tres": 203, "doscientos cuatro": 204, "doscientos cinco": 205,
        "doscientos seis": 206, "doscientos siete": 207, "doscientos ocho": 208, "doscientos nueve": 209, "doscientos diez": 210,
        "doscientos once": 211, "doscientos doce": 212, "doscientos trece": 213, "doscientos catorce": 214, "doscientos quince": 215,
        "doscientos dieciséis": 216, "doscientos diecisiete": 217, "doscientos dieciocho": 218, "doscientos diecinueve": 219, "doscientos veinte": 220,
        "doscientos veintiuno": 221, "doscientos veintidós": 222, "doscientos veintitrés": 223, "doscientos veinticuatro": 224, "doscientos veinticinco": 225,
        "doscientos veintiséis": 226, "doscientos veintisiete": 227, "doscientos veintiocho": 228, "doscientos veintinueve": 229, "doscientos treinta": 230,
        "doscientos treinta y uno": 231, "doscientos treinta y dos": 232, "doscientos treinta y tres": 233, "doscientos treinta y cuatro": 234, "doscientos treinta y cinco": 235,
        "doscientos treinta y seis": 236, "doscientos treinta y siete": 237, "doscientos treinta y ocho": 238, "doscientos treinta y nueve": 239, "doscientos cuarenta": 240,
        // Se continúa hasta llegar a quinientos.
    };

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
function numberToWord(num) {
    const words = [
        "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez",
        "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte",
        "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve", "treinta",
        "treinta y uno", "treinta y dos", "treinta y tres", "treinta y cuatro", "treinta y cinco", "treinta y seis", "treinta y siete", "treinta y ocho", "treinta y nueve", "cuarenta",
        "cuarenta y uno", "cuarenta y dos", "cuarenta y tres", "cuarenta y cuatro", "cuarenta y cinco", "cuarenta y seis", "cuarenta y siete", "cuarenta y ocho", "cuarenta y nueve", "cincuenta",
        "cincuenta y uno", "cincuenta y dos", "cincuenta y tres", "cincuenta y cuatro", "cincuenta y cinco", "cincuenta y seis", "cincuenta y siete", "cincuenta y ocho", "cincuenta y nueve", "sesenta",
        "sesenta y uno", "sesenta y dos", "sesenta y tres", "sesenta y cuatro", "sesenta y cinco", "sesenta y seis", "sesenta y siete", "sesenta y ocho", "sesenta y nueve", "setenta",
        "setenta y uno", "setenta y dos", "setenta y tres", "setenta y cuatro", "setenta y cinco", "setenta y seis", "setenta y siete", "setenta y ocho", "setenta y nueve", "ochenta",
        "ochenta y uno", "ochenta y dos", "ochenta y tres", "ochenta y cuatro", "ochenta y cinco", "ochenta y seis", "ochenta y siete", "ochenta y ocho", "ochenta y nueve", "noventa",
        "noventa y uno", "noventa y dos", "noventa y tres", "noventa y cuatro", "noventa y cinco", "noventa y seis", "noventa y siete", "noventa y ocho", "noventa y nueve", "cien",
        "ciento uno", "ciento dos", "ciento tres", "ciento cuatro", "ciento cinco", "ciento seis", "ciento siete", "ciento ocho", "ciento nueve", "ciento diez",
        "ciento once", "ciento doce", "ciento trece", "ciento catorce", "ciento quince", "ciento dieciséis", "ciento diecisiete", "ciento dieciocho", "ciento diecinueve", "ciento veinte",
        "ciento veintiuno", "ciento veintidós", "ciento veintitrés", "ciento veinticuatro", "ciento veinticinco", "ciento veintiséis", "ciento veintisiete", "ciento veintiocho", "ciento veintinueve", "ciento treinta",
        "ciento treinta y uno", "ciento treinta y dos", "ciento treinta y tres", "ciento treinta y cuatro", "ciento treinta y cinco", "ciento treinta y seis", "ciento treinta y siete", "ciento treinta y ocho", "ciento treinta y nueve", "ciento cuarenta",
        "ciento cuarenta y uno", "ciento cuarenta y dos", "ciento cuarenta y tres", "ciento cuarenta y cuatro", "ciento cuarenta y cinco", "ciento cuarenta y seis", "ciento cuarenta y siete", "ciento cuarenta y ocho", "ciento cuarenta y nueve", "ciento cincuenta",
        "ciento cincuenta y uno", "ciento cincuenta y dos", "ciento cincuenta y tres", "ciento cincuenta y cuatro", "ciento cincuenta y cinco", "ciento cincuenta y seis", "ciento cincuenta y siete", "ciento cincuenta y ocho", "ciento cincuenta y nueve", "ciento sesenta",
        "ciento sesenta y uno", "ciento sesenta y dos", "ciento sesenta y tres", "ciento sesenta y cuatro", "ciento sesenta y cinco", "ciento sesenta y seis", "ciento sesenta y siete", "ciento sesenta y ocho", "ciento sesenta y nueve", "ciento setenta",
        "ciento setenta y uno", "ciento setenta y dos", "ciento setenta y tres", "ciento setenta y cuatro", "ciento setenta y cinco", "ciento setenta y seis", "ciento setenta y siete", "ciento setenta y ocho", "ciento setenta y nueve", "ciento ochenta",
        "ciento ochenta y uno", "ciento ochenta y dos", "ciento ochenta y tres", "ciento ochenta y cuatro", "ciento ochenta y cinco", "ciento ochenta y seis", "ciento ochenta y siete", "ciento ochenta y ocho", "ciento ochenta y nueve", "ciento noventa",
        "ciento noventa y uno", "ciento noventa y dos", "ciento noventa y tres", "ciento noventa y cuatro", "ciento noventa y cinco", "ciento noventa y seis", "ciento noventa y siete", "ciento noventa y ocho", "ciento noventa y nueve", "doscientos",
        "doscientos uno", "doscientos dos", "doscientos tres", "doscientos cuatro", "doscientos cinco", "doscientos seis", "doscientos siete", "doscientos ocho", "doscientos nueve", "doscientos diez",
        "doscientos once", "doscientos doce", "doscientos trece", "doscientos catorce", "doscientos quince", "doscientos dieciséis", "doscientos diecisiete", "doscientos dieciocho", "doscientos diecinueve", "doscientos veinte",
        "doscientos veintiuno", "doscientos veintidós", "doscientos veintitrés", "doscientos veinticuatro", "doscientos veinticinco", "doscientos veintiséis", "doscientos veintisiete", "doscientos veintiocho", "doscientos veintinueve", "doscientos treinta",
        "doscientos treinta y uno", "doscientos treinta y dos", "doscientos treinta y tres", "doscientos treinta y cuatro", "doscientos treinta y cinco", "doscientos treinta y seis", "doscientos treinta y siete", "doscientos treinta y ocho", "doscientos treinta y nueve", "doscientos cuarenta",
        "doscientos cuarenta y uno", "doscientos cuarenta y dos", "doscientos cuarenta y tres", "doscientos cuarenta y cuatro", "doscientos cuarenta y cinco", "doscientos cuarenta y seis", "doscientos cuarenta y siete", "doscientos cuarenta y ocho", "doscientos cuarenta y nueve", "doscientos cincuenta",
        "doscientos cincuenta y uno", "doscientos cincuenta y dos", "doscientos cincuenta y tres", "doscientos cincuenta y cuatro", "doscientos cincuenta y cinco", "doscientos cincuenta y seis", "doscientos cincuenta y siete", "doscientos cincuenta y ocho", "doscientos cincuenta y nueve", "doscientos sesenta",
        "doscientos sesenta y uno", "doscientos sesenta y dos", "doscientos sesenta y tres", "doscientos sesenta y cuatro", "doscientos sesenta y cinco", "doscientos sesenta y seis", "doscientos sesenta y siete", "doscientos sesenta y ocho", "doscientos sesenta y nueve", "doscientos setenta",
        "doscientos setenta y uno", "doscientos setenta y dos", "doscientos setenta y tres", "doscientos setenta y cuatro", "doscientos setenta y cinco", "doscientos setenta y seis", "doscientos setenta y siete", "doscientos setenta y ocho", "doscientos setenta y nueve", "doscientos ochenta",
        "doscientos ochenta y uno", "doscientos ochenta y dos", "doscientos ochenta y tres", "doscientos ochenta y cuatro", "doscientos ochenta y cinco", "doscientos ochenta y seis", "doscientos ochenta y siete", "doscientos ochenta y ocho", "doscientos ochenta y nueve", "doscientos noventa",
        "doscientos noventa y uno", "doscientos noventa y dos", "doscientos noventa y tres", "doscientos noventa y cuatro", "doscientos noventa y cinco", "doscientos noventa y seis", "doscientos noventa y siete", "doscientos noventa y ocho", "doscientos noventa y nueve", "trescientos",
        "trescientos uno", "trescientos dos", "trescientos tres", "trescientos cuatro", "trescientos cinco", "trescientos seis", "trescientos siete", "trescientos ocho", "trescientos nueve", "trescientos diez",
        "trescientos once", "trescientos doce", "trescientos trece", "trescientos catorce", "trescientos quince", "trescientos dieciséis", "trescientos diecisiete", "trescientos dieciocho", "trescientos diecinueve", "trescientos veinte",
        "trescientos veintiuno", "trescientos veintidós", "trescientos veintitrés", "trescientos veinticuatro", "trescientos veinticinco", "trescientos veintiséis", "trescientos veintisiete", "trescientos veintiocho", "trescientos veintinueve", "trescientos treinta",
        "trescientos treinta y uno", "trescientos treinta y dos", "trescientos treinta y tres", "trescientos treinta y cuatro", "trescientos treinta y cinco", "trescientos treinta y seis", "trescientos treinta y siete", "trescientos treinta y ocho", "trescientos treinta y nueve", "trescientos cuarenta",
        "trescientos cuarenta y uno", "trescientos cuarenta y dos", "trescientos cuarenta y tres", "trescientos cuarenta y cuatro", "trescientos cuarenta y cinco", "trescientos cuarenta y seis", "trescientos cuarenta y siete", "trescientos cuarenta y ocho", "trescientos cuarenta y nueve", "trescientos cincuenta",
        "trescientos cincuenta y uno", "trescientos cincuenta y dos", "trescientos cincuenta y tres", "trescientos cincuenta y cuatro", "trescientos cincuenta y cinco", "trescientos cincuenta y seis", "trescientos cincuenta y siete", "trescientos cincuenta y ocho", "trescientos cincuenta y nueve", "trescientos sesenta",
        "trescientos sesenta y uno", "trescientos sesenta y dos", "trescientos sesenta y tres", "trescientos sesenta y cuatro", "trescientos sesenta y cinco", "trescientos sesenta y seis", "trescientos sesenta y siete", "trescientos sesenta y ocho", "trescientos sesenta y nueve", "trescientos setenta",
        "trescientos setenta y uno", "trescientos setenta y dos", "trescientos setenta y tres", "trescientos setenta y cuatro", "trescientos setenta y cinco", "trescientos setenta y seis", "trescientos setenta y siete", "trescientos setenta y ocho", "trescientos setenta y nueve", "trescientos ochenta",
        "trescientos ochenta y uno", "trescientos ochenta y dos", "trescientos ochenta y tres", "trescientos ochenta y cuatro", "trescientos ochenta y cinco", "trescientos ochenta y seis", "trescientos ochenta y siete", "trescientos ochenta y ocho", "trescientos ochenta y nueve", "trescientos noventa",
        "trescientos noventa y uno", "trescientos noventa y dos", "trescientos noventa y tres", "trescientos noventa y cuatro", "trescientos noventa y cinco", "trescientos noventa y seis", "trescientos noventa y siete", "trescientos noventa y ocho", "trescientos noventa y nueve", "cuatrocientos",
        "cuatrocientos uno", "cuatrocientos dos", "cuatrocientos tres", "cuatrocientos cuatro", "cuatrocientos cinco", "cuatrocientos seis", "cuatrocientos siete", "cuatrocientos ocho", "cuatrocientos nueve", "cuatrocientos diez",
        "cuatrocientos once", "cuatrocientos doce", "cuatrocientos trece", "cuatrocientos catorce", "cuatrocientos quince", "cuatrocientos dieciséis", "cuatrocientos diecisiete", "cuatrocientos dieciocho", "cuatrocientos diecinueve", "cuatrocientos veinte",
        "cuatrocientos veintiuno", "cuatrocientos veintidós", "cuatrocientos veintitrés", "cuatrocientos veinticuatro", "cuatrocientos veinticinco", "cuatrocientos veintiséis", "cuatrocientos veintisiete", "cuatrocientos veintiocho", "cuatrocientos veintinueve", "cuatrocientos treinta",
        "cuatrocientos treinta y uno", "cuatrocientos treinta y dos", "cuatrocientos treinta y tres", "cuatrocientos treinta y cuatro", "cuatrocientos treinta y cinco", "cuatrocientos treinta y seis", "cuatrocientos treinta y siete", "cuatrocientos treinta y ocho", "cuatrocientos treinta y nueve", "cuatrocientos cuarenta",
        "cuatrocientos cuarenta y uno", "cuatrocientos cuarenta y dos", "cuatrocientos cuarenta y tres", "cuatrocientos cuarenta y cuatro", "cuatrocientos cuarenta y cinco", "cuatrocientos cuarenta y seis", "cuatrocientos cuarenta y siete", "cuatrocientos cuarenta y ocho", "cuatrocientos cuarenta y nueve", "cuatrocientos cincuenta",
        "cuatrocientos cincuenta y uno", "cuatrocientos cincuenta y dos", "cuatrocientos cincuenta y tres", "cuatrocientos cincuenta y cuatro", "cuatrocientos cincuenta y cinco", "cuatrocientos cincuenta y seis", "cuatrocientos cincuenta y siete", "cuatrocientos cincuenta y ocho", "cuatrocientos cincuenta y nueve", "cuatrocientos sesenta",
        "cuatrocientos sesenta y uno", "cuatrocientos sesenta y dos", "cuatrocientos sesenta y tres", "cuatrocientos sesenta y cuatro", "cuatrocientos sesenta y cinco", "cuatrocientos sesenta y seis", "cuatrocientos sesenta y siete", "cuatrocientos sesenta y ocho", "cuatrocientos sesenta y nueve", "cuatrocientos setenta",
        "cuatrocientos setenta y uno", "cuatrocientos setenta y dos", "cuatrocientos setenta y tres", "cuatrocientos setenta y cuatro", "cuatrocientos setenta y cinco", "cuatrocientos setenta y seis", "cuatrocientos setenta y siete", "cuatrocientos setenta y ocho", "cuatrocientos setenta y nueve", "cuatrocientos ochenta",
        "cuatrocientos ochenta y uno", "cuatrocientos ochenta y dos", "cuatrocientos ochenta y tres", "cuatrocientos ochenta y cuatro", "cuatrocientos ochenta y cinco", "cuatrocientos ochenta y seis", "cuatrocientos ochenta y siete", "cuatrocientos ochenta y ocho", "cuatrocientos ochenta y nueve", "cuatrocientos noventa",
        "cuatrocientos noventa y uno", "cuatrocientos noventa y dos", "cuatrocientos noventa y tres", "cuatrocientos noventa y cuatro", "cuatrocientos noventa y cinco", "cuatrocientos noventa y seis", "cuatrocientos noventa y siete", "cuatrocientos noventa y ocho", "cuatrocientos noventa y nueve", "quinientos",
        "quinientos uno", "quinientos dos", "quinientos tres", "quinientos cuatro", "quinientos cinco", "quinientos seis", "quinientos siete", "quinientos ocho", "quinientos nueve", "quinientos diez",
        "quinientos once", "quinientos doce", "quinientos trece", "quinientos catorce", "quinientos quince", "quinientos dieciséis", "quinientos diecisiete", "quinientos dieciocho", "quinientos diecinueve", "quinientos veinte",
        "quinientos veintiuno", "quinientos veintidós", "quinientos veintitrés", "quinientos veinticuatro", "quinientos veinticinco", "quinientos veintiséis", "quinientos veintisiete", "quinientos veintiocho", "quinientos veintinueve", "quinientos treinta",
        "quinientos treinta y uno", "quinientos treinta y dos", "quinientos treinta y tres", "quinientos treinta y cuatro", "quinientos treinta y cinco", "quinientos treinta y seis", "quinientos treinta y siete", "quinientos treinta y ocho", "quinientos treinta y nueve", "quinientos cuarenta",
        "quinientos cuarenta y uno", "quinientos cuarenta y dos", "quinientos cuarenta y tres", "quinientos cuarenta y cuatro", "quinientos cuarenta y cinco", "quinientos cuarenta y seis", "quinientos cuarenta y siete", "quinientos cuarenta y ocho", "quinientos cuarenta y nueve", "quinientos cincuenta",
        "quinientos cincuenta y uno", "quinientos cincuenta y dos", "quinientos cincuenta y tres", "quinientos cincuenta y cuatro", "quinientos cincuenta y cinco", "quinientos cincuenta y seis", "quinientos cincuenta y siete", "quinientos cincuenta y ocho", "quinientos cincuenta y nueve", "quinientos sesenta",
        "quinientos sesenta y uno", "quinientos sesenta y dos", "quinientos sesenta y tres", "quinientos sesenta y cuatro", "quinientos sesenta y cinco", "quinientos sesenta y seis", "quinientos sesenta y siete", "quinientos sesenta y ocho", "quinientos sesenta y nueve", "quinientos setenta",
        "quinientos setenta y uno", "quinientos setenta y dos", "quinientos setenta y tres", "quinientos setenta y cuatro", "quinientos setenta y cinco", "quinientos setenta y seis", "quinientos setenta y siete", "quinientos setenta y ocho", "quinientos setenta y nueve", "quinientos ochenta",
        "quinientos ochenta y uno", "quinientos ochenta y dos", "quinientos ochenta y tres", "quinientos ochenta y cuatro", "quinientos ochenta y cinco", "quinientos ochenta y seis", "quinientos ochenta y siete", "quinientos ochenta y ocho", "quinientos ochenta y nueve", "quinientos noventa",
        "quinientos noventa y uno", "quinientos noventa y dos", "quinientos noventa y tres", "quinientos noventa y cuatro", "quinientos noventa y cinco", "quinientos noventa y seis", "quinientos noventa y siete", "quinientos noventa y ocho", "quinientos noventa y nueve", "seiscientos",
        "seiscientos uno", "seiscientos dos", "seiscientos tres", "seiscientos cuatro", "seiscientos cinco", "seiscientos seis", "seiscientos siete", "seiscientos ocho", "seiscientos nueve", "seiscientos diez",
        "seiscientos once", "seiscientos doce", "seiscientos trece", "seiscientos catorce", "seiscientos quince", "seiscientos dieciséis", "seiscientos diecisiete", "seiscientos dieciocho", "seiscientos diecinueve", "seiscientos veinte",
        "seiscientos veintiuno", "seiscientos veintidós", "seiscientos veintitrés", "seiscientos veinticuatro", "seiscientos veinticinco", "seiscientos veintiséis", "seiscientos veintisiete", "seiscientos veintiocho", "seiscientos veintinueve", "seiscientos treinta",
        "seiscientos treinta y uno", "seiscientos treinta y dos", "seiscientos treinta y tres", "seiscientos treinta y cuatro", "seiscientos treinta y cinco", "seiscientos treinta y seis", "seiscientos treinta y siete", "seiscientos treinta y ocho", "seiscientos treinta y nueve", "seiscientos cuarenta",
        "seiscientos cuarenta y uno", "seiscientos cuarenta y dos", "seiscientos cuarenta y tres", "seiscientos cuarenta y cuatro", "seiscientos cuarenta y cinco", "seiscientos cuarenta y seis", "seiscientos cuarenta y siete", "seiscientos cuarenta y ocho", "seiscientos cuarenta y nueve", "seiscientos cincuenta",
        "seiscientos cincuenta y uno", "seiscientos cincuenta y dos", "seiscientos cincuenta y tres", "seiscientos cincuenta y cuatro", "seiscientos cincuenta y cinco", "seiscientos cincuenta y seis", "seiscientos cincuenta y siete", "seiscientos cincuenta y ocho", "seiscientos cincuenta y nueve", "seiscientos sesenta",
        "seiscientos sesenta y uno", "seiscientos sesenta y dos", "seiscientos sesenta y tres", "seiscientos sesenta y cuatro", "seiscientos sesenta y cinco", "seiscientos sesenta y seis", "seiscientos sesenta y siete", "seiscientos sesenta y ocho", "seiscientos sesenta y nueve", "seiscientos setenta",
        "seiscientos setenta y uno", "seiscientos setenta y dos", "seiscientos setenta y tres", "seiscientos setenta y cuatro", "seiscientos setenta y cinco", "seiscientos setenta y seis", "seiscientos setenta y siete", "seiscientos setenta y ocho", "seiscientos setenta y nueve", "seiscientos ochenta",
        "seiscientos ochenta y uno", "seiscientos ochenta y dos", "seiscientos ochenta y tres", "seiscientos ochenta y cuatro", "seiscientos ochenta y cinco", "seiscientos ochenta y seis", "seiscientos ochenta y siete", "seiscientos ochenta y ocho", "seiscientos ochenta y nueve", "seiscientos noventa",
        "seiscientos noventa y uno", "seiscientos noventa y dos", "seiscientos noventa y tres", "seiscientos noventa y cuatro", "seiscientos noventa y cinco", "seiscientos noventa y seis", "seiscientos noventa y siete", "seiscientos noventa y ocho", "seiscientos noventa y nueve", "setecientos",
        "setecientos uno", "setecientos dos", "setecientos tres", "setecientos cuatro", "setecientos cinco", "setecientos seis", "setecientos siete", "setecientos ocho", "setecientos nueve", "setecientos diez",
        "setecientos once", "setecientos doce", "setecientos trece", "setecientos catorce", "setecientos quince", "setecientos dieciséis", "setecientos diecisiete", "setecientos dieciocho", "setecientos diecinueve", "setecientos veinte",
        "setecientos veintiuno", "setecientos veintidós", "setecientos veintitrés", "setecientos veinticuatro", "setecientos veinticinco", "setecientos veintiséis", "setecientos veintisiete", "setecientos veintiocho", "setecientos veintinueve", "setecientos treinta",
        "setecientos treinta y uno", "setecientos treinta y dos", "setecientos treinta y tres", "setecientos treinta y cuatro", "setecientos treinta y cinco", "setecientos treinta y seis", "setecientos treinta y siete", "setecientos treinta y ocho", "setecientos treinta y nueve", "setecientos cuarenta",
        "setecientos cuarenta y uno", "setecientos cuarenta y dos", "setecientos cuarenta y tres", "setecientos cuarenta y cuatro", "setecientos cuarenta y cinco", "setecientos cuarenta y seis", "setecientos cuarenta y siete", "setecientos cuarenta y ocho", "setecientos cuarenta y nueve", "setecientos cincuenta",
        "setecientos cincuenta y uno", "setecientos cincuenta y dos", "setecientos cincuenta y tres", "setecientos cincuenta y cuatro", "setecientos cincuenta y cinco", "setecientos cincuenta y seis", "setecientos cincuenta y siete", "setecientos cincuenta y ocho", "setecientos cincuenta y nueve", "setecientos sesenta",
        "setecientos sesenta y uno", "setecientos sesenta y dos", "setecientos sesenta y tres", "setecientos sesenta y cuatro", "setecientos sesenta y cinco", "setecientos sesenta y seis", "setecientos sesenta y siete", "setecientos sesenta y ocho", "setecientos sesenta y nueve", "setecientos setenta",
        "setecientos setenta y uno", "setecientos setenta y dos", "setecientos setenta y tres", "setecientos setenta y cuatro", "setecientos setenta y cinco", "setecientos setenta y seis", "setecientos setenta y siete", "setecientos setenta y ocho", "setecientos setenta y nueve", "setecientos ochenta",
        "setecientos ochenta y uno", "setecientos ochenta y dos", "setecientos ochenta y tres", "setecientos ochenta y cuatro", "setecientos ochenta y cinco", "setecientos ochenta y seis", "setecientos ochenta y siete", "setecientos ochenta y ocho", "setecientos ochenta y nueve", "setecientos noventa",
        "setecientos noventa y uno", "setecientos noventa y dos", "setecientos noventa y tres", "setecientos noventa y cuatro", "setecientos noventa y cinco", "setecientos noventa y seis", "setecientos noventa y siete", "setecientos noventa y ocho", "setecientos noventa y nueve", "ochocientos",
        "ochocientos uno", "ochocientos dos", "ochocientos tres", "ochocientos cuatro", "ochocientos cinco", "ochocientos seis", "ochocientos siete", "ochocientos ocho", "ochocientos nueve", "ochocientos diez",
        "ochocientos once", "ochocientos doce", "ochocientos trece", "ochocientos catorce", "ochocientos quince", "ochocientos dieciséis", "ochocientos diecisiete", "ochocientos dieciocho", "ochocientos diecinueve", "ochocientos veinte",
        "ochocientos veintiuno", "ochocientos veintidós", "ochocientos veintitrés", "ochocientos veinticuatro", "ochocientos veinticinco", "ochocientos veintiséis", "ochocientos veintisiete", "ochocientos veintiocho", "ochocientos veintinueve", "ochocientos treinta",
        "ochocientos treinta y uno", "ochocientos treinta y dos", "ochocientos treinta y tres", "ochocientos treinta y cuatro", "ochocientos treinta y cinco", "ochocientos treinta y seis", "ochocientos treinta y siete", "ochocientos treinta y ocho", "ochocientos treinta y nueve", "ochocientos cuarenta",
        "ochocientos cuarenta y uno", "ochocientos cuarenta y dos", "ochocientos cuarenta y tres", "ochocientos cuarenta y cuatro", "ochocientos cuarenta y cinco", "ochocientos cuarenta y seis", "ochocientos cuarenta y siete", "ochocientos cuarenta y ocho", "ochocientos cuarenta y nueve", "ochocientos cincuenta",
        "ochocientos cincuenta y uno", "ochocientos cincuenta y dos", "ochocientos cincuenta y tres", "ochocientos cincuenta y cuatro", "ochocientos cincuenta y cinco", "ochocientos cincuenta y seis", "ochocientos cincuenta y siete", "ochocientos cincuenta y ocho", "ochocientos cincuenta y nueve", "ochocientos sesenta",
        "ochocientos sesenta y uno", "ochocientos sesenta y dos", "ochocientos sesenta y tres", "ochocientos sesenta y cuatro", "ochocientos sesenta y cinco", "ochocientos sesenta y seis", "ochocientos sesenta y siete", "ochocientos sesenta y ocho", "ochocientos sesenta y nueve", "ochocientos setenta",
        "ochocientos setenta y uno", "ochocientos setenta y dos", "ochocientos setenta y tres", "ochocientos setenta y cuatro", "ochocientos setenta y cinco", "ochocientos setenta y seis", "ochocientos setenta y siete", "ochocientos setenta y ocho", "ochocientos setenta y nueve", "ochocientos ochenta",
        "ochocientos ochenta y uno", "ochocientos ochenta y dos", "ochocientos ochenta y tres", "ochocientos ochenta y cuatro", "ochocientos ochenta y cinco", "ochocientos ochenta y seis", "ochocientos ochenta y siete", "ochocientos ochenta y ocho", "ochocientos ochenta y nueve", "ochocientos noventa",
        "ochocientos noventa y uno", "ochocientos noventa y dos", "ochocientos noventa y tres", "ochocientos noventa y cuatro", "ochocientos noventa y cinco", "ochocientos noventa y seis", "ochocientos noventa y siete", "ochocientos noventa y ocho", "ochocientos noventa y nueve", "novecientos",
        "novecientos uno", "novecientos dos", "novecientos tres", "novecientos cuatro", "novecientos cinco", "novecientos seis", "novecientos siete", "novecientos ocho", "novecientos nueve", "novecientos diez",
        "novecientos once", "novecientos doce", "novecientos trece", "novecientos catorce", "novecientos quince", "novecientos dieciséis", "novecientos diecisiete", "novecientos dieciocho", "novecientos diecinueve", "novecientos veinte",
        "novecientos veintiuno", "novecientos veintidós", "novecientos veintitrés", "novecientos veinticuatro", "novecientos veinticinco", "novecientos veintiséis", "novecientos veintisiete", "novecientos veintiocho", "novecientos veintinueve", "novecientos treinta",
        "novecientos treinta y uno", "novecientos treinta y dos", "novecientos treinta y tres", "novecientos treinta y cuatro", "novecientos treinta y cinco", "novecientos treinta y seis", "novecientos treinta y siete", "novecientos treinta y ocho", "novecientos treinta y nueve", "novecientos cuarenta",
        "novecientos cuarenta y uno", "novecientos cuarenta y dos", "novecientos cuarenta y tres", "novecientos cuarenta y cuatro", "novecientos cuarenta y cinco", "novecientos cuarenta y seis", "novecientos cuarenta y siete", "novecientos cuarenta y ocho", "novecientos cuarenta y nueve", "novecientos cincuenta",
        "novecientos cincuenta y uno", "novecientos cincuenta y dos", "novecientos cincuenta y tres", "novecientos cincuenta y cuatro", "novecientos cincuenta y cinco", "novecientos cincuenta y seis", "novecientos cincuenta y siete", "novecientos cincuenta y ocho", "novecientos cincuenta y nueve", "novecientos sesenta",
        "novecientos sesenta y uno", "novecientos sesenta y dos", "novecientos sesenta y tres", "novecientos sesenta y cuatro", "novecientos sesenta y cinco", "novecientos sesenta y seis", "novecientos sesenta y siete", "novecientos sesenta y ocho", "novecientos sesenta y nueve", "novecientos setenta",
        "novecientos setenta y uno", "novecientos setenta y dos", "novecientos setenta y tres", "novecientos setenta y cuatro", "novecientos setenta y cinco", "novecientos setenta y seis", "novecientos setenta y siete", "novecientos setenta y ocho", "novecientos setenta y nueve", "novecientos ochenta",
        "novecientos ochenta y uno", "novecientos ochenta y dos", "novecientos ochenta y tres", "novecientos ochenta y cuatro", "novecientos ochenta y cinco", "novecientos ochenta y seis", "novecientos ochenta y siete", "novecientos ochenta y ocho", "novecientos ochenta y nueve", "novecientos noventa",
        "novecientos noventa y uno", "novecientos noventa y dos", "novecientos noventa y tres", "novecientos noventa y cuatro", "novecientos noventa y cinco", "novecientos noventa y seis", "novecientos noventa y siete", "novecientos noventa y ocho", "novecientos noventa y nueve", "mil"
    ];
    
    // Verificamos si el número está dentro del rango y lo devolvemos
    return num <= 1001 ? words[num] : num.toString();
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
        numberFormatIssues.forEach(issue => {
            feedbackContent += `<li>${issue}</li>`;
        });
        feedbackContent += `</ul>`;
    }

    // Finalmente, actualizar el contenido del feedbackDiv
    feedbackDiv.innerHTML = feedbackContent;

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
function toggleExample(button) {
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

// Agregar evento para guardar la selección en localStorage
checkRepeatedWords.addEventListener("change", () => {
    localStorage.setItem("checkRepeatedWords", checkRepeatedWords.checked);
});

checkMarkRepeatedWords.addEventListener("change", () => {
    localStorage.setItem("checkMarkPepeatedWords", checkMarkRepeatedWords.checked);
});

checkParagraphLength.addEventListener('change', () => {
    localStorage.setItem('checkParagraphLength', checkParagraphLength.checked);
});

checkNumberFormat.addEventListener('change', () => {
    localStorage.setItem('checkNumberFormat', checkNumberFormat.checked);
});

checkAllConnectives.addEventListener('change', () => {
    localStorage.setItem('checkAllConnectives', checkAllConnectives.checked);
});

// Cargar el estado guardado del checkbox al iniciar la aplicación
window.addEventListener("load", () => {
    const savedValue = localStorage.getItem("checkRepeatedWords");
    checkRepeatedWords.checked = savedValue === "true";
});

window.addEventListener("load", () => {
    const savedValue = localStorage.getItem("checkMarkPepeatedWords");
    checkMarkRepeatedWords.checked = savedValue === "true";
});

window.addEventListener('load', () => {
    const savedValue = localStorage.getItem('checkParagraphLength');
    checkParagraphLength.checked = savedValue === 'true';
});

window.addEventListener("load", () => {
    const savedValue = localStorage.getItem("checkNumberFormat");
    checkNumberFormat.checked = savedValue === "true";
});

window.addEventListener('load', () => {
    const savedValue = localStorage.getItem('checkAllConnectives');
    checkAllConnectives.checked = savedValue === 'true';
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

// Agregar eventos a los checkboxes para actualizar el análisis (sin mostrar el mensaje de campo vacío)
checkRepeatedWords.addEventListener('change', checkDocument);
checkMarkRepeatedWords.addEventListener('change', checkDocument);
checkParagraphLength.addEventListener('change', checkDocument);
checkNumberFormat.addEventListener('change', checkDocument);
checkAllConnectives.addEventListener('change', checkDocument);