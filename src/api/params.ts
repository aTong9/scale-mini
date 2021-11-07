class Params {
  private readonly _params: any
  public constructor() {
    this._params = this.createReqestParams()
  }
  public get params() {
    return this._params
  }
  public createReqestParams() {
    return  {
      requestId: '',
      v: '20210916',
      s: '',
      t: new Date().getTime(),
      pn: 1,
      ps: 10,
      operatorToken: '',
      operatorId: '',
      did: '',
      cc: 'wx',
      os: '',
      osv: '',
      ver: 1,
      deviceId: '',
      lat: 0,
      lon: 0,
      net: 0,
      na: 0,
      uid: 0,
      lId: '',
      platform: 1,
      version: '4.32',
      wxMinType: 'qiandao'
    }
  }
}

export const CommonParams = new Params()
