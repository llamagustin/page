//  **AIDA (Atención–Interés–Deseo–Acción)**
// - **Atención:** Llame la atención del lector mostrando algo que destaque.
// - **Interés:** Despierte la curiosidad del lector compartiendo información interesante, fresca y atractiva.
// - **Deseo:** Muestre los beneficios de su producto, servicio o idea y proporcione al lector algunos hechos que demuestren lo que dice.
// - **Acción:** Pida al lector que dé el siguiente paso.

export const fnAIDA = (params) => {
    const {
        product, //producto/servicio
        aim, //objetivo, por ejemplo, hacer clic en un enlace
        audience //audiencia
    } = params
    
    return
`Como experto en copywriting, utiliza la fórmula AIDA para escribir acerca de ${product}. 
Al final del texto, los lectores deben desear tomar acción en: ${aim}. 
La audiencia a la que nos dirigimos es ${audience}.`
}


// **PAS (Problema-Agitación-Solución)**
// - **Problema**: Identificar un problema y presentarlo al lector.
// - **Agitación:** Intensificar el problema para que parezca aún peor de lo que parecía al principio.
// - **Solución:** Presentar la solución a este problema.

export const fnPAS = (params) => {
    const {
        product,
        audience,
        aim // objetivo, por ejemplo, hacer clic en un enlace
    } = params
    
    return
`Como experto en copywriting, utiliza la fórmula PAS para escribir sobre 
${product}. Al final del texto, los lectores deben desear tomar acción en: 
${aim}. La audiencia a la que nos estamos dirigiendo es ${audience}.`
}


// **Antes - Durante - Después**
// - **Antes:** Tu situación actual es mala.
// - **Durante:** Imagina cómo sería tu vida si este problema se resolviera.
// - **Después:** Aquí te mostramos cómo llegar a esa solución.


export const fnADD = () => {
    const {
        product, //producto/servicio
        target, //público objetivo
        aim // objetivo, por ejemplo, hacer clic en un enlace
    } = params
    
    return
`Eres un experto en redacción publicitaria, utiliza la fórmula Antes-Después-Puente 
para escribir sobre ${product}. Al final del texto, los lectores deben 
desear tomar acción en: ${aim}. La audiencia a la que nos dirigimos es ${target}.`
}


// Prompt de Página de Ventas Perfecta 

