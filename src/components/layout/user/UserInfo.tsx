interface UserInfoProps {
  name: string
  email: string
}

export function UserInfo({ name, email }: UserInfoProps) {
  return (
    <strong className="flex items-center text-gray">
      <span className="mr-[0.5rem] border-r-2 border-solid border-gray pr-[0.5rem]">{name}</span>
      <span>{email}</span>
    </strong>
  )
}
