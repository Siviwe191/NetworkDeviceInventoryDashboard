import { Device } from '../models/Device'

const LOCAL_STORAGE_KEY = 'devices'

const initialDevices: Device[] = [
  new Device('1', 'Samsung', '192.168.1.1', 'online', new Date().toISOString()),
  new Device('2', 'iPhone 11 128GB', '192.168.1.2', new Date().toISOString()),
  new Device('3', 'iPhone 17 128GB', '192.168.1.3', 'online', new Date().toISOString()),
  new Device('4', 'Sony', '192.168.1.4', 'online', new Date().toISOString()),
  new Device('5', 'Apple Macbook Air', '192.168.1.2', 'offline', new Date().toISOString()),
  new Device('6', 'Lenovo', '192.168.1.3', 'online', new Date().toISOString()),
  new Device('7', 'Router3', '192.168.1.1', 'online', new Date().toISOString()),
]

interface AddDeviceResponse {
  status: number
  data: Device | null
  message: string
}

if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify(initialDevices),
  )
}
export class ClientService {
/**
 *
 * @returns {any[]} Device
 */
  loadDevices (): Device[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!data) {
      return []
    }

    // Convert plain objects back to Device instances
    const parsed = JSON.parse(data)
    return parsed.map(
      (d: any) =>
        new Device(d.id, d.name, d.ipAddress, d.status, d.lastSeenAt),
    )
  }

  /**
*
* @param {Device[]}devices
* @returns void
*/
  saveDevices (devices: Device[]): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(devices))
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
  async getDevices (): Promise<Device[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const devices = this.loadDevices()
          resolve(devices)
        } catch (error) {
          console.error(reject(error))
        }
      }, 300)
    })
  }

  /**
   * POST /devices
   * Simulates adding a new device.
   *
   * @param {Object} newDeviceData - Data for the new device
   * @returns {Promise<DAddDeviceResponse>} The newly created device instance
   * @throws {Error} If the "request" fails
   */
  async addDevice (newDeviceData: {
    deviceName: string
    deviceIpAddress: string
    deviceStatus: string
    deviceLastSeenAt: string
  }): Promise<AddDeviceResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const devices = this.loadDevices()
        const id = (devices.length + 1).toString()
        try {
          if (Math.random() < 0.1) {
            reject(new Error('Failed to create device'))
            return
          }

          const newDevice = new Device(
            id,
            newDeviceData.deviceName,
            newDeviceData.deviceIpAddress,
            newDeviceData.deviceStatus,
            newDeviceData.deviceLastSeenAt,
          )

          const validationError = newDevice.validate(devices)
          if (validationError) {
            resolve({ status: 201, data: newDevice, message: validationError })
            return
          } else {
            devices.push(newDevice)
            this.saveDevices(devices)
            console.info('added')

            resolve({ status: 201, data: newDevice, message: 'Device created successfully' })
          }
        } catch (error) {
          reject({ status: 400, message: error })
        }
      }, 400)
    })
  }

  /**
   * PUT /devices/:id - Update an existing device
   * Simulates updating a device.
   *
   * @param {Object} updateData - Data for the new device
   * @returns {Promise<AddDeviceResponse>} The newly updated device instance
   * @throws {Error} If the "request" fails
   */
  async updateDevice (id: string, updateData: {
    deviceName: string
    deviceIpAddress: string
    deviceStatus: string
    deviceLastSeenAt?: string
  }): Promise<AddDeviceResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const devices = this.loadDevices()
        try {
          const deviceIndex = devices.findIndex(d => d.id === id)
          if (deviceIndex === -1) {
            return resolve({
              status: 200,
              data: null,
              message: `Device id not found`,
            })
          }

          const existingDevice = devices[deviceIndex]
          const updatedDevice = { ...existingDevice, ...updateData }
          devices[deviceIndex] = new Device(
            id,
            updatedDevice.deviceName,
            updatedDevice.deviceIpAddress,
            updatedDevice.deviceStatus,
            updateData.deviceLastSeenAt ?? new Date().toISOString(),
          )

          localStorage.setItem('devices', JSON.stringify(devices))

          resolve({ status: 200, data: null, message: 'Device updated successfully' })
        } catch (error) {
          reject({ status: 400, message: error })
        }
      }, 500)
    })
  }

  /**
   * DELETE /devices/:id - Remove a device
   * Simulates deleting a device.
   *
   * @param {string} id- id for device to be deleted
   * @returns {Promise<AddDeviceResponse>} deleted true | false
   * @throws {Error} If the "request" fails
   */
  async deleteDevice (id: string): Promise<AddDeviceResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const stored = localStorage.getItem('devices')
        try {
          if (!stored) {
            return resolve({
              status: 200,
              data: null,
              message: `Device name not found in stored items`,
            })
          }

          const devices: Device[] = JSON.parse(stored)
          const index = devices.findIndex(d => d.id === id)

          if (index === -1) {
            return resolve({
              status: 200,
              data: null,
              message: `Device id not found`,
            })
          }

          devices.splice(index, 1)

          localStorage.setItem('devices', JSON.stringify(devices))

          // console.log(`Deleted device at index: ${index}`)
          resolve({
            status: 200,
            data: null,
            message: `Device deleted successfully`,
          })
        } catch (error) {
          reject({
            status: 400,
            message: error,
          })
        }
      }, 600)
    })
  }
}
