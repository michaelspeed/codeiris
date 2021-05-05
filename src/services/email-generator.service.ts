import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailGeneratorService {
  constructor(private readonly configService: ConfigService) {}
  generateMagicLinkEmail({ token }): string {
    const path = this.configService.get<string>('NEXT_PUBLIC_SERVER_PATH');
    return `
    <html>
    <head></head>
    <body>
    <div>
    Your magic link is - ${path}/auth/${token}
</div>
</body>
</html>`;
  }
}
