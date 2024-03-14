export type Folder = {
  path: string,
  items: string[]
}

export type File = {
  path: string,
  name: string,
  type: string
}

export type Archives = {
  path: string,
  name: string,
  type: string
}

export type Options = {
  callback: (file: File) => void,
  archives: Archives[]
}