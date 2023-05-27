export type LoginPayloadProps = {
  username: string
  password: string
}

export type AuthTokenPayloadProps = {
  token: string
}

export type DisplayImage = {
  imageType: string
  baseUrl: string
  type: string
  urls: {
    content160w: string | null
    cover80w80h: string | null
    original: string | null
  }
}

export type BaseUserProps = {
  email: string
  username: string
}

export type SignUpProps = BaseUserProps & {
  password: string
}

export type UserProps = BaseUserProps & {
  id: string
  // createdAt: string
  // suspendedAt: string | null
  // updatedAt: string
}

export type AccountProps = BaseUserProps & {
  password?: string
}

export interface AuthContextProps {
  user: UserProps | null
}
