"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:4200',
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                connectSrc: ["'self'", '*.googleapis.com'],
                imgSrc: ["'self'", '*.googleapis.com'],
                scriptSrcElem: ["'self'", 'apis.google.com'],
                frameSrc: ["'self'", '*.firebaseapp.com']
            }
        },
        crossOriginOpenerPolicy: false
    }));
    app.use((req, res, next) => {
        res.header("Cross-Origin-Embedder-Policy", "cross-origin");
        next();
    });
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map