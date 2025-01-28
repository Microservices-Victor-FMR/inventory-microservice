import { Module } from '@nestjs/common';
import { InventoryModule } from './inventory/inventory.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    InventoryModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
      isGlobal: true,
      
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
