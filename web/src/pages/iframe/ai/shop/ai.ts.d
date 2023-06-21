// Nombre del producto

export const productName = (params) => {
    const {
        industry, // industria
    } = params
    
    return
`¿Cuáles son las consideraciones clave al nombrar un nuevo producto en ${industry} 
y cómo podemos asegurarnos de que el nombre del producto refleje los beneficios y 
valores de nuestra marca?`
}

export const productName = (params) => {
    const {
        aim, // objetivo
    } = params
    
    return
`¿Cómo podemos crear un nombre de producto que sea memorable, fácil de pronunciar 
y distintivo de nuestros competidores en el mercado para ${aim}?`
}

export const productName = (params) => {
    return
`¿Cuáles son las mejores prácticas para realizar investigación de mercado y pruebas 
para determinar el nombre de producto más efectivo para nuestra audiencia objetivo?`
}

export const productName = (params) => {
    return
`¿Cómo podemos asegurarnos de que nuestro nombre de producto esté legalmente 
disponible para su uso y no infrinja ninguna marca registrada o derechos de autor 
existentes?`
}



export const productName = (params) => {
    return
`¿Deberíamos considerar crear un nombre más abstracto o metafórico, o uno más 
descriptivo de la función y beneficios del producto?`
}

export const productName = (params) => {
    return
`¿Cómo podemos crear un nombre de producto que sea versátil y adaptable para su uso 
en diferentes canales de marketing, como las redes sociales y el empaque?`
}

export const productName = (params) => {
    return
`¿Cómo podemos asegurarnos de que nuestro nombre de producto se traduzca bien en 
diferentes idiomas y culturas si planeamos expandirnos a nivel global?`
}

export const productName = (params) => {
    return
`¿Cuáles son las trampas comunes a evitar al crear un nombre de producto y cómo 
podemos asegurarnos de que nuestro nombre no sea confuso, ofensivo o poco 
atractivo para nuestra audiencia objetivo?`
}





// Product description
export const productDescription = (params) => {
    const {
        product, // producto
    } = params
    
    return
`Quiero que actúes como un experto en redacción de textos enfocados en la conversión. Tu 
tarea es escribir el texto basado en la descripción del producto, pero debes seguir esta 
estructura: titular enfocado en los beneficios, 3 beneficios explicados en una oración. 
El producto es este: ${product}
`
}



// Página de inicio de la tienda
export const shopHomePage = () => {
    const {
        industry, // industria
    } = params
    
    return
`¿Cuáles son los elementos clave que deben incluirse en la página de inicio de una 
tienda Shopify para maximizar las conversiones en [industria]?`
}


export const shopHomePage = () => {
    return
`¿Cómo puedo crear una propuesta de valor clara que resuene con mi público objetivo?`
}

export const shopHomePage = () => {
    return
`¿Cuáles son algunas técnicas efectivas para usar imágenes, videos y gráficos para hacer 
que mi página de inicio sea visualmente atractiva y atractiva?`
}


export const shopHomePage = () => {
    return
`¿Cómo puedo crear un menú de navegación intuitivo y fácil de usar para los visitantes?`
}



// Desarrollo de productos
export const productDevelopment = (params) => {
    const {
        aim, // Idea del Producto
        target, // target market
        industry, // industria
    } = params
    
    return
`Actúe como un Director de Producto de clase mundial, usted entiende los productos que 
permiten crear productos que resuelvan problemas y creen clientes leales. Basado en la 
siguiente idea de producto: ${aim}, dirigido al mercado ${target}, 
responda todas las siguientes preguntas. Por favor, formatee sus respuestas en lenguaje markdown:

Plan de Desarrollo del Producto para ${aim} en el mercado ${target}

1. Considera los factores más importantes al desarrollar un nuevo producto en ${industry} 
y asegúrate de que nuestro producto se destaque de la competencia. Da sugerencias para cada factor.
2. Incorpora las características y funcionalidades clave que los clientes en ${industry} 
buscan en nuestro diseño de producto.
3. Utiliza la retroalimentación de los clientes existentes de productos similares para 
sugerir nuevas características para nuestro nuevo producto.
4. Mitiga los posibles riesgos y desafíos en el desarrollo del nuevo producto para asegurar el éxito.
5. Sigue las mejores prácticas para colaborar con proveedores, fabricantes y otras partes 
interesadas en el proceso de desarrollo del producto.
6. Utiliza las estrategias de marketing y branding más efectivas para lanzar nuestro nuevo 
producto en ${industry} y maximizar las ventas y los ingresos.
7. Desarrolla una hoja de ruta y un cronograma del producto mientras nos aseguramos de mantenernos 
en el camino y cumplir nuestros objetivos.
8. Asegúrate de que nuestro nuevo producto cumpla con todos los estándares necesarios de 
seguridad y calidad, y sigue las mejores prácticas para probar y validar nuestro producto.
9 Asegúrate de que nuestro nuevo producto sea escalable y adaptable a las necesidades y 
condiciones cambiantes del cliente y del mercado.
10. Continuamente mejora e itera en nuestro producto después del lanzamiento para asegurar 
un éxito y crecimiento continuos.
`
}