export const pageSell = (params) => {
    const {
        product, //producto/servicio
        audience, // trabajo/edad/país/género, etc.
        action, // qué acción quieres que tomen
        target, //público objetivo
        industry // industria
    } = params
    
    return
`Como experto en marketing y copywriting, ayúdame a escribir una página de ventas 
que convierta muy bien y que esté adaptada a mi producto, audiencia y llamado a la 
acción. Aquí están:

Producto: ${product}
Audiencia: ${audience}
Llamado a la acción: ${action}

Sigue la siguiente estructura para escribir el texto:

[Título: Un título convincente impulsado por beneficios que llame la atención de tu 
audiencia objetivo y destaque el punto de venta único de tu producto/servicio]

[Subtítulo: Una declaración de apoyo que refuerza el mensaje del título y engancha 
aún más al lector]

[Párrafo de apertura: Comienza con una frase o pregunta llamativa que se relacione 
con los puntos de dolor, deseos o aspiraciones de tu audiencia. Luego, presenta tu 
producto/servicio como la solución a sus problemas o el medio para lograr sus objetivos]

[Sección 1: Problema y Solución]

Problema: Describe claramente el problema o desafío principal que tu audiencia 
objetivo está enfrentando. Usa un lenguaje empático para demostrar que comprendes 
su situación y puntos de dolor.

Solución: Introduce tu producto/servicio como la solución ideal al problema. 
Explica cómo aborda el problema central, asegurándote de enfatizar los beneficios 
en lugar de simplemente las características.

[Sección 2: Beneficios y Características]

Beneficio 1: Indica el beneficio principal que ofrece tu producto/servicio y explica 
cómo mejora la vida de tu audiencia objetivo. Apoya esto con pruebas, como 
testimonios o estadísticas.

a. Característica 1: Describe la característica específica que ofrece este beneficio, 
explicando cómo funciona.

Beneficio 2: Presenta el beneficio secundario y explica cómo agrega valor a la vida 
de tu audiencia. Nuevamente, apoya esto con pruebas.

a. Característica 2: Describe la característica específica que ofrece este beneficio, 
explicando cómo funciona.

(Repite para todos los beneficios y características principales)

[Sección 3: Prueba Social]

Testimonio 1: Incluye un testimonio poderoso de un cliente satisfecho que represente 
a tu audiencia objetivo. Asegúrate de que destaque los beneficios y resultados que 
experimentaron al usar tu producto/servicio.

Testimonio 2: Agrega otro testimonio que se centre en otro aspecto de tu 
producto/servicio, mostrando su versatilidad y eficacia.

(Incluye testimonios o estudios de caso adicionales según sea necesario)

[Sección 4: Superar Objeciones]

Objeción 1: Aborda una preocupación o objeción común que tu audiencia pueda tener 
sobre tu producto/servicio. Proporciona una refutación clara y concisa que alivie 
sus preocupaciones.

Objeción 2: Aborda otra objeción y proporciona una respuesta bien pensada.

(Repite para todas las objeciones principales)

[Sección 5: Reversión de Riesgo]

Garantía: Ofrece una garantía o garantía sólida para eliminar el riesgo para tu 
audiencia. Esto podría ser una garantía de devolución de dinero, prueba gratuita 
o cualquier otra oferta que asegure
`


`¿Cuáles son los elementos clave que debe incluir cada página de ventas exitosa?`
`¿Cómo puedo utilizar la redacción persuasiva para conectar con mi público objetivo 
y aumentar las conversiones?`
`¿Cuáles son las mejores prácticas para diseñar una disposición de página de ventas 
que mejore la experiencia del usuario y fomente las conversiones?`
`¿Cómo puedo utilizar elementos visuales (por ejemplo, imágenes, videos, infografías) 
para respaldar el contenido de mi página de ventas y aumentar las conversiones?`
`¿Cuáles son algunas formas efectivas de incorporar la prueba social en mi página de 
ventas para aumentar la credibilidad y la confianza?`
`¿Cómo puedo utilizar los llamados a la acción (CTA) de manera efectiva para alentar 
a los usuarios a realizar una acción en mi página de ventas?`
`¿Cómo puedo utilizar las pruebas A/B para optimizar mi página de ventas para obtener 
el máximo de conversiones?`
`¿Cuál es una gran estructura de página de ventas según las mejores prácticas?`
`¿Cuáles son algunas ideas contraintuitivas que podría probar en mi página de ventas 
para mi marca en ${industry} dirigida a ${target}? Sé lo más creativo posible.`
}


