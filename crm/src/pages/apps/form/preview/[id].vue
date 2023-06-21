<script setup lang="ts">
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

// Components
import FormAddPaymentDrawer from '@/views/apps/form/FormAddPaymentDrawer.vue'
import FormSendFormDrawer from '@/views/apps/form/FormSendFormDrawer.vue'

// Store
import { useForm } from '@/views/apps/form/useForm'
import { useFormStore } from '@/views/apps/form/useFormStore'
import { useUserListStore } from '@/views/apps/user/useUserListStore'
// Download
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';

const { infoForm } = useForm()
    

const formListStore = useFormStore()
const userListStore = useUserListStore()

// console.log('form', formListStore.$state.formData)

const route = useRoute()

const formData = ref(formListStore.$state.formData)



const isSendPaymentSidebarVisible = ref(false)
const clients = ref();
const client = ref();
const toolsList = ref(null);

const userId = ref(null);

// 👉 fetchForm
formListStore.fetchForm(route.params.id).then(response => {
  // console.log('consulta:', response)
  if(response !== 404){
    formData.value = response.data
  }
  // paymentDetails.value = response.data.paymentDetails
  
  
  // 👉 Form Description
  toolsList.value=formData.value.tools;
  userId.value=formData.value.user_id;
}).catch(error => {
  console.log(error)
})

  // formListStore.fetchForms(
  //   {
  //     q:'',
  //     status:'',
  //     perPage: 10,
  //     currentPage: 1,
  //   },
  // ).then(response => {
  //   clients.value = response.data.forms
  // }).catch(error => {
  //   console.log(error)
  // })
  
  
  
// 👉 Form 


// var fetchUser = () => {
  
//   // userListStore.fetchUser(userId).then(response => {
//   //   console.log('this user data: ',response);
//   // }).catch(error => {
//   // console.log('not feched user data: ',error);
//   // })
// }

//
/*
watch(selectedUser,val => {
  console.log('console', selectedUser.value)
  fetchUsers(selectedUser.value)
});
*/


  


// 👉 Print Form
const printForm = () => {
  window.print()
}

// 👉 Print Form
const downloadForm = () => {
    // Tomar la captura de pantalla
    const element = document.getElementById("printDiv");
    const screenshot = html2canvas(element);

    // Convertir la captura de pantalla en PDF
    var pdf = new jsPDF('p', 'pt', 'letter');
     //pdf.canvas.height = 72 * 11;
      //pdf.canvas.width = 72 * 8.5;
      pdf.html(element.innerHTML);
    screenshot.then((canvas) => {
    const imgData = canvas.toDataURL("image/png");

    // Calcular el tamaño de la imagen redimensionada
    const imgWidth = 210; // Ancho del lienzo del PDF
    const imgHeight = canvas.height * imgWidth / canvas.width; // Altura correspondiente para mantener la relación de aspecto

      const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        
        // Descargar el PDF
        pdf.save("Factura.Pdf");
    });
};





</script>

<template>
  <section v-if="formData">
    <VRow>
      <VCol
        cols="12"
        md="9"
        id="printDiv"
      >
        <VCard>
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
            <!-- 👉 Left Content -->
            <div class="ma-sm-4">
              <div class="d-flex align-center mb-6">
                <!-- 👉 Logo -->
                <VNodeRenderer
                  :nodes="themeConfig.app.logo"
                  class="me-3"
                />

                <!-- 👉 Title -->
                <h6 class="font-weight-bold text-xl">
                  {{ themeConfig.app.title }}
                </h6>
              </div>

              <!-- 👉 Address -->
              <p class="mb-0">
                {{infoForm.address}}
              </p>
              <p class="mb-0">
                {{infoForm.city}}
              </p>
              <p class="mb-0">
                {{infoForm.phone}}, {{infoForm.email}}
              </p>
            </div>

            <!-- 👉 Right Content -->
            <div class="mt-4 ma-sm-4">
              <!-- 👉 Form ID -->
              <h6 class="font-weight-medium text-xl mb-6">
                Form #{{ formData.id }}***
              </h6>

              <!-- 👉 Issue Date -->
              <p class="mb-2">
                <span>Date Issued: </span>
                <span class="font-weight-semibold">{{ formData.issuedDate }}</span>
              </p>

              <!-- 👉 Due Date -->
              <p class="mb-2">
                <span>Due Date: </span>
                <span class="font-weight-semibold">{{ formData.dueDate }}</span>
              </p>
            </div>
          </VCardText>
          <!-- !SECTION -->

          <VDivider />

          <!-- 👉 Payment Details -->
          <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
            <VRow>
              <VCol cols="4" >
                <h6 class="text-sm font-weight-semibold mb-3">
                  Form To:
                </h6>
                <div class="formto-user">
                  <v-avatar image="https://i.postimg.cc/cHfRj88G/logo-2.png" size="40"></v-avatar>
                  <h4>Username</h4>
                </div>
              </VCol>
              <VCol cols="8">
                <VRow>
                  <VCol cols="6">
                      <h6 class="text-sm font-weight-semibold mb-3">
                        Bill To:
                      </h6>
                      <table>
                        <tr>
                          <td class="pe-6">
                            Total Due:
                          </td>
                          <td >
                            {{ formData.paymentMethod.totalDue }}
                          </td>
                        </tr>
                        <tr>
                          <td class="pe-6">
                            Bank Name:
                          </td>
                          <td>
                            {{ formData.paymentMethod.bankName }}
                          </td>
                        </tr>
                      </table>
                  </VCol>
                  <VCol cols="6">
                    <h6 class="text-sm font-weight-semibold mb-3">
                        &nbsp;
                    </h6>
                    <table>
                      <tr>
                        <td class="pe-6">
                          IBAN:
                        </td>
                        <td>
                          {{ formData.paymentMethod.iban }}
                        </td>
                      </tr>
                      <tr>
                        <td class="pe-6">
                          SWIFT Code:
                        </td>
                        <td>
                          {{ formData.paymentMethod.swiftCode }}
                        </td>
                      </tr>
                    </table>
                  </VCol>
                </VRow>
              </VCol>
            </VRow>

          </VCardText>

          <!-- 👉 Table -->
          <VDivider />

          <VTable>
            <thead>
              <tr>
                <th scope="col">
                  ITEM
                </th>
                <th scope="col">
                  DESCRIPTION
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  HOURS
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  QTY
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  TOTAL
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(item,index) in toolsList"
                :key="index"
              >
                <td class="text-no-wrap">
                  {{ item.title }}
                </td>
                <td class="text-no-wrap">
                  {{ item.description }}
                </td>
                <td class="text-center">
                  {{ item.hours }}
                </td>
                <td class="text-center">
                  1
                </td>
                <td class="text-center">
                  ${{ item.cost }}
                </td>
              </tr>
            </tbody>
          </VTable>

          <VDivider class="my-2" />

          <!-- Total -->
          <VCardText class="d-flex justify-space-between flex-column flex-sm-row print-row">
            <div class="my-2 mx-sm-4">
              <div class="d-flex align-center mb-1">
                <h6 class="text-sm font-weight-semibold me-1">
                  Salesperson:
                </h6>
                <span>Jenny Parker</span>
              </div>
              <p>Thanks for your business</p>
            </div>

            <div class="my-2 mx-sm-4">
              <table>
                <tr>
                  <td class="text-end">
                    <div class="me-5">
                      <p class="mb-2">
                        Subtotal:
                      </p>
                      <p class="mb-2">
                        Discount:
                      </p>
                      <p class="mb-2">
                        Tax:
                      </p>
                      <p class="mb-2">
                        Total:
                      </p>
                    </div>
                  </td>

                  <td class="font-weight-semibold">
                    <p class="mb-2">
                      $154.25
                    </p>
                    <p class="mb-2">
                      $00.00
                    </p>
                    <p class="mb-2">
                      $50.00
                    </p>
                    <p class="mb-2">
                      $204.25
                    </p>
                  </td>
                </tr>
              </table>
            </div>
          </VCardText>

          <VDivider />

          <VCardText>
            <div class="d-flex mx-sm-4">
              <h6 class="text-sm font-weight-semibold me-1">
                Note:
              </h6>
              <span>It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!</span>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        md="3"
        class="d-print-none"
      >
        <VCard>
          <VCardText class="gap-2 d-flex flex-wrap">
            <!-- 👉 Send Form Trigger button -->
            <!--<VBtn block :to="{ name: 'apps-form-edit' , params: { id: formData.id } }" >-->
            <!--  Editar-->
            <!--</VBtn>-->
            <VBtn v-if="formData?.id" block :to="{ name: 'apps-form-edit-id', params: { id: formData.id }}" >
              Editar
            </VBtn>
            <VBtn block :to="{ name: 'apps-form-list' }" variant="tonal" >
              Atrás
            </VBtn>
            <div class="mt-2 d-flex gap-2 items-center">
              <VBtn
                class="icon-width"
                variant="tonal"
                color="secondary"
                @click="isSendPaymentSidebarVisible = true"
              >
                <VIcon icon="tabler-send" />
              </VBtn>
              <VBtn
                class="icon-width"
                variant="tonal"
                color="secondary"
                @click="downloadForm"
              >
                <VIcon icon="tabler-cloud-download" />
              </VBtn>
              <VBtn
                class="icon-width"
                variant="tonal"
                color="secondary"
                @click="printForm"
              >
                <VIcon icon="tabler-printer" />
              </VBtn>
            </div>

            <VBtn
              v-if="false"
              class="ml-auto"
              :to="{ name: 'apps-form-edit-id', params: { id: route.params.id } }"
            >
              Edit Form
            </VBtn>

 
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <!-- 👉 Send Form Sidebar -->
    <FormSendFormDrawer v-model:isDrawerOpen="isSendPaymentSidebarVisible" />
  </section>
</template>

<style lang="scss">
.icon-width{
  min-width: 0px;
}


.formto-user{
  display:flex;
  gap:10px;
  align-items:center;
}
@media print {
  .v-application {
    background: none !important;
  }

  @page { margin: 0; size: auto; }

  .layout-page-content,
  .v-row,
  .v-col-md-9 {
    padding: 0;
    margin: 0;
  }

  .product-buy-now {
    display: none;
  }

  .v-navigation-drawer,
  .layout-vertical-nav,
  .app-customizer-toggler,
  .layout-footer,
  .layout-navbar,
  .layout-navbar-and-nav-container {
    display: none;
  }

  .v-card {
    box-shadow: none !important;

    .print-row {
      flex-direction: row !important;
    }
  }

  .layout-content-wrapper {
    padding-inline-start: 0 !important;
  }
}
</style>
