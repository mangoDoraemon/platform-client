import defaultSettings from '@/settings'

const title = defaultSettings.title || '管控平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
