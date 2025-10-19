<template>
    <WireFrame>
        <v-container>
    <v-card>
      <v-card-title class="text-h6">
        Network Devices
        <v-spacer />
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          variant="outlined"
          density="compact"
        />
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="filteredDevices"
        :items-per-page="10"
        class="elevation-1"
      >
      <template #item.ipAddress="{ item }">
        <v-badge
            :content="Device.classifyIpAddress(item.ipAddress)"
            color="primary"
            location="end" 
            overlap="false"
        >
            {{ item.ipAddress }}
        </v-badge>
        </template>
        <template #item.status="{ item }">
          <v-chip
            :color="item.status === 'online' ? 'success' : 'error'"
            size="small"
            label
          >
            {{ item.status }}
          </v-chip>
        </template>
        <template #item.actions="{ item }">
        <v-icon
          small
          color="orange"
          class="me-2"
          @click="openUpdateDialog(item)"
        >
          mdi-pencil-outline
        </v-icon>

        <v-icon
          small
          color="red"
          @click="deleteDevice(item.id)"
        >
          mdi-delete-outline
        </v-icon>
      </template>
      </v-data-table>
    </v-card>

    <!--Add New Device Dialog -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>Add Device</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newDeviceName"
            label="Device Name"
          ></v-text-field>
          <v-text-field
            v-model="newDeviceIp"
            label="IP Address"
          ></v-text-field>
          <v-select
                v-model="newStatus"
                :items="statusOptions"
                label="Status"
                dense
            ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="addDevice">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--Update Device Dialog -->
    <v-dialog v-model="updateDialog" max-width="500px">
      <v-card>
        <v-card-title>Update Device</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="newDeviceName"
            :placeholder = selectedDeviceName
          ></v-text-field>
          <v-text-field
            v-model="newDeviceIp"
            :placeholder = selectedDeviceIp
          ></v-text-field>
          <v-select
                v-model="newStatus"
                :items="statusOptions"
                :placeholder = selectedDeviceStatus
                dense
            ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="updateDevice">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Toast message-->
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

     <!-- FAB -->
     <v-btn
      fab
      color="primary"
      dark
      class="fab-bottom-right"
      @click="openDialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
    </WireFrame>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { ClientService } from '@/services/ClientService'
import { Device } from '@/models/Device' 

const clientService = new ClientService()


const devices = ref<Device[]>([]);
const search = ref('');
const dialog = ref(false);
const updateDialog = ref(false);
const selectedItem = ref(null);
const newDeviceName = ref('');
const newDeviceIp = ref('');
const newStatus = ref('');
const snackbar = ref(false);
let text = ref('');
const statusOptions = ['online', 'offline'];
const selectedDeviceId = ref<string>('');
const selectedDeviceName = ref<string>('');
const selectedDeviceIp = ref<string>('');
const selectedDeviceStatus = ref<string>('');


// Table headers
const headers = [
  { title: 'Device Name', key: 'name' },
  { title: 'IP Address', key: 'ipAddress' },
  { title: 'Status', key: 'status' },
  { title: 'Last Seen At', key: 'lastSeenAt' },
  { title: 'Action', key: 'actions' },
]


onMounted(async () => {
  try {
    const data = await clientService.getDevices()
    devices.value = data
  } catch (error) {
    console.error('Error fetching devices:', error)
  }
})

// Open dialog
function openDialog(item: any) {
  selectedItem.value = item
  dialog.value = true
}

// Open dialog
function openUpdateDialog(item: any) {
  selectedDeviceId.value = item.id
  selectedDeviceName.value = item.name
  selectedDeviceIp.value = item.ipAddress
  selectedDeviceStatus.value = item.status
  selectedItem.value = item
  updateDialog.value = true
}

// Close dialog
function closeDialog() {
  dialog.value = false;
  updateDialog.value = false;
  newDeviceName.value = '';
  newDeviceIp.value = '';
}

// Add device
async function addDevice() {    
  const res = await clientService.addDevice({
    deviceName: newDeviceName.value,
    deviceIpAddress: newDeviceIp.value,
    deviceStatus: newStatus.value,
    deviceLastSeenAt: new Date().toISOString()
  });
  

  if(res.status === 201){
    closeDialog();
    snackbarHelper(res.message,true); 
    devices.value = await clientService.getDevices();
  }else{
    closeDialog();
    snackbarHelper(res.message,true); 
  }
}

// Update device
async function deleteDevice(id:string) { 
    const res = await clientService.deleteDevice(id); 
    if(res.status === 200){
    closeDialog();
    snackbarHelper(res.message,true); 
    devices.value = await clientService.getDevices();
  }else{
    closeDialog();
    snackbarHelper(res.message,true); 
  }
}

// Update device
async function updateDevice() {     
    const res = await clientService.updateDevice(selectedDeviceId.value,{  
    deviceName: (newDeviceName.value) ? newDeviceName.value : selectedDeviceName.value,
    deviceIpAddress: (newDeviceIp.value) ? newDeviceIp.value : selectedDeviceIp.value,
    deviceStatus: (newStatus.value) ? newStatus.value : selectedDeviceStatus.value,
    }); 

    if(res.status === 200){
    closeDialog();
    snackbarHelper(res.message,true); 
    devices.value = await clientService.getDevices();
  }else{
    closeDialog();
    snackbarHelper(res.message,true); 
  }
}

// snackbar helper function
function snackbarHelper(message : string,value : boolean) : void{
    text.value = message;
    snackbar.value = value;
}

// Computed filtered list
const filteredDevices = computed(() => {
  if (!search.value) return devices.value

  return devices.value.filter((device) =>
    Object.values(device).some((val) =>
      String(val).toLowerCase().includes(search.value.toLowerCase())
    )
  )
})

</script>