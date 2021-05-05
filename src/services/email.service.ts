import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventBus } from '../event-bus/event-bus';
import { MagicLinkEvent } from '../event-bus/events';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { InjectAwsService } from 'nest-aws-sdk';
import { SES } from 'aws-sdk';
import { EmailGeneratorService } from './email-generator.service';

@Injectable()
export class EmailService implements OnModuleInit {
  constructor(
    private eventBus: EventBus,
    @InjectAwsService(SES) private readonly SES: SES,
    private emailGeneratorService: EmailGeneratorService,
  ) {}

  onModuleInit() {
    const magicLinkEvent$ = this.eventBus.ofType(MagicLinkEvent);
    merge(magicLinkEvent$)
      .pipe(debounceTime(50))
      .subscribe(async (event: MagicLinkEvent) => {
        this.sendMagicLink({ email: event.email, token: event.token });
      });
  }

  async sendMagicLink({ token, email }) {
    this.SES.sendEmail({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: this.emailGeneratorService.generateMagicLinkEmail({ token }),
          },
          Text: {
            Charset: 'UTF-8',
            Data: token,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Login To Codeiris',
        },
      },
      Source: 'info@codeiris.dev',
    })
      .promise()
      .then((value) => {
        console.log(value);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