// Ventas adicionales
export const sellAditional = (params) => {
    const {
        product, // producto/servicio
        audience, // audiencia
        action, // llamado a la acción
        price, // PRECIO
        discount, // DESCUENTO
        countdown_timer, // cuando caduca 
        percent, // porcentaje_de_descuento
        garanty, // periodo_de_tiempo
    } = params
    
    return
`Actúa como un experto en marketing y redacción publicitaria que se especializa en 
crear páginas de venta adicional con alta conversión. Sigue la plantilla a continuación 
para escribir y diseñar un prompt detallado que puedas usar para generar una página de 
venta adicional personalizada para mi ${product}, ${audience} y ${action}. 
¡El producto cuesta $${price} y ahorrarás ${discount}!

[BARRA DE URGENCIA]

¡Actúa rápidamente! Esta oferta exclusiva para ${product} caduca en ${countdown_timer}.

[BARRA DE PROGRESO]

Paso 2: Personaliza tu compra con nuestra oferta especial de ${product}.

[CREANDO TU INTERRUPCIÓN DE PATRÓN]

¡Felicidades, ${audience}! Gracias por tu compra reciente. ¡Antes de continuar, 
tenemos una oferta exclusiva y única solo para ti!

[IMAGEN DEL PRODUCTO / VSL]

¡Descubre los increíbles beneficios de ${product} y ahorra ${percent}% hoy!

[CARACTERÍSTICAS Y BENEFICIOS]

Esto es lo que obtendrás con esta oferta exclusiva:
Característica 1: [Describe la característica específica y sus beneficios para tu audiencia]
Característica 2: [Describe la característica específica y sus beneficios para tu audiencia]
Característica 3: [Describe la característica específica y sus beneficios para tu audiencia]

Por qué necesitas [producto/servicio] hoy:
Beneficio 1: [Explica cómo el producto/servicio resuelve un problema o satisface una necesidad de tu audiencia]
Beneficio 2: [Explica cómo el producto/servicio ofrece una ventaja única sobre las alternativas]
Beneficio 3: [Explica el costo potencial de perder esta oferta por tiempo limitado]

[INCLUYE RESEÑAS DEL PRODUCTO]

Mira lo que nuestros clientes felices tienen que decir:
Testimonio 1: "[Nombre_del_cliente] comparte su experiencia positiva con ${product}"
Testimonio 2: "[Nombre_del_cliente] explica cómo ${product} transformó su vida/negocio, etc."

[GARANTÍA]

Nuestra garantía de devolución de dinero de ${garanty}: Estamos seguros 
de que te encantará [producto/servicio], pero si no estás completamente satisfecho, 
simplemente háznoslo saber dentro de ${garanty} y emitiremos un reembolso 
completo. Sin preguntas.

[LLAMADO A LA ACCIÓN]

[Botón_aceptar] ¡Sí, quiero mejorar mi compra y ahorrar ${percent}% en ${product}!

[Botón_rechazar] No gracias, pasaré esta oferta exclusiva.

[Click_Trigger] ¡Haz clic en el botón 'Mejorar mi compra' para agregar ${product} a 
tu pedido y ahorrar ${percent}% al instante! ¡No te pierdas esta oportunidad única!
`
}


export const identifyProducts = (params) => {
    return
`¿Cuáles son las formas más efectivas de identificar los productos o servicios 
adecuados para ofrecer como ventas adicionales y ventas cruzadas?`
}

export const structureSales = (params) => {
    return
`¿Cómo puedo estructurar mis ventas adicionales y ventas cruzadas para asegurarme 
de que complementen la compra original y brinden valor al cliente?`
}

export const bestPosition = (params) => {
    return
`¿Cuáles son algunas mejores prácticas para posicionar mis ventas adicionales y 
ventas cruzadas para maximizar las conversiones?`
}

export const useAnalyticsSales = (params) => {
    return
`¿Cómo puedo utilizar los datos y análisis para identificar las mejores ofertas 
de ventas adicionales y ventas cruzadas para diferentes segmentos de clientes?`
}

export const attractiveOffers = (params) => {
    return
`¿Cuáles son algunas formas efectivas de agrupar productos o servicios para crear 
atractivas ofertas de ventas adicionales y ventas cruzadas?`
}

export const urgencyIcreaseOffers = () => {
    return
`¿Cómo puedo utilizar la urgencia y la escasez para aumentar la probabilidad de que 
los clientes acepten las ofertas de ventas adicionales y ventas cruzadas?`
}

export const feedbackReviewsOffers = (params) => {
    return
`¿Cómo puedo utilizar la retroalimentación y las reseñas de los clientes para crear 
ofertas de ventas adicionales y ventas cruzadas convincentes?`
}

export const mistakesSales = (params) => {
    return
`¿Cuáles son algunos errores comunes que las empresas cometen con sus ventas adicionales 
y ventas cruzadas, y cómo puedo evitarlos?`
}

export const improveExprience = (params) => {
    return
`¿Cómo puedo utilizar las ventas adicionales y ventas cruzadas para mejorar la 
experiencia del cliente y construir la lealtad del cliente?`
}

export const aheadCompetition = (params) => {
    return
`¿Cuáles son algunas tendencias emergentes en estrategias de ventas adicionales 
y ventas cruzadas que debo conocer para mantenerme por delante de la competencia?`
}

