import type {
  HelpCenterArticlesOverviewType,
  HelpCenterCategoriesType,
  HelpCenterSubcategoryArticlesType,
} from '../types.d'
import mock from '@/@fake-db/mock'

import { themeConfig } from '@themeConfig'

import discord from '@/assets/images/svg/discord.svg'
import gift from '@/assets/images/svg/gift.svg'
import keyboard from '@/assets/images/svg/keyboard.svg'
import laptop from '@/assets/images/svg/laptop.svg'
import lightbulb from '@/assets/images/svg/lightbulb.svg'
import rocket from '@/assets/images/svg/rocket.svg'

interface Data {
  categories: HelpCenterCategoriesType[]
  keepLearning: HelpCenterArticlesOverviewType[]
  popularArticles: HelpCenterArticlesOverviewType[]
}

const data: Data = {
  popularArticles: [
    {
      slug: 'getting-started',
      title: 'Empezando',
      img: rocket,
      subtitle: 'Tanto si eres nuevo como si eres un usuario avanzado, este artículo te...',
    },
    {
      slug: 'first-steps',
      title: 'Primeros pasos',
      img: gift,
      subtitle: '¿Es usted un cliente nuevo que se pregunta cómo empezar?',
    },
    {
      slug: 'external-content',
      title: 'Agregar contenido externo',
      img: keyboard,
      subtitle: 'Este artículo le mostrará cómo expandir la funcionalidad de...',
    },
  ],
  categories: [
    {
      icon: 'tabler-rocket',
      avatarColor: 'success',
      slug: 'getting-started',
      title: 'Empezando',
      subCategories: [
        {
          slug: 'account',
          icon: 'tabler-box',
          title: 'Cuentas',
          articles: [
            {
              slug: 'changing-your-username',
              title: '¿Cambiar su nombre de usuario?',
              content:
                `<p>Puede cambiar su nombre de usuario a otro nombre de usuario que no esté actualmente en uso. Si el nombre de usuario que desea no está disponible, considere otros nombres o variaciones únicas. El uso de un número, un guión o una ortografía alternativa puede ayudarlo a encontrar un nombre de usuario similar que aún esté disponible.</p> <p>Después de cambiar su nombre de usuario, su antiguo nombre de usuario estará disponible para que cualquier otra persona lo reclame. La mayoría de las referencias a sus repositorios con el nombre de usuario anterior cambian automáticamente al nuevo nombre de usuario. Sin embargo, algunos enlaces a su perfil no se redirigirán automáticamente.</p><p>Puede cambiar su nombre de usuario a otro nombre de usuario que no esté actualmente en uso. Si el nombre de usuario que desea no está disponible, considere otros nombres o variaciones únicas. El uso de un número, un guión o una ortografía alternativa puede ayudarlo a encontrar un nombre de usuario similar que aún esté disponible.</p> <p>Después de cambiar su nombre de usuario, su antiguo nombre de usuario estará disponible para que cualquier otra persona lo reclame. La mayoría de las referencias a sus repositorios con el nombre de usuario anterior cambian automáticamente al nuevo nombre de usuario. Sin embargo, algunos enlaces a su perfil no se redirigirán automáticamente.</p>`,
            },
            {
              slug: 'changing-your-primary-email-address',
              title: '¿Cambiar su dirección de correo electrónico principal?',
              content:
                `<p>Puede cambiar la dirección de correo electrónico asociada con su cuenta personal en cualquier momento desde la configuración de la cuenta.</p> <p><strong>Nota:</strong> No puede cambiar su dirección de correo electrónico principal a una dirección de correo electrónico que sea ya configurada como su dirección de correo electrónico de respaldo.</p><p>Puede cambiar la dirección de correo electrónico asociada con su cuenta personal en cualquier momento desde la configuración de la cuenta.</p> <p><strong>Nota:</strong> No puede cambiar su dirección de correo electrónico principal a un correo electrónico que ya está configurado como su dirección de correo electrónico de respaldo.</p>`,
            },
            {
              slug: 'changing-your-profile-picture',
              title: '¿Cambiar tu foto de perfil?',
              content:
                `<p>Puede cambiar su perfil desde la configuración de la cuenta en cualquier momento.</p> <p><strong>Nota:</strong> Su imagen de perfil debe ser un archivo PNG, JPG o GIF, y debe ser menos de 1 MB de tamaño y menor de 3000 por 3000 píxeles. Para obtener la mejor calidad de representación, recomendamos mantener la imagen en aproximadamente 500 x 500 píxeles.<p>Puede cambiar su perfil desde la configuración de la cuenta en cualquier momento.</p> <p><strong>Nota:</strong> su perfil la imagen debe ser un archivo PNG, JPG o GIF, y debe tener menos de 1 MB de tamaño y menos de 3000 por 3000 píxeles. Para obtener la mejor calidad de representación, recomendamos mantener la imagen en aproximadamente 500 por 500 píxeles.`,
            },
            {
              slug: 'setting-your-profile-to-private',
              title: '¿Está configurando su perfil como privado?',
              content:
                '<p>Un perfil privado muestra solo información limitada y oculta alguna actividad.</p> <p>Para ocultar partes de su página de perfil, puede hacer que su perfil sea privado. Esto también oculta su actividad en varias funciones sociales del sitio web. Un perfil privado oculta información de todos los usuarios, y actualmente no existe ninguna opción para permitir que usuarios específicos vean su actividad.</p> <p>Puede cambiar su perfil a privado en la configuración de la cuenta.</p> <p>A El perfil privado muestra solo información limitada y oculta parte de la actividad.</p> <p>Para ocultar partes de su página de perfil, puede hacer que su perfil sea privado. Esto también oculta su actividad en varias funciones sociales del sitio web. Un perfil privado oculta información de todos los usuarios, y actualmente no existe ninguna opción para permitir que usuarios específicos vean su actividad.</p> <p>Puede cambiar su perfil a privado en la configuración de la cuenta.</p> ',
            },
            {
              slug: 'deleting-your-personal-account',
              title: '¿Borrar tu cuenta personal?',
              content:
                `<p>Al eliminar su cuenta personal, se eliminan los datos asociados con su cuenta.</p> <p>Cuando elimina su cuenta, dejamos de facturarle. La dirección de correo electrónico asociada con la cuenta está disponible para su uso con una cuenta diferente en el sitio web. Después de 90 días, el nombre de la cuenta también estará disponible para que cualquier otra persona lo use en una cuenta nueva.</p><p>Al eliminar su cuenta personal, se eliminan los datos asociados con su cuenta.</p> <p>Cuando elimina su cuenta dejamos de facturarte. La dirección de correo electrónico asociada con la cuenta está disponible para su uso con una cuenta diferente en el sitio web. Después de 90 días, el nombre de la cuenta también estará disponible para que cualquier otra persona lo use en una cuenta nueva.</p>`,
            },
          ],
        },
        {
          slug: 'authentication',
          title: 'Autenticación',
          icon: 'tabler-lock',
          articles: [
            {
              slug: 'how-to-create-a-strong-password',
              title: '¿Como crear una contraseña segura?',
              content:
                `<p>Una contraseña segura es una palabra o frase única que un pirata informático no puede adivinar o descifrar fácilmente.</p> <p>Para mantener su cuenta segura, le recomendamos que tenga una contraseña con al menos ocho caracteres, un número, una letra minúscula y un carácter en mayúscula.</p><p>Una contraseña segura es una palabra o frase única que un pirata informático no puede adivinar o descifrar fácilmente.</p> <p>Para mantener su cuenta segura, le recomendamos que tenga una contraseña con al menos ocho caracteres, un número, una letra minúscula y un carácter en mayúscula.</p>`,
            },
            {
              slug: 'what-is-2FA',
              title: '¿Qué es la autenticación de dos factores?',
              content:
                `<p>La autenticación de dos factores (2FA) es una capa adicional de seguridad que se utiliza al iniciar sesión en sitios web o aplicaciones. Con 2FA, debe iniciar sesión con su nombre de usuario y contraseña y proporcionar otra forma de autenticación que solo usted conozca o a la que tenga acceso.</p> <p>Para nuestra aplicación, la segunda forma de autenticación es un código que\' s generados por una aplicación en su dispositivo móvil o enviados como un mensaje de texto (SMS). Después de habilitar 2FA, la aplicación genera un código de autenticación cada vez que alguien intenta iniciar sesión en su cuenta. La única forma en que alguien puede iniciar sesión en su cuenta es si conoce su contraseña y tiene acceso al código de autenticación en su teléfono.</p><p>La autenticación de dos factores (2FA) es una capa adicional de seguridad que se usa al iniciar sesión en sitios web o aplicaciones. Con 2FA, debe iniciar sesión con su nombre de usuario y contraseña y proporcionar otra forma de autenticación que solo usted conozca o a la que tenga acceso.</p> <p>Para nuestra aplicación, la segunda forma de autenticación es un código que\' s generados por una aplicación en su dispositivo móvil o enviados como un mensaje de texto (SMS). Después de habilitar 2FA, la aplicación genera un código de autenticación cada vez que alguien intenta iniciar sesión en su cuenta. La única forma en que alguien puede iniciar sesión en su cuenta es si conocen su contraseña y tienen acceso al código de autenticación en su teléfono.</p>`,
            },
            {
              slug: 'how-to-recover-account-if-you-lose-your-2fa-credentials',
              title: '¿Cómo recuperar la cuenta si pierde sus credenciales 2fa?',
              content:
                `<p>Si pierde el acceso a sus credenciales de autenticación de dos factores, puede usar sus códigos de recuperación u otra opción de recuperación para recuperar el acceso a su cuenta.</p> <p><strong>Advertencia:</strong > Por razones de seguridad, es posible que Nuestro Soporte no pueda restaurar el acceso a las cuentas con autenticación de dos factores habilitada si pierde sus credenciales de autenticación de dos factores o si pierde el acceso a los métodos de recuperación de su cuenta.</p><p>Si pierde acceso a sus credenciales de autenticación de dos factores, puede usar sus códigos de recuperación u otra opción de recuperación para recuperar el acceso a su cuenta.</p> <p><strong>Advertencia:</strong> Por razones de seguridad, Nuestro Soporte Es posible que no pueda restaurar el acceso a las cuentas con la autenticación de dos factores habilitada si pierde sus credenciales de autenticación de dos factores o si pierde el acceso a los métodos de recuperación de su cuenta.</p>`,
            },
            {
              slug: 'how-to-review-security-logs',
              title: '¿Cómo revisar los registros de seguridad?',
              content:
                `<p>Puedes revisar el registro de seguridad de tu cuenta personal para comprender mejor las acciones que has realizado y las acciones que otros han realizado que te involucran.</p> <p>Puedes consultar tu registro de seguridad desde la configuración.< /p><p>Puede revisar el registro de seguridad de su cuenta personal para comprender mejor las acciones que ha realizado y las acciones que otros han realizado que lo involucran.</p> <p>Puede consultar su registro de seguridad desde la configuración .</p>`,
            },
          ],
        },
        {
          slug: 'billing',
          title: 'Facturación',
          icon: 'tabler-currency-dollar',
          articles: [
            {
              slug: 'how-to-update-payment-method',
              title: '¿Cómo actualizar el método de pago?',
              content:
                `<p>Puede agregar un método de pago a su cuenta o actualizar el método de pago existente de su cuenta en cualquier momento.</p> <p>Puede pagar con una tarjeta de crédito o con una cuenta de PayPal. Cuando actualiza su método de pago para la suscripción de su cuenta, su nuevo método de pago se agrega automáticamente a sus otras suscripciones para productos pagos.</p><p>Puede agregar un método de pago a su cuenta o actualizar su cuenta\ método de pago existente de en cualquier momento.</p> <p>Puede pagar con una tarjeta de crédito o con una cuenta de PayPal. Cuando actualiza su método de pago para la suscripción de su cuenta, su nuevo método de pago se agrega automáticamente a sus otras suscripciones para productos pagos.</p>`,
            },
            {
              slug: 'how-to-check-billing-date',
              title: '¿Cómo comprobar la fecha de facturación?',
              content:
                '<p>You can view your account\'s subscription, your other paid features and products, and your next billing date in your account\'s billing settings.</p><p>You can view your account\'s subscription, your other paid features and products, and your next billing date in your account\'s billing settings.</p>',
            },
            {
              slug: 'how-to-change-billing-cycle',
              title: '¿Cómo cambiar el ciclo de facturación?',
              content: 'Not found 404'
            },
            {
              slug: 'where-can-i-view-and-download-payment-receipt',
              title: '¿Dónde puedo ver y descargar el recibo de pago?',
              content:
                '<p>You can view your payment from the account settings billing section.</p> <p>You\'ll also a have a option to download or share your payment receipt from the billing section.</p><p>You can view your payment from the account settings billing section.</p> <p>You\'ll also a have a option to download or share your payment receipt from the billing section.</p>',
            },
            {
              slug: 'how-to-set-billing-email',
              title: '¿Cómo configurar el correo electrónico de facturación?',
              content:
                `<p>El correo electrónico principal de su cuenta personal es donde enviamos los recibos y otras comunicaciones relacionadas con la facturación.</p> <p>Su dirección de correo electrónico principal es el primer correo electrónico que aparece en la configuración de correo electrónico de su cuenta. También usamos su dirección de correo electrónico principal como nuestra dirección de correo electrónico de facturación.</p> <p>Si desea cambiar su correo electrónico de facturación, puede hacerlo desde la configuración de la cuenta.</p><p>Su cuenta personal\ El correo electrónico principal es donde enviamos los recibos y otras comunicaciones relacionadas con la facturación.</p> <p>Su dirección de correo electrónico principal es el primer correo electrónico que aparece en la configuración de correo electrónico de su cuenta. También usamos su dirección de correo electrónico principal como nuestra dirección de correo electrónico de facturación.</p> <p>Si desea cambiar su correo electrónico de facturación, puede hacerlo desde la configuración de la cuenta.</p>`,
            },
          ],
        },
      ],
    },
    {
      slug: 'orders',
      title: 'Pedidos',
      avatarColor: 'info',
      icon: 'tabler-box',
      subCategories: [
        {
          slug: 'processing-orders',
          title: 'Procesando pedidos',
          icon: 'tabler-box',
          articles: [
            {
              slug: 'what-happens-when-you-receive-an-online-order',
              title: '¿Qué sucede cuando recibes un pedido en línea?',
              content:
                `<p>Cuando reciba un pedido en línea, recibirá una notificación de nuevo pedido por correo electrónico.</p> <p>Podrá ver ese pedido en la página de pedidos.</p>< p>Cuando reciba un pedido en línea, recibirá una notificación de nuevo pedido por correo electrónico.</p> <p>Podrá ver ese pedido en la página de pedidos.</p>`,
            },
            {
              slug: 'what-happens-when-you-process-an-order',
              title: '¿Qué sucede cuando procesas un pedido?',
              content:
                `<p>Cuando procesa un pedido, la página Pedidos mostrará el pedido con un estado de pago Pagado o Parcialmente pagado.</p> <p>Si el cliente proporcionó su dirección de correo electrónico, recibirá un recibo por correo electrónico. </p><p>Cuando procesa un pedido, la página Pedidos mostrará el pedido con un estado de pago Pagado o Parcialmente pagado.</p> <p>Si el cliente proporcionó su dirección de correo electrónico, recibirá un recibo por correo electrónico.</p>`,
            },
            {
              slug: 'how-to-cancel-an-order',
              title: '¿Cómo cancelar un pedido?',
              content:
                `<p>Cancelar un pedido indica que está deteniendo el procesamiento del pedido. Por ejemplo, si un cliente solicita una cancelación o usted sospecha que el pedido es fraudulento, puede cancelar el pedido para ayudar a evitar que el personal o los servicios de cumplimiento continúen trabajando en el pedido. También puede cancelar un pedido si se ordenó un artículo y no está disponible.</p> <p>Puede cancelar un pedido haciendo clic en el botón cancelar en la página de pedidos.</p><p>Cancelar un pedido indica que está deteniendo el procesamiento del pedido. Por ejemplo, si un cliente solicita una cancelación o usted sospecha que el pedido es fraudulento, puede cancelar el pedido para ayudar a evitar que el personal o los servicios de cumplimiento continúen trabajando en el pedido. También puede cancelar un pedido si se ordenó un artículo y no está disponible.</p> <p>Puede cancelar un pedido haciendo clic en el botón cancelar en la página de pedidos.</p>`,
            },
            {
              slug: 'whats-the-status-of-my-order',
              title: '¿Cuál es el estado de mi pedido?',
              content:
                `<p>Puede comprobar el estado de envío de su pedido en el sitio web o en la aplicación. Si el vendedor agregó un número de seguimiento, puede usarlo para obtener información detallada sobre el movimiento del paquete a través del transportista.</p><p>Verá el estado del envío en la página de pedidos. También verá una fecha de entrega estimada que debería darle una idea de cuándo puede esperar que llegue el pedido y un número de seguimiento si está disponible para su pedido.</p><p>Puede verificar el estado de envío de su pedido en el sitio web o la aplicación. Si el vendedor agregó un número de seguimiento, puede usarlo para obtener información detallada sobre el movimiento del paquete a través del transportista.</p><p>Verá el estado del envío en la página de pedidos. También verá una fecha de entrega estimada que debería darle una idea de cuándo puede esperar que llegue el pedido y un número de seguimiento si está disponible para su pedido.</p>`,
            },
            {
              slug: 'how-to-return-or-exchange-an-item',
              title: '¿Cómo devolver o cambiar un artículo?',
              content:
                `<p>Si necesita devolver o cambiar un artículo, el vendedor al que compró su pedido es la mejor persona para ayudarlo. Cada vendedor gestiona sus propios pedidos y toma decisiones sobre cancelaciones, reembolsos y devoluciones.</p><p>Los vendedores no están obligados a aceptar devoluciones, cambios o reembolsos, a menos que se indique en las políticas de su tienda. Vaya a la página de inicio de la tienda y desplácese hasta la parte inferior para ver las políticas de la tienda.</p><p>Si necesita devolver o cambiar un artículo, el vendedor al que compró su pedido es la mejor persona para ayudarte. Cada vendedor gestiona sus propios pedidos y toma decisiones sobre cancelaciones, reembolsos y devoluciones.</p><p>Los vendedores no están obligados a aceptar devoluciones, cambios o reembolsos, a menos que se indique en las políticas de su tienda. Vaya a la página de inicio de la tienda y desplácese hasta la parte inferior para ver las políticas de la tienda.</p>`,
            },
          ],
        },
        {
          slug: 'payments',
          title: 'Pagos',
          icon: 'tabler-currency-dollar',
          articles: [
            {
              slug: 'how-do-i-get-paid',
              title: '¿Cómo me pagan?',
              content:
                `<p>Cuando configura un proveedor de pago para aceptar pagos con tarjeta de crédito, cada pago debe procesarse, por lo que suele haber una demora entre el momento en que el cliente paga su pedido y el momento en que usted recibe el pago. Después de que se procese el pago, el monto de la compra se transferirá a su cuenta de comerciante.</p><p>Cuando configura un proveedor de pago para aceptar pagos con tarjeta de crédito, cada pago debe procesarse, por lo que generalmente hay una demora entre cuando el cliente paga su pedido y cuando recibes el pago. Después de que se procese el pago, el monto de la compra se transferirá a su cuenta de comerciante.</p>`,
            },
            {
              slug: 'how-often-do-i-get-paid',
              title: '¿Con qué frecuencia me pagan?',
              content:
                `<p>Si usa nuestro sistema de pago, puede verificar su período de pago para ver cuándo recibe los pagos de los pedidos con tarjeta de crédito. Otros proveedores de pago tienen sus propias reglas sobre cuándo recibe pagos por pedidos con tarjeta de crédito. Consulte con su proveedor para averiguar con qué frecuencia se le pagará.</p> <p>Después de enviar el pago, es posible que su banco no lo reciba de inmediato. Pueden pasar algunos días después de que se envíe el pago para que se deposite en su cuenta bancaria. Consulte con su banco si encuentra que sus pagos se están retrasando.</p><p>Si utiliza nuestro sistema de pago, puede verificar su período de pago para ver cuándo recibe los pagos de los pedidos con tarjeta de crédito. Otros proveedores de pago tienen sus propias reglas sobre cuándo recibe pagos por pedidos con tarjeta de crédito. Consulte con su proveedor para averiguar con qué frecuencia se le pagará.</p> <p>Después de enviar el pago, es posible que su banco no lo reciba de inmediato. Pueden pasar algunos días después de que se envíe el pago para que se deposite en su cuenta bancaria. Consulte con su banco si encuentra que sus pagos se están retrasando.</p>`,
            },
            {
              slug: 'how-much-do-i-get-paid',
              title: '¿Cuánto me pagan?',
              content:
                `<p>Se le pueden cobrar varias tarifas de transacción de terceros por transacciones en línea. Para las transacciones con tarjeta de crédito, el emisor, el adquirente y la compañía de la tarjeta de crédito cobran una pequeña tarifa por usar sus servicios.</p><p>No se le cobran tarifas de transacción de terceros por pedidos procesados a través de nuestro sistema de pago. sistema. Usted paga tarifas de procesamiento de tarjetas de crédito, según su plan de suscripción. Si está utilizando un proveedor de pago de terceros con nosotros, se le cobrará una tarifa de transacción de terceros.</p><p>Se le pueden cobrar varias tarifas de transacción de terceros por transacciones en línea. Para las transacciones con tarjeta de crédito, el emisor, el adquirente y la compañía de la tarjeta de crédito cobran una pequeña tarifa por usar sus servicios.</p><p>No se le cobran tarifas de transacción de terceros por pedidos procesados a través de nuestro sistema de pago. sistema. Usted paga tarifas de procesamiento de tarjetas de crédito, según su plan de suscripción. Si está utilizando un proveedor de pago de terceros con nosotros, se le cobrará una tarifa de transacción de terceros.</p>`,
            },
            {
              slug: 'cant-complete-payment-on-paypal',
              title: '¿No puede completar el pago en PayPal?',
              content:
                `<p>PayPal utiliza varias medidas de seguridad para proteger a sus usuarios. Debido a esto, PayPal puede prohibir ocasionalmente que un comprador envíe un pago a un vendedor a través de PayPal.</p><p>Si finalmente no puede enviar el pago, intente trabajar con el vendedor para determinar un método de pago alternativo. Aprende cómo contactar a un vendedor.</p><p>PayPal usa varias medidas de seguridad para proteger a sus usuarios. Debido a esto, PayPal puede prohibir ocasionalmente que un comprador envíe un pago a un vendedor a través de PayPal.</p><p>Si finalmente no puede enviar el pago, intente trabajar con el vendedor para determinar un método de pago alternativo. Obtenga información sobre cómo ponerse en contacto con un vendedor.</p>`,
            },
            {
              slug: 'why-is-my-order-is-still-processing',
              title: '¿Por qué mi pedido aún se está procesando?',
              content:
                `<p>Si recibió un correo electrónico que dice que su pedido aún se está procesando, significa que nuestro socio externo está revisando su compra. Todos los pedidos de Pagos se analizan para garantizar que sean legítimos y para protegerlos de posibles fraudes.</p><p>La mayoría de los pedidos se procesan en menos de 72 horas. Recibirá un correo electrónico de confirmación cuando se complete la revisión.</p><p>Si recibió un correo electrónico que dice que su pedido aún se está procesando, significa que nuestro socio externo está revisando su compra. Todos los pedidos de Pagos se analizan para garantizar que sean legítimos y para protegerlos de posibles fraudes.</p><p>La mayoría de los pedidos se procesan en menos de 72 horas. Recibirá un correo electrónico de confirmación cuando se complete la revisión.</p>`,
            },
          ],
        },
        {
          icon: 'tabler-refresh',
          slug: 'returns-refunds-replacements',
          title: 'Devoluciones, Reembolsos y Reemplazos',
          articles: [
            {
              slug: 'what-can-i-return',
              title: '¿Qué puedo devolver?',
              content:
                `<p>Puede solicitar la devolución de la mayoría de los artículos que compra a los vendedores que figuran en el sitio web. Sin embargo, solo puede devolver artículos identificados explícitamente como "retornables" en la página de detalles del producto y/o en nuestra política y dentro del período de "ventana de devolución".</p> <p> Consulte la política de devoluciones del sitio web. para saber qué categorías son "no retornables" y las ventanas de devolución específicas para las categorías elegibles para devolución.</p><ul><li>Dañado físicamente</li><li>Le faltan piezas o accesorios</li>< li>Defectuoso</li><li>Diferente de su descripción en la página de detalles del producto en el sitio web</li></ul><p>Puede solicitar devoluciones para la mayoría de los artículos que compra a los vendedores que figuran en el sitio web. Sin embargo, solo puede devolver artículos identificados explícitamente como "retornables" en la página de detalles del producto y/o en nuestra política y dentro del período de "ventana de devolución".</p> <p> Consulte la política de devoluciones del sitio web. para saber qué categorías son "no retornables" y las ventanas de devolución específicas para las categorías elegibles para devolución.</p><ul><li>Dañado físicamente</li><li>Le faltan piezas o accesorios</li>< li>Defectuoso</li><li>Diferente de su descripción en la página de detalles del producto en el sitio web</li></ul>`,
            },
            {
              slug: 'when-will-i-get-my-refund',
              title: '¿Cuándo recibiré mi reembolso?',
              content:
                `<p>Los siguientes son los plazos de procesamiento del reembolso después de que Amazon recibe el artículo o el vendedor nos notifica la recepción de la devolución:</p><ul><li><strong>Wallet:</strong> 2 horas </li><li><strong>Tarjeta de crédito/débito:</strong> de 2 a 4 días hábiles</li><li><strong>Cuenta bancaria:</strong> de 2 a 4 días hábiles</li> </ul><p>Los siguientes son los plazos de procesamiento del reembolso después de que Amazon recibe el artículo o el vendedor nos notifica la recepción de la devolución:</p><ul><li><strong>Monedero:</strong > 2 horas</li><li><strong>Tarjeta de crédito/débito:</strong> 2-4 días hábiles</li><li><strong>Cuenta bancaria:</strong> 2-4 días hábiles< /li></ul>`,
            },
            {
              slug: 'can-my-order-be-replaced',
              title: '¿Se puede reemplazar mi pedido?',
              content:
                `<p>Si el artículo que ordenó llegó físicamente dañado/defectuoso o es diferente de su descripción en la página de detalles del producto, o le faltan piezas o accesorios, será elegible para un reemplazo gratuito siempre que el artículo exacto está disponible con el mismo vendedor.</p><p>Si el artículo que ordenó llegó físicamente dañado/defectuoso o es diferente de su descripción en la página de detalles del producto, o le faltan piezas o accesorios, será elegible para un reemplazo gratuito siempre que el artículo exacto esté disponible con el mismo vendedor.</p>`,
            },
          ],
        },
      ],
    },
    {
      icon: 'tabler-users',
      slug: 'safety-security',
      avatarColor: 'primary',
      title: 'Seguridad y proteccion',
      subCategories: [
        {
          slug: 'hacked-accounts',
          icon: 'tabler-shield',
          title: 'Seguridad y cuentas hackeadas',
          articles: [
            {
              slug: 'has-my-account-been-compromised',
              title: '¿Mi cuenta ha sido comprometida?',
              content:
                `<p>¿Has:</p><ul><li>Notaste publicaciones inesperadas de tu cuenta</li><li>Has visto mensajes directos no deseados enviados desde tu cuenta</li><li>Observaste otros comportamientos de la cuenta que no hizo ni aprobó (como seguir, dejar de seguir o bloquear)</li></ul>. <p>Si ha respondido que sí a cualquiera de las preguntas anteriores, cambie su contraseña y revoque las conexiones a aplicaciones de terceros</p><p>¿Ha notado:</p><ul><li>lo inesperado? publicaciones de su cuenta</li><li>Ha visto mensajes directos no deseados enviados desde su cuenta</li><li>Observó otros comportamientos de la cuenta que no hizo ni aprobó (como seguir, dejar de seguir o bloquear)</li ></ul>. <p>Si ha respondido afirmativamente a cualquiera de las preguntas anteriores, cambie su contraseña y revoque las conexiones a aplicaciones de terceros</p>`,
            },
            {
              slug: 'how-to-keep-my-account-safe',
              title: '¿Cómo mantener mi cuenta segura?',
              content:
                `<p>Para ayudar a mantener su cuenta segura, recomendamos las siguientes mejores prácticas:</p><ul><li>Use una contraseña segura que no reutilice en otros sitios web.</li><li> Utilice la autenticación de dos factores.</li><li>Solicitar correo electrónico y número de teléfono para solicitar un enlace o código de restablecimiento de contraseña.</li><li>Tenga cuidado con los enlaces sospechosos y siempre asegúrese de estar en nuestro sitio web antes de ingresar su información de inicio de sesión.</li><li>Nunca proporcione su nombre de usuario y contraseña a terceros, especialmente a aquellos que prometen obtener seguidores, ganar dinero o verificarlo.</li></ul>< p>Para ayudar a mantener su cuenta segura, recomendamos las siguientes mejores prácticas:</p><ul><li>Use una contraseña segura que no reutilice en otros sitios web.</li><li>Use dos -Factor de autenticación.</li><li>Requerir correo electrónico y número de teléfono para solicitar un enlace o código de restablecimiento de contraseña.</li><li>Tenga cuidado con los enlaces sospechosos y siempre asegúrese de estar en nuestro sitio web antes que usted. ingrese su información de inicio de sesión.</li><li>Nunca proporcione su nombre de usuario y contraseña Dirígete a terceros, especialmente a aquellos que prometen conseguirte seguidores, ganar dinero o verificarte.</li></ul>`,
            },
            {
              slug: 'help-with-my-hacked-account',
              title: 'Ayuda con mi cuenta hackeada',
              content:
                `<p>Si cree que ha sido pirateado y no puede iniciar sesión con su nombre de usuario y contraseña, siga estos dos pasos:</p><ol><li><p>Solicite una restablecimiento de contraseña</p> <p>Restablezca su contraseña solicitando un correo electrónico desde el formulario de restablecimiento de contraseña. Intente ingresar tanto su nombre de usuario como su dirección de correo electrónico, y asegúrese de buscar el correo electrónico de restablecimiento en la dirección asociada con su cuenta.</p></li><li><p>Comuníquese con Soporte si aún necesita ayuda</p <p>Si aún no puede iniciar sesión, contáctenos enviando una solicitud de soporte. Asegúrese de usar la dirección de correo electrónico que asoció con la cuenta pirateada; luego enviaremos información e instrucciones adicionales a esa dirección de correo electrónico. Cuando envíe su solicitud de soporte, incluya tanto su nombre de usuario como la fecha en que tuvo acceso por última vez a su cuenta.</p></li></ol><p>Si cree que ha sido pirateado y está no puede iniciar sesión con su nombre de usuario y contraseña, siga los dos pasos siguientes:</p><ol><li><p>Solicite un restablecimiento de contraseña</p> <p>Restablezca su contraseña solicitando un correo electrónico del formulario de restablecimiento de contraseña. Intente ingresar tanto su nombre de usuario como su dirección de correo electrónico, y asegúrese de buscar el correo electrónico de restablecimiento en la dirección asociada con su cuenta.</p></li><li><p>Comuníquese con Soporte si aún necesita ayuda</p <p>Si aún no puede iniciar sesión, contáctenos enviando una solicitud de soporte. Asegúrese de usar la dirección de correo electrónico que asoció con la cuenta pirateada; luego enviaremos información e instrucciones adicionales a esa dirección de correo electrónico. Cuando envíe su solicitud de soporte, incluya su nombre de usuario y la fecha en que tuvo acceso por última vez a su cuenta.</p></li></ol>`,
            },
          ],
        },
        {
          slug: 'privacy',
          title: 'Privacidad',
          icon: 'tabler-lock',
          articles: [
            {
              slug: 'what-is-visible-on-my-profile',
              title: '¿Qué se ve en mi perfil?',
              content:
                `<p>La mayor parte de la información de perfil que nos proporciona siempre es pública, como su biografía, ubicación, sitio web e imagen. Para ciertos campos de información de perfil, le proporcionamos configuraciones de visibilidad para seleccionar quién puede ver esta información en su perfil.</p><p>Si nos proporciona información de perfil y no ve una configuración de visibilidad, esa información es público.</p><p>La mayor parte de la información de perfil que nos proporciona siempre es pública, como su biografía, ubicación, sitio web e imagen. Para ciertos campos de información de perfil, le proporcionamos configuraciones de visibilidad para seleccionar quién puede ver esta información en su perfil.</p><p>Si nos proporciona información de perfil y no ve una configuración de visibilidad, esa información es público.</p>`,
            },
            {
              slug: 'should-i-turn-on-precise-location',
              title: '¿Debo activar la ubicación precisa?',
              content:
                `<p>Habilitar la ubicación precisa a través de nuestra aplicación oficial nos permite recopilar, almacenar y usar su ubicación precisa, como información de GPS. Esto nos permite proporcionar, desarrollar y mejorar una variedad de nuestros servicios, incluidos, entre otros:</p><ul><li>Entrega de contenido, incluidas publicaciones y publicidad, que se adapta mejor a su ubicación.< /li><li>Entrega de tendencias específicas de ubicación.</li><li>Mostrar a sus seguidores la ubicación desde la que está publicando como parte de su publicación, si decide etiquetar geográficamente su publicación.</li>< /ul><p>Habilitar la ubicación precisa a través de nuestra aplicación oficial nos permite recopilar, almacenar y usar su ubicación precisa, como información de GPS. Esto nos permite proporcionar, desarrollar y mejorar una variedad de nuestros servicios, incluidos, entre otros:</p><ul><li>Entrega de contenido, incluidas publicaciones y publicidad, que se adapta mejor a su ubicación.< /li><li>Entrega de tendencias específicas de ubicación.</li><li>Mostrar a sus seguidores la ubicación desde la que está publicando como parte de su publicación, si decide etiquetar geográficamente su publicación.</li>< /ul>`,
            },
            {
              slug: 'what-location-information-is-displayed',
              title: '¿Qué información de ubicación se muestra?',
              content:
                `<ul><li>Toda la información de geolocalización comienza como una ubicación (latitud y longitud), enviada desde su navegador o dispositivo. No mostraremos ninguna información de ubicación a menos que haya optado por la función y haya permitido que su dispositivo o navegador nos transmita sus coordenadas.</li><li>Si ha elegido adjuntar información de ubicación a sus publicaciones, la etiqueta de ubicación seleccionada se muestra debajo del texto de la publicación.</li><li>Cuando usa la cámara integrada en la aplicación en iOS y Android para adjuntar una foto o un video a su publicación y activa la opción para etiquete su ubicación precisa, esa publicación incluirá tanto la etiqueta de ubicación de su elección como la ubicación precisa de su dispositivo (latitud y longitud), que se puede encontrar a través de la API. Su ubicación precisa puede ser más específica que la etiqueta de ubicación que seleccione. Esto es útil cuando se comparten momentos sobre el terreno.</li></ul><ul><li>Toda la información de geolocalización comienza como una ubicación (latitud y longitud), enviada desde su navegador o dispositivo. No mostraremos ninguna información de ubicación a menos que haya optado por la función y haya permitido que su dispositivo o navegador nos transmita sus coordenadas.</li><li>Si ha elegido adjuntar información de ubicación a sus publicaciones, la etiqueta de ubicación seleccionada se muestra debajo del texto de la publicación.</li><li>Cuando usa la cámara integrada en la aplicación en iOS y Android para adjuntar una foto o un video a su publicación y activa la opción para etiquete su ubicación precisa, esa publicación incluirá tanto la etiqueta de ubicación de su elección como la ubicación precisa de su dispositivo (latitud y longitud), que se puede encontrar a través de la API. Su ubicación precisa puede ser más específica que la etiqueta de ubicación que seleccione. Esto es útil cuando se comparten momentos en el terreno.</li></ul>`,
            },
          ],
        },
        {
          slug: 'spam-fake-accounts',
          title: 'Spam y cuentas falsas',
          icon: 'tabler-mail',
          articles: [
            {
              slug: 'how-to-detect-fake-email',
              title: 'How to detect fake email?',
              content: `<p>We will only send you emails from @${themeConfig.app.title}.com or @t.${themeConfig.app.title}.com. However, some people may receive fake or suspicious emails that look like they were sent by US. These emails might include malicious attachments or links to spam or phishing websites. Please know that we will never send emails with attachments or request your password by email.</p><p>We will only send you emails from @${themeConfig.app.title}.com or @t.${themeConfig.app.title}.com. However, some people may receive fake or suspicious emails that look like they were sent by US. These emails might include malicious attachments or links to spam or phishing websites. Please know that we will never send emails with attachments or request your password by email.</p>`,
            },
            {
              slug: 'how-do-I-report-an-impersonation-violation',
              title: '¿Cómo denuncio una infracción de suplantación de identidad?',
              content:
                `<p>Si cree que una cuenta se hace pasar por usted o su marca, usted o su representante autorizado pueden presentar un informe en nuestro Centro de soporte.</p><p>Si cree que una cuenta está haciendo un uso indebido de la identidad de otra persona , puede marcarlo como un espectador informando directamente desde el perfil de la cuenta.</p><p>Si cree que una cuenta se hace pasar por usted o su marca, usted o su representante autorizado pueden presentar un informe en nuestro Centro de soporte.</p><p>Si cree que una cuenta está haciendo un uso indebido de la identidad de otra persona, puede marcarla como espectador informando directamente desde el perfil de la cuenta.</p>`,
            },
            {
              slug: 'someone-is-using-my-email-address-what-can-i-do',
              title: 'Alguien está usando mi dirección de correo electrónico, ¿qué puedo hacer?',
              content:
                `<p>¿Está tratando de crear una nueva cuenta, pero le dicen que su dirección de correo electrónico o número de teléfono ya están en uso? Este artículo de soporte describe cómo es posible que su dirección de correo electrónico ya esté en uso y cómo resolver el problema.</p><p>¿Está tratando de crear una nueva cuenta, pero le dicen que su dirección de correo electrónico o número de teléfono ya está ¿en uso? Este artículo de soporte describe cómo es posible que su dirección de correo electrónico ya esté en uso y cómo resolver el problema.</p>`,
            },
          ],
        },
      ],
    },
    {
      avatarColor: 'error',
      icon: 'tabler-clipboard',
      slug: 'rules-policies',
      title: 'Reglas y Políticas',
      subCategories: [
        {
          slug: 'general',
          title: 'General',
          icon: 'tabler-globe',
          articles: [
            {
              slug: 'our-rules',
              title: 'Nuestras reglas',
              content:
                `<p>Nuestro propósito es servir a la conversación pública. La violencia, el acoso y otros tipos de comportamiento similares desalientan a las personas a expresarse y, en última instancia, disminuyen el valor de la conversación pública global. Nuestras reglas son para garantizar que todas las personas puedan participar en la conversación pública de forma libre y segura.</p><p>Nuestro propósito es servir a la conversación pública. La violencia, el acoso y otros tipos de comportamiento similares desalientan a las personas a expresarse y, en última instancia, disminuyen el valor de la conversación pública global. Nuestras reglas son para garantizar que todas las personas puedan participar en la conversación pública de forma libre y segura.</p>`,
            },
            {
              slug: 'what-is-username-squatting-policy',
              title: '¿Qué es la política de usurpación de nombres de usuario?',
              content:
                `<p>La usurpación de nombres de usuario está prohibida por las Reglas.</p><p>Tenga en cuenta que si una cuenta no ha tenido actualizaciones, ni imagen de perfil, y no hay intención de engañar, generalmente significa que no hay usurpación de nombres o suplantación de identidad. Tenga en cuenta que no publicaremos nombres de usuario usurpados excepto en casos de infracción de marca registrada. Si su informe implica una infracción de marca registrada, consulte esas políticas para obtener instrucciones para informar estas cuentas.</p><p>Los intentos de vender, comprar o solicitar otras formas de pago a cambio de nombres de usuario también son infracciones y pueden resultar en la cuenta permanente. suspensión.</p><p>La usurpación de nombre de usuario está prohibida por las Reglas.</p><p>Tenga en cuenta que si una cuenta no ha tenido actualizaciones, ni imagen de perfil, y no hay intención de engañar, generalmente significa no hay usurpación de nombres ni suplantación de identidad. Tenga en cuenta que no publicaremos nombres de usuario usurpados excepto en casos de infracción de marca registrada. Si su informe implica una infracción de marca registrada, consulte esas políticas para obtener instrucciones para informar estas cuentas.</p><p>Los intentos de vender, comprar o solicitar otras formas de pago a cambio de nombres de usuario también son infracciones y pueden resultar en la cuenta permanente. suspensión.</p>`,
            },
            {
              slug: 'third-party-advertising-in-video-content',
              title: 'Publicidad de terceros en contenido de video',
              content:
                `<p>No puede enviar, publicar ni mostrar ningún contenido de video en o a través de nuestros servicios que incluya publicidad de terceros, como anuncios de video pre-roll o gráficos de patrocinio, sin nuestro consentimiento previo.</p><p ><strong>Nota:</strong> es posible que debamos cambiar estas reglas de vez en cuando para apoyar nuestro objetivo de promover una conversación pública saludable</p><p>No puede enviar, publicar ni mostrar ningún contenido de video en o a través de nuestros servicios que incluye publicidad de terceros, como anuncios de video pre-roll o gráficos de patrocinio, sin nuestro consentimiento previo.</p><p><strong>Nota:</strong> es posible que debamos cambiar estas reglas de vez en cuando para apoyar nuestro objetivo de promover una conversación pública saludable</p>`,
            },
          ],
        },
        {
          icon: 'tabler-registered',
          slug: 'intellectual-property',
          title: 'Propiedad intelectual',
          articles: [
            {
              slug: 'what-is-your-trademark-policy',
              title: '¿Cuál es su política de marcas?',
              content:
                `<p><strong>No puede violar los derechos de propiedad intelectual de otros, incluidos los derechos de autor y las marcas registradas.</strong></p><p>Una marca registrada es una palabra, logotipo, frase o dispositivo que distingue una marca registrada bien o servicio del titular en el mercado. La ley de marcas registradas puede impedir que otros usen una marca registrada de una manera no autorizada o confusa.</p><p><strong>Usted no puede violar los derechos de propiedad intelectual de otros, incluidos los derechos de autor y las marcas registradas.</strong></p> <p>Una marca comercial es una palabra, logotipo, frase o dispositivo que distingue el bien o servicio del titular de la marca comercial en el mercado. La ley de marcas comerciales puede impedir que otros usen una marca comercial de manera no autorizada o confusa.</p>`,
            },
            {
              slug: 'what-are-counterfeit-goods',
              title: '¿Qué son los productos falsificados?',
              content:
                `<p>Los productos falsificados son productos, incluidos los productos digitales, que se promocionan, venden o distribuyen de otro modo usando una marca comercial o una marca que es idéntica o sustancialmente indistinguible de la marca registrada o marca de otro, sin la autorización de la marca comercial. o propietario de la marca. Los productos falsificados intentan engañar a los consumidores haciéndoles creer que el producto falsificado es un producto genuino del propietario de la marca, o presentarse a sí mismos como falsos, réplicas o imitaciones del producto genuino.</p><p>Los productos falsificados son bienes, incluidos los productos digitales, que se promocionan, venden o distribuyen de otro modo usando una marca comercial o marca que es idéntica o sustancialmente indistinguible de la marca registrada o marca de otro, sin la autorización de la marca comercial o del propietario de la marca. Los productos falsificados intentan engañar a los consumidores haciéndoles creer que la falsificación es un producto genuino del propietario de la marca, o presentarse a sí mismos como falsos, réplicas o imitaciones del producto genuino.</p>`,
            },
            {
              slug: 'what-types-of-copyright-complaints-do-you-respond-to',
              title: '¿A qué tipos de quejas de derechos de autor respondes?',
              content:
                `<p>Respondemos a las quejas de derechos de autor presentadas en virtud de la Ley de derechos de autor del milenio digital ("DMCA"). La Sección 512 de la DMCA describe los requisitos legales necesarios para denunciar formalmente la infracción de derechos de autor, además de proporcionar instrucciones sobre cómo una parte afectada puede apelar una eliminación mediante la presentación de una contranotificación conforme.</p><p>Si le preocupa el uso de su marca o nombre de la entidad, por favor revise nuestra política de marcas registradas. Si le preocupa una parodia, un suministro de noticias, un comentario o una cuenta de admirador, consulte la política correspondiente aquí. Estos generalmente no son problemas de derechos de autor.</p><p>Respondemos a las quejas de derechos de autor presentadas bajo la Ley de derechos de autor del milenio digital ("DMCA"). La Sección 512 de la DMCA describe los requisitos legales necesarios para denunciar formalmente la infracción de derechos de autor, además de proporcionar instrucciones sobre cómo una parte afectada puede apelar una eliminación mediante la presentación de una contranotificación conforme.</p><p>Si le preocupa el uso de su marca o nombre de la entidad, por favor revise nuestra política de marcas registradas. Si le preocupa una parodia, un suministro de noticias, un comentario o una cuenta de admirador, consulte la política correspondiente aquí. Por lo general, estos no son problemas de derechos de autor.</p>`,
            },
          ],
        },
        {
          icon: 'tabler-clipboard',
          slug: 'guidelines-for-law-enforcement',
          title: 'Directrices para la aplicación de la ley',
          articles: [
            {
              slug: 'does-we-have-access-to-user-generated-photos-or-videos',
              title: '¿Tenemos acceso a fotos o videos generados por los usuarios?',
              content: `<p>We provide photo hosting for some image uploads (i.e., pic.${themeConfig.app.title}.com images) as well as account profile photos, and header photos. However, We are not the sole photo provider for images that may appear on the platform. More information about posting photos on platform.</p><p>We provide photo hosting for some image uploads (i.e., pic.${themeConfig.app.title}.com images) as well as account profile photos, and header photos. However, We are not the sole photo provider for images that may appear on the platform. More information about posting photos on platform.</p>`,
            },
            {
              slug: 'data-controller',
              title: 'Controlador de datos',
              content:
                `<p>For people who live in the United States or any other country outside of the European Union or the European Economic Area, the data controller responsible for personal data, Inc. based in San Francisco, California. For people who live in the European Union or the European Economic Area, the data controller is our International Unlimited Company based in Dublin, Ireland.</p><p>For people who live in the United States or any other country outside of the European Union or the European Economic Area, the data controller responsible for personal data, Inc. based in San Francisco, California. For people who live in the European Union or the European Economic Area, the data controller is our International Unlimited Company based in Dublin, Ireland.</p>`,
            },
            {
              slug: 'requests-for-Twitter-account-information',
              title: 'Solicitudes de información de la cuenta de Twitter',
              content:
                `<p>Las solicitudes de información de cuenta de usuario de las fuerzas del orden deben dirigirse a us, Inc. en San Francisco, California oa Twitter International Unlimited Company en Dublin, Irlanda. Respondemos a procesos legales válidos emitidos de conformidad con la ley aplicable.</p><p>Las solicitudes de información de cuenta de usuario de las fuerzas del orden deben dirigirse a nosotros, Inc. en San Francisco, California o Twitter International Unlimited Company en Dublín, Irlanda . Respondemos a un proceso legal válido emitido de conformidad con la ley aplicable.</p>`,
            },
          ],
        },
      ],
    },
    {
      slug: 'chats',
      title: 'Chats',
      avatarColor: 'warning',
      icon: 'tabler-message',
      subCategories: [
        {
          slug: 'general',
          title: 'General',
          icon: 'tabler-globe',
          articles: [
            {
              slug: 'what-is-forwarding-limits',
              title: '¿Qué es el límite de reenvío?',
              content:
                `<p>Puede reenviar un mensaje con hasta cinco chats a la vez. Si un mensaje ya ha sido reenviado, puede reenviarlo hasta cinco chats, incluido un máximo de un grupo.</p><p>Sin embargo, cuando un mensaje se reenvía a través de una cadena de cinco o más chats, significa que \ está al menos a cinco reenvíos de su remitente original, se mostrará un icono de flecha doble y la etiqueta "Reenviado muchas veces". Estos mensajes solo se pueden reenviar a un chat a la vez, como una forma de ayudar a mantener las conversaciones en la plataforma íntimas y personales. Esto también ayuda a ralentizar la propagación de rumores, mensajes virales y noticias falsas.</p><p>Puedes reenviar un mensaje con hasta cinco chats a la vez. Si un mensaje ya ha sido reenviado, puede reenviarlo hasta cinco chats, incluido un máximo de un grupo.</p><p>Sin embargo, cuando un mensaje se reenvía a través de una cadena de cinco o más chats, significa que \ está al menos a cinco reenvíos de su remitente original, se mostrará un icono de flecha doble y la etiqueta "Reenviado muchas veces". Estos mensajes solo se pueden reenviar a un chat a la vez, como una forma de ayudar a mantener las conversaciones en la plataforma íntimas y personales. Esto también ayuda a frenar la propagación de rumores, mensajes virales y noticias falsas.</p>`,
            },
            {
              slug: 'what-is-last-seen-and-online',
              title: '¿Qué es lo último visto y en línea?',
              content:
                `<p>Visto por última vez y en línea le indica la última vez que sus contactos usaron la aplicación, o si están en línea.</p><p>Si un contacto está en línea, tiene la aplicación abierta en primer plano en su dispositivo y están conectados a Internet. Sin embargo, no significa necesariamente que el contacto haya leído su mensaje.</p><p>Último visto y en línea le indica la última vez que sus contactos usaron la aplicación, o si están en línea.</p> <p>Si un contacto está en línea, tiene la aplicación abierta en primer plano en su dispositivo y está conectado a Internet. Sin embargo, no significa necesariamente que el contacto haya leído su mensaje.</p>`,
            },
            {
              slug: 'how-to-reply-to-a-message',
              title: '¿Cómo responder a un mensaje?',
              content:
                `<p>Puedes usar la función de respuesta cuando respondas a un mensaje específico en un chat individual o grupal.</p><p>Toca y mantén presionado el mensaje, luego toca Responder. Ingrese su respuesta y toque Enviar. Alternativamente, desliza el dedo hacia la derecha en el mensaje para responder.</p><p>Puedes usar la función de respuesta cuando respondas a un mensaje específico en un chat individual o grupal.</p><p>Toca y mantén presionado el mensaje, luego toca Responder. Ingrese su respuesta y toque Enviar. Alternativamente, desliza el dedo hacia la derecha en el mensaje para responder.</p>`,
            },
          ],
        },
        {
          slug: 'features',
          title: 'Características',
          icon: 'mdi:star-circle-outline',
          articles: [
            {
              slug: 'how-to-send-disappearing-messages',
              title: '¿Cómo enviar mensajes que desaparecen?',
              content:
                `<p>La desaparición de mensajes es una función opcional que puede activar para obtener más privacidad.</p><p>Cuando habilita la desaparición de mensajes, puede configurar los mensajes para que desaparezcan 24 horas, 7 días o 90 días después del momento en que se envían. La selección más reciente solo controla los mensajes nuevos en el chat. Puede optar por activar los mensajes que desaparecen para todos sus chats o seleccionar chats específicos. Esta configuración no afectará los mensajes que hayas enviado o recibido anteriormente en el chat. En un chat individual, cualquiera de los usuarios puede activar o desactivar los mensajes que desaparecen. En un chat grupal, cualquier participante del grupo puede activar o desactivar los mensajes que desaparecen. Sin embargo, un administrador de grupo puede cambiar la configuración del grupo para permitir que solo los administradores activen o desactiven la desaparición de mensajes.</p><p>La desaparición de mensajes es una función opcional que puede activar para obtener más privacidad.</p><p>Cuando habilita la desaparición de mensajes, puede configurar los mensajes para que desaparezcan 24 horas, 7 días o 90 días después de la hora en que se envían. La selección más reciente solo controla los mensajes nuevos en el chat. Puede optar por activar los mensajes que desaparecen para todos sus chats o seleccionar chats específicos. Esta configuración no afectará los mensajes que hayas enviado o recibido anteriormente en el chat. En un chat individual, cualquiera de los usuarios puede activar o desactivar los mensajes que desaparecen. En un chat grupal, cualquier participante del grupo puede activar o desactivar los mensajes que desaparecen. Sin embargo, un administrador de grupo puede cambiar la configuración del grupo para permitir que solo los administradores activen o desactiven los mensajes que desaparecen.</p>`,
            },
            {
              slug: 'can-i-send-view-once-messages',
              title: '¿Puedo enviar mensajes de vista única?',
              content:
                `<p>Para mayor privacidad, ahora puede enviar fotos y videos que desaparecen de su chat después de que el destinatario los haya abierto una vez. Para usar la vista una vez, actualice la aplicación a la última versión disponible para su dispositivo.</p><p>Para mayor privacidad, ahora puede enviar fotos y videos que desaparecen de su chat después de que el destinatario los haya abierto una vez. Para usar la vista una vez, actualice la aplicación a la última versión disponible para su dispositivo.</p>`,
            },
            {
              slug: 'how-to-pin-a-chat',
              title: '¿Cómo fijar un chat?',
              content:
                `<p>La función de pin de chat te permite fijar hasta tres chats específicos en la parte superior de tu lista de chats para que puedas encontrarlos rápidamente.</p><p>En <strong>iPhone</strong>: desliza el dedo hacia la derecha en el chat que desea fijar, luego toque Fijar.</p><p>En <strong>Android</strong>: Mantenga presionado el chat que desea fijar, luego toque Fijar chat</p><p> La función de pin de chat te permite fijar hasta tres chats específicos en la parte superior de tu lista de chats para que puedas encontrarlos rápidamente.</p><p>En <strong>iPhone</strong>: desliza el dedo hacia la derecha en el chat que deseas. desea anclar, luego toque Anclar.</p><p>En <strong>Android</strong>: Mantenga presionado el chat que desea anclar, luego toque Anclar chat</p>`,
            },
          ],
        },
        {
          slug: 'encryption',
          title: 'Cifrada',
          icon: 'tabler-lock',
          articles: [
            {
              slug: 'what-is-end-to-end-encrypted-backup',
              title: '¿Qué es la copia de seguridad cifrada de extremo a extremo?',
              content:
                `<p>El cifrado de extremo a extremo garantiza que solo usted y la persona con la que se está comunicando puedan leer o escuchar lo que se envía, y nadie en el medio, ni siquiera nosotros. Con la copia de seguridad cifrada de extremo a extremo, también puede agregar esa misma capa de protección a su copia de seguridad en iCloud o Google Drive.</p><p>La encriptación de extremo a extremo garantiza que solo usted y la persona que está comunicarse con puede leer o escuchar lo que se envía, y nadie en el medio, ni siquiera nosotros. Con la copia de seguridad cifrada de extremo a extremo, también puede agregar esa misma capa de protección a su copia de seguridad en iCloud o Google Drive.</p>`,
            },
            {
              slug: 'can-i-change-password-for-end-to-end-encrypted-backup',
              title: '¿Puedo cambiar la contraseña para la copia de seguridad cifrada de extremo a extremo?',
              content:
                `<p>Cuando crea una copia de seguridad encriptada de extremo a extremo, sus mensajes y medios se almacenan en la nube y están protegidos por una contraseña o una clave de encriptación de 64 dígitos. Su contraseña se puede cambiar en cualquier momento siempre que tenga acceso a su contraseña o clave anterior.</p><p><strong>Nota:</strong> No podrá restaurar su copia de seguridad si perder sus chats y olvidar su contraseña o clave. No podemos restablecer su contraseña ni restaurar su copia de seguridad por usted.</p><p>Cuando crea una copia de seguridad cifrada de extremo a extremo, sus mensajes y medios se almacenan en la nube y están protegidos por una contraseña o un Clave de cifrado de 64 dígitos. Su contraseña se puede cambiar en cualquier momento siempre que tenga acceso a su contraseña o clave anterior.</p><p><strong>Nota:</strong> No podrá restaurar su copia de seguridad si perder sus chats y olvidar su contraseña o clave. No podemos restablecer su contraseña o restaurar su copia de seguridad por usted.</p>`,
            },
            {
              slug: 'can-i-turnoff-end-to-end-encrypted-backup',
              title: '¿Puedo desactivar la copia de seguridad cifrada de extremo a extremo?',
              content:
                `<p>Puede optar por desactivar la copia de seguridad cifrada de extremo a extremo utilizando su contraseña o clave, o autenticándose con sus datos biométricos o el PIN del dispositivo. Si desactiva la copia de seguridad cifrada de extremo a extremo, sus mensajes y medios ya no se copiarán en la nube a menos que los configure para hacerlo.</p><p>Puede optar por desactivar la copia de seguridad de extremo a extremo finalice la copia de seguridad encriptada usando su contraseña o clave, o autenticándose con su biometría o PIN del dispositivo. Si desactiva la copia de seguridad cifrada de extremo a extremo, sus mensajes y medios ya no se copiarán en la nube a menos que los configure para hacerlo.</p>`,
            },
          ],
        },
      ],
    },
    {
      slug: 'connections',
      title: 'Conexiones',
      avatarColor: 'secondary',
      icon: 'tabler-link',
      subCategories: [
        {
          slug: 'conversations',
          title: 'Conversaciones',
          icon: 'tabler-message',
          articles: [
            {
              slug: 'how-to-send-messages-to-connections',
              title: '¿Cómo enviar mensajes a los contactos?',
              content:
                `<p>Puede enviar un mensaje a sus conexiones directamente desde la página de mensajes o la página de conexiones.</p><p>El mensaje enviado será visible en la lista de mensajes del destinatario y posiblemente en su correo electrónico, dependiendo de la configuración de notificación de su aplicación.</p><p>Puede enviar un mensaje a sus conexiones directamente desde la página de mensajes o la página de conexiones.</p><p>El mensaje enviado será visible en la lista de mensajes del destinatario y posiblemente en su correo electrónico, según la configuración de notificación de su aplicación.</p>`,
            },
            {
              slug: 'how-to-edit-or-delete-a-sent-message-within-a-conversation',
              title: '¿Cómo editar o eliminar un mensaje enviado dentro de una conversación?',
              content:
                `<p>Puedes editar o eliminar un mensaje de solo texto que envíes en la aplicación.</p><p><strong>Nota:</strong>Solo puedes editar o eliminar un mensaje dentro de los 60 minutos de haberlo enviado. </p><p>Puede editar o eliminar un mensaje de solo texto que envíe en la aplicación.</p><p><strong>Nota:</strong>Solo puede editar o eliminar un mensaje dentro de los 60 minutos posteriores al envío el mensaje.</p>`,
            },
            {
              slug: 'how-to-delete-a-message',
              title: '¿Cómo borrar un mensaje?',
              content:
                `<p>Un hilo de conversación comienza cuando se envía un mensaje a una o más personas a través de la mensajería de la aplicación. Puedes eliminar hilos de conversación de forma individual o masiva.</p><p><strong>Importante:</strong>No puedes restaurar ni acceder a los mensajes eliminados. <strong>El hilo de conversación solo se eliminará de su bandeja de entrada y no de la del destinatario.</strong></p><p>Un hilo de conversación comienza cuando se envía un mensaje a una o más personas a través de la aplicación de mensajería . Puedes eliminar hilos de conversación de forma individual o masiva.</p><p><strong>Importante:</strong>No puedes restaurar ni acceder a los mensajes eliminados. <strong>El hilo de conversación solo se eliminará de su bandeja de entrada y no de la del destinatario.</strong></p>`,
            },
          ],
        },
        {
          slug: 'jobs',
          title: 'Jobs',
          icon: 'tabler-briefcase',
          articles: [
            {
              slug: 'find-relevant-jobs-through-social-hiring-and-meeting-the-team',
              title: '¿Encontrar trabajos relevantes a través de la contratación social y conocer al equipo?',
              content:
                `<p>Hemos introducido dos funciones que ayudarán tanto a los buscadores de empleo como a los contratantes a participar plenamente con el poder de su plataforma.</p> <ul><li>La función de contratación #social notificará a los miembros cuando un primer o segundo La conexión de grado es contratar para un trabajo relevante. Cuando una conexión de red publica un trabajo relevante en la aplicación o agrega un marco de #contratación a su foto de perfil, la aplicación notificará al solicitante de empleo. A partir de ahí, los buscadores de empleo podrán ver los trabajos abiertos para los que las personas de su red están contratando.</li><li>Cuando un miembro hace clic en la página de detalles del trabajo, verá el mensaje "Conozca al equipo de contratación". " rasgo. Los miembros podrán conectarse y enviar mensajes a todo el equipo enumerado en esta sección, incluido el cartel de trabajo.</li></ul><p>Estas características permitirán a los miembros encontrar trabajos a través de sus conexiones y destacarse ante el equipo de contratación . Como resultado, el equipo de contratación también podrá llegar a más candidatos potenciales a través de su red.</p><p>Hemos introducido dos funciones que ayudarán tanto a los buscadores de empleo como a los contratadores a participar plenamente con el poder de su plataforma.< /p> <ul><li>La función de contratación #social notificará a los miembros cuando una conexión de primer o segundo grado esté contratando para un trabajo relevante. Cuando una conexión de red publica un trabajo relevante en la aplicación o agrega un marco de #contratación a su foto de perfil, la aplicación notificará al solicitante de empleo. A partir de ahí, los buscadores de empleo podrán ver los trabajos abiertos para los que las personas de su red están contratando.</li><li>Cuando un miembro hace clic en la página de detalles del trabajo, verá el mensaje "Conozca al equipo de contratación". " rasgo. Los miembros podrán conectarse y enviar mensajes a todo el equipo enumerado en esta sección, incluido el cartel de trabajo.</li></ul><p>Estas características permitirán a los miembros encontrar trabajos a través de sus conexiones y destacarse ante el equipo de contratación . Como resultado, el equipo de contratación también podrá llegar a más candidatos potenciales a través de su red.</p>`,
            },
            {
              slug: 'how-does-the-app-determine-when-a-job-is-relevant',
              title: '¿Cómo determina la aplicación cuándo un trabajo es relevante?',
              content:
                `<p>Notificaremos a los solicitantes de empleo cuando alguien en su red esté contratando para un trabajo que coincida con su título de trabajo actual o la industria enumerada en su perfil o abierto a las preferencias laborales.</p><p>Notificaremos a los solicitantes de empleo cuando alguien en su red está contratando para un trabajo que coincide con su título de trabajo actual o la industria que figura en su perfil o está abierto a las preferencias laborales.</p>`,
            },
            {
              slug: 'how-can-job-seekers-receive-these-notifications',
              title: '¿Cómo pueden los solicitantes de empleo recibir estas notificaciones?',
              content:
                `<p>Los miembros recibirán notificaciones automáticamente sin tener que suscribirse. Para desactivar la notificación, haga clic en los tres puntos junto a la notificación y seleccione Desactivar.</p><p>Los miembros recibirán notificaciones automáticamente sin tener que suscribirse en. Para desactivar la notificación, haga clic en los tres puntos junto a la notificación y seleccione Desactivar.</p>`,
            },
          ],
        },
        {
          slug: 'people',
          title: 'Personas',
          icon: 'tabler-users',
          articles: [
            {
              slug: 'how-to-import-and-invite-your-email-contacts',
              title: '¿Cómo importar e invitar a tus contactos de correo electrónico?',
              content:
                `<p>Puede construir su red importando una lista de sus contactos que ya conoce en la aplicación. Esto ejecutará una carga única de los contactos de su libreta de direcciones, así como su información de contacto detallada. Periódicamente importamos y almacenamos detalles sobre los contactos de su libreta de direcciones para sugerir contactos relevantes con los que conectarse, para mostrarle actualizaciones relevantes y para otros usos explicados en nuestra Política de privacidad. Nunca enviaremos correos electrónicos a nadie sin su permiso.</p><p>Puede construir su red importando una lista de sus contactos que ya conoce en la aplicación. Esto ejecutará una carga única de los contactos de su libreta de direcciones, así como su información de contacto detallada. Periódicamente importamos y almacenamos detalles sobre los contactos de su libreta de direcciones para sugerir contactos relevantes con los que conectarse, para mostrarle actualizaciones relevantes y para otros usos explicados en nuestra Política de privacidad. Nunca enviaremos correos electrónicos a nadie sin su permiso.</p>`,
            },
            {
              slug: 'various-ways-to-connect-with-people',
              title: '¿Diversas formas de conectar con la gente?',
              content:
                `<p>Construir su red es una excelente manera de mantenerse en contacto con ex alumnos, colegas y reclutadores, así como conectarse con nuevas oportunidades profesionales. Una dirección de correo electrónico principal es obligatoria para enviar invitaciones. Los miembros se convierten en conexiones de primer grado cuando aceptan su invitación.</p><p>Las conexiones de primer grado tienen acceso a cualquier información que haya mostrado en su perfil. Para garantizar una experiencia óptima en el sitio, los miembros pueden tener un máximo de 30 000 conexiones de primer grado.</p><p>Construir su red es una excelente manera de mantenerse en contacto con ex alumnos, colegas y reclutadores, así como conectarse con nuevas oportunidades profesionales. Una dirección de correo electrónico principal es obligatoria para enviar invitaciones. Los miembros se convierten en conexiones de primer grado cuando aceptan su invitación.</p><p>Las conexiones de primer grado tienen acceso a cualquier información que haya mostrado en su perfil. Para garantizar una experiencia óptima en el sitio, los miembros pueden tener un máximo de 30 000 conexiones de primer grado.</p>`,
            },
            {
              slug: 'how-to-follow-or-unfollow-people',
              title: '¿Cómo seguir o dejar de seguir a las personas?',
              content:
                `<p>Cuando sigues a alguien, el nuevo contenido publicado o compartido por la persona se mostrará en tu feed. Si ya no desea ver el contenido de alguien en su feed, siempre puede dejar de seguir a esta persona.</p><p>Puede encontrar personas para seguir desde su feed, la pestaña Notificaciones, la página Mi red o desde la Barra de búsqueda en la parte superior de la página.</p><p>Dejar de seguir a una persona ocultará todas sus actualizaciones en tu feed. Si está conectado con una persona y elige dejar de seguirla, permanecerá conectado, pero no verá sus actualizaciones. No se les notificará que los has dejado de seguir. Los miembros recibirán una notificación si comienzas a seguirlos nuevamente.</p><p>Cuando sigues a alguien, el nuevo contenido publicado o compartido por la persona se mostrará en tu feed. Si ya no desea ver el contenido de alguien en su feed, siempre puede dejar de seguir a esta persona.</p><p>Puede encontrar personas para seguir desde su feed, la pestaña Notificaciones, la página Mi red o desde la Barra de búsqueda en la parte superior de la página.</p><p>Dejar de seguir a una persona ocultará todas sus actualizaciones en tu feed. Si está conectado con una persona y elige dejar de seguirla, permanecerá conectado, pero no verá sus actualizaciones. No se les notificará que los has dejado de seguir. Los miembros recibirán una notificación si comienzas a seguirlos nuevamente.</p>`,
            },
          ],
        },
      ],
    },
  ],
  keepLearning: [
    {
      slug: 'blogging',
      title: 'Bloguear',
      img: laptop,
      subtitle: 'Consejos y herramientas de expertos para mejorar su sitio web o tienda en línea usando un blog.',
    },
    {
      slug: 'inspiration-center',
      title: 'Centro de inspiración',
      img: lightbulb,
      subtitle: 'Inspiración de expertos para ayudarlo a comenzar y hacer crecer sus grandes ideas.',
    },
    {
      slug: 'community',
      title: 'Comunidad',
      img: discord,
      subtitle: 'Un grupo de personas que viven en el mismo lugar o que tienen un particular.',
    },
  ],
}

mock.onGet('/pages/help-center/landing').reply(() => {
  const allArticles: HelpCenterSubcategoryArticlesType[] = []

  data.categories.map(category =>
    category.subCategories.map(subCategory => subCategory.articles.map(article => allArticles.push(article))),
  )

  return [
    200,
    { allArticles, categories: data.categories, popularArticles: data.popularArticles, keepLearning: data.keepLearning },
  ]
})

mock.onGet('/pages/help-center/subcategory').reply(config => {
  const { category, subcategory } = config.params
  const filteredData = data.categories.filter(item => item.slug === category)

  return [
    200,
    {
      data: filteredData[0],
      categories: data.categories,
      activeTab: subcategory || filteredData[0].subCategories[0].slug,
    },
  ]
})

mock.onGet('/pages/help-center/article').reply(config => {
  const { article, category, subcategory } = config.params

  const activeCategory = data.categories.filter(item => item.slug === category)[0]

  const activeSubcategory
    = activeCategory.subCategories.filter(item => item.slug === subcategory)[0] || activeCategory.subCategories[0]

  const activeArticle = activeSubcategory.articles.filter(item => item.slug === article)[0]

  return [200, { activeArticle, activeSubcategory, categories: data.categories, articles: activeSubcategory.articles }]
})
