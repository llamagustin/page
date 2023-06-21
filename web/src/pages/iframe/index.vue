<route lang="yaml">
meta:
  layout: minimal
</route>


<script setup lang="ts">
console.log('123')


const props = {
    name: 'SOLUTIONS DIGITAL SL',
    tools: [{
        title: 'web',
        text: 'Crea tu pagina web'
    },{
        title: 'e-commerce',
        text: 'Vende con tu punto de venta'
    },{
        title: 'seo',
        text: 'Comercializa Aythen'
    },{
        title: 'rrss',
        text: 'Solicita el Kit Digital'
    },{
        title: 'office',
        text: 'Oficina Virtual'
    },{
        title: 'crm',
        text: 'Gestor de clientes'
    }]
}


const token = {
    generate: () => {
        
    },
    verify: () => {
        
    }
}
</script>


<template>
    <div>
        <div>
            <h3>
                Explicación
            </h3>
            <VRow>
                Sacar formatos de AI
                
                Donde está el documento
            </VRow>
        </div>
        <VRow>
            <VCol>
                AD
            </VCol>
            <VRow>
                Sacar formatos de AI
            </VRow>
        </VRow>
        <div>
            <h2>
                Boe
            </h2>
        </div>
        <div>
            <h2>
                Kit Digital
            </h2>
            <div>
                Soluciones tools de Aythen
            </div>
        </div>
        <div>
            <h2>
                Calculadora Aythen
            </h2>
            <div>
                <div>
                    Número de licencias
                </div>
                <div>
                    Categorias de servicios
                </div>
                <div>
                    Tipo de venta
                </div>
                <div>
                    Subtotal
                    Taxes
                    Totales
                    Descuento
                </div>
            </div>
        </div>
        <div>
            <h2>
                Calculadora precios
            </h2>
            <div>
                Tus servicios
                Vende fácilmente tus servicios
                Añade a aythen e-commerce
                
                Crear API e-commerce
            </div>
        </div>
        <div>
            Pagos
            
            Sacar diseño de paypal de algun sitio
        </div>
    </div>
</template>