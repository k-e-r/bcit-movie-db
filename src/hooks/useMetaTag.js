import { useEffect } from 'react'

export const APP_TITLE = 'Movie App'
const DEFAULT_DESCRIPTION =
  "Team 1's responsive Movie DB website recreation for Web Scripting 3 Final Project, built with React and Tailwind."

export const useMetaTag = ({ title, description = '' }) => {
  useEffect(() => {
    document.title = title ? `${APP_TITLE} | ${title}` : APP_TITLE
    setMetaDescriptionTag(description)

    return () => {
      document.title = APP_TITLE
      setMetaDescriptionTag(DEFAULT_DESCRIPTION)
    }
  }, [title, description])
}

const setMetaDescriptionTag = description => {
  const metaTag = document.querySelector('meta[name=description]')

  if (metaTag) {
    metaTag.setAttribute('content', description)
  } else {
    const newMetaTag = document.createElement('meta')
    newMetaTag.name = 'description'
    newMetaTag.content = description
    document.head.appendChild(newMetaTag)
  }
}
