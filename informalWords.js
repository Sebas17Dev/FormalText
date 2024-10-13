// Lista de palabras informales con explicación y posibles sustitutos
const informalWordsData = {
    'cosa': {
        explanation: 'Es impreciso. Debe sustituirse por un término más específico como "elemento", "factor", "objeto".',
        substitutes: ['elemento', 'factor', 'objeto']
    },
    'falta': {
        explanation: 'Sustituir por "ausencia" o "carencia".',
        substitutes: ['ausencia', 'carencia']
    },
    'lo que es': {
        explanation: 'Redundante y poco formal. Es mejor eliminar o simplificar.',
        substitutes: []
    },
    'actualmente': {
        explanation: 'Aunque no es incorrecto, es preferible usar "en la actualidad" o "en el presente".',
        substitutes: ['en la actualidad', 'en el presente']
    },
    'capacitación/adiestramiento': {
        explanation: 'Este cambio depende del contexto. "Formación" es la mejor alternativa.',
        substitutes: ['formación']
    },
    'hay que': {
        explanation: 'Es informal. Debe sustituirse por expresiones como "es necesario", "se requiere", o "debe".',
        substitutes: ['es necesario', 'se requiere', 'debe']
    },
    'poner': {
        explanation: 'Es demasiado vago. Se puede usar "colocar", "implementar", "instalar", "incluir" según el contexto.',
        substitutes: ['colocar', 'implementar', 'instalar', 'incluir']
    },
    'hacer': {
        explanation: 'Es demasiado genérico. Es mejor emplear "realizar", "desarrollar", "ejecutar", etc.',
        substitutes: ['realizar', 'desarrollar', 'ejecutar']
    },
    'muy': {
        explanation: 'No aporta precisión. Es mejor usar un adjetivo más preciso.',
        substitutes: []
    },
    'bastante': {
        explanation: 'Es informal. Sustituir por "suficiente" o "considerable".',
        substitutes: ['suficiente', 'considerable']
    },
    'fácilmente': {
        explanation: 'Informal, mejor usar "de manera sencilla" o "con facilidad".',
        substitutes: ['de manera sencilla', 'con facilidad']
    },
    'porque': {
        explanation: 'En redacción formal, puede ser más adecuado usar "debido a que", "ya que", o "puesto que".',
        substitutes: ['debido a que', 'ya que', 'puesto que']
    },
    'todo el mundo': {
        explanation: 'Informal. Sustituir por "todos" o "la población general".',
        substitutes: ['todos', 'la población general']
    },
    'bueno/malo': {
        explanation: 'Demasiado subjetivo. Es mejor usar adjetivos más específicos.',
        substitutes: ['beneficioso', 'positivo', 'adverso', 'inadecuado']
    },
    'se puede ver': {
        explanation: 'Frase coloquial. Es preferible "se observa", "se percibe", "se aprecia", etc.',
        substitutes: ['se observa', 'se percibe', 'se aprecia']
    },
    'mejor': {
        explanation: 'Sustituir por "más adecuado", "más óptimo" o "preferible".',
        substitutes: ['más adecuado', 'más óptimo', 'preferible']
    },
    'pienso/creo': {
        explanation: 'No debe usarse en textos científicos, ya que introduce subjetividad.',
        substitutes: ['se considera', 'se observa', 'se ha determinado']
    },
    'nosotros/nos': {
        explanation: 'Debe evitarse para respetar la redacción en tercera persona.',
        substitutes: []
    },
    'sería bueno': {
        explanation: 'Demasiado coloquial. Mejor usar "sería conveniente", "sería beneficioso", "resulta adecuado".',
        substitutes: ['sería conveniente', 'sería beneficioso', 'resulta adecuado']
    },
    'etc.': {
        explanation: 'Aunque común, no es adecuado en textos académicos.',
        substitutes: []
    },
    'demasiado': {
        explanation: 'Puede parecer subjetivo o coloquial. Mejor usar "en exceso", "en gran medida", "significativamente".',
        substitutes: ['en exceso', 'en gran medida', 'significativamente']
    },
    'la verdad es que': {
        explanation: 'No aporta información concreta. Debe eliminarse o reformularse.',
        substitutes: []
    },
    'obviamente': {
        explanation: 'Sugiere que algo es evidente sin pruebas. Es mejor usar "claramente", "es evidente que".',
        substitutes: ['claramente', 'es evidente que']
    },
    'demasiado poco/mucho': {
        explanation: 'En lugar de esto, es mejor emplear términos como "en exceso", "insuficiente", "excesivamente".',
        substitutes: ['en exceso', 'insuficiente', 'excesivamente']
    },
    'quizás/tal vez': {
        explanation: 'Deben evitarse en redacciones académicas, ya que son subjetivas e imprecisas.',
        substitutes: ['es posible que', 'puede que']
    },
    'básicamente': {
        explanation: 'Esta palabra no agrega valor al texto. Debe eliminarse o reemplazarse por una explicación más clara.',
        substitutes: []
    },
    'siempre/nunca': {
        explanation: 'Estas expresiones tienden a ser demasiado absolutas. Usar "en la mayoría de los casos", "generalmente".',
        substitutes: ['en la mayoría de los casos', 'generalmente']
    },
    'un poco': {
        explanation: 'Es informal y poco preciso. Sustituir por "ligeramente", "levemente" o "de forma limitada".',
        substitutes: ['ligeramente', 'levemente', 'de forma limitada']
    },
    'más o menos': {
        explanation: 'Es una expresión informal. Se debe reemplazar por "aproximadamente", "alrededor de".',
        substitutes: ['aproximadamente', 'alrededor de']
    },
    'al parecer': {
        explanation: 'Es subjetivo. Reemplazar por "se considera", "se estima".',
        substitutes: ['se considera', 'se estima']
    },
    'literalmente': {
        explanation: 'Debe evitarse, ya que a menudo es mal utilizado. Describir el hecho sin añadir esta palabra.',
        substitutes: []
    },
    'ciertamente': {
        explanation: 'Similar a "obviamente", puede sugerir que algo es verdad sin suficiente evidencia.',
        substitutes: ['de acuerdo con', 'según los datos disponibles']
    },
    'es decir': {
        explanation: 'En algunos casos es informal, se recomienda reemplazar por "esto significa", o "lo que implica".',
        substitutes: ['esto significa', 'lo que implica']
    },
    'de alguna manera': {
        explanation: 'Evitar esta frase y ser más directo en la formulación de ideas.',
        substitutes: []
    }
};
