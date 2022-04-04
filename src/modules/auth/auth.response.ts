export class AuthResponse {
    accessToken: string

    refreshToken: string

    userInfo: {
        userId: number
        username: string
        email: string
    }

    public static fromData(data: any) {
        const instance = new AuthResponse()
        instance.accessToken = data.accessToken
        instance.refreshToken = data.refreshToken
        instance.userInfo = {
            userId: data.userInfo?.userId,
            username: data.userInfo?.username,
            email: data.userInfo?.email,
        }
        return instance
    }
}
