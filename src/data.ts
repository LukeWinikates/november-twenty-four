export type UnitOfInvocation = {
  name: string
  invocationCount: number
  children?: UnitOfInvocation[]
}

export const data: UnitOfInvocation[] = [{
  name: "/v1/profile",
  invocationCount: 5,
  children: [{
    name: "SELECT",
    invocationCount: 5,
  }]
}, {
  name: "/v1/videos",
  invocationCount: 20
}]
