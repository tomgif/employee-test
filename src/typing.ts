export interface Employee {
  id: string
  name: string
  date: string
}

export type Programmer = Employee & {
  grade: string
}
export type Manager = Employee & {
  department: string
}
export type Staff = {
  programmers?: Programmer[]
  managers?: Manager[]
}
