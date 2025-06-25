import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import axios from 'axios'
import avoFont from '../../assets/UTMAvo.ttf'
import avoFontBold from '../../assets/UTMAvoBold.ttf'

let cachedFonts = null
const loadFonts = async () => {
  if (!cachedFonts) {
    const avoRegular = await axios.get(avoFont, { responseType: 'arraybuffer' }).then((res) => res.data)
    const avoBold = await axios.get(avoFontBold, { responseType: 'arraybuffer' }).then((res) => res.data)
    cachedFonts = { avoRegular, avoBold }
  }
  return cachedFonts
}

const PDFGen = async ({ certiFile, studentName, deptName }) => {
    try {
      const pdfDoc = await PDFDocument.load(certiFile)
      pdfDoc.registerFontkit(fontkit)
      const { avoRegular, avoBold } = await loadFonts()
      const customAvoRegular = await pdfDoc.embedFont(avoRegular)
      const customAvoBold = await pdfDoc.embedFont(avoBold)
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const textStudentWidth = customAvoBold.widthOfTextAtSize(studentName, 28)
      const textDeptWidth = customAvoRegular.widthOfTextAtSize(deptName, 16)
      const adjustedStudentX = (firstPage.getWidth() - textStudentWidth) / 2
      const adjustedDeptX = (firstPage.getWidth() - textDeptWidth) / 2
      firstPage.drawText(studentName, {
        x: adjustedStudentX,
        y: 322,
        size: 28,
        font: customAvoBold,
        color: rgb(5 / 255, 31 / 255, 73 / 255)
      })
      firstPage.drawText(deptName, {
        x: adjustedDeptX,
        y: 290,
        size: 16,
        font: customAvoRegular,
        color: rgb(5 / 255, 31 / 255, 73 / 255)
      })
      const modifiedPdfBytes = await pdfDoc.save()
      return new Blob([modifiedPdfBytes], { type: 'application/pdf' })
    } catch (error) {
      console.error('Failed to process certificate: ', error)
    }
  }

export default PDFGen
