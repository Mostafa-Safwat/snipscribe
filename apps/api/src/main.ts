import { ClassSerializerInterceptor, Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import * as fs from 'fs';

import {
    PrismaClientExceptionFilter,
    PrismaClientExceptionFilterValidationError,
} from './common/prisma-client-exception/prisma-client-exception.filter';
import { AppModule } from './modules/app/app.module';
import { getLogLevels } from './utils';

const CORS_WHITELIST = ['http://localhost:3001', 'http://localhost:3000'];
const IS_PROD = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3001;
async function bootstrap(onlyGenerateSwagger = false) {
    // Init app
    const app = await NestFactory.create(AppModule);

    app.enableShutdownHooks();

    // Prefix
    app.setGlobalPrefix('api');

    // Versioning with URI (/api/v1/... /api/v2/...)
    app.enableVersioning({
        type: VersioningType.URI,
    });

    // CORS
    app.enableCors({
        origin: CORS_WHITELIST,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // Logger
    app.useLogger(getLogLevels(IS_PROD));

    // Serializers
    app.use(cookieParser());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    );
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
    app.useGlobalFilters(new PrismaClientExceptionFilterValidationError(httpAdapter));

    // Enable prisma shutdown hook (see: ttps://www.prisma.io/docs/orm/more/upgrade-guides/upgrading-versions/upgrading-to-prisma-5#removal-of-the-beforeexit-hook-from-the-library-engine)
    app.enableShutdownHooks();

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Snipscribe')
        .setDescription('API for Snipscribe')
        .setVersion('1.0.0')
        .addServer(CORS_WHITELIST[0])
        .addServer(CORS_WHITELIST[1])
        .addBearerAuth({ bearerFormat: 'JWT', type: 'http', scheme: 'bearer' })
        .build();
    const options: SwaggerDocumentOptions = {
        operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    const swaggerCSS = fs.readFileSync('./swagger.css').toString();
    const swaggerOptions: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
        },
        customSiteTitle: 'Snipscribe API Docs',
        customCss: swaggerCSS,
    };
    const swaggerJSON = JSON.stringify(document);
    if (!fs.existsSync('./swagger.json') || swaggerJSON !== fs.readFileSync('./swagger.json').toString()) {
        Logger.warn('swagger.json is not up to date... updating...');
        fs.writeFileSync('./swagger.json', swaggerJSON);
    }
    if (onlyGenerateSwagger) {
        Logger.warn('Only generating swagger.json... quitting...');
        app.close();
        return;
    }

    SwaggerModule.setup('/docs', app, document, swaggerOptions);

    await app.listen(PORT);
}

const onlyGenerateSwagger = process.argv.includes('--only-generate-swagger');
bootstrap(onlyGenerateSwagger);
