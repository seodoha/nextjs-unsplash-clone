export type User = {
  name: string
  email: string
}

export type RootLayoutProps = Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}> 