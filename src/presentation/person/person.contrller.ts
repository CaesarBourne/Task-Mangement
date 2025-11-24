import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { PersonService } from '../../core/task/person.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Controller('people')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() body: CreatePersonDto) {
    return this.personService.createPerson(body);
  }

  @Get()
  async list() {
    return this.personService.listPeople();
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number) {
    const person = await this.personService.getPerson(id);
    if (!person) {
      throw new NotFoundException('Person not found');
    }
    return person;
  }
}