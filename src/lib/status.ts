export const loginStatus = {
    "SUCCESS": undefined,
    "UNKNOWN": "Terdapat kesalahan dalam login. Silahkan coba lagi.",
    "SERVER_ERROR": "Server mengalami kendala dalam login. Silahkan coba sesaat lagi.",
    "INVALID_LOGIN": "NIS/NIK atau password salah. Silahkan coba lagi."
}

export type LoginStatus = keyof typeof loginStatus;

export const registerStatus = {
    "SUCCESS": undefined,
    "UNKNOWN": "Terdapat kesalahan dalam pembuatan akun. Silahkan coba lagi.",
    "SERVER_ERROR": "Server mengalami kendala dalam pembuatan akun. Silahkan coba sesaat lagi.",
    "INVALID_REGISTER": "Informasi untuk registrasi kurang lengkap. Silahkan lengkapi informasi dan coba lagi.",
    "ID_NOT_REGISTERED": "NIS/NIK Anda tidak terdaftar dalam sistem kami. Silahkan hubungi admin mengenai kendala ini.",
    "ALREADY_REGISTERED": "Anda telah membuat akun dengan NIS/NIK ini. Silahkan login dengan akun tersebut.",
    "PASSWORD_MISMATCH": "Password tidak sama dengan konfirmasi password. Silahkan coba lagi."
}

export type RegisterStatus = keyof typeof registerStatus;
