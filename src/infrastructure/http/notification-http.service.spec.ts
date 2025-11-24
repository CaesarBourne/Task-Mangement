import { Test, TestingModule } from '@nestjs/testing';
import { NotificationHttpService } from './notification-http.service';

describe('NotificationHttpService', () => {
  let service: NotificationHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationHttpService],
    }).compile();

    service = module.get<NotificationHttpService>(NotificationHttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
