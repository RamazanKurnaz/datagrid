import { useLocation } from 'react-router-dom'
import { routes, RouteConfig } from '../routes/config'

export const useCurrentRoute = () => {
  const location = useLocation()

  const findCurrentLabel = () => {
    // Üçüncü seviye menüleri önce kontrol et
    const findInThirdLevel = (): string | null => {
      for (const item of routes) {
        if (item.children) {
          for (const child of item.children) {
            if (child.children) {
              const match = child.children.find(
                (subChild) => subChild.path === location.pathname
              )
              if (match) return match.label
            }
          }
        }
      }
      return null
    }

    // İkinci seviye menüleri kontrol et
    const findInSecondLevel = (): string | null => {
      for (const item of routes) {
        if (item.children) {
          for (const child of item.children) {
            if (child.path === location.pathname) {
              // Aynı path'e sahip bir alt menü var mı kontrol et
              if (
                child.children &&
                child.children.some((sc) => sc.path === location.pathname)
              ) {
                // Eğer varsa, bu bir parent. Alt menü labelını bul
                const subItem = child.children.find(
                  (sc) => sc.path === location.pathname
                )
                if (subItem) return subItem.label
              }
              return child.label
            }
          }
        }
      }
      return null
    }

    // Birinci seviye menüleri kontrol et
    const findInTopLevel = (): string | null => {
      for (const item of routes) {
        if (item.path === location.pathname) {
          return item.label
        }
      }
      return null
    }

    // Öncelik sırasına göre kontrol et: önce alt menüler, sonra üst menüler
    return (
      findInThirdLevel() ||
      findInSecondLevel() ||
      findInTopLevel() ||
      'Dashboard'
    )
  }

  return findCurrentLabel()
}
