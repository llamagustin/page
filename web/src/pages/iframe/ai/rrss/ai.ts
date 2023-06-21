// Obtén un Calendario de Contenido Mensual
export const monthCalendar = (params) => {
    const {
      rrss // las redes sociales
    } = params;
    
    return
`Tu tarea es ayudarme a crear [30] publicaciones en ${rrss} para la 
siguiente empresa. Siga las mejores prácticas distintivas que generarán un 
máximo de participación para la plataforma social específica mencionada en la 
última oración. Cada publicación que me des debe ser de al menos 5 oraciones. 
Las publicaciones no deben mencionar descuentos ni nuevos productos. Todo lo 
que dije anteriormente es importante y debe ser seguido. Por favor, ponga cada 
una de estas publicaciones en una tabla bien presentada para que parezca un 
calendario. Además, por favor brinde una sugerencia para la imagen que deben 
usar para cada publicación. Las únicas columnas en la cuadrícula deben ser para 
(1) número de publicación, (2) publicación, (3) imagen sugerida.

La empresa para la que necesito ayuda es la siguiente.

[El nombre de la empresa es un tipo de negocio. Ejemplo: Super Velas es una 
tienda de comercio electrónico.]
`
}

// Mejores prácticas en cada plataforma social
export const socialPlatform = (params) => {
    const {
      rrss // las redes sociales
    } = params;
    
    return
`Para ${rrss}, ¿cuáles son las mejores prácticas distintivas que 
debo seguir para generar un máximo de participación con mi contenido y presencia 
en las redes sociales? Por favor, proporcione detalles sobre cómo aprovechar 
las últimas tendencias de algoritmos y los mejores ejemplos de rendimiento`
}

// ¿QUIÉN? - Encuentra a los mejores expertos/compañías en tu nicho
export const topTenInfluencersInNicho  = (params) => {
    const {
      niche
    } = params;
    
    return
`Proporcione 10 influencers populares con un público en el nicho ${niche}, mencione 
su plataforma de redes sociales, nombre de usuario y nombres completos. Déme una 
breve descripción de su biografía.`
}

export const topTenExpertsNichoSocialMedia = (params) => {
    const {
      niche,
      rrss // las redes sociales
    } = params;
    
    return
`¿Puede nombrar 10 de los expertos más reconocidos en el nicho ${niche}? Especifique 
su plataforma de redes sociales, nombre de usuario y nombres completos. Déme una 
breve descripción de su biografía.`
}


export const topTenSocialCompanies = (params) => {
    const {
      niche,
      rrss // las redes sociales
    } = params;
    
    return
`¿Puede nombrar 10 compañías con la mayor notoriedad en ${rrss} en 
el nicho ${niche}? Especifique su plataforma de redes sociales, nombre de usuario 
y nombres completos. Déme una breve descripción de su biografía.`
}

export const socialMediaExperts   = (params) => {
    const {
      niche,
      rrss // las redes sociales
    } = params;
    
    return
`¿Puede nombrar a 10 expertos con la mayor cantidad de seguidores en 
${rrss} en el nicho ${niche}? Especifique su plataforma de redes 
sociales, nombre de usuario y nombres completos. Déme una breve descripción de su 
biografía.`
}

export const topSocialFollowers = (params) => {
    const {
      niche,
      rrss // las redes sociales
    } = params;
    
    return
`¿Puede nombrar a 10 compañías con la mayor cantidad de seguidores en 
${rrss} en el nicho ${niche}? Especifique su plataforma de redes sociales, 
nombre de usuario y nombres completos. Déme una breve descripción de su biografía.
`
}

