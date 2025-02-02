export class FileConvertor {
  toBase64(file) {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = function () {
        const base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '')
        resolve(base64String)
      }

      reader.readAsDataURL(file)
    })
  }
}
