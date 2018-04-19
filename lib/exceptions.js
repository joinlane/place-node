class APIException extends Error {
    constructor(message, error_details) {
        super(message);

        this.name = this.constructor.name;
        this.error_details = error_details;

        Error.captureStackTrace(this, this.constructor);
    }

    get error_type() {
        this.constructor.error_type
    }

    get status_code() {
        this.constructor.status_code
    }
}

class InvalidArguments extends APIException {}
InvalidArguments.error_type = 'InvalidArguments'
InvalidArguments.status_code = 400

class InvalidRequest extends APIException {}
InvalidRequest.error_type = 'Error'
InvalidRequest.status_code = 400

class Unauthorized extends APIException {}
Unauthorized.error_type = 'Unauthorized'
Unauthorized.status_code = 401

class Forbidden extends APIException {}
Forbidden.error_type = 'Forbidden'
Forbidden.status_code = 403

class NotFound extends APIException {}
NotFound.error_type = 'NotFound'
NotFound.status_code = 404

class MethodNotAllowed extends APIException {}
MethodNotAllowed.error_type = 'MethodNotAllowed'
MethodNotAllowed.status_code = 405

class TooManyRequests extends APIException {}
TooManyRequests.error_type = 'TooManyRequests'
TooManyRequests.status_code = 429

class InternalError extends APIException {}
InternalError.error_type = 'InternalError'
InternalError.status_code = 500

class InvalidResponse extends APIException {}


module.exports = {
    APIException: APIException,
    InvalidArguments: InvalidArguments,
    InvalidRequest: InvalidRequest,
    Unauthorized: Unauthorized,
    Forbidden: Forbidden,
    NotFound: NotFound,
    MethodNotAllowed: MethodNotAllowed,
    TooManyRequests: TooManyRequests,
    InternalError: InternalError,
    InvalidResponse: InvalidResponse
}
