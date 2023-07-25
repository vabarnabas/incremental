export interface Unit {
  name: string
  power: number
  luck: number
}

export interface UnitEntity extends Unit {
  id: string
}