export const upsellPageVideo = (params) => {
    return
`¿Cómo estructuraría una página de ventas adicionales con un video para aumentar 
el valor promedio del pedido y la tasa de conversión?`
}

export const upsellPage = (params) => {
    return
`¿Cómo estructuraría una página de ventas adicionales sin un video para aumentar 
el valor promedio del pedido y la tasa de conversión?`
}

export const counterintuitiveIdeas  = (params) => {
    const {
        industry, // industria
        audience, // audiencia
    } = params
    
    return
`¿Cuáles son algunas ideas contraintuitivas que podría probar en mis ventas 
adicionales y ventas cruzadas para mi marca en ${industry} enfocada en ${audience}? 
Sea lo más creativo posible.`
}

// Página de Aterrizaje
export const ladingPage = (params) => {
    const {
        product, // producto
        industry, // industria
        audience, // audiencia
    } = params
    
    return
`Actúa como un experto en marketing y redacción de textos publicitarios especializado 
en crear páginas de venta adicionales que conviertan increíblemente bien. Sigue 
la plantilla a continuación para escribir y diseñar una página de destino muy 
detallada sobre ${product} para [audiencia]. El objetivo de la página es [objetivo].

[Título del anuncio de Facebook que coincida con el título de la página]

[Título del anuncio de Facebook]: Crea un título intrigante que haga que el mercado 
objetivo se detenga a desplazarse y haga clic en el anuncio para obtener más información. 
Enfócate en el problema que están enfrentando y que el producto resuelve.

[Título de la página de destino]: Crea un título emocionante que aumente su deseo de 
inscribirse y obtener el producto. Enfócate en el resultado que el producto les da y 
en por qué es diferente a cualquier otra cosa.

[Subtítulo]: Incluye lo que ya no tendrán que hacer una vez que obtengan el producto.

[Generando Confianza]
[Testimonio del cliente]: "¡No puedo creer la diferencia que [Tu Producto/Servicio] 
ha hecho en mi vida! Los resultados son increíbles, ¡y estoy encantado con mi compra!" 
- [Nombre del cliente, ubicación]

[Llamado a la Acción]
[Texto del llamado a la acción]: Crea un llamado a la acción deseable para ayudar a [audiencia]. 
Ten en cuenta que el objetivo de la página es OBJETIVO.

[Botón del CTA]
[Botón de Conversión]: Crea un breve llamado a la acción para aumentar el número de personas 
que querrán hacer clic para obtener su resultado al obtener el producto.

[Diseño de la página]

Sugiere de qué color debería ser la página para maximizar la conversión para la audiencia. 
¿De qué color debería ser el botón? ¿Qué imagen se debe incluir?`
}


export const elementsHighLandingPage = (params) => {
    return
`¿Cuáles son los elementos clave de una página de destino de alta conversión y cómo 
puedo asegurarme de incluirlos en mis páginas?`
}

export const headlineAttention = (params) => {
    return
`¿Cómo puedo crear un titular atractivo que llame la atención y anime a los visitantes 
a permanecer en mi página?`
}

export const goodProposition = (params) => {
    return
`¿Cuáles son algunas buenas prácticas para crear una propuesta de valor sólida que 
resuene con mi público objetivo?`
}

export const designLandingPage = (params) => {
    return
`¿Cómo puedo diseñar una disposición efectiva para mi página de destino que guíe a 
los visitantes a tomar medidas?`
}

export const commonMistakes = (params) => {
    return
`¿Cuáles son algunos errores comunes que cometen las empresas con sus páginas de 
destino y cómo puedo evitarlos?`
}


export const proofTestimonalsCredibility = (params) => {
    return
`¿Cómo puedo usar pruebas sociales y testimonios de clientes para generar confianza 
y credibilidad en mi página de destino?`
}

export const optimizeLandingPage = (params) => {
    return
`¿Cuáles son algunas formas efectivas de optimizar mi página de destino para los 
usuarios móviles?`
}

