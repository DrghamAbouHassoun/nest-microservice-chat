"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 5000,
    database: {
        url: process.env.DATABASE_URL
    },
    jwtAuthToken: process.env.JWT_AUTH_TOKEN,
    jwtVerifyEmailToken: process.env.JWT_VERIFY_EMAIL_TOKEN
});
//# sourceMappingURL=configuration.js.map