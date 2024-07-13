import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtGuard } from './auth/guards/jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.useGlobalGuards(new JwtGuard(app.get(Reflector)));
  await app.listen(process.env.port || 3000);
}
bootstrap();