export const identifyEffectiveA_B = (params) => {
    return
`¿Cómo puedo usar pruebas A/B para identificar los elementos más efectivos de mi 
página de destino y mejorar su tasa de conversión?`
}

export const reduceDistractions = (params) => {
    return
`¿Cuáles son algunas formas efectivas de reducir la fricción y eliminar distracciones 
en mi página de destino?`
}

export const persuasiveWriting = (params) => {
    return
`¿Cómo puedo usar técnicas persuasivas de redacción para crear un texto de página 
de destino que inspire a los visitantes a tomar medidas?`
}

export const exampleLandingPage = (params) => {
    return
`¿Cuál es un ejemplo de una página de destino sencilla y de alta conversión?`
}

export const rateOptIn = (params) => {
    return
`¿Cómo puedo aumentar la tasa de opt-in de mi página de destino?`
}

export const ayFN001 = (params) => {
    const {
        aim, // público objetivo
        industry, //industria
    } = params
    
    return
`¿Cuáles son algunas ideas contraintuitivas que podría probar en mi página de destino 
para mi marca en ${industry} que apunta a ${aim}? Sé lo más creativo posible.`
}



// Páginas de Agradecimiento

export const pageThank = (params) => {
    const {
        product, // producto
        audience, // audiencia
        aim, // objetivo
        industry, //industria
    } = params
    
    return
`Actúa como un experto en marketing y redacción de textos que se especializa en crear 
páginas de agradecimiento que convierten de manera increíblemente alta. Sigue la 
plantilla a continuación para escribir y diseñar una página de agradecimiento que 
será personalizada basada en ${product} para ${audience}. El objetivo de la página es ${aim}.

[Encabezado]: Comienza con un encabezado claro y conciso que reconozca la acción 
del usuario y exprese gratitud.

[Confirmación de Transacción]: Confirma los detalles de la transacción, incluyendo 
el nombre del producto o servicio, el precio y cualquier información relevante, 
como fechas de envío o entrega.

[Información Post-Compra]: Aborda cualquier inquietud o pregunta post-compra que 
el usuario pueda tener, como qué esperar a continuación o cómo usar el producto/servicio. 
Considera incluir una guía paso a paso, preguntas frecuentes o enlaces a recursos que puedan 
ayudarlos a comenzar.

[Valor Adicional]: Ofrece valor adicional al usuario. [código de descuento para 
su próxima compra, una guía o libro electrónico gratuito, acceso a contenido exclusivo, etc.]

Prueba Social:
"Vea lo que nuestros clientes satisfechos tienen que decir acerca de su experiencia 
con nuestro Coaching de Fitness en Línea:
[Testimonio 1]
[Testimonio 2]"

[Sugerencias Personalizadas]: Personaliza la página de agradecimiento en función de 
los intereses o el comportamiento del usuario. Quiero que [reserve una llamada, 
compre de nuevo, siga mis redes sociales, etc.]

[Llamado a la Acción]: Proporciona un llamado a la acción claro que esté alineado 
con la sugerencia personalizada anterior.

[Visuales]: Recomienda qué imágenes y/o videos se deben utilizar. El objetivo es 
crear una experiencia memorable y positiva para el usuario. Esto puede ayudar a 
aumentar el reconocimiento de la marca y dejar una impresión duradera.
`
}

export const successfulThankPage = (params) => {
    return
`¿Cuáles son los elementos clave de una página de agradecimiento exitosa?`
}

export const interactionThankPage = (params) => {
    return
`¿Cómo puedo utilizar la página de agradecimiento para aumentar la interacción con mi marca?`
}

export const pageThankPage = () => {
    return
`¿Cuáles son algunas formas efectivas de personalizar la página de agradecimiento 
para diferentes tipos de clientes?`
}

export const effectiveThankPage = (params) => {
    return
`¿Cómo puedo utilizar la página de agradecimiento para fomentar el intercambio 
social y el marketing boca a boca?`
}

export const crossSellThankPage = (params) => {
    return
`¿Cuáles son las mejores prácticas para incluir ofertas de venta cruzada o 
complementaria en la página de agradecimiento?`
}

