export class UserPostError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message);
        this.name = 'UserPostError';
    }

    static fromError(error: unknown): UserPostError {
        if (error instanceof UserPostError) return error;
        return new UserPostError(500, 'Internal Server Error');
    }
}