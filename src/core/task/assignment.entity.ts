export class TaskAssignment {
  constructor(
    public readonly taskId: number,
    public readonly personId: number,
    public readonly assignedAt: Date,
  ) {}
}