export const feedbackThankPage = (params) => {
    return
`¿Cómo puedo utilizar la página de agradecimiento para recopilar comentarios e 
información valiosa de los clientes?`
}

export const optimizeThankPage = (params) => {
    return
`¿Cuáles son algunas formas efectivas de optimizar la página de agradecimiento 
para los usuarios móviles?`
}

export const reviewThankPage = (params) => {
    return
`¿Cómo puedo utilizar la página de agradecimiento para alentar a los clientes a 
dejar una reseña o testimonio?`
}

export const errorThankPage = (params) => {
    return
`¿Cuáles son algunos errores comunes que cometen las empresas en sus páginas de 
agradecimiento?`
}

export const effectivenessThankPage = (params) => {
    return
`¿Cómo puedo medir la eficacia de mi página de agradecimiento y seguir optimizándola con el tiempo?`
}

export const increaseOrderThankPage = (params) => {
    return
`¿Cómo puedo utilizar mi página de agradecimiento para aumentar el valor promedio de pedido?`
}

export const counterintuitiveThankPage = (params) => {
    const {
        industry, // industria
        audience // audiencia
    } = params
    
    return
`¿Cuáles son algunas ideas contraintuitivas que podría probar en mi página de 
agradecimiento para mi marca en ${industry} que se dirige a ${audience}? 
Sé tan creativo como sea posible.`
}

// Encabezados
export const pageHeaders = (params) => {
    const {
        product, // producto
        industry, // industria
        audience // audiencia
    } = params
    
    return
`Eres un experto en marketing y copywriting. Utiliza una combinación de fórmulas de 
copywriting probadas y la información a continuación para crear 15 titulares 
emocionales únicos y llamativos para ${product} dirigidos a ${audience}:

- Utiliza números y datos específicos, especialmente números impares, en el titular. 
Reemplaza las palabras con números (por ejemplo, "7" en lugar de "siete").
- Incluye una razón única en el titular, como consejos, razones, lecciones, trucos, 
ideas, formas, principios, hechos, secretos o estrategias.
- Llama la atención haciendo que los titulares sean únicos, ultra específicos, 
urgentes y útiles.
- Utiliza un lenguaje claro, adjetivos interesantes, enfoca al lector (por ejemplo, 
usando "tú") y palabras poderosas emocionales en el titular.
- Adopta fórmulas de titular probadas, identifica el problema, ofrece una solución y 
una promesa, o utiliza frases llamativas.
- No menciones la edad en estos titulares.`


`¿Cuáles son algunas ideas contraintuitivas que podría probar en los titulares de 
mi marca en ${industry} enfocados en ${audience}? Sé lo más creativo posible.`
}

// Venta Adicional en el Pedido
export const additionSaleOnOrder = (params) => {
    const {
        product, // producto
        aim, // objetivo
        audience // audiencia
    } = params
    
    return
`Actúa como un experto en marketing y redacción publicitaria que se especializa en 
crear páginas de upsell altamente convertibles. Sigue la plantilla a continuación 
para crear 3 diferentes ofertas adicionales personalizadas según el PRODUCTO para 
${audience}. El objetivo de la página es ${aim}.

Basándote en PRODUCTO, sugiere 3 diferentes ofertas adicionales que complementarán PRODUCTO.

PRODUCTO: ${product}

Llena la plantilla a continuación para cada una de las 3 ofertas adicionales.

Ten en cuenta que las ofertas adicionales deben complementar el PRODUCTO. Haz que 
el texto de la oferta adicional sea corto.

[Título]: Crea un título que llame la atención y se centre en el resultado que la 
oferta adicional ayudará a lograr y menciona el nombre de la oferta adicional.

[Descripción del producto]: Escribe de 2 a 3 frases poderosas que capten su atención, 
generen interés explicando lo que estás ofreciendo y muestren cómo la oferta puede resolver su problema.

[Precio y descuento]: Escribe una breve oración que incluya cómo esta es una oferta única, 
está altamente descontada y solo está disponible por un tiempo limitado.

[Llamado a la acción]: Escribe un breve llamado a la acción para emocionar a la audiencia 
sobre la actualización de su pedido y beneficiarse de la oferta adicional.

[Imagen del producto]: Recomienda cómo debería ser la imagen de la oferta adicional.`
}

