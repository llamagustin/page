export const markdownEcommerce = `
# Manual de usuario


## Aythen Shop PickBazar es una plantilla de comercio electrónico rápido para su próximo negocio. La plantilla creada con React, NextJS, TypeScript, GraphQL, REST API, NestJS y Tailwind CSS.

_La pestaña de tipo de producto muestra los productos según las condiciones de filtrado. Se puede filtrar por categoría y tipo de producto._

_1._ _Seleccione el producto que desee haciendo clic en el botón "add to shopping cart". En la casilla "cantidad", introduzca la cantidad del producto del mismo nombre que desea adquirir. (Imagen 00)_

_2._ _Cuando haga clic en el botón "Сheckout", será redirigido a la página de autorización. (Imagen 01)_

_3._ _Si ya está registrado, debe ingresar "nombre de usuario" y "contraseña". Si es esta la primera vez en el sitio, debe ingresar los datos indicados en el cuestionario, marcar la casilla "Estoy de acuerdo con estas condiciones" y hacer clic en el botón "registro". Después de eso, se enviará un correo electrónico a su cuenta de correo con su "nombre de usuario" y "contraseña", que le será útil para la autorización en la tienda online. (Imagen 02)_

_4._ _Debe iniciar sesión en el sitio utilizando el "nombre de usuario" y la "contraseña" que le ha llegado a su cuenta de correo._

_5._ _A continuación, debe verificar el número de teléfono, confirmar la dirección de entrega o ingresar una nueva dirección y elija el día de entrega._

_6._ _Luego haga clic en "Check Availability" para realizar el pedido y el pago._

_7._ _En la casilla "choose payment method" debe seleccionar un método de pago._

_8._ _Haga clic en el botón "Place order"._

_9.  En la casilla "My Cards" debe seleccionar una tarjeta bancaria vinculada. Si es necesario, es posible agregar una nueva tarjeta bancaria. Para ello, haga clic en el icono. (Imagen 03)_

_10._ _Después de pagar el pedido, puede ver información detallada sobre el estado del pedido. (Imagen 04)_

_11._ _En caso de cualquier dificultad, puede comunicarse con el "Consultor en línea" o completar el formulario "¿Questions, Comments, Or Concerns?"_
 
# Manual de administrador

##  **_Esta guía está destinada a los administradores de la tienda en línea Aythen "Shop PickBazar" que trabajan con el sitio ya instalado en el alojamiento y tienen experiencia en la administración del sitio web._**

_Al ingresar la dirección de su sitio_ [_https://pickbazar-react-admin-rest.vercel.app_](https://pickbazar-react-admin-rest.vercel.app/) _en la barra de direcciones, ingresa a la página de autorización, luego de introducir su nombre de usuario y contraseña, ingresa al panel de control._

_El panel de control es la primera página que ve cuando ingresa a la cuenta personal del administrador del sitio._
_El panel de control ubicado a la izquierda contiene 22 pestañas (Imagen 0) que le permiten navegar rápidamente a las funciones de uso frecuente del centro de administración._

## **_Página "Dashboard_**

_Le permite ver la información sobre Los ingresos totales (últimos 30 días); Orden total (últimos 30 días); Ingresos de hoy $; Tiendas totales.(Tabla 1)_

**_Tabla 1. Los ingresos_**
|Los ingresos totales (últimos 30 días) |Orden total (últimos 30 días)|Ingresos de hoy $| Tiendas totales |
| ------------- |:-------------:|:-------------:|:-------------:|
| $0.00  |0    |$0.00 |10

_También puede ver y analizar el historial de ventas mensuales en un diagrama presentado como un gráfico de barras (Imagen 2)_

_Bajo el gráfico de ventas hay varios bloques (Tabla 2) de información como: órdenes recientes, retiros recientes, productos populares._

**_Tabla 2._ _El bloque de órdenes recientes_**
|Los ingresos totales (últimos 30 días) |
| ------------- |
|Tracking Number  |
| Total $  |
| Fecha de orden  |
| Estado |

_El bloque" Recent Withdrawals" (Imagen 4) le permite ver retiros recientes. (Tabla 3)_

**_Tabla 3._ _Recent Withdrawals_**
|Retiros recientes |
| ------------- |
|Tienda  |
|Nombre |
|Cantidad |
| Estado |
| Creado |
| Acciones |


_El bloque "Popular products" (Imagen 5) le permite ver la demanda de productos. Contiene la siguiente información: ID, Name, Group, Shop, Price/Unit, Quantity (Tabla 4)_


**_Tabla 4. Productos Populares_**
|ID |Nombre|Grupo| Tienda |Precio Unitario |Cantidad|
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| 1  |Apples  |Grocery |Grosery Shop |$2.00 |18

## **_Página "Shops"_**

_Presenta una lista de tiendas._
_También hay una barra de búsqueda para buscar una tienda por nombre (Imagen 7) (Tabla 5)_

**_Tabla 5. Shops_**
|Logo |Nombre del dueño|Producto| Pedidos |Estado|Actions|
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| -  |Furniture Shop |Store Owner|8|Activo|-

_Si necesita realizar cambios en la descripción o características de la tienda, debe hacer clic en el icono_
_(Imagen 8)_
_El campo de “Edit Shop” le permite realizar los cambios necesarios. 
_Para editar las características de la tienda debe hacer clic en el icono_ (Imagen 9). 
_En el área personal de la tienda se puede cambiar/_ cargar el logotipo de la tienda, imagen de portada;_  _introducir información básica sobre la tienda, información de pago, dirección de la tienda; agregar la información de configuración de la tienda; añadir enlace de redes sociales._


## **_Página "Products"_**

_Demuestra toda la variedad de productos presentados a la venta._
_Se proporciona una barra de búsqueda para encontrar rápidamente el producto deseado (Tabla 6)_ 
_(Imagen 10)_

**_Tabla 6. Products_**
|Imagen |Nombre|Grupo| Tienda |Tipo de producto|Precio Unitario|Cantidad|Estado|
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| -  |Apples  |Grocery |Grosery Shop |simple |$2.00|18|publish


## **_Página "Attributes"_**
 _(Imagen 11)_  _Permite hacer las adiciones necesarias a la descripción del producto. También hay una opción para eliminar características innecesarias (Tabla 7)_
 
**_Tabla 7. Atributos_**
|Imagen |Nombre|Grupo| Tienda |Tipo de producto|Precio Unitario|Cantidad|Estado|
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| -  |Apples  |Grocery |Grosery Shop |simple |$2.00|18|publish

|ID |Nombre|Tienda| Valores |Tipo de producto|Precio Unitario|Cantidad|Estado|
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|:-------------:|
| -  |Apples  |Grocery |Grosery Shop |simple |$2.00|18|publish


|ID |Nombre|Tienda| Valores |Acciones|
| ------------- |:-------------:|:-------------:|:-------------:|:-------------:|-:|
| 3  |Color  | Clothing Shop|Red, Blue, White |- |

_Si necesita realizar cambios en la descripción o características de la tienda, debe hacer clic en el icono_ _(Imagen 12)_

_En el campo «Edit Attribute” se puede actualizar toda la información necesaria y agregar/eliminar los valores._

## **_Página "Groups"_**
 _(Imagen 13) Permite crear un grupo nuevo y eliminar innecesario._

_Para crear un grupo nuevo debe hacer clic "Add Group"_ 

_1. En el campo “Create New Group” (Imagen 14) se puede agregar o editar la información necesaria para descripción de un grupo nuevo y elegir un icono._

_2. El campo de “Select group related settings” permite seleccionar la configuración necesaria, elegir ficha de producto._

_3. El campo de “Promotional Sliders” se puede subir controles deslizantes promocionales._

_4. El campo “Banner” proporciona opción de agregar una imagen de banner con título y descripción._


## **_Página "Categories"_**

_(Imagen 15)_  _Incluye el nombre de los productos por número, características, categorías e imagen y la opción de agregar un nuevo producto._

_Se proporciona una barra de búsqueda para encontrar rápidamente el producto que necesita, también existe la opción de configurar un filtro para un grupo de productos específico._

_Si necesita realizar cambios en la descripción o características de las categorías, debe hacer clic en el icono_ _(Imagen 16)_

_En el campo «Edit Category” (Imagen 17) se puede actualizar los detalles de su categoría: la imagen y la descripción._
## **_Página "Tags"_**


_(Imagen 18)_  _Permite agregar una palabra clave (tag) asociada que se refiere a una pieza de información sobre el producto o busque los productos requeridos por etiquetas existentes._

_Si necesita realizar cambios en la descripción o características de las palabras claves, debe hacer clic en el icono_ _(Imagen 18-1)_

_En el campo «Edit Category” (Imagen 18-2) se puede actualizar los detalles de las palabras claves: la imagen y la descripción._

## **_Página "Manufacturers/Publications"_**


_(Imagen 19)_ _Proporciona información sobre los fabricantes del producto. Ofrece una barra de búsqueda para encontrar rápidamente el fabricante requerido_

_Si necesita realizar cambios en la descripción sobre los fabricantes, debe hacer clic en el icono_ _(Imagen 19-1)_

_En el campo «Update Manufacturer/Publication” (Imagen 19-2, 19-3) se puede actualizar el logo, la imagen de portada y la descripción._

## **_Página "Authors"_**

 _(Imagen 20) Demuestra la información sobre los autores, le permite agregar información nueva y eliminar información innecesaria. Ofrece una barra de búsqueda para búsquedas rápidas._

_Si necesita realizar cambios en la descripción sobre los autores, debe hacer clic en el icono (Imagen 20-1)_ 


_En el campo «Update Author” (Imagen 20-2, 20-3) se puede actualizar la imagen, la imagen de portada, la descripción y biografía del autor._


## **_Página "Orders"_**

_(Imagen 21)_  _Permite ver información detallada sobre todos los pedidos, como el tracking number, el costo de envío, el monto total del pedido, la fecha del pedido, el estado del pedido y la dirección de envío._

_Haciendo clic en el icono (Imagen 22) es posible seguir el estado del pedido en detalle desde el momento en que se forma hasta la entrega al cliente._

_Proporciona una barra de búsqueda para encontrar rápidamente la documentación necesaria._

## **_Página "Order Status"_**

 _Demuestra información sobre  el ciclo logístico completo (ciclo de ejecución de órdenes)._
<![endif]-->

_1._ _Pedido recibido_

_2._ _Procesamiento de pedidos_

_3._ _Listo para enviar_

_4._ _Pedido enviado_

_5._ _En la instalación local_

_6._ _Para entrega_

_7._ _No se pudo cobrar el pago_

_8._ _No se pudo contactar al Consignatario_

_9._ _Envío rechazado por el destinatario_

_10. Entregado_

## **_Página "Create Order "_**


_(Imagen 23)_  _Permite crear un pedido y seleccionar los productos necesarios de la disponibilidad de productos ofrecidos por las tiendas._

_Ofrece una barra de búsqueda para encontrar rápidamente el producto que necesita, así como la posibilidad de configurar un filtro individual._

_1. Después de agregar los productos necesarios al carrito, debe hacer clic en el carrito_

_2._ _Luego debe verificar los datos para un envío como: (Imagen 24-25)_

_3. El siguiente paso es hacer clic en el botón "check availability" para consultar disponibilidad de producto elegido. (imagen 26)_

_4. En la casilla "choose payment method" debe seleccionar un método de pago. (Imagen 27)_

_5. Haga clic en el botón "Place order" para realizar el pedido._

## **_Página "Users"_**
 _Permite ver una lista de todos los usuarios, así como su correo electrónico, sus permisos, puntos de billetera electrónica disponibles, estado y actividad. (Imagen 28)_

## **_Página "Coupons"_**

_Demuestra cupones promocionales de tiendas que ofrecen descuentos en bienes._

_Ofrece la opción de buscar rápidamente el cupón deseado, así como la opción de agregar nuevos cupones y promociones. (Imagen 29)_

## **_Página "Taxes"_**


_Ofrece calcular el impuesto en función de los siguientes datos del: producto; país, ciudad; región; provincia; código postal._

_También hay una opción para agregar un nuevo impuesto a un producto nuevo o existente. (Imagen 30)_

## **_Página "Shippings"_**


_Demuestra una lista de tipos de entrega y condiciones bajo las cuales se puede realizar la entrega. (Imagen 31)_

_También le permite agregar una descripción y condiciones y cualquier otra información sobre la entrega._

_Para añadir un nuevo tipo de entrega, debe hacer clic_ "Add Shipping"_para ir a la sección ” crear una nueva entrega”.(Imagen 32)_

_Para crear un nuevo tipo de entrega, debe ingresar un nombre, seleccionar el tipo de entrega y el monto y hacer click en el botón “Add Shipping”. (Imagen 33)_

## **_Página "Withdrawals"_**

 _Presenta el historial de retiros. (Imagen 34)_


## **_Página "Refunds"_**

_Presenta el historial de reembolso. (Imagen 35)_

## **_Página "Questions"_**

_Demuestra varias preguntas sobre productos de los usuarios dirigidas al administrador. Y también le permite responder a la pregunta realizada por el usuario. (Imagen 36)_

_Para responder a la pregunta del usuario, haga clic en el campo “Actions” Edit. (imagen 37)_

_En la ventanilla que se abre, tendrá la oportunidad de responder la pregunta del usuario en nombre del administrador. (Imagen 38)_

## **_Página "Reviews"_**

 _Permite familiarizarse con todas las reseñas y comentarios sobre los productos comprados de los usuarios. (Imagen 39)_

## **_Página "Settings"_**

_Permite cambiar la configuración del sitio, ingresar datos nuevos o eliminar datos antiguos._


## Crear tienda

 _En la esquina superior derecha se encuentra el icono de "crear tienda"_

_Al hacer clic en este icono va al área de creación de las tiendas, el cual te permitirá realizar las acciones necesarias para crear una nueva tienda._

_En la cuenta personal del administrador, se crea una nueva tienda agregando:_


_1._ _Su logo (imagen 40)_

_2._ _Imagen de portada (imagen 41)_

_3. La información básica - Nombre/Apellido; Descripción (Imagen 42)_

_4._ _Métodos de pago - Nombre del titular de la cuenta_; _Correo electrónico del titular de la cuenta_; _Nombre del banco_; _Número de cuenta_; _(imagen 43)_

_5._ _Dirección de la tienda - País_; _Ciudad_; _Región_; _Provincia_; _Código postal_; _Calle (Imagen 44)_

_6._ _Configuración de la tienda - "Establecer ubicación desde el mapa"; "Número de contacto"; "Website”; Agregar nuevo perfil social. (imagen 45)_







## Export a file

You can export the current file by clicking **Export to disk** in the menu. You can choose to export the file as plain Markdown, as HTML using a Handlebars template or as a PDF.


# Synchronization

Synchronization is one of the biggest features of StackEdit. It enables you to synchronize any file in your workspace with other files stored in your **Google Drive**, your **Dropbox** and your **GitHub** accounts. This allows you to keep writing on other devices, collaborate with people you share the file with, integrate easily into your workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

There are two types of synchronization and they can complement each other:

- The workspace synchronization will sync all your files, folders and settings automatically. This will allow you to fetch your workspace on any other device.
	> To start syncing your workspace, just sign in with Google in the menu.

- The file synchronization will keep one file of the workspace synced with one or multiple files in **Google Drive**, **Dropbox** or **GitHub**.
	> Before starting to sync files, you must link an account in the **Synchronize** sub-menu.

## Open a file

You can open a file from **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Open from**. Once opened in the workspace, any modification in the file will be automatically synced.

## Save a file

You can save any file of the workspace to **Google Drive**, **Dropbox** or **GitHub** by opening the **Synchronize** sub-menu and clicking **Save on**. Even if a file in the workspace is already synced, you can save it to another location. StackEdit can sync one file with multiple locations and accounts.

## Synchronize a file

Once your file is linked to a synchronized location, StackEdit will periodically synchronize it by downloading/uploading any modification. A merge will be performed if necessary and conflicts will be resolved.

If you just have modified your file and you want to force syncing, click the **Synchronize now** button in the navigation bar.

> **Note:** The **Synchronize now** button is disabled if you have no file to synchronize.

## Manage file synchronization

Since one file can be synced with multiple locations, you can list and manage synchronized locations by clicking **File synchronization** in the **Synchronize** sub-menu. This allows you to list and remove synchronized locations that are linked to your file.


# Publication

Publishing in StackEdit makes it simple for you to publish online your files. Once you're happy with a file, you can publish it to different hosting platforms like **Blogger**, **Dropbox**, **Gist**, **GitHub**, **Google Drive**, **WordPress** and **Zendesk**. With [Handlebars templates](http://handlebarsjs.com/), you have full control over what you export.

> Before starting to publish, you must link an account in the **Publish** sub-menu.

## Publish a File

You can publish your file by opening the **Publish** sub-menu and by clicking **Publish to**. For some locations, you can choose between the following formats:

- Markdown: publish the Markdown text on a website that can interpret it (**GitHub** for instance),
- HTML: publish the file converted to HTML via a Handlebars template (on a blog for example).

## Update a publication

After publishing, StackEdit keeps your file linked to that publication which makes it easy for you to re-publish it. Once you have modified your file and you want to update your publication, click on the **Publish now** button in the navigation bar.

> **Note:** The **Publish now** button is disabled if your file has not been published yet.

## Manage file publication

Since one file can be published to multiple locations, you can list and manage publish locations by clicking **File publication** in the **Publish** sub-menu. This allows you to list and remove publication locations that are linked to your file.


# Markdown extensions

StackEdit extends the standard Markdown syntax by adding extra **Markdown extensions**, providing you with some nice features.

> **ProTip:** You can disable any **Markdown extension** in the **File properties** dialog.


## SmartyPants

SmartyPants converts ASCII punctuation characters into "smart" typographic punctuation HTML entities. For example:

|                |ASCII                          |HTML                         |
|----------------|-------------------------------|-----------------------------|
|Single backticks|\`'Isn't this fun?'\`            |'Isn't this fun?'            |
|Quotes          |\`"Isn't this fun?"\`            |"Isn't this fun?"            |
|Dashes          |\`-- is en-dash, --- is em-dash\`|-- is en-dash, --- is em-dash|


## KaTeX

You can render LaTeX mathematical expressions using [KaTeX](https://khan.github.io/KaTeX/):

The *Gamma function* satisfying $\Gamma(n) = (n-1)!\quad\forall n\in\mathbb N$ is via the Euler integral

$$
\Gamma(z) = \int_0^\infty t^{z-1}e^{-t}dt\,.
$$

> You can find more information about **LaTeX** mathematical expressions [here](http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference).


## UML diagrams

You can render UML diagrams using [Mermaid](https://mermaidjs.github.io/). For example, this will produce a sequence diagram:

\`\`\`mermaid
sequenceDiagram
Alice ->> Bob: Hello Bob, how are you?
Bob-->>John: How about you John?
Bob--x Alice: I am good thanks!
Bob-x John: I am good thanks!
Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

Bob-->Alice: Checking with John...
Alice->John: Yes... John, how are you?
\`\`\`

And this will produce a flow chart:

\`\`\`mermaid
graph LR
A[Square Rect] -- Link text --> B((Circle))
A --> C(Round Rect)
B --> D{Rhombus}
C --> D
\`\`\`
`