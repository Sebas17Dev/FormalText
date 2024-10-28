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
        explanation: 'Redundante y poco formal. Es mejor eliminar o simplificar.',
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
        explanation: 'Es demasiado vago. Se recomienda usar otras palabras según el contexto.',
        substitutes: ['colocar', 'implementar', 'instalar', 'incluir']
    },
    'hacer': {
        explanation: 'Es demasiado genérico.',
        substitutes: ['realizar', 'desarrollar', 'ejecutar']
    },
    'muy': {
        explanation: 'No aporta precisión. Es mejor usar un adjetivo más preciso.',
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
        explanation: 'Demasiado subjetivo. Es mejor usar adjetivos más específicos.',
        substitutes: ['beneficioso', 'positivo']
    },
    'malo': {
        explanation: 'Demasiado subjetivo. Es mejor usar adjetivos más específicos.',
        substitutes: ['adverso', 'inadecuado']
    },
    'se puede ver': {
        explanation: 'Frase coloquial. Es preferible "se observa", "se percibe", "se aprecia", etc.',
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
        explanation: 'Demasiado coloquial. Mejor usar "sería conveniente", "sería beneficioso", "resulta adecuado".',
        substitutes: ['sería conveniente', 'sería beneficioso', 'resulta adecuado']
    },
    'etc.': {
        explanation: 'Aunque común, no es adecuado en textos académicos.',
        substitutes: []
    },
    'demasiado': {
        explanation: 'Puede parecer subjetivo o coloquial.',
        substitutes: ['en exceso', 'en gran medida', 'significativamente']
    },
    'la verdad es que': {
        explanation: 'No aporta información concreta. Debe eliminarse o reformularse.',
        substitutes: []
    },
    'obviamente': {
        explanation: 'Sugiere que algo es evidente sin pruebas.',
        substitutes: ['claramente', 'es evidente que']
    },
    'demasiado poco': {
        explanation: 'En lugar de esto, es mejor emplear términos más formales y específicos.',
        substitutes: ['en exceso', 'insuficiente', 'excesivamente']
    },
    'demasiado mucho': {
        explanation: 'En lugar de esto, es mejor emplear términos más formales y específicos.',
        substitutes: ['en exceso', 'insuficiente', 'excesivamente']
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
        explanation: 'Esta expresión tiende a ser demasiado absoluta.',
        substitutes: ['en la mayoría de los casos', 'generalmente']
    },
    'nunca': {
        explanation: 'Esta expresión tiende a ser demasiado absoluta.',
        substitutes: ['en la mayoría de los casos', 'generalmente']
    },
    'un poco': {
        explanation: 'Es informal y poco preciso.',
        substitutes: ['ligeramente', 'levemente', 'de forma limitada']
    },
    'más o menos': {
        explanation: 'Es una expresión informal.',
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
        explanation: 'Similar a "obviamente", puede sugerir que algo es verdad sin suficiente evidencia.',
        substitutes: ['de acuerdo con', 'según los datos disponibles']
    },
    'es decir': {
        explanation: 'En algunos casos es informal.',
        substitutes: ['esto significa', 'lo que implica']
    },
    'de alguna manera': {
        explanation: 'Evitar esta frase y ser más directo en la formulación de ideas.',
        substitutes: ['De un modo particular', 'En ciertos aspectos', 'De una manera más concreta']
    },
    'algún tipo de': {
        explanation: 'Expresión vaga y poco específica. Mejor utilizar términos concretos.',
        substitutes: ['una variedad de', 'un tipo específico de']
    },
    'algo así como': {
        explanation: 'Expresión poco precisa que puede confundir. Es mejor ser claro.',
        substitutes: ['similar a', 'parecido a']
    },
    'de pronto': {
        explanation: 'No es adecuado en redacción formal, ya que añade subjetividad.',
        substitutes: ['inesperadamente']
    },
    'se dice': {
        explanation: 'Introducción informal. En contexto formal, mejor citar fuentes o usar otras expresiones.',
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
    'claro': {
        explanation: 'Es informal y subjetivo; mejor expresarlo de forma objetiva.',
        substitutes: ['evidente', 'notorio']
    },
    'seguro': {
        explanation: 'Puede sonar subjetivo. Mejor usar términos más precisos según el contexto.',
        substitutes: ['confirmado', 'verificado']
    },
    'sólo': {
        explanation: 'Evitar en textos formales; mejor usar términos específicos.',
        substitutes: ['únicamente', 'exclusivamente']
    },
    'obvio': {
        explanation: 'Es subjetivo y puede evitarse o sustituirse por términos concretos.',
        substitutes: ['evidente', 'notorio']
    },
    'cosas así': {
        explanation: 'Es informal y demasiado vago; utilizar términos específicos.',
        substitutes: ['situaciones similares', 'casos parecidos']
    },
    'básico': {
        explanation: 'Demasiado impreciso. Es mejor usar un término específico según el contexto.',
        substitutes: ['fundamental', 'esencial', 'primario']
    },
    'ideal': {
        explanation: 'Es subjetivo en textos académicos; mejor usar un término objetivo.',
        substitutes: ['óptimo', 'adecuado']
    },
    'genial': {
        explanation: 'Es informal y demasiado subjetivo.',
        substitutes: ['sobresaliente']
    },
    'tal cual': {
        explanation: 'Es una expresión coloquial; mejor eliminar o reformular.',
        substitutes: []
    },
    'así como': {
        explanation: 'Puede sonar coloquial. En su lugar, usar términos de unión más precisos.',
        substitutes: ['además de', 'al igual que']
    },
    'punto de vista': {
        explanation: 'Introduce subjetividad. Mejor emplear "perspectiva" o "criterio".',
        substitutes: ['perspectiva', 'criterio']
    },
    'visto así': {
        explanation: 'Expresión informal; es mejor reformular.',
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
