
interface ICustomError {
    code: number,
    message: string,
    name?: string
}

class CustomError extends Error {
    code: number;
    name: string;

    constructor({code, message, name}: ICustomError) {
        super(message);
        this.code = code;
        this.name = name;
    }
}

export { CustomError }
