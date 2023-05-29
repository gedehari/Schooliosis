export type UserIdentityType = "Siswa" | "Guru"

export type LoginForm = {
    identityType: UserIdentityType,
    id: number,
    password: string,
    rememberMe: boolean
}

export type RegisterForm = {
    identityType: UserIdentityType,
    id: number,
    email: string,
    password: string
}

export const loginStrings = {
    Ok: undefined,
    Unknown: "Terdapat kesalahan dalam login. Silahkan coba lagi.",
    ServerError: "Server mengalami kendala dalam login. Silahkan coba sesaat lagi.",
    InvalidLogin: "NIS/NIK atau password salah. Silahkan coba lagi."
}

export type LoginStatus = keyof typeof loginStrings;

export const registerStrings = {
    Ok: undefined,
    Unknown: "Terdapat kesalahan dalam pembuatan akun. Silahkan coba lagi.",
    ServerError: "Server mengalami kendala dalam pembuatan akun. Silahkan coba sesaat lagi.",
    InvalidRegister: "Informasi untuk registrasi kurang lengkap. Silahkan lengkapi informasi dan coba lagi.",
    IdNotRegistered: "NIS/NIK Anda tidak terdaftar dalam sistem kami. Silahkan hubungi admin mengenai kendala ini.",
    AlreadyRegistered: "Anda telah membuat akun dengan NIS/NIK ini. Silahkan login dengan akun tersebut.",
    PasswordMismatch: "Password tidak sama dengan konfirmasi password. Silahkan coba lagi."
}

export type RegisterStatus = keyof typeof registerStrings;
