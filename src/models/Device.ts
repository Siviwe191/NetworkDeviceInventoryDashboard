export class Device{
    constructor(
        public id: string,
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
     * @return {string} UUID | number
     */
     deviceId() : string{
        return this.id;
    }

     /**
     * @return {string} name
     */
      deviceName() : string{
        return this.name;
    }

     /**
     * @return {number} validipAddress
     */
      deviceIpAddress() : number{
        return 0;
    }

     /**
     * @return {string} offline|online
     */
      deviceStatus() : string{
        return '';
    }

     /**
     * @return {string} ISO timestamp string
     */
      deviceLastSeenAt() : string{
        return '';
    }
}