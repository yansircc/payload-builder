export const resolvePathname = (param: string | string[] | undefined): string => {
  if (typeof param === 'string') {
    return param
  }

  if (Array.isArray(param)) {
    return `/${param.join('/')}`
  }

  return '/'
}
