
import { IPersonRepository } from "src/core/task/person.repository";
import { TaskStatus } from "src/core/task/task-status.enum";
import { Task } from "src/core/task/task.entity";
import { ITaskRepository } from "src/core/task/task.repository";
import { TaskService } from "src/core/task/task.service";

describe('TaskService', () => {
  let service: TaskService;
  let taskRepo: jest.Mocked<ITaskRepository>;
  let personRepo: jest.Mocked<IPersonRepository>;
  let notificationPort: any;

  beforeEach(() => {
    taskRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      assignPerson: jest.fn(),
    };

    personRepo = {
      findById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
    };

    notificationPort = {
      notifyAssignment: jest.fn(),
    };

    service = new TaskService(taskRepo, personRepo, notificationPort);
  });

  it('creates a task with PENDING status', async () => {
    taskRepo.create.mockImplementation(async (input: any) => {
      return new Task(
        1,
        input.title,
        input.description,
        input.status,
        input.createdAt,
        input.updatedAt,
      );
    });

    const result = await service.createTask({
      title: 'Test task',
      description: 'Demo',
    });

    expect(result.id).toBe(1);
    expect(result.status).toBe(TaskStatus.PENDING);
    expect(taskRepo.create).toHaveBeenCalled();
  });

  it('throws when updating non-existing task', async () => {
    taskRepo.findById.mockResolvedValue(null);
    await expect(
      service.updateTask(42, { title: 'Updated' }),
    ).rejects.toThrow('TASK_NOT_FOUND');
  });
});