// **Seguimiento de las indicaciones (ChatGPT completará automáticamente los [blanks] a continuación si lo pegas en la misma sesión.)**

export const product = (parms) => {
    const {
        product, // producto/servicio
    } = params
    
    return 
`¿Cuáles son los factores más importantes a considerar al desarrollar un nuevo 
${product} en el mercado, y cómo podemos asegurarnos de que nuestro 
${product} se destaque de la competencia?`
}

export const customerMarketResearchComments = (params) => {
    const {
        product, // producto/servicio
    } = params
    
    return
`¿Cómo podemos utilizar los comentarios de los clientes y la investigación de 
mercado para informar el desarrollo de nuestro nuevo ${product}?`
}

export const potentialRisksChallengesNewProduct = (params) => {
    const {
        product, // producto/servicio
    } = params
    
    return
`¿Cuáles son los riesgos y desafíos potenciales involucrados en el desarrollo de 
un nuevo ${product}, y cómo podemos mitigarlos para asegurar el éxito?`
}

export const bestPracticesForSuppliers = (params) => {
    const {
        product, // producto/servicio
    } = params
    
`¿Cuáles son las mejores prácticas para colaborar con proveedores, fabricantes y 
otros interesados en el proceso de desarrollo de ${product}?`

export const prodSafety = (params) => {
    const {
        product, // producto/servicio
    } = params
    
    return
`¿Cómo podemos asegurarnos de que nuestro nuevo ${product} cumpla con 
todos los estándares de seguridad y calidad necesarios, y cuáles son las mejores 
prácticas para probar y validar nuestro ${product}?`
}

export const importantFeatures = (params) => {
    const {
        product, // producto/servicio
    } = params
    
    return
`¿Cuáles son las características y funcionalidades más importantes que los clientes 
del mercado buscan en un ${product}, y cómo podemos incorporarlas en el 
diseño de nuestro ${product}?`
}

export const marketingBrandingStrategyForNewProduct = (params) => {
    const {
        product, // producto/servicio
    } = params
    
    return
`¿Cuáles son las estrategias de marketing y branding más efectivas para lanzar 
un nuevo ${product} en el mercado, y cómo podemos aprovecharlas al máximo 
para maximizar las ventas y los ingresos?`
}

export const roadmapPlanning = (params) => {
    const {
        product, // producto/servicio
    } = params
    
    return
`¿Cuáles son las mejores prácticas para desarrollar una hoja de ruta y un cronograma 
para ${product}, y cómo podemos asegurarnos de que seguimos el camino 
correcto y cumplimos con nuestros objetivos?`
}

export const productScalable = (params) => {
    const {
        product, // producto/servicio
    } = params
    
    return
`¿Cómo podemos asegurarnos de que nuestro nuevo ${product} sea escalable 
y adaptable a las necesidades cambiantes de los clientes y las condiciones del mercado?`
}

export const improveIterateProduct = (params) => {
    const {
        product, // producto/servicio
    } = params
    
    return
`¿Cómo podemos mejorar continuamente e iterar sobre nuestro ${product} 
después del lanzamiento para garantizar el éxito y el crecimiento continuo?`
}

