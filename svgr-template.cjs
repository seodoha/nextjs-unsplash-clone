/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

function defaultIndexTemplate(filePaths) {
  const entries = filePaths.map(({ path: filePath }) => {
    const basename = path.basename(filePath, path.extname(filePath))
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename
    const importLine = `import ${exportName} from './${basename}';`
    return { importLine, exportName }
  })
  
  return `${entries.map(({ importLine }) => importLine).join('\n')}

export const IconMap = {
  ${entries.map(({ exportName }) => exportName).join(',\n  ')}
} as const

export type IconMapTypes = keyof typeof IconMap;
`
}

module.exports = defaultIndexTemplate 