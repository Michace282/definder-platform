import { PostApiRequest } from '~/pkg/api/base'

export class CreateProject extends PostApiRequest {
  constructor(context, data = {}, { fileConvertor }) {
    const body = {
      address: data.address,
      goal: data.goal,
      projectImages: [],
      projectDocuments: [],
    }

    const optionalParameters = [
      'webSite',
      'nameEn',
      'nameRu',
      'nameZhHans',
      'descriptionEn',
      'descriptionRu',
      'descriptionZhHans',
      'telegramGroup',
      'companyName',
      'facebook',
      'twitter',
      'linkedin',
      'instagram',
      'youtube',
      'video',
    ]

    for (const param of optionalParameters) {
      const value = data[param]
      if (CreateProject.isParameterValid(value)) {
        body[param] = value
      }
    }

    const url = '/projects/'
    super(context, url, body)

    this.fileConvertor = fileConvertor
    this.projectImages = data.projectImages
    this.projectDocuments = data.projectDocuments
  }

  async formatFiles() {
    this.data.projectImages = await this.formatImages()
    this.data.projectDocuments = await this.formatDocuments()
  }

  static isParameterValid(param) {
    return param !== null && param !== undefined && param !== ''
  }

  async formatImages() {
    const output = []
    for (const item of this.projectImages) {
      const convertedItem = await this.fileConvertor.toBase64(item)
      output.push({ image: convertedItem })
    }
    return output
  }

  async formatDocuments() {
    const output = []
    for (let index = 0; index < this.projectDocuments.length; index++) {
      const item = this.projectDocuments[index]

      const doc = await this.formatNewDocument(item)
      output.push(doc)
    }
    return output
  }

  async formatNewDocument(item) {
    const nameParts = item.name.split('.')
    const type = nameParts[nameParts.length - 1]
    if (type === 'pdf') {
      return await this.formatNewPdfDocument(item)
    }

    return await this.formatNewImageDocument(item)
  }

  async formatNewPdfDocument(item) {
    return {
      document: await this.fileConvertor.toBase64(item),
      documentName: item.name,
    }
  }

  async formatNewImageDocument(item) {
    return {
      image: await this.fileConvertor.toBase64(item),
      imageName: item.name,
    }
  }
}
