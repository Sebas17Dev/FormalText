// Lista de palabras informales con explicación y posibles sustitutos
const informalWordsData = {
    'cosa': {
        explanation: 'Es impreciso. Debe sustituirse por un término más específico.',
        substitutes: ['elemento', 'factor', 'objeto']
    },
    'falta': {
        explanation: 'Es una palabra de coloquio popular.',
        substitutes: ['ausencia', 'carencia']
    },
    'lo que es': {
        explanation: 'Redundante y poco formal. Se recomienda eliminar o simplificar.',
        substitutes: []
    },
    'actualmente': {
        explanation: 'Aunque no es incorrecto, es preferible usar otros términos.',
        substitutes: ['en la actualidad', 'en el presente']
    },
    'capacitación': {
        explanation: 'Este cambio depende del contexto.',
        substitutes: ['formación']
    },
    'adiestramiento': {
        explanation: 'Este cambio depende del contexto.',
        substitutes: ['formación']
    },
    'hay que': {
        explanation: 'Es informal, por lo que debe evitarse su uso.',
        substitutes: ['es necesario', 'se requiere', 'debe']
    },
    'poner': {
        explanation: 'Es vago. Se recomienda usar otras palabras según el contexto.',
        substitutes: ['colocar', 'implementar', 'instalar', 'incluir']
    },
    'hacer': {
        explanation: 'Es genérico y poco formal.',
        substitutes: ['realizar', 'desarrollar', 'ejecutar']
    },
    'muy': {
        explanation: 'No aporta precisión. Se recomienda usar un adjetivo más preciso o solo eliminar.',
        substitutes: ['fundamental', 'crucial']
    },
    'bastante': {
        explanation: 'Es informal.',
        substitutes: ['suficiente', 'considerable']
    },
    'fácilmente': {
        explanation: 'Informal.',
        substitutes: ['de manera sencilla', 'con facilidad']
    },
    'porque': {
        explanation: 'En redacción formal, puede ser más adecuado usar otros términos.',
        substitutes: ['debido a que', 'ya que', 'puesto que']
    },
    'todo el mundo': {
        explanation: 'Informal.',
        substitutes: ['todos', 'la población general']
    },
    'bueno': {
        explanation: 'Es subjetivo. Se debe usar adjetivos más específicos.',
        substitutes: ['beneficioso', 'positivo']
    },
    'malo': {
        explanation: 'Es subjetivo. Se debe usar adjetivos más específicos.',
        substitutes: ['adverso', 'inadecuado']
    },
    'se puede ver': {
        explanation: 'Frase coloquial. Es preferible usar otros términos.',
        substitutes: ['se observa', 'se percibe', 'se aprecia']
    },
    'mejor': {
        explanation: 'Se recomienda sustituir por versión más formal.',
        substitutes: ['más adecuado', 'más óptimo', 'preferible']
    },
    'pienso': {
        explanation: 'No debe usarse en textos científicos, ya que introduce subjetividad.',
        substitutes: ['se considera', 'se observa', 'se ha determinado']
    },
    'creo': {
        explanation: 'No debe usarse en textos científicos, ya que introduce subjetividad.',
        substitutes: ['se considera', 'se observa', 'se ha determinado']
    },
    'sería bueno': {
        explanation: ' coloquial.  usar "sería conveniente", "sería beneficioso", "resulta adecuado".',
        substitutes: ['sería conveniente', 'sería beneficioso', 'resulta adecuado']
    },
    'etc.': {
        explanation: 'Aunque común, no es adecuado en textos académicos.',
        substitutes: []
    },
    'demasiado': {
        explanation: 'Puede parecer subjetivo o coloquial.',
        substitutes: ['en exceso', 'en gran medida']
    },
    'la verdad es que': {
        explanation: 'No aporta información concreta. Debe eliminarse o reformularse.',
        substitutes: []
    },
    'obviamente': {
        explanation: 'Sugiere que algo es evidente sin pruebas.',
        substitutes: ['es evidente que']
    },
    'demasiado poco': {
        explanation: 'En lugar de esto, se deben emplear términos más formales y específicos.',
        substitutes: ['insuficiente']
    },
    'demasiado mucho': {
        explanation: 'En lugar de esto, se deben emplear términos más formales y específicos.',
        substitutes: ['en exceso', 'excesivamente']
    },
    'quizás': {
        explanation: 'Debe evitarse en redacciones académicas, ya que es subjetivo e impreciso.',
        substitutes: ['es posible que', 'puede que']
    },
    'tal vez': {
        explanation: 'Debe evitarse en redacciones académicas, ya que es subjetivo e impreciso.',
        substitutes: ['es posible que', 'puede que']
    },
    'básicamente': {
        explanation: 'Esta palabra no agrega valor al texto. Debe eliminarse o reemplazarse por una explicación más clara.',
        substitutes: []
    },
    'siempre': {
        explanation: 'Esta expresión tiende a ser absoluta.',
        substitutes: ['en la mayoría de los casos', 'generalmente']
    },
    'nunca': {
        explanation: 'Esta expresión tiende a ser absoluta.',
        substitutes: ['en la mayoría de los casos', 'generalmente']
    },
    'un poco': {
        explanation: 'Es informal y poco preciso.',
        substitutes: ['ligeramente', 'levemente', 'de forma limitada']
    },
    'más o menos': {
        explanation: 'Es una expresión informal y no aceptable en textos científicos.',
        substitutes: ['aproximadamente', 'alrededor de']
    },
    'al parecer': {
        explanation: 'Es subjetivo.',
        substitutes: ['se considera', 'se estima']
    },
    'literalmente': {
        explanation: 'Debe evitarse, ya que a menudo es mal utilizado. Describir el hecho sin añadir esta palabra.',
        substitutes: []
    },
    'ciertamente': {
        explanation: 'Puede sugerir que algo es verdad sin suficiente evidencia.',
        substitutes: ['de acuerdo con', 'según los datos disponibles']
    },
    'es decir': {
        explanation: 'En algunos casos es informal.',
        substitutes: ['esto significa', 'lo que implica']
    },
    'o sea': {
        explanation: 'es una expresión coloquial.',
        substitutes: ['esto implica']
    },
    'de alguna manera': {
        explanation: 'Evitar esta frase y ser más directo en la formulación de ideas.',
        substitutes: ['de un modo particular', 'en ciertos aspectos', 'de una manera más concreta']
    },
    'de alguna forma': {
        explanation: 'Evitar esta frase y ser más directo en la formulación de ideas.',
        substitutes: ['de un modo particular', 'de manera específica', 'en ciertos aspectos', 'de una manera más concreta']
    },
    'algún tipo de': {
        explanation: 'Expresión vaga y poco específica. Se deben emplear términos concretos.',
        substitutes: ['una variedad de', 'un tipo específico de']
    },
    'algo así como': {
        explanation: 'Expresión poco precisa que puede confundir. Se debe ser preciso.',
        substitutes: ['similar a', 'parecido a']
    },
    'de pronto': {
        explanation: 'No es adecuado en redacción formal, ya que añade subjetividad.',
        substitutes: ['inesperadamente']
    },
    'se dice': {
        explanation: 'Introducción informal. En contexto formal, se recomienda citar fuentes o usar otras expresiones.',
        substitutes: ['se establece', 'según expertos', 'se ha determinado']
    },
    'vale': {
        explanation: 'Podría reescribirse de forma más formal.',
        substitutes: ['es relevante considerar', 'es conveniente']
    },
    'vale la pena': {
        explanation: 'Podría reescribirse de forma más formal.',
        substitutes: ['es relevante considerar', 'es conveniente']
    },
    'simplemente': {
        explanation: 'No aporta valor informativo y puede eliminarse o reformularse.',
        substitutes: []
    },
    'simple': {
        explanation: 'Puede ser poco específico y ambiguo en contextos formales.',
        substitutes: ['sencillo', 'elemental']
    },
    'claro': {
        explanation: 'Es informal y subjetivo; se debe expresar de forma objetiva.',
        substitutes: ['evidente', 'notorio']
    },
    'seguro': {
        explanation: 'Puede sonar subjetivo. Se debe usar términos más precisos según el contexto.',
        substitutes: ['confirmado', 'verificado']
    },
    'sólo': {
        explanation: 'Evitar en textos formales; se debe usar términos específicos.',
        substitutes: ['únicamente', 'exclusivamente']
    },
    'obvio': {
        explanation: 'Es subjetivo y puede evitarse o sustituirse por términos concretos.',
        substitutes: ['evidente', 'notorio']
    },
    'cosas así': {
        explanation: 'Es informal y vago; utilizar términos específicos.',
        substitutes: ['situaciones similares', 'casos parecidos']
    },
    'lo que pasa es que': {
        explanation: 'es coloquial y poco preciso. Reformular directamente o eliminar.',
        substitutes: []
    },
    'básico': {
        explanation: 'Es impreciso. Se debe usar un término específico según el contexto.',
        substitutes: ['fundamental', 'esencial', 'primario']
    },
    'ideal': {
        explanation: 'Es subjetivo en textos académicos; se debe usar un término objetivo.',
        substitutes: ['óptimo', 'adecuado']
    },
    'genial': {
        explanation: 'Es informal y subjetivo.',
        substitutes: ['sobresaliente']
    },
    'tal cual': {
        explanation: 'Es una expresión coloquial; se debe eliminar o reformular.',
        substitutes: []
    },
    'así como': {
        explanation: 'Puede sonar coloquial. En su lugar, usar términos de unión más precisos.',
        substitutes: ['además de', 'al igual que']
    },
    'punto de vista': {
        explanation: 'Introduce subjetividad. Debe cambiarse.',
        substitutes: ['perspectiva', 'criterio']
    },
    'visto así': {
        explanation: 'Expresión informal; se debe reformular.',
        substitutes: ['desde esta perspectiva', 'desde este enfoque']
    },
    'probablemente': {
        explanation: 'Si bien no es incorrecto, en un contexto académico es preferible cambiarlo.',
        substitutes: ['es probable que', 'es posible que']
    },
    'apenas': {
        explanation: 'Puede resultar poco preciso.',
        substitutes: ['con dificultad', 'en un grado mínimo']
    },
    'aunque sea': {
        explanation: 'Es una frase informal, eliminar o reformular.',
        substitutes: []
    },
    'como sea': {
        explanation: 'Frase coloquial que puede reformularse.',
        substitutes: ['de cualquier modo', 'independientemente de']
    },
    'buena idea': {
        explanation: 'es una frase común en lenguaje coloquial, en un texto científico-académico su ambigüedad y subjetividad no cumplen con las normas.',
        substitutes: ['propuesta adecuada', 'solución eficaz']
    },
    'mala idea': {
        explanation: 'es una frase común en lenguaje coloquial, en un texto científico-académico su ambigüedad y subjetividad no cumplen con las normas.',
        substitutes: ['propuesta inconveniente', 'opción inadecuada']
    },
    'al fin y al cabo': {
        explanation: 'es coloquial y redundante, debe evitarse su uso.',
        substitutes: ['por lo tanto', 'en definitiva']
    },
    'como tal': {
        explanation: 'es ambiguo y no añade claridad al texto.',
        substitutes: ['en sí mismo', 'en su esencia']
    },
    'dicho sea de paso': {
        explanation: 'es una expresión coloquial y redundante.',
        substitutes: ['además', 'cabe destacar']
    },
    'sinceramente': {
        explanation: 'introduce subjetividad y no aporta contenido objetivo. Se debe eliminar o reformular la oración.',
        substitutes: []
    },
    'tarde o temprano': {
        explanation: 'frase informal y vaga.',
        substitutes: ['eventualmente', 'en algún momento']
    },
    'en base a': {
        explanation: 'no es correcto gramaticalmente. Es un error común de redacción.',
        substitutes: ['con base en', 'basado en', 'basándose en', 'de acuerdo con', 'a juzgar por']
    },
    'en fin': {
        explanation: 'es una expresión coloquial y poco precisa.',
        substitutes: ['finalmente', 'en conclusión', 'para concluir']
    },
    'clase de': {
        explanation: 'es un término informal.',
        substitutes: ['tipo de', 'variedad de', 'especie de']
    },
    'típico': {
        explanation: 'puede ser vago, general y poco formal.',
        substitutes: ['habitual', 'común', 'frecuente']
    },
    'cosas como': {
        explanation: 'carece de precisión y se recomienda evitarlo.',
        substitutes: ['elementos tales como', 'factores como']
    },
    'sin duda': {
        explanation: 'es subjetivo y sugiere opinión',
        substitutes: ['según los datos', 'es evidente que']
    },
    'lo cual significa': {
        explanation: 'es una expresión coloquial. Se debe sustituir.',
        substitutes: ['lo que implica', 'esto indica']
    },
    'a lo mejor': {
        explanation: 'es una expresión coloquial que introduce subjetividad.',
        substitutes: ['es probable que']
    },
    'según mi opinión': {
        explanation: 'se debe evitar subjetividad en textos académicos.',
        substitutes: ['según los datos', 'de acuerdo con la evidencia']
    },
    'uno de los cuales': {
        explanation: 'Puede resultar poco preciso en oraciones complejas y textos académicos.',
        substitutes: ['entre los cuales', 'como parte de estos']
    },
    'maldita': {
        explanation: 'Es una palabra vulgar e inapropiada en textos formales.',
        substitutes: []
    },
    'estúpido': {
        explanation: 'Es un término ofensivo e informal.',
        substitutes: ['irracional', 'inadecuado', 'imprudente']
    },
    'idiota': {
        explanation: 'Es vulgar y despectivo, no apropiado en textos científicos.',
        substitutes: ['persona ignorante', 'individuo poco informado']
    },
    'maldito': {
        explanation: 'Es una palabra coloquial que no se debe usar en textos formales.',
        substitutes: []
    },
    'tonto': {
        explanation: 'Palabra informal y despectiva.',
        substitutes: ['ingenuo', 'irreflexivo']
    },
    'malnacido': {
        explanation: 'Vulgar y ofensivo, debe evitarse en cualquier contexto académico.',
        substitutes: []
    },
    'mierda': {
        explanation: 'Es un término vulgar y no se debe usar en escritos formales.',
        substitutes: ['problema', 'situación desfavorable']
    },
    'imbécil': {
        explanation: 'Es un insulto despectivo y no apropiado en ningún contexto formal.',
        substitutes: ['persona incompetente', 'individuo poco razonable']
    },
    'carajo': {
        explanation: 'Es una expresión vulgar e inapropiada para contextos serios.',
        substitutes: []
    },
    'pendejo': {
        explanation: 'Es vulgar y ofensivo, no adecuado para redacciones formales.',
        substitutes: ['', 'persona inexperta']
    },
    'jodido': {
        explanation: 'Es un término vulgar que no debe emplearse en textos académicos.',
        substitutes: ['complicado', 'difícil']
    },
    'chingar': {
        explanation: 'Es una expresión vulgar y ofensiva en varios países.',
        substitutes: ['molestar', 'interferir']
    },
    'cabrón': {
        explanation: 'Es un insulto fuerte y vulgar que no debe usarse en ningún contexto formal.',
        substitutes: ['persona desagradable', 'persona abusiva']
    },
    'malparido': {
        explanation: 'Es altamente ofensivo y vulgar, no debe emplearse en situaciones formales.',
        substitutes: []
    },
    'tarado': {
        explanation: 'Es despectivo y no debe usarse en escritos formales.',
        substitutes: ['persona irracional', 'persona poco informada']
    },
    'gilipollas': {
        explanation: 'Es un insulto vulgar en España, no adecuado para contextos formales.',
        substitutes: ['persona imprudente']
    },
    'huevón': {
        explanation: 'Es un insulto coloquial en muchos países latinoamericanos.',
        substitutes: ['']
    },
    'puta': {
        explanation: 'Es vulgar y ofensivo. Debe evitarse en cualquier tipo de redacción formal.',
        substitutes: []
    },
    'zorra': {
        explanation: 'Es un insulto degradante y no debe utilizarse en textos formales.',
        substitutes: []
    },
    'baboso': {
        explanation: 'Es despectivo e informal.',
        substitutes: ['persona ingenua']
    },
    'patán': {
        explanation: 'Es despectivo y no adecuado para textos formales.',
        substitutes: ['persona grosera', 'persona ruda']
    },
    'perra': {
        explanation: 'Es ofensivo y degradante, no debe usarse en ningún contexto formal.',
        substitutes: []
    }
};
