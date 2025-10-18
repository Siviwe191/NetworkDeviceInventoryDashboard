export class Device{
    constructor(
        private id: string,
        private name: string,
        private ipAddress: string,
        private status: string,
        private lastSeenAt: string
    ){
        this.id = id;
        this.name = name;
        this.ipAddress = ipAddress;
        this.status = status;
        this.lastSeenAt = lastSeenAt;
    }

    /**
     * @param {string} id
     * @return {number} UUID | number
     */
    deviceId(id: string) : number{
        return 0;
    }

     /**
     * @param {string} name
     * @return {string} name
     */
     deviceName(name: string) : string{
        return this.name;
    }

     /**
     * @param {string} ipAddress
     * @return {number} validipAddress
     */
     deviceIpAddress(ipAddress: string) : number{
        return 0;
    }

     /**
     * @param {string} status
     * @return {string} offline|online
     */
     deviceStatus(status: string) : string{
        return '';
    }

     /**
     * @param {string} lastSeenAt
     * @return {string} ISO timestamp string
     */
     deviceLastSeenAt(lastSeenAt: string) : string{
        return '';
    }
}