// Optimizando tu perfil
export const socialMediaStrategy = (params) => {
    const {
      type, 
      brand,
      platform, // plataforma
      url, // url business
      aim // objetivo: optar, etc
    } = params;
    
    return
`Eres un experto en redes sociales. Crea una estrategia de redes sociales para un ${type} 
para ${platform} con un público objetivo ${publico}. El objetivo es maximizar el crecimiento y 
la participación en la plataforma.

[1. Optimización de imágenes para la plataforma]
a. Recomienda qué tipo de imágenes atractivas y de alta resolución para mi perfil y fotos de portada
b. ¿Cómo puedo hacer que mi logotipo sea más reconocible como una miniatura o usar un gráfico con 
marca llamativo para los ojos?
c. ¿Cómo puedo usar mejor mi foto de portada estratégicamente para mi negocio?

[2. Crear una biografía y descripción impactantes]
Crea una biografía atractiva y impactante que esté optimizada para la plataforma mencionada al 
principio de este texto. Incluya la ${url} de mi negocio y crea una llamada a la acción impactante 
para que mi público pueda ${aim}.

[3. Aumentar mi participación]
¿Cómo puedo aumentar la participación en mi perfil en la plataforma? ¿Qué herramientas nativas 
debo aprovechar para llegar a mi público?
¿Qué errores debo evitar para crear un perfil mejor?`
}

// Generación de ideas de contenido
export const createSocialPost = (params) => {
    const {
      num,
      publico, // público
      brand,
      aim, // objetivo de participación, ventas, etc.
      product, // producto
      platform, // plataforma
    } = params;
    
    return
`Eres un experto en redes sociales y un influencer. Crea ${num} publicaciones para ${brand} 
vendiendo ${product} con un público objetivo ${publico} con el ${aim} en ${platform}. Usa 
la lista de ideas de publicaciones en redes sociales 
para generar estas publicaciones. Hazlas altamente atractivas, divertidas, únicas y 
optimizadas para la plataforma seleccionada. Incluye una recomendación para la imagen o 
el video que deben ir con cada publicación.

Ideas de publicaciones en redes sociales:

Comparte las publicaciones de tu blog de la empresa
Publica sobre la cultura de tu empresa
Destaca las noticias de la industria
Comparte contenido seleccionado
Haz una pregunta
Muestra videos de productos/compañía
Comparte opiniones y testimonios de clientes
Comparte consejos y trucos rápidos
Publica memes o GIFs
Organiza un concurso
Celebra un día festivo
Comparte fotos de eventos de la empresa
Publica una respuesta a una pregunta frecuente
Comparte infografías
Inicia una conversación con un líder de tu industria
Enlaza a recursos gratuitos
Destaca episodios de podcast
Publica nuevas ofertas de trabajo
Destaca a los nuevos miembros del equipo
Celebra días nacionales
Promociona un evento
Publica videos en vivo
Promociona la suscripción a correos electrónicos
Crea juegos de imágenes
Publica citas inspiradoras
Logros de la empresa
Organiza una charla en Twitter
Pide comentarios de los clientes
Publica videos tutoriales
Comparte reseñas de productos
Publica imágenes o videos de tu producto
Destaca el contenido generado por el usuario
Muestra tu historia de la empresa
Destaca noticias de la empresa
Crea una serie semanal
Reutiliza gráficos de blog
Comparte un estudio de caso de uno de tus clientes
Comparte una encuesta
Publica una publicación de rellenar con palabras
Publica una estadística
Vuelve a compartir tus publicaciones más exitosas
Promociona a tus socios
Comparte investigaciones interesantes de la industria
Muestra un nuevo producto
Sé creativo con los emojis
Regala algo gratis
Haz una toma de control en redes sociales
Destaca al personal
Muestra lo que estás trabajando
Publica Instagram Reels
Destaca tu comunidad
Comparte detrás de escena
Comparte contenido de influencers
Publica una entrevista con un cliente
Haz una función de "Cómo se hace"
`
}

// Búsqueda de tendencias
export const trendTopicsSocial = (params) => {
    const {
      socialPlatform,
      niche
    } = params;

    return
`Dame 10 temas tendencia, únicos y emocionantes para ${niche} en ${socialPlatform}.`
}

// Creciendo tu seguimiento
export const socialGrowStrats = (params) => {
    const {
      redesSociales,
      nicho
    } = params;

    return 
`¿Cuáles son las mejores estrategias para crecer un seguimiento en redes sociales en 
${redesSociales}? Por favor, proporciona las últimas estrategias comprobadas para 
maximizar el crecimiento en esa plataforma y obtener un alcance y participación máximos. 
También proporciona 10 ejemplos populares que ayudaron a las personas en el nicho ${nicho} 
a tener éxito usando estas estrategias, menciona su nombre de usuario y nombres completos 
en redes sociales al final de la respuesta.`
}