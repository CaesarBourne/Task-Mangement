import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class NotificationHttpService {
  private readonly logger = new Logger(NotificationHttpService.name);

  constructor(private readonly http: HttpService) {}

  async notifyAssignment(task: any, personId: number): Promise<void> {
    try {
      await firstValueFrom(
        this.http.post('https://example.com/notify-assignment', {
          taskId: task.id,
          personId,
          title: task.title,
        }),
      );
    } catch (error) {
      this.logger.warn(
        `Failed to send assignment notification: ${(error as any).message}`,
      );
      // For this test task, failure is logged but not fatal.
    }
  }
}