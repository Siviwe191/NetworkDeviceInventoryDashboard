import { Device } from '../models/Device';

const LOCAL_STORAGE_KEY = 'devices';

const initialDevices: Device[] = [
  new Device('1', 'Router', '192.168.1.1', 'online', '2025-10-18'),
  new Device('2', 'Switch', '192.168.1.2', 'offline', '2025-10-18'),
  new Device('3', 'Firewall', '192.168.1.3', 'online', '2025-10-18'),
];

if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(initialDevices)
  );
}
export class ClientService{
/**
 * 
 * @returns {any[]} Device
 */
    loadDevices(): Device[] {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!data) return [];
      
        // Convert plain objects back to Device instances
        const parsed = JSON.parse(data);
        return parsed.map(
          (d: any) =>
            new Device(d.id, d.deviceName, d.deviceIpAddress, d.deviceStatus, d.deviceLastSeenAt)
        );
      }

      /**
       * 
       * @param {Device[]}devices 
       * @returns void
       */
       saveDevices(devices: Device[]): void {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(devices));
      }    

/**
 * Fetches all devices.
 *
 * Simulates a GET /devices REST endpoint.
 *
 * @async
 * @function
 * @returns {Promise<Device[]>} A promise that resolves to an array of Device instances.
 */
    async getDevices(): Promise<Device[]> {
        return new Promise((resolve,reject) => {
            
            setTimeout(() => {
            try{
                const devices = this.loadDevices();
                resolve(devices);
            }catch(error){
                console.error(reject(error));
            }
        }, 300);
        })
      }

   /**
   * POST /devices
   * Simulates adding a new device.
   *
   * @param {Object} newDeviceData - Data for the new device
   * @returns {Promise<Device>} The newly created device instance
   * @throws {Error} If the "request" fails
   */
      async addDevice(newDeviceData:{
        deviceName: string;
        deviceIpAddress: string;
        deviceStatus: string;
        deviceLastSeenAt: '2025-02-23';
    }): Promise<Device> {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let devices = this.loadDevices();
            const id = (devices.length + 1).toString();
            try {
              const newDevice = new Device(
                id,
                newDeviceData.deviceName,
                newDeviceData.deviceIpAddress,
                newDeviceData.deviceStatus,
                newDeviceData.deviceLastSeenAt
              );
    
              devices.push(newDevice);
    
              resolve(newDevice);
            } catch (error) {
              console.log(reject(error));
            }
          }, 400);
        });
      }
    
    /**
   * PUT /devices/:id - Update an existing device 
   * Simulates updating a device.
   *
   * @param {Object} updateData - Data for the new device
   * @returns {Promise<Device | undefined>} The newly updated device instance
   * @throws {Error} If the "request" fails
   */
      async updateDevice(id: string, updateData:{
        deviceName: string;
        deviceIpAddress: string;
        deviceStatus: string;
        deviceLastSeenAt: '2025-02-23';
    }): Promise<Device | undefined> {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let devices = this.loadDevices();
            try {
                const deviceIndex = devices.findIndex((d) => d.id  === id);
                if (deviceIndex === -1) return resolve(undefined);
      
                const existingDevice = devices[deviceIndex];
                const updatedDevice = { ...existingDevice, ...updateData };
                devices[deviceIndex] = new Device(
                  id,
                  updatedDevice.deviceName,
                  updatedDevice.deviceIpAddress,
                  updatedDevice.deviceStatus,
                  updatedDevice.deviceLastSeenAt
                );
                
                resolve(devices[deviceIndex]);
            } catch (error) {
              console.log(reject(error));
            }
          }, 500);
        });
      }
    

    /**
   * DELETE /devices/:id - Remove a device
   * Simulates deleting a device.
   *
   * @param {string} id- id for device to be deleted
   * @returns {Promise<boolean>} deleted true | false
   * @throws {Error} If the "request" fails
   */
  async deleteDevice(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let devices = this.loadDevices();
          const index = devices.findIndex((d) => d.id === id);
          if (index === -1) return resolve(false);

          devices.splice(index, 1);
          resolve(true);
        } catch (error) {
          reject(error);
        }
      }, 600);
    });
  }
}