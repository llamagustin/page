<script setup>
const BENEFICTS_ICON = "✔"
let beneficts = [
    "Plantilla remota escalable",
    "Los mejores diseñadores y desarrolladores",
    "Usted posee el 100% de todo lo que hacemos",
    "Gerente de proyecto dedicado",
    "Actualizaciones diarias (de lunes a viernes)",
    "Sin contrato. Cancelar en cualquier momento"
  ];
// list of incovenients resolved
const WITHOUT_ICON = "✖"
let without = [
    "Sin largo proceso de contratación",
    "Sin desaparecer trabajadores remotos",
    "Sin dependencia de su agencia para actualizaciones",
    "Sin gran pago único",
    "Sin compromiso a largo plazo",
    "Sin esperar mucho por respuesta de su diseñador"
  ];
</script>

<template>
    <div>
        <Title size="2">{{$t('freelancerBenefitTitle')}}</Title>
        <Title size="5">{{$t('freelancerBenefitSubTitle')}}</Title>
        
        <div class="columns max-w-8 mx-auto">
            <div class="column">
                <Card>
                    <div class="card-content paragraph">
                        <ul>
                            <li v-for="ben in beneficts">
                              <div>{{ BENEFICTS_ICON }}</div>
                              <div>{{ ben }}</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
            <div class="column">
                <Card>
                    <div class="card-content paragraph">
                        <ul>
                          <li v-for="wt in without">
                              <div>{{ WITHOUT_ICON }}</div> 
                              <div>{{ wt }}</div>
                          </li>
                        </ul>
                    </div>
                </Card>
            </div>
        </div>
        
    </div>
</template>


<style lang="scss" scoped>
.card-content {
    ul {
        li {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 8px;
            line-height: 20px;
            
            & > div:nth-child(1) {
                font-size: 18px;
            }
        }
    }
}
</style>