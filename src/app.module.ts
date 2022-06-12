import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { constants } from './constants';
import { AllExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: constants.MYSQL_HOST,
      port: constants.MYSQL_PORT,
      username: constants.MYSQL_USER,
      password: constants.MYSQL_PASSWORD,
      database: constants.MYSQL_DB,
      synchronize: true,
      autoLoadEntities: true, //*Varlıkları otomatik olarak yükle
      //entities: [__dirname + '/../**/*.entity.js'], //!WARNING :Static glob paths (e.g., dist/**/*.entity{ .ts,.js}) won't work properly with webpack.
      //keepConnectionAlive: true, // Uygulama sonlandırıldığında bağlantıyı kesmez
      /* ssl: {
        ca: fs.readFileSync(__dirname + '/../mysql-ca.crt'),
      },
      cache: {
        type: 'redis',
        alwaysEnabled: false,
        duration: 10 * 1000,
        options: {
          host: constants.redisHost,
          port: constants.redisPort,
          password: constants.redisPassword,
        },
      }, */
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthModule,
    UsersModule,
    VehiclesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
