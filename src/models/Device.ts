export class Device{
    id: string
    name: string
    ipAddress: string
    status: string
    lastSeenAt: string

    constructor(
        id: string,
        name: string,
        ipAddress: string,
        status: string,
        lastSeenAt = new Date().toISOString()
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

  /**
   * 
   * @param {Device[]} Devices 
   * @returns {string | null}
   */  
  validate(Devices: Device[]): string | null {
    if (!this.name.trim()) return 'Device name is required.'
    if (!Device.isValidIPv4(this.ipAddress))
      return 'IP address must be a valid IPv4 dotted-quad.'

    const duplicate = Devices.find(
      (d) => d.ipAddress === this.ipAddress && d.id !== this.id
    )
    if (duplicate) return 'IP address must be unique.'

    return null 
  }

 /**
   * 
   * @param {string} ip
   * @returns {boolean}
   */   
  static isValidIPv4(ip: string): boolean {
    const ipv4Regex =
      /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/
    return ipv4Regex.test(ip)
  }

  /**
   * 
   * @param {string | null |undefined} ip 
   * @returns {string} 'Private' | 'Public' | 'CGNAT' | 'Invalid'
   */
  static classifyIpAddress(ip: string | null | undefined): 'Private' | 'Public' | 'CGNAT' | 'Invalid' {
    if (!ip || typeof ip !== 'string') return 'Invalid';
  
    const parts = ip.split('.').map((n) => Number(n));
  
    // Ensure we have exactly 4 numeric parts
    if (parts.length !== 4 || parts.some((p) => Number.isNaN(p))) return 'Invalid';
  
    const a = parts[0];
    const b = parts[1] ?? 0;
  
    // Validate full IPv4 structure
    if (!Device.isValidIPv4(ip)) return 'Invalid';
  
    // Classification logic
    if (a === 10) return 'Private';
    if (a === 172 && b >= 16 && b <= 31) return 'Private';
    if (a === 192 && b === 168) return 'Private';
    if (a === 100 && b >= 64 && b <= 127) return 'CGNAT';
  
    return 'Public';
  }
  
  
}