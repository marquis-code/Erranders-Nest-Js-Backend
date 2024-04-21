import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthenticationModule } from "./api/authentication/authentication.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGO_URL"),
      }),
      inject: [ConfigService],
    }),
    // MongooseModule.forRoot('mongodb+srv://erranders-database:erranders-database@erranders-database.edxdtm3.mongodb.net/?retryWrites=true&w=majority&appName=erranders-database'),
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
