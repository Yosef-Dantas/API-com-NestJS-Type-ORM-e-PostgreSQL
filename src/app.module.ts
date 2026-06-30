import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Importação do módulo de configuração para leitura de variáveis de ambiente (.env).
import { ConfigModule } from '@nestjs/config';
// Importação do TypeORM para comunicação com o banco PostgreSQL.
import { TypeOrmModule } from '@nestjs/typeorm';
import { JogadoresCopaModule } from './jogadores-copa/jogadores-copa.module';

@Module({
  imports: [
    // Carrega as variáveis de ambiente da aplicação.
    ConfigModule.forRoot(),
    // Configuração assíncrona da conexão com o banco de dados.
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        // Banco de dados utilizado.
        type: 'postgres',
        // Endereço do servidor PostgreSQL.
        host: process.env.DB_HOST,
        // Porta do PostgreSQL convertida de string para número.
        port: parseInt(process.env.DB_PORT ||'5432', 10), 
        // Usuário do banco puxado do cofre.
        username: process.env.DB_USERNAME,
        // Senha do banco puxado do cofre.
        password: process.env.DB_PASSWORD,
        // Nome do banco de dados puxado do cofre.
        database: process.env.DB_DATABASE,
        // Cria e atualiza tabelas automaticamente durante o desenvolvimento.
        synchronize: true,
        // Executa a procura de todas as entidades registradas nos módulos e cria as tabelas dela no banco.
        autoLoadEntities: true,

      }),
    }),
    JogadoresCopaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
