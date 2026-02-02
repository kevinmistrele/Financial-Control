import {Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll(
      @Query('page') page: string = '1',
      @Query('limit') limit: string = '10',
      @Query('order') order: 'asc' | 'desc' = 'desc',
  ) {
    return this.expensesService.findAll(+page, +limit, order);
  }

  @Get('dashboard-report')
  getReport(
      @Query('days') days: string = '7',
  ) {
    const validDays = [7, 15, 30].includes(+days) ? +days : 7;
    return this.expensesService.generateReport(validDays);
  }

  @Get(':id')
  findOne(@Query('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  update(@Query('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Delete()
  remove(@Query('ids') ids: string) {
    if(!ids) {
      throw new HttpException('Forneça pelo menos um ID', HttpStatus.NOT_FOUND);
    }
    const idsArrays = ids.split(',');
    if(idsArrays.length > 10){
      throw new HttpException('Máximo de 10 IDs permitidos por solicitação', HttpStatus.BAD_REQUEST);
    }
    return this.expensesService.remove(idsArrays);
  }
}
