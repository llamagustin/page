<script setup lang="ts">
import Papa from 'papaparse';


//importFile
const importFile = () => {
  const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.csv');
    input.addEventListener('change', async () => {
      let files = input.files;
      var items = await new Promise((resolve, reject) => {
        Papa.parse(files[0], {
            header: true,
            download: true,
            skipEmptyLines: true,
            complete: function (results) {
                resolve(results.data);
            }
        });
      })
      
      
      var data = []
      items.map( item => {
        
        data.push({
          faqs: [{
            q: item['Cualificación 2'],
            a: item['Cualificación 2 respuesta']
          }],
          source: item['Fuente'],
          interes: item['Nivel de interés'],
          
          email: item['email'],
          
          date: item['fecha'],
          fullName: item['nombre'],
          
          address: item['ubicación del candidato(a)'],
          phone: item['teléfono'],
          
          charge: item['puesto actual'],
          status: item['Valoración pendiente'],
          eduacation: item['educación'],
        })
      })
    
      
      accountListStore.importData(data)
 
    });
    input.click();
}
</script>

<template>
  <section>
    <pre>
    Lo que tienes que poner es el code aqui
    
    dos tablas
    -createTask => cp + 200 cp - 200
    -cp [[cp, 0]] => leads with status 'low' 'medium' 'high'
    -create ops zone
    -csv import to sync
    -actualizar cp
    -kmeans
    -obtain cp
    -select lead
    -refresh cp
    
    -frecuencia 20-100 mes
    -desactivate son los que no tienen nada unique con el email en el sync
    
    ||frontend
    #menu en la izquierda
    #creador de codigo, automatico o con ops
    #exportar xlxs
    #reactive
    #que en lead generator
    #ordenar leads
    </pre>
    
    <VRow>
      <VCol
        v-for="(meta, index) in accountListMeta"
        :key="index"
        cols="12"
        sm="6"
        lg="3"
      >
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <div class="d-flex align-center gap-2 my-1">
                <h6 class="text-h6">
                  {{ meta.stats }}
                </h6>
                <span :class="meta.percentage > 0 ? 'text-success' : 'text-error'">({{ meta.percentage }}%)</span>
              </div>
              <span>{{ meta.subtitle }}</span>
            </div>

            <VAvatar
              rounded
              variant="tonal"
              :color="meta.color"
              :icon="meta.icon"
            />
          </VCardText>
        </VCard>
      </VCol>

      <VCol cols="12">
        <VCard >


          <VCardText class="d-flex flex-wrap py-4 gap-4">
            <!--
            <div
              class="me-3"
              style="width: 80px;"
            >
              <VSelect
                v-model="rowPerPage"
                density="compact"
                variant="outlined"
                :items="[10, 20, 30, 50]"
              />
            </div>
            -->
            
  
            
            <VSelect
              v-model="selectedRole"
              label="Seleccionar Rol"
              :items="roles"
              clearable
              clear-icon="tabler-x"
            />
                
                
            <VSelect
              v-model="selectedStatus"
              label="Seleccionar Estado"
              :items="status"
              clearable
              clear-icon="tabler-x"
            />

            <VSpacer />

            <div class="app-user-search-filter d-flex justify-end gap-4">
              <!-- 👉 Search  -->
              <div style="width: 20rem;">
                <VTextField
                  v-model="searchQuery"
                  placeholder="Search"
                  density="compact"
                />
              </div>

              <!-- 👉 Import button  -->
              <VBtn
                v-id="showImport"
                variant="tonal"
                color="secondary"
                prepend-icon="tabler-screen-share"
                @click="importFile"
              >
              </VBtn>
              

              <!-- 👉 Add user button -->
              <VBtn
                prepend-icon="tabler-plus"
                @click="newAccount"
              >
              </VBtn>
            </div>
          </VCardText>

          <VDivider />

          <VTable class="text-no-wrap">
            <!-- 👉 table head -->
            <thead>
              <tr>
                <th scope="col">
                  USUARIO
                </th>
                <th scope="col">
                  DIRECCIÓN
                </th>
                <th scope="col">
                  CONTACTO
                </th>
                 <th scope="col">
                  LEADS
                </th>
                <th scope="col">
                  ESTADO
                </th>
                <th scope="col">
                  ACCIÓN
                </th>
              </tr>
            </thead>
            <!-- 👉 table body -->
            <tbody>
              <tr
                v-for="account in accounts"
                :key="account.id"
                style="height: 3.75rem;"
              >
                <!-- 👉 User -->
                <td>
                  <div class="d-flex align-center">
                    <VAvatar
                      variant="tonal"
                      :color="resolveAccountRoleVariant(account.role).color"
                      class="me-3"
                      size="38"
                    >
                      <VImg
                        v-if="account.avatar"
                        :src="account.avatar"
                      />
                      <span v-else>{{ avatarText(account.fullName) }}</span>
                    </VAvatar>

                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'apps-account-view-id', params: { id: account.id } }"
                          class="font-weight-medium user-list-name"
                        >
                          {{ account.fullName }}
                        </RouterLink>
                      </h6>
                      <span class="text-sm text-disabled">{{account.role}}</span>
                    </div>
                  </div>
                </td>
                
                <!-- 👉 Address -->
                <td>
                  <div class="d-flex align-center">
                    <div class="d-flex flex-column">
                      <h6 class="text-base">
                        <RouterLink
                          :to="{ name: 'apps-account-view-id', params: { id: account.id } }"
                          class="font-weight-medium user-list-name"
                        >{{account.address.country }}
                        </RouterLink>
                      </h6>
                      <span class="text-sm text-disabled">{{ account.address.zip }}</span>
                    </div>
                  </div>
                </td>

                <!-- 👉 Contacto -->
                <td>
                  <!--
                  <VAvatar
                    :color="resolveAccountRoleVariant(account.role).color"
                    :icon="resolveAccountRoleVariant(account.role).icon"
                    variant="tonal"
                    size="30"
                    class="me-4"
                  />
                  -->
                  <h6 class="text-base">
                    <span class="text-capitalize text-base">{{ account.phone }}</span>
                  </h6>
                  <span class="text-capitalize text-base">{{ account.email }}</span>
                </td>

                <!-- 👉 Status -->
                <td>
                  <VChip label size="small">0</VChip>
                  
                </td>
           

                <!-- 👉 Status -->
                <td>
                  <VChip
                    label
                    :color="resolveAccountStatusVariant(account.status)"
                    size="small"
                    class="text-capitalize"
                  >
                    {{ account.status }}
                  </VChip>
                </td>

                <!-- 👉 Actions -->
                <td
                  class="text-center"
                  style="width: 5rem;"
                >
                  <VBtn
                    icon
                    size="x-small"
                    color="default"
                    variant="text"
                  >
                    <VIcon
                      size="22"
                      icon="tabler-dots-vertical"
                    />

                    <VMenu activator="parent">
                      <VList>
                        <VListItem
                          title="View"
                          :to="{ name: 'apps-account-view-id', params: { id: account.id } }"
                        />
                        <VListItem
                          title="Suspend"
                          @click="editAccount(account)"
                        />
                      </VList>
                    </VMenu>
                  </VBtn>
                </td>
              </tr>
            </tbody>

            <!-- 👉 table footer  -->
            <tfoot v-show="!accounts.length">
              <tr>
                <td
                  colspan="7"
                  class="text-center"
                >
                  No data available
                </td>
              </tr>
            </tfoot>
          </VTable>

          <VDivider />

          <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
            <span class="text-sm text-disabled">
              {{ paginationData }}
            </span>

            <VPagination
              v-model="currentPage"
              size="small"
              :total-visible="5"
              :length="totalPage"
            />
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add New User -->
    <AddNewAccountDrawer
      v-model:isDrawerOpen="isAddNewAccountDrawerVisible"
      v-model:account="accountData"
      @account-data="addNewAccount"
    />
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>

