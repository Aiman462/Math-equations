import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MathFormulas } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MathFormulas],
})
export class AppModule {}
