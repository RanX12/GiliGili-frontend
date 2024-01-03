import Cos from 'cos-js-sdk-v5'

export class CosUtil {
  constructor(url, bucket, region, storePath, cdnHost, uToken = '') {
    this.cos = this.initializeCos(url, uToken)
    this.bucket = bucket
    this.region = region
    this.storePath = storePath
    this.cdnHost = cdnHost
  }

  initializeCos(url, uToken) {
    return new Cos({
      // getAuthorization 必选参数
      getAuthorization: function (options, callback) {
        // 获取临时密钥

        let xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:5173/api/v1/upload/token', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        if (uToken) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + uToken)
        }
        xhr.onload = function (e) {
          let data
          let credentials
          try {
            data = JSON.parse(e.target.responseText).data
            credentials = data.Credentials
          } catch (e) {
            console.error(e)
          }
          if (!data || !credentials) {
            return console.error('COS credentials invalid')
          }
          console.log('credentials:', credentials)
          console.log('data:', data)

          callback({
            TmpSecretId: credentials.TmpSecretId,
            TmpSecretKey: credentials.TmpSecretKey,
            SecurityToken: credentials.Token,
            StartTime: data.StartTime, // 时间戳，单位秒
            ExpiredTime: data.ExpiredTime, // 时间戳，单位秒
          })
        }
        xhr.send()
      },
      ProgressInterval: 200, //  progress 回调时间间隔  
    })
  }

  /**
   *
   * @param {*} option
   * fileKey: 文件名
   * fileObject: 文件本身
   * success：上传成功回调
   * error：上传失败回调
   * callbackParams: 指定回调携带的参数
   */
  putCosObject(option) {
    const { fileKey, fileObject, success, callbackParams, error, progress } = option
    const filePath = `${fileKey}`

    this.cos?.putObject(
      {
        Bucket: this.bucket,
        Region: this.region,
        Key: filePath,
        StorageClass: 'STANDARD',
        Body: fileObject, // 上传文件对象
        onProgress: function (progressData) {
          progress && progress(progressData)
        },
      },
      (err, data) => {
        if (err) {
          console.log('err: ', err)
          error(err)
          return
        }
        if (data && success) {
          // 存储位置
          data.path = filePath
          data.fileName = fileKey
          data.Location = this.cdnHost + filePath
          success(data, callbackParams)
        }
      }
    )
  }
}
