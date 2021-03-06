import { PagingQuery } from '../models/controller/query'
import { Metadata } from '../models/controller/result'

const _getSortObject = (sort: string, defaultObj: Object): Object => {
  if (!sort) {
    return defaultObj
  }
  const obj = {}
  sort.split(',').forEach(x => {
    x = x.trim()
    if (!x) {
      return
    }
    const isDesc = x.indexOf('-') === 0
    const name = x.replace(/[^0-9a-zA-Z]/, '')
    if (isDesc) {
      obj[name] = -1
    } else {
      obj[name] = 1
    }
  })
  return obj
}

const _getPageUrl = (path: string, currentPage: number, newPage: number) => {
  if (currentPage === newPage) {
    return null
  }
  const arr = path.split(/[?&]/)
  let result = ''
  let counter = 0
  for (let i = 0; i < arr.length; i++) {
    const part = arr[i].trim()
    if (!part) {
      continue
    }
    const prefix =
      counter === 0 ? '' :
        counter === 1 ? '?' : '&'
    counter++
    if (part === 'Page=' + currentPage) {
      result += prefix + 'Page=' + newPage
      continue
    }
    result += prefix + part
  }
  return result
}

const _getMetadata = (count: number, paging: PagingQuery, url: string, sortObj: Object): Metadata => {
  const first = 1
  const last = Math.floor(count / paging.Limit) + (count % paging.Limit > 0 ? 1 : 0)
  const previous = paging.Page === 1 ? 1 : paging.Page - 1
  const next = paging.Page === last ? last : paging.Page + 1
  const pageExist = paging.Page > 0 && paging.Page <= last
  const metadata: Metadata = {
    count: count,
    page: pageExist ? paging.Page : -1,
    last: pageExist ? last : -1,
    limit: paging.Limit,
    sort: sortObj,
    links: pageExist ? {
      first: _getPageUrl(url, paging.Page, first),
      previous: _getPageUrl(url, paging.Page, previous),
      current: url,
      next: _getPageUrl(url, paging.Page, next),
      last: _getPageUrl(url, paging.Page, last)
    } : null
  }
  return metadata
}

const getPaging = (count: number, paging: PagingQuery, url: string, defaultSortObj: Object): Metadata => {
  const sort = _getSortObject(paging.Sort, defaultSortObj)
  const metadata = _getMetadata(count, paging, url, sort)
  return metadata
}

export const PagingHelper = {
  _getSortObject,
  _getPageUrl,
  _getMetadata,
  getPaging
}