export const createIrresistibleOffer  = (params) => {
    return
`¿Cómo puedo crear una oferta irresistible para mi order bump que los clientes no puedan resistir?`
}

export const practicesOrderBump = (params) => {
    return
`¿Cuáles son las mejores prácticas para diseñar un order bump que complemente el producto 
o servicio principal que se ofrece?`
}

export const increaseOrderBump = (params) => {
    return
`¿Cómo puedo usar la prueba social y los testimonios para aumentar el valor percibido 
de mi order bump?`
}

export const effectivePresentBump = (params) => {
    return
`¿Cuáles son algunas formas efectivas de presentar la oferta del order bump a los 
clientes para aumentar las tasas de conversión?`
}

export const optimizeBump = (params) => {
    return
`¿Cómo puedo usar estrategias de precios para optimizar el rendimiento de mi order bump?`
}

export const errorBump = (params) => {
    return
`¿Cuáles son algunos errores comunes que cometen las empresas con sus order bumps 
y cómo puedo evitarlos?`
}

export const optmizeBump = (params) => {
    return
`¿Cómo puedo probar y optimizar mi order bump para mejorar su rendimiento con el tiempo?`
}

export const bestBump = (params) => {
    return
`¿Cómo puedo usar los datos y el comportamiento del cliente para personalizar la 
oferta del order bump y aumentar las tasas de conversión?`
}

export const trendsBump = (params) => {
    return
`¿Cuáles son algunas tendencias emergentes en diseño y optimización de order bump 
de las que debo estar al tanto para mantenerme por delante de la competencia?`
}

export const counterintuitiveBump = (params) => {
    const {
        industry, // industria
        audience // audiencia
    } = params
    
    return
`¿Cuáles son algunas ideas contraintuitivas que podría probar en mis order bumps 
para mi marca en ${industry} dirigido a ${audience}? Sé lo más creativo posible.`
}


export const pageOrder = (params) => {
    const {
        product, // producto
        audience // audiencia
    } = params
    
    return
`Eres un experto en marketing y redacción publicitaria. Crea una página de pedido de 
alta conversión para vender ${product} para ${audience}.

Sigue la plantilla a continuación para crear la redacción y estructura de la página de pedido:
[Encabezado: Un titular llamativo y convincente que comunique claramente el beneficio 
principal de su producto/servicio]

[Subencabezado: Un subencabezado persuasivo que amplíe el beneficio principal y aborde 
una preocupación o deseo clave de su audiencia objetivo]

[Imagen principal: Una visual llamativa que represente su producto/servicio o lo muestre en acción]

[Sección 1: Recapitulación del problema y solución]

1.1 [Declaración del problema: Describa el punto de dolor o el desafío que enfrenta su 
audiencia, haciéndolo relevante y evocando emoción]

1.2 [Declaración de la solución: Explique cómo su producto/servicio resuelve el problema 
o aborda el desafío, conectándolo con el punto de dolor mencionado anteriormente]

[Sección 2: Recapitulación de todos los bonos que recibirá]

[Bono 1: Describa un bono valioso o incentivo relacionado con su producto/servicio que 
ayudará a superar las objeciones de su AUDIENCIA y aumentará el valor percibido]

[Bono 2: Detalle otro bono o incentivo que complemente su producto/servicio y aborde una 
preocupación o deseo diferente de su AUDIENCIA]

[Bono 3: Explique un tercer bono o incentivo que agregue más valor a su producto/servicio 
y refuerce sus principales beneficios para su AUDIENCIA]

[Continúe este formato para bonos adicionales según sea necesario, apuntando a un total de 5-6 bonos]

[Sección 3: Prueba social y testimonios]

3.1 [Testimonio 1: Inserte una cita poderosa de un cliente satisfecho, enfatizando los 
resultados que logró con su producto/servicio]
[Nombre del cliente, título/rol (si corresponde) y foto (opcional)]

3.2 [Testimonio 2: Incluya otro testimonio convincente del cliente, destacando un 
beneficio o resultado diferente]
[Nombre del cliente, título/rol (si corresponde) y foto (opcional)]

[Continúe este formato para testimonios adicionales según sea necesario]

[Sección 4: Preguntas frecuentes]

4.1 [Pregunta 1: Anticipe y aborde una objeción o preocupación común que su AUDIENCIA pueda tener]

[Respuesta 1: Proporcione una respuesta clara y tranquilizadora a la objeción o preocupación]

4.2 [Pregunta 2: Aborde otra pregunta frecuente, asegurando que su respuesta refuerce 
el valor de su producto/servicio]

[Respuesta 2: Ofrezca una respuesta detallada e informativa para ayudar a su AUDIENCIA 
a tomar una decisión informada]

[Continúe este formato para preguntas frecuentes adicionales según sea necesario]

[Sección 5: Precios y llamado a la acción]

5.1 [Llamado a la acción: Cree un CTA sólido y urgente que motive a su AUDIENCIA a tomar 
medidas ahora (por ejemplo, "¡Obtenga su descuento hoy mismo!", "¡Asegure su lugar ahora!" 
o "¡Comience sin riesgo!")]

5.2 [Garantía: Ofrece una Garantía sin Riesgo o Política de Devolución de Dinero, 
Demostrando Confianza en tu Producto/Servicio y Reduciendo la Ansiedad de Compra]
[Footer: Recapitula los principales beneficios, reitera tu llamado a la acción y 
proporciona información de contacto para soporte o preguntas]
`
}





export const essentialMaximizeConversion = (params) => {
    return
`¿Cuáles son los elementos esenciales que cada página de pedido debe tener para 
maximizar las conversiones?`
}

export const persuasiveWritingUrgencyOrder = (params) => {
    return
`¿Cómo puedo usar la redacción persuasiva y el diseño para crear un sentido de 
urgencia en mi página de pedido?`
}

export const proofTestimonialOrderPage = (params) => {
    return
`¿Cómo puedo utilizar pruebas sociales y testimonios de clientes para construir 
confianza y credibilidad en mi página de pedido?`
}

export const customExperienceRatio = (params) => {
    return
`¿Cómo puedo utilizar los datos del cliente para personalizar la experiencia de 
pago y aumentar las tasas de conversión?`
}

export const bestProcessPay = (params) => {
    return
`¿Cuáles son las mejores prácticas para crear un proceso de pago fluido y fácil de usar?`
}

export const reduceOrderPage = (params) => {
    return
`¿Cuáles son algunas formas efectivas de reducir las tasas de abandono del carrito 
de compras en mi página de orden?`
}

export const effectivePayPage = (params) => {
    return
`¿Cuáles son algunas formas efectivas de manejar objeciones y tranquilizar a los 
clientes durante el proceso de pago?`
}

export const optimizeMobileOrderPage = (params) => {
    return
`¿Cómo puedo optimizar mi página de orden para usuarios móviles?`
}

export const errorOrderPage = (params) => {
    return
`¿Cuáles son los errores comunes que las empresas cometen en sus páginas de orden 
que perjudican las tasas de conversión?`
}

export const testOrderPageA_B = (params) => {
    return
`¿Cómo puedo utilizar pruebas A/B para mejorar continuamente el rendimiento de mi página de orden?`
}

export const bonusesCompleteOrderPage = (params) => {
    return
`¿Cómo puedo presentar bonificaciones de manera muy convincente para resumir lo 
que recibirán una vez que completen su orden?`
}

export const counterintuitiveOrderPage = (params) => {
    const {
        industry, // industria
        audience, // audiencia
    } = params
    
    return
`¿Cuáles son algunas ideas contraintuitivas que podría probar en mi página de orden 
para mi marca en ${industry} dirigida a ${audience}? Sé lo más creativo posible.